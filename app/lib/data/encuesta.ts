import { SurveyFormData } from "../definitions/encuesta";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export async function getSurveyDetails(id: string): Promise<SurveyFormData> {
  const defaultSurvey: SurveyFormData = {
    survey_name: "",
    survey_short_description: "",
    survey_large_description: "",
    survey_start_date: "",
    survey_end_date: "",
    department: "",
    objectives: [],
    chronogram: [],
    survey_options_definitions: [],
    frequently_asked_questions: [],
    questions: [],
  };

  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return defaultSurvey;
    }
    const request = pool.request();
    const result = await request
      .input("id", sql.Int, id)
      .query("SELECT * FROM Encuestas WHERE id = @id");

    if (result.recordset.length === 0) {
      console.warn("No se encontró la encuesta con el ID especificado");
      return defaultSurvey;
    }

    const survey = result.recordset[0];
    return survey;
  } catch (error) {
    console.error("Error al obtener detalles de la encuesta:", error);
    return defaultSurvey;
  }
}
