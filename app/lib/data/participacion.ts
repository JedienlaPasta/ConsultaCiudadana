import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export async function verifyParticipation(
  userRut: number,
  surveyId: number,
): Promise<boolean> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return false;
    }

    const participationRequest = pool.request();
    const participationResult = await participationRequest
      .input("survey_id", sql.Int, surveyId)
      .input("user_rut", sql.Int, userRut)
      .query(
        "SELECT id FROM encuestas_participadas WHERE survey_id = @survey_id AND user_rut = @user_rut",
      );

    if (participationResult.recordset.length > 0) {
      console.warn("Ya participó de la encuesta");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error al verificar participación:", error);
    return false;
  }
}
