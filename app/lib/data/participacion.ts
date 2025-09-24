import { connectToDB } from "../utils/db-connection";
import sql from "mssql";
import { generateUserHash } from "../utils/userHash";

export async function verifyParticipation(
  surveyId: number,
  sub: string,
  dv: string,
): Promise<boolean> {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return false;
    }

    const userHash = generateUserHash(sub, dv);

    const participationRequest = pool.request();
    const participationResult = await participationRequest
      .input("survey_id", sql.Int, surveyId)
      .input("user_hashed_key", sql.Char(64), userHash)
      .query(
        "SELECT id FROM participacion_encuestas WHERE survey_id = @survey_id AND user_hashed_key = @user_hashed_key",
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
