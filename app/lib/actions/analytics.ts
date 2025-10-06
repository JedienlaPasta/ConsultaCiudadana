"use server";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";
import ExcelJS from "exceljs";

export type QuestionResult = {
  questionId: number;
  question: string;
  totalVotes: number;
  isSubQuestion: boolean;
  parentOptionId?: number;
  isMapQuestion: boolean;
  options: {
    optionId: number;
    optionName: string;
    voteCount: number;
    percentage: number;
  }[];
};

export type SurveyAnalytics = {
  totalParticipants: number;
  participationByDate: { date: string; count: number }[];
  questionResults: QuestionResult[];
  todayParticipation: number;
  averageDailyParticipation: number;
};

export type DownloadSurveyAnalyticsResult =
  | { success: true; fileName: string; base64: string; mimeType: string }
  | { success: false; message: string };

export async function downloadSurveyAnalytics(
  publicId: string,
): Promise<DownloadSurveyAnalyticsResult> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos",
      };
    }

    // 0. Get survey_id from public_id
    const idRequest = pool.request();
    const idResult = await idRequest.input("public_id", sql.Char(8), publicId)
      .query(`
        SELECT id FROM encuestas WHERE public_id = @public_id
      `);

    const surveyId = idResult.recordset[0]?.id;
    if (!surveyId) {
      return { success: false, message: "Encuesta no encontrada." };
    }

    // 1. Get total participants
    const participantsRequest = pool.request();
    const participantsResult = await participantsRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        SELECT COUNT(*) as total_participants
        FROM participacion_encuesta_detalle
        WHERE survey_id = @survey_id
      `);

    const totalParticipants =
      participantsResult.recordset[0]?.total_participants || 0;

    // 3. Get participation by date
    const participationByDateRequest = pool.request();
    const participationByDateResult = await participationByDateRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        SELECT
          CAST(voted_at AS DATE) as participation_date,
          COUNT(*) as daily_count
        FROM participacion_encuesta_detalle
        WHERE survey_id = @survey_id
        GROUP BY CAST(voted_at AS DATE)
        ORDER BY participation_date
      `);

    const participationByDate = participationByDateResult.recordset.map(
      (row) => ({
        date: row.participation_date.toISOString().split("T")[0],
        count: row.daily_count,
      }),
    );

    // 5. Get question results with vote counts
    const questionResultsRequest = pool.request();
    const questionResultsResult = await questionResultsRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        SELECT
          p.id as question_id,
          p.question,
          p.question_type as is_map_question,
          o.id as option_id,
          o.option_name,
          COUNT(v.id) as vote_count,
          ep.question_order,
          CAST(0 AS BIT) as is_sub_question,
          NULL as parent_option_id
        FROM preguntas p
        INNER JOIN encuestas_preguntas ep ON p.id = ep.question_id
        INNER JOIN opciones o ON p.id = o.question_id
        LEFT JOIN votos v ON o.id = v.option_id AND v.survey_id = @survey_id
        WHERE ep.survey_id = @survey_id
        GROUP BY p.id, p.question, p.question_type, o.id, o.option_name, ep.question_order
        
        UNION ALL
        
        SELECT
          sp.id as question_id,
          sp.question,
          sp.question_type as is_map_question,
          so.id as option_id,
          so.option_name,
          COUNT(sv.id) as vote_count,
          ep.question_order + 0.1 as question_order,
          CAST(1 AS BIT) as is_sub_question,
          parent_o.id as parent_option_id
        FROM preguntas sp
        INNER JOIN opciones parent_o ON sp.id = parent_o.sub_question_id
        INNER JOIN preguntas parent_p ON parent_o.question_id = parent_p.id
        INNER JOIN encuestas_preguntas ep ON parent_p.id = ep.question_id
        INNER JOIN opciones so ON sp.id = so.question_id
        LEFT JOIN votos sv ON so.id = sv.option_id AND sv.survey_id = @survey_id
        WHERE ep.survey_id = @survey_id
        GROUP BY sp.id, sp.question, sp.question_type, so.id, so.option_name, ep.question_order, parent_o.id
        
        ORDER BY question_order, option_id
      `);

    const questionResultsMap = new Map();
    questionResultsResult.recordset.forEach((row) => {
      if (!questionResultsMap.has(row.question_id)) {
        questionResultsMap.set(row.question_id, {
          questionId: row.question_id,
          question: row.question,
          totalVotes: 0,
          isSubQuestion: row.is_sub_question,
          parentOptionId: row.parent_option_id,
          isMapQuestion: row.is_map_question === "mapa",
          options: [],
        });
      }

      const question = questionResultsMap.get(row.question_id);
      question.totalVotes += row.vote_count;
      question.options.push({
        optionId: row.option_id,
        optionName: row.option_name,
        voteCount: row.vote_count,
        percentage: 0,
      });
    });

    type OptionResult = {
      optionId: number;
      optionName: string;
      voteCount: number;
      percentage: number;
    };

    const questionResults = Array.from(questionResultsMap.values()).map(
      (question) => ({
        ...question,
        options: question.options.map((option: OptionResult) => ({
          ...option,
          percentage:
            question.totalVotes > 0
              ? (option.voteCount / question.totalVotes) * 100
              : 0,
        })),
      }),
    );

    const totalDays = participationByDate.length;
    const averageDailyParticipation =
      totalDays > 0
        ? Math.round((totalParticipants / totalDays) * 100) / 100
        : 0;

    // === Generar Excel con formato usando ExcelJS ===
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "ConsultaCiudadana";
    workbook.created = new Date();

    // Hoja 1: Resumen
    const resumen = workbook.addWorksheet("Resumen", {
      properties: { defaultRowHeight: 20 },
      views: [{ state: "frozen", ySplit: 1 }],
    });
    resumen.columns = [
      { header: "Métrica", key: "metric", width: 30 },
      { header: "Valor", key: "value", width: 20 },
    ];
    resumen.getRow(1).font = { bold: true };
    resumen.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
    resumen.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE6F3FF" },
    };
    resumen.addRows([
      { metric: "Participantes Totales", value: totalParticipants },
      { metric: "Promedio Diario", value: averageDailyParticipation },
      { metric: "Días Registrados", value: totalDays },
    ]);

    // Hoja 2: Participación por fecha
    const participacion = workbook.addWorksheet("Participación", {
      properties: { defaultRowHeight: 20 },
      views: [{ state: "frozen", ySplit: 1 }],
    });
    participacion.columns = [
      { header: "Fecha", key: "date", width: 18 },
      { header: "Participación", key: "count", width: 18 },
    ];
    participacion.getRow(1).font = { bold: true };
    participacion.getRow(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    participacion.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFDFFFE0" },
    };
    participationByDate.forEach((row) => {
      const r = participacion.addRow({ date: row.date, count: row.count });
      r.alignment = { vertical: "middle" };
    });

    // Hoja 3: Resultados por pregunta
    const resultados = workbook.addWorksheet("Resultados", {
      properties: { defaultRowHeight: 20 },
    });
    resultados.columns = [
      { header: "Opción", key: "optionName", width: 40 },
      { header: "Votos", key: "voteCount", width: 12 },
      { header: "Porcentaje", key: "percentage", width: 14 },
    ];

    let currentRow = 1;
    questionResults.forEach((question) => {
      // Título de pregunta
      const titleRow = resultados.getRow(currentRow);
      titleRow.getCell(1).value = question.question;
      titleRow.getCell(1).font = {
        bold: true,
        size: 12,
        color: { argb: "FF1F4B99" },
      };
      titleRow.getCell(1).alignment = { vertical: "middle" };
      titleRow.getCell(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF2F2F2" },
      };
      titleRow.commit();
      currentRow += 1;

      // Encabezados
      const headerRow = resultados.getRow(currentRow);
      headerRow.getCell(1).value = "Opción";
      headerRow.getCell(2).value = "Votos";
      headerRow.getCell(3).value = "Porcentaje";
      headerRow.font = { bold: true };
      headerRow.alignment = { horizontal: "center", vertical: "middle" };
      headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE6F3FF" },
      };
      headerRow.commit();
      currentRow += 1;

      // Filas de opciones
      question.options.forEach((option: OptionResult) => {
        const row = resultados.getRow(currentRow);
        row.getCell(1).value = option.optionName;
        row.getCell(2).value = option.voteCount;
        row.getCell(3).value = option.percentage / 100; // numFmt en porcentaje
        row.getCell(3).numFmt = "0.00%";
        row.alignment = { vertical: "middle" };
        row.commit();
        currentRow += 1;
      });

      // Separador
      currentRow += 1;
    });

    // Exportar a Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const fileName = `Analytics_${publicId}.xlsx`;

    return {
      success: true,
      fileName,
      base64,
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
  } catch (error) {
    console.error("Error al obtener analytics de la encuesta:", error);
    return {
      message:
        "Error al generar el archivo Excel con los analytics de la encuesta",
      success: false,
    };
  }
}
