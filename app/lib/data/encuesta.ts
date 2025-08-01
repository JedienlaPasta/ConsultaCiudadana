import {
  SubOption,
  SurveyData,
  SurveyGeneralData,
  SurveyQuestion,
} from "../definitions/encuesta";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export async function getSurveysList(): Promise<SurveyGeneralData[]> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return [];
    }
    const request = pool.request();
    const result = await request.query(`
        SELECT id, survey_name, survey_short_description, survey_start_date, survey_end_date, department FROM encuestas
      `);
    return result.recordset.map(
      (item) =>
        ({
          id: item.id,
          survey_name: item.survey_name,
          survey_short_description: item.survey_short_description,
          survey_start_date: item.survey_start_date.toISOString().split("T")[0],
          survey_end_date: item.survey_end_date.toISOString().split("T")[0],
          department: item.department,
        }) as SurveyGeneralData,
    );
  } catch (error) {
    console.error("Error al obtener la lista de encuestas:", error);
    return [];
  }
}

export async function getSearchedSurveysList(
  query: string,
  filter: string,
): Promise<SurveyGeneralData[]> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return [];
    }
    const request = pool.request();
    const result = await request
      .input("query", sql.NVarChar, `%${query}%`)
      .input("filter", sql.NVarChar, filter).query(`
        SELECT id, survey_name, survey_short_description, survey_start_date, survey_end_date, department FROM encuestas
        WHERE (survey_name LIKE @query OR survey_short_description LIKE @query)
        AND (
          @filter = 'todas'
          OR (@filter = 'abierta' AND survey_end_date >= GETDATE() AND survey_start_date <= GETDATE())
          OR (@filter = 'cerrada' AND survey_end_date < GETDATE())
        )
      `);
    return result.recordset.map(
      (item) =>
        ({
          id: item.id,
          survey_name: item.survey_name,
          survey_short_description: item.survey_short_description,
          survey_start_date: item.survey_start_date.toISOString().split("T")[0],
          survey_end_date: item.survey_end_date.toISOString().split("T")[0],
          department: item.department,
        }) as SurveyGeneralData,
    );
  } catch (error) {
    console.error("Error al obtener la lista de encuestas:", error);
    return [];
  }
}

export async function getSurveyDetails(id: number): Promise<SurveyData> {
  const defaultSurvey: SurveyData = {
    survey_name: "",
    survey_short_description: "",
    survey_large_description: "",
    survey_start_date: "",
    survey_end_date: "",
    department: "",
    survey_links: [],
    objectives: [],
    chronogram: [],
    survey_options_definitions: [],
    frequently_asked_questions: [],
  };

  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return defaultSurvey;
    }

    // 1. Obtener datos básicos de la encuesta
    const surveyRequest = pool.request();
    const surveyResult = await surveyRequest
      .input("id", sql.Int, id)
      .query("SELECT * FROM encuestas WHERE id = @id");

    if (surveyResult.recordset.length === 0) {
      console.warn("No se encontró la encuesta con el ID especificado");
      return defaultSurvey;
    }

    const survey = surveyResult.recordset[0];

    // console.log(survey.survey_start_date.toISOString().split("T")[0]);
    // console.log(survey.survey_end_date.toISOString().split("T")[0]);

    const linksRequest = pool.request();
    const linksResult = await linksRequest
      .input("survey_id", sql.Int, id)
      .query(
        "SELECT id, survey_link FROM links WHERE survey_id = @survey_id ORDER BY id",
      );
    // 2. Obtener objetivos
    const objectivesRequest = pool.request();
    const objectivesResult = await objectivesRequest
      .input("survey_id", sql.Int, id)
      .query(
        "SELECT id, objective FROM objetivos WHERE survey_id = @survey_id ORDER BY id",
      );

    // 3. Obtener cronograma
    const chronogramRequest = pool.request();
    const chronogramResult = await chronogramRequest.input(
      "survey_id",
      sql.Int,
      id,
    ).query(`
        SELECT chronogram_name as phase, chronogram_description as description, estimated_period as date 
        FROM cronogramas 
        WHERE survey_id = @survey_id 
        ORDER BY chronogram_order
      `);

    // 4. Obtener términos/definiciones
    const termsRequest = pool.request();
    const termsResult = await termsRequest.input("survey_id", sql.Int, id)
      .query(`
        SELECT concept_name as name, concept_description as description 
        FROM terminos 
        WHERE survey_id = @survey_id 
        ORDER BY id
      `);

    // 5. Obtener FAQ
    const faqRequest = pool.request();
    const faqResult = await faqRequest.input("survey_id", sql.Int, id).query(`
        SELECT faq_question as question, faq_answer as answer 
        FROM faq 
        WHERE survey_id = @survey_id 
        ORDER BY id
      `);

    // 6. Obtener preguntas con sus opciones
    const questionsRequest = pool.request();
    const questionsResult = await questionsRequest.input(
      "survey_id",
      sql.Int,
      id,
    ).query(`
        SELECT 
          p.id,
          p.step,
          p.step_description,
          p.question,
          p.question_description,
          p.question_type,
          p.multiple_answers,
          p.min_answers,
          p.max_answers,
          ep.question_order
        FROM preguntas p
        INNER JOIN encuestas_preguntas ep ON p.id = ep.question_id
        WHERE ep.survey_id = @survey_id
        ORDER BY ep.question_order
      `);

    // 7. Para cada pregunta, obtener sus opciones
    const questions = [];
    for (const questionRow of questionsResult.recordset) {
      const optionsRequest = pool.request();
      const optionsResult = await optionsRequest.input(
        "question_id",
        sql.Int,
        questionRow.id,
      ).query(`
          SELECT 
            o.id,
            o.option_name,
            o.option_description,
            o.sub_question_id,
            o.option_order,
            sp.question as sub_question
          FROM opciones o
          LEFT JOIN preguntas sp ON o.sub_question_id = sp.id
          WHERE o.question_id = @question_id AND o.is_active = 1
          ORDER BY o.option_order
        `);

      const options = [];
      for (const optionRow of optionsResult.recordset) {
        let subOptions = [];

        // Si hay una subpregunta, obtener sus opciones
        if (optionRow.sub_question_id) {
          const subOptionsRequest = pool.request();
          const subOptionsResult = await subOptionsRequest.input(
            "sub_question_id",
            sql.Int,
            optionRow.sub_question_id,
          ).query(`
              SELECT option_name
              FROM opciones
              WHERE question_id = @sub_question_id AND is_active = 1
              ORDER BY option_order
            `);

          subOptions = subOptionsResult.recordset.map((row) => row.option);
        }

        options.push({
          id: optionRow.id,
          option_name: optionRow.option_name,
          hasSubQuestion: !!optionRow.sub_question_id,
          subQuestion: optionRow.sub_question || "",
          subOptions: subOptions,
        });
      }

      questions.push({
        id: questionRow.id,
        questionId: questionRow.id,
        question: questionRow.question,
        step: questionRow.step || "",
        step_description: questionRow.step_description || "",
        isMapQuestion: questionRow.question_type === "mapa",
        maxOptions: questionRow.max_answers || 1,
        minOptions: questionRow.min_answers || 1,
        options: options,
      });
    }

    // Construir el objeto final
    const surveyFormData: SurveyData = {
      survey_name: survey.survey_name,
      survey_short_description: survey.survey_short_description,
      survey_large_description: survey.survey_large_description,
      survey_start_date: survey.survey_start_date
        ? survey.survey_start_date.toISOString().split("T")[0]
        : "",
      survey_end_date: survey.survey_end_date
        ? survey.survey_end_date.toISOString().split("T")[0]
        : "",
      department: survey.department,
      survey_links: linksResult.recordset?.map((row) => row.survey_link) || [],
      objectives: objectivesResult.recordset.map((row) => row.objective),
      chronogram: chronogramResult.recordset.map((row) => ({
        phase: row.phase,
        description: row.description,
        date: row.date,
      })),
      survey_options_definitions: termsResult.recordset.map((row) => ({
        name: row.name,
        description: row.description,
      })),
      frequently_asked_questions: faqResult.recordset.map((row) => ({
        question: row.question,
        answer: row.answer,
      })),
    };

    return surveyFormData;
  } catch (error) {
    console.error("Error al obtener detalles de la encuesta:", error);
    return defaultSurvey;
  }
}

// Survey questions
export async function getSurveyQuestions(
  id: number,
): Promise<SurveyQuestion[]> {
  const defaultSurveyQuestions: SurveyQuestion[] = [];

  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return defaultSurveyQuestions;
    }

    // Obtener datos básicos de la encuesta
    const surveyRequest = pool.request();
    const surveyResult = await surveyRequest
      .input("id", sql.Int, id)
      .query("SELECT id FROM encuestas WHERE id = @id");

    if (surveyResult.recordset.length === 0) {
      console.warn("No se encontró la encuesta con el ID especificado");
      return defaultSurveyQuestions;
    }

    // Obtener preguntas con sus opciones
    const questionsRequest = pool.request();
    const questionsResult = await questionsRequest.input(
      "survey_id",
      sql.Int,
      id,
    ).query(`
        SELECT 
          p.id,
          p.step,
          p.step_description,
          p.question,
          p.question_description,
          p.question_type,
          p.multiple_answers,
          p.min_answers,
          p.max_answers,
          ep.question_order
        FROM preguntas p
        INNER JOIN encuestas_preguntas ep ON p.id = ep.question_id
        WHERE ep.survey_id = @survey_id
        ORDER BY ep.question_order
      `);

    // Para cada pregunta, obtener sus opciones
    const questions = [];
    for (const questionRow of questionsResult.recordset) {
      const optionsRequest = pool.request();
      const optionsResult = await optionsRequest.input(
        "question_id",
        sql.Int,
        questionRow.id,
      ).query(`
          SELECT 
            o.id,
            o.option_name,
            o.option_description,
            o.sub_question_id,
            o.option_order,
            o.sector_id,
            sp.question as sub_question,
            s.sector,
            s.sector_population,
            s.sector_area
          FROM opciones o
          LEFT JOIN preguntas sp ON o.sub_question_id = sp.id
          LEFT JOIN sectores s ON o.sector_id = s.id
          WHERE o.question_id = @question_id AND o.is_active = 1
          ORDER BY o.option_order
        `);

      const options = [];
      for (const optionRow of optionsResult.recordset) {
        let subOptions: SubOption[] = [];

        // Si hay una subpregunta, obtener sus opciones
        if (optionRow.sub_question_id) {
          const subOptionsRequest = pool.request();
          const subOptionsResult = await subOptionsRequest.input(
            "sub_question_id",
            sql.Int,
            optionRow.sub_question_id,
          ).query(`
              SELECT 
                o.id,
                o.option_name,
                o.option_description,
                o.option_order,
                o.sector_id,
                s.sector
              FROM opciones o
              LEFT JOIN sectores s ON o.sector_id = s.id
              WHERE o.question_id = @sub_question_id AND o.is_active = 1
              ORDER BY o.option_order
            `);

          subOptions = subOptionsResult.recordset.map((row) => ({
            id: row.id,
            option_name: row.option_name,
            option_description: row.option_description,
            sector_id: row.sector_id,
            sector: row.sector,
          }));
        }

        options.push({
          id: optionRow.id,
          option_name: optionRow.option_name,
          option_description: optionRow.option_description,
          hasSubQuestion: !!optionRow.sub_question_id,
          subQuestionId: optionRow.sub_question_id,
          subQuestion: optionRow.sub_question || "",
          subOptions: subOptions,
          sector_id: optionRow.sector_id,
          sector: optionRow.sector || "",
          sector_population: optionRow.sector_population,
          sector_area: optionRow.sector_area,
        });
      }

      questions.push({
        id: questionRow.id,
        questionId: questionRow.id,
        question: questionRow.question,
        step: questionRow.step || "",
        step_description: questionRow.step_description || "",
        isMapQuestion: questionRow.question_type === "mapa",
        maxOptions: questionRow.max_answers || 1,
        minOptions: questionRow.min_answers || 1,
        options: options,
      });
    }

    // Paso para confirmar voto
    questions.push({
      id: questions.length + 1,
      questionId: questions.length + 1,
      question: "Resumen",
      step: "Confirmar voto",
      step_description: "Confirma que los datos son correctos",
      isMapQuestion: false,
      maxOptions: 0,
      minOptions: 0,
      options: [],
    });

    return questions;
  } catch (error) {
    console.error("Error al obtener detalles de la encuesta:", error);
    return defaultSurveyQuestions;
  }
}

type Sector = {
  sector_name: string;
};

// Sectors
export async function getSectors(): Promise<Sector[]> {
  const defaultSectors: Sector[] = [];

  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return defaultSectors;
    }

    const sectorRequest = pool.request();
    const sectorResult = await sectorRequest.query(
      "SELECT sector FROM sectores",
    );

    if (sectorResult.recordset.length === 0) {
      console.warn("No se encontraron sectores");
      return defaultSectors;
    }

    const sectors = sectorResult.recordset.map((row) => ({
      sector_name: row.sector,
    }));

    return sectors;
  } catch (error) {
    console.error("Error al obtener detalles de la encuesta:", error);
    return defaultSectors;
  }
}
