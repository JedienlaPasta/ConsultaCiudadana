import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export async function getUserRole(rut: number) {
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

    const userRoleRequest = pool.request();
    const userRoleResult = await userRoleRequest.input("rut", sql.Int, rut)
      .query(`
        SELECT user_role FROM usuarios WHERE rut = @rut
        `);
    if (userRoleResult.recordset.length === 0) {
      return {
        success: false,
        message: "No se encontró el rol del usuario.",
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
