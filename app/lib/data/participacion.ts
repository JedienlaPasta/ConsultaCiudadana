import { connectToDB } from "../utils/db-connection";
import sql from "mssql";
import { generateUserHash } from "../utils/userHash";

export async function verifyParticipation(
  public_id: string,
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

    const surveyRequest = pool.request();
    const surveyResult = await surveyRequest
      .input("public_id", sql.NVarChar, public_id)
      .query("SELECT id FROM encuestas WHERE public_id = @public_id");

    if (surveyResult.recordset.length === 0) {
      console.warn("No se encontró la encuesta con el ID especificado");
      return false;
    }

    const surveyId = surveyResult.recordset[0].id;

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
