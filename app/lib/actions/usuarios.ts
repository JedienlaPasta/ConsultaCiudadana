"use server";

import { TeamMember } from "../definitions/usuarios";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export async function updateSurveyUsersPermissions(teamMembers: TeamMember[]) {
  const pool = await connectToDB();
  try {
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    console.log("Actualizando permisos de usuarios...");

    try {
      for (const teamMember of teamMembers) {
        if (teamMember.user_role === "votante") {
          continue;
        }
        // Pendiente:
        // 1. Si el usuario ya tiene permiso, pero es diferente, actualizarlo.
        // 2. Si no tiene permiso, insertarlo.
        // 3. Si se le quita el permiso al usuario, eliminarlo (de la tabla permisos).

        const updateUserRequest = new sql.Request(transaction);
        const updateUserResult = await updateUserRequest
          .input("user_hash", sql.NVarChar, teamMember.user_hash)
          .input("survey_access", sql.NVarChar, teamMember.survey_access)
          .query(`
            INSERT INTO permisos (user_hash, survey_access)
            VALUES (@user_hash, @survey_access)
        `);
        if (updateUserResult.rowsAffected[0] === 0) {
          return {
            success: false,
            message: "No se pudo actualizar el permiso del usuario.",
          };
        }
      }
      await transaction.commit();

      return {
        success: true,
        message: "Permisos de usuarios actualizados exitosamente.",
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error al actualizar el permiso del usuario:", error);
    return {
      success: false,
      message: "Error al actualizar el permiso del usuario.",
    };
  }
}
