import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export type SurveyAnalytics = {
  totalParticipants: number;
  participationByDate: { date: string; count: number }[];
  questionResults: {
    questionId: number;
    question: string;
    totalVotes: number;
    options: {
      optionId: number;
      optionName: string;
      voteCount: number;
      percentage: number;
    }[];
  }[];
  //   sectorParticipation: {
  //     sector: string;
  //     participantCount: number;
  //     percentage: number;
  //   }[];
};

export async function getSurveyAnalytics(
  surveyId: number,
): Promise<SurveyAnalytics> {
  const defaultAnalytics: SurveyAnalytics = {
    totalParticipants: 0,
    participationByDate: [],
    questionResults: [],
    // sectorParticipation: [],
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

    // 3. Get question results with vote counts
    const questionResultsRequest = pool.request();
    const questionResultsResult = await questionResultsRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        SELECT
          p.id as question_id,
          p.question,
          o.id as option_id,
          o.option_name,
          COUNT(v.id) as vote_count,
          ep.question_order
        FROM preguntas p
        INNER JOIN encuestas_preguntas ep ON p.id = ep.question_id
        INNER JOIN opciones o ON p.id = o.question_id
        LEFT JOIN votos v ON o.id = v.option_id AND v.survey_id = @survey_id
        WHERE ep.survey_id = @survey_id
        GROUP BY p.id, p.question, o.id, o.option_name, ep.question_order
        ORDER BY ep.question_order, o.id
      `);

    console.log(questionResultsResult.recordset);

    // Process question results
    const questionResultsMap = new Map();
    questionResultsResult.recordset.forEach((row) => {
      if (!questionResultsMap.has(row.question_id)) {
        questionResultsMap.set(row.question_id, {
          questionId: row.question_id,
          question: row.question,
          totalVotes: 0,
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

    // 4. Get sector participation (for map questions)
    // const sectorParticipationRequest = pool.request();
    // const sectorParticipationResult = await sectorParticipationRequest.input(
    //   "survey_id",
    //   sql.Int,
    //   surveyId,
    // ).query(`
    //     SELECT
    //       o.sector,
    //       COUNT(DISTINCT ep.user_rut) as participant_count
    //     FROM votos v
    //     INNER JOIN opciones o ON v.option_id = o.id
    //     INNER JOIN encuestas_participadas ep ON v.survey_id = ep.survey_id
    //     INNER JOIN preguntas p ON v.question_id = p.id
    //     WHERE v.survey_id = @survey_id
    //       AND p.question_type = 'mapa'
    //       AND o.sector IS NOT NULL
    //     GROUP BY o.sector
    //     ORDER BY participant_count DESC
    //   `);

    // const sectorParticipation = sectorParticipationResult.recordset.map(
    //   (row) => ({
    //     sector: row.sector,
    //     participantCount: row.participant_count,
    //     percentage:
    //       totalParticipants > 0
    //         ? (row.participant_count / totalParticipants) * 100
    //         : 0,
    //   }),
    // );

    return {
      totalParticipants,
      participationByDate,
      questionResults,
      //   sectorParticipation,
    };
  } catch (error) {
    console.error("Error al obtener analytics de la encuesta:", error);
    return defaultAnalytics;
  }
}
