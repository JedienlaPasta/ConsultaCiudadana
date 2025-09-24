import { connectToDB } from "../utils/db-connection";
import sql from "mssql";
import { generateUserHash } from "../utils/userHash";

export async function getUserRole(sub: string, dv: string) {
  const pool = await connectToDB();
  try {
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
        role: "votante",
      };
    }

    const userHash = generateUserHash(sub, dv);

    const userRoleRequest = pool.request();
    const userRoleResult = await userRoleRequest.input(
      "user_hash",
      sql.Char(64),
      userHash,
    ).query(`
        SELECT user_role FROM usuarios WHERE user_hash = @user_hash
        `);
    if (userRoleResult.recordset.length === 0) {
      return {
        success: false,
        message: "No se encontró el usuario.",
        role: "votante",
      };
    }
    return {
      success: true,
      message: "Rol del usuario encontrado.",
      role: String(userRoleResult.recordset[0].user_role),
    };
  } catch (error) {
    console.error("Error al obtener el rol del usuario:", error);
    return {
      success: false,
      message: "Error al obtener el rol del usuario.",
      role: "votante",
    };
  }
}
