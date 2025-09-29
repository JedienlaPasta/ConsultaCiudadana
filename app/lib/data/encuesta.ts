import {
  SubOption,
  SurveyData,
  SurveyGeneralData,
  SurveyQuestion,
} from "../definitions/encuesta";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";
import { generateUserHash } from "../utils/userHash";

export async function getSurveysList(): Promise<SurveyGeneralData[]> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return [];
    }
    const request = pool.request();
    const result = await request.query(`
        SELECT public_id, survey_name, survey_short_description, survey_start_date, survey_end_date, department FROM encuestas
        ORDER BY survey_end_date ASC
      `);
    return result.recordset.map(
      (item) =>
        ({
          public_id: item.public_id,
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

export async function getFilteredSurveysList(
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
        SELECT public_id, survey_name, survey_short_description, survey_start_date, survey_end_date, department FROM encuestas
        WHERE (survey_name LIKE @query OR survey_short_description LIKE @query)
        AND (
          @filter = 'todas'
          OR (@filter = 'activa' AND survey_end_date >= GETDATE() AND survey_start_date <= GETDATE())
          OR (@filter = 'terminada' AND survey_end_date < GETDATE())
        )
        ORDER BY survey_end_date ASC
      `);
    return result.recordset.map(
      (item) =>
        ({
          public_id: item.public_id,
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

export async function getSurveysListByAccess(
  sub: string,
  dv: string,
): Promise<SurveyGeneralData[]> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return [];
    }
    const request = pool.request();

    const userHash = generateUserHash(sub, dv);
    const result = await request.input("user_hash", sql.Char(64), userHash)
      .query(`
          SELECT DISTINCT 
            e.public_id,
            e.survey_name,
            e.survey_short_description,
            e.survey_start_date,
            e.survey_end_date,
            e.department,
            e.created_at,
            e.created_by,
            u.name as created_by_name,
            p.survey_access,
            COUNT(DISTINCT ped.id) AS participation
          FROM encuestas e
          INNER JOIN permisos p ON e.id = p.survey_id
          LEFT JOIN participacion_encuesta_detalle ped ON e.id = ped.survey_id
          LEFT JOIN usuarios u ON e.created_by = u.user_hash
          WHERE p.user_hashed_key = @user_hash
          GROUP BY 
            e.public_id,
            e.survey_name,
            e.survey_short_description,
            e.survey_start_date,
            e.survey_end_date,
            e.department,
            e.created_at,
            e.created_by,
            p.survey_access,
            u.name
          ORDER BY e.created_at DESC
        `);

    return result.recordset.map((row: SurveyGeneralData) => ({
      public_id: row.public_id,
      survey_name: row.survey_name,
      survey_short_description: row.survey_short_description,
      survey_start_date: row.survey_start_date,
      survey_end_date: row.survey_end_date,
      department: row.department,
      created_at: row.created_at,
      created_by_name: row.created_by_name,
      participation: row.participation,
      survey_access: row.survey_access,
    }));
  } catch (error) {
    console.error("Error al obtener la lista de encuestas:", error);
    return [];
  }
}

export async function getSurveyGeneralDetails(
  public_id: string,
): Promise<SurveyGeneralData> {
  const defaultSurvey: SurveyGeneralData = {
    public_id: "",
    survey_name: "",
    survey_short_description: "",
    survey_start_date: "",
    survey_end_date: "",
    department: "",
    created_at: "",
    created_by_name: "",
    participation: 0,
  };
  console.log("============================================================");
  console.log(public_id);

  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return defaultSurvey;
    }

    // Obtener datos básicos de la encuesta
    const surveyRequest = pool.request();
    const surveyResult = await surveyRequest
      .input("public_id", sql.Char(8), public_id)
      .query("SELECT * FROM encuestas WHERE public_id = @public_id");

    const surveyId = surveyResult.recordset[0]?.id || 0;

    if (surveyId === 0) {
      console.warn("No se encontró la encuesta con el ID especificado");
      return defaultSurvey;
    }

    const survey = surveyResult.recordset[0];

    // Construir el objeto final
    const surveyFormData: SurveyGeneralData = {
      public_id: survey.public_id,
      survey_name: survey.survey_name,
      survey_short_description: survey.survey_short_description,
      survey_start_date: survey.survey_start_date
        ? survey.survey_start_date.toISOString().split("T")[0]
        : "",
      survey_end_date: survey.survey_end_date
        ? survey.survey_end_date.toISOString().split("T")[0]
        : "",
      department: survey.department,
      created_at: survey.created_at,
      created_by_name: survey.created_by_name,
      participation: 0,
    };

    return surveyFormData;
  } catch (error) {
    console.error("Error al obtener detalles de la encuesta:", error);
    return defaultSurvey;
  }
}

export async function getSurveyDetails(public_id: string): Promise<SurveyData> {
  const defaultSurvey: SurveyData = {
    survey_name: "",
    survey_short_description: "",
    survey_large_description: "",
    survey_start_date: "",
    survey_end_date: "",
    department: "",
    survey_concepts_link: "",
    survey_concepts_description: "",
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
      .input("public_id", sql.Char(8), public_id)
      .query("SELECT * FROM encuestas WHERE public_id = @public_id");

    const surveyId = surveyResult.recordset[0]?.id || 0;

    if (surveyId === 0) {
      console.warn("No se encontró la encuesta con el ID especificado");
      return defaultSurvey;
    }

    const survey = surveyResult.recordset[0];

    // console.log(survey.survey_start_date.toISOString().split("T")[0]);
    // console.log(survey.survey_end_date.toISOString().split("T")[0]);

    const linksRequest = pool.request();
    const linksResult = await linksRequest
      .input("survey_id", sql.Int, surveyId)
      .query(
        "SELECT id, survey_link FROM links WHERE survey_id = @survey_id ORDER BY id",
      );
    // 2. Obtener objetivos
    const objectivesRequest = pool.request();
    const objectivesResult = await objectivesRequest
      .input("survey_id", sql.Int, surveyId)
      .query(
        "SELECT id, objective FROM objetivos WHERE survey_id = @survey_id ORDER BY id",
      );

    // 3. Obtener cronograma
    const chronogramRequest = pool.request();
    const chronogramResult = await chronogramRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        SELECT chronogram_name as phase, chronogram_description as description, estimated_period as date 
        FROM cronogramas 
        WHERE survey_id = @survey_id 
        ORDER BY chronogram_order
      `);

    // 4. Obtener términos/definiciones
    const termsRequest = pool.request();
    const termsResult = await termsRequest.input("survey_id", sql.Int, surveyId)
      .query(`
        SELECT concept_name as name, concept_description as description 
        FROM terminos 
        WHERE survey_id = @survey_id 
        ORDER BY id
      `);

    // 5. Obtener FAQ
    const faqRequest = pool.request();
    const faqResult = await faqRequest.input("survey_id", sql.Int, surveyId)
      .query(`
        SELECT faq_question as question, faq_answer as answer 
        FROM faq 
        WHERE survey_id = @survey_id 
        ORDER BY id
      `);

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
      survey_concepts_link: survey.survey_concepts_link,
      survey_concepts_description: survey.survey_concepts_description,
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
  public_id: string,
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
      .input("public_id", sql.Char(8), public_id)
      .query("SELECT id FROM encuestas WHERE public_id = @public_id");

    const surveyId = surveyResult.recordset[0]?.id || 0;

    if (surveyId === 0) {
      console.warn("No se encontró la encuesta con el ID especificado");
      return defaultSurveyQuestions;
    }

    // Obtener preguntas con sus opciones
    const questionsRequest = pool.request();
    const questionsResult = await questionsRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
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
            sp.question_description as sub_question_description,
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
          subQuestionDescription: optionRow.sub_question_description || "",
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
        question_description: questionRow.question_description || "",
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
      question_description:
        "Revisa que toda la información sea correcta antes de enviar tu voto.",
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

// Check if survey results are available
export async function getAreSurveyResultsAvailable(
  public_id: string,
): Promise<boolean> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return false;
    }

    const surveyRequest = pool.request();
    const surveyResult = await surveyRequest.input(
      "public_id",
      sql.Char(8),
      public_id,
    ).query(`
        SELECT survey_start_date, survey_end_date
        FROM encuestas
        WHERE public_id = @public_id
      `);

    if (surveyResult.recordset.length === 0) {
      console.warn("No se encontró la encuesta");
      return false;
    }

    const survey = surveyResult.recordset[0];
    const now = new Date();
    // const surveyStartDate = new Date(survey.survey_start_date);
    const surveyEndDate = new Date(survey.survey_end_date);

    if (now < surveyEndDate) {
      console.warn("La encuesta aún no ha finalizado");
      return false;
    }

    // Si la encuesta ya finalizo, permitir ver los resultados
    return true;
  } catch (error) {
    console.error("Error al verificar disponibilidad de resultados:", error);
    return false;
  }
}

export async function getSurveysForSitemap(): Promise<SurveyGeneralData[]> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return [];
    }
    const request = pool.request();
    const result = await request.query(`
        SELECT public_id, survey_start_date, survey_end_date, updated_at FROM encuestas
        WHERE survey_end_date >= GETDATE() AND survey_start_date <= GETDATE()
        ORDER BY survey_end_date ASC
      `);
    return result.recordset.map(
      (item) =>
        ({
          public_id: item.public_id,
          lastModified: item.updated_at,
        }) as SurveyGeneralData,
    );
  } catch (error) {
    console.error("Error al obtener la lista de encuestas:", error);
    return [];
  }
}
