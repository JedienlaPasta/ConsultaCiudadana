import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export type SurveyAnalytics = {
  totalParticipants: number;
  participationByDate: { date: string; count: number }[];
  questionResults: {
    questionId: number;
    question: string;
    totalVotes: number;
    isSubQuestion: boolean;
    parentOptionId?: number;
    options: {
      optionId: number;
      optionName: string;
      voteCount: number;
      percentage: number;
    }[];
  }[];
};

export async function getSurveyAnalytics(
  surveyId: number,
): Promise<SurveyAnalytics> {
  const defaultAnalytics: SurveyAnalytics = {
    totalParticipants: 0,
    participationByDate: [],
    questionResults: [],
  };

  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return defaultAnalytics;
    }

    // 1. Get total participants
    const participantsRequest = pool.request();
    const participantsResult = await participantsRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        SELECT COUNT(*) as total_participants
        FROM encuestas_participadas
        WHERE survey_id = @survey_id
      `);

    const totalParticipants =
      participantsResult.recordset[0]?.total_participants || 0;

    console.log(totalParticipants);
    // 2. Get participation by date
    const participationByDateRequest = pool.request();
    const participationByDateResult = await participationByDateRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        SELECT
          CAST(voted_at AS DATE) as participation_date,
          COUNT(*) as daily_count
        FROM encuestas_participadas
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

    // 3. Get question results with vote counts (including sub-questions)
    const questionResultsRequest = pool.request();
    const questionResultsResult = await questionResultsRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        -- Preguntas principales de la encuesta
        SELECT
          p.id as question_id,
          p.question,
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
        GROUP BY p.id, p.question, o.id, o.option_name, ep.question_order
        
        UNION ALL
        
        -- Subpreguntas al elegir opciones específicas
        SELECT
          sp.id as question_id,
          sp.question,
          so.id as option_id,
          so.option_name,
          COUNT(sv.id) as vote_count,
          ep.question_order + 0.1 as question_order, -- Para mantener orden después de la pregunta padre
          CAST(1 AS BIT) as is_sub_question,
          parent_o.id as parent_option_id
        FROM preguntas sp
        INNER JOIN opciones parent_o ON sp.id = parent_o.sub_question_id
        INNER JOIN preguntas parent_p ON parent_o.question_id = parent_p.id
        INNER JOIN encuestas_preguntas ep ON parent_p.id = ep.question_id
        INNER JOIN opciones so ON sp.id = so.question_id
        LEFT JOIN votos sv ON so.id = sv.option_id AND sv.survey_id = @survey_id
        WHERE ep.survey_id = @survey_id
        GROUP BY sp.id, sp.question, so.id, so.option_name, ep.question_order, parent_o.id
        
        ORDER BY question_order, option_id
      `);

    // Process question results
    const questionResultsMap = new Map();
    questionResultsResult.recordset.forEach((row) => {
      if (!questionResultsMap.has(row.question_id)) {
        questionResultsMap.set(row.question_id, {
          questionId: row.question_id,
          question: row.question,
          totalVotes: 0,
          isSubQuestion: row.is_sub_question,
          parentOptionId: row.parent_option_id,
          options: [],
        });
      }

      const question = questionResultsMap.get(row.question_id);
      question.totalVotes += row.vote_count;
      question.options.push({
        optionId: row.option_id,
        optionName: row.option_name,
        voteCount: row.vote_count,
        percentage: 0, // Will calculate after getting total
      });
    });

    type OptionResult = {
      optionId: number;
      optionName: string;
      voteCount: number;
      percentage: number;
    };

    // Calculate percentages
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

    return {
      totalParticipants,
      participationByDate,
      questionResults,
    };
  } catch (error) {
    console.error("Error al obtener analytics de la encuesta:", error);
    return defaultAnalytics;
  }
}
