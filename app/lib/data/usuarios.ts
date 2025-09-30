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

export async function getValidUsersToShareTo() {
  const pool = await connectToDB();
  try {
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
        users: [],
      };
    }

    const validUsersRequest = pool.request();
    const validUsersResult = await validUsersRequest.query(`
        SELECT u.user_hash, u.name, u.user_role FROM usuarios u
        WHERE u.user_role <> 'votante'
        `);
    if (validUsersResult.recordset.length === 0) {
      return {
        success: false,
        message: "No se encontraron usuarios válidos para compartir.",
        users: [],
      };
    }
    return {
      success: true,
      message: "Usuarios válidos para compartir encontrados.",
      users: validUsersResult.recordset,
    };
  } catch (error) {
    console.error("Error al obtener usuarios válidos para compartir:", error);
    return {
      success: false,
      message: "Error al obtener usuarios válidos para compartir.",
      users: [],
    };
  }
}

export async function getUsersWithPermission(public_id: string) {
  const pool = await connectToDB();
  try {
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
        users: [],
      };
    }

    const surveyIdRequest = pool.request();
    const surveyIdResult = await surveyIdRequest.input(
      "public_id",
      sql.Char(8),
      public_id,
    ).query(`
        SELECT id FROM encuestas WHERE public_id = @public_id
        `);
    if (surveyIdResult.recordset.length === 0) {
      return {
        success: false,
        message: "No se encontró la encuesta.",
        users: [],
      };
    }
    const surveyId = surveyIdResult.recordset[0].id;

    const usersWithPermissionRequest = pool.request();
    const usersWithPermissionResult = await usersWithPermissionRequest.input(
      "survey_id",
      sql.Int,
      surveyId,
    ).query(`
        SELECT u.user_hash, u.name, u.user_role, p.survey_access FROM usuarios u
        INNER JOIN permisos p ON u.user_hash = p.user_hashed_key
        WHERE p.survey_id = @survey_id
        `);

    if (usersWithPermissionResult.recordset.length === 0) {
      return {
        success: false,
        message: "No se encontraron usuarios con permisos para compartir.",
        users: [],
      };
    }
    return {
      success: true,
      message: "Usuarios con permisos para compartir encontrados.",
      users: usersWithPermissionResult.recordset,
    };
  } catch (error) {
    console.error(
      "Error al obtener usuarios con permisos para compartir:",
      error,
    );
    return {
      success: false,
      message: "Error al obtener usuarios con permisos para compartir.",
      users: [],
    };
  }
}
