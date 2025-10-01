"use server";

import { TeamMember } from "../definitions/usuarios";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export async function updateSurveyUsersPermissions(
  public_id: string,
  newTeamMembers: TeamMember[],
  membersToUpdate: TeamMember[],
  membersToRemove: TeamMember[],
) {
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
    console.log("Nuevos miembros:", newTeamMembers);
    console.log("Miembros a actualizar:", membersToUpdate);
    console.log("Miembros a remover:", membersToRemove);
    try {
      // Get survey id
      const surveyIdRequest = new sql.Request(transaction);
      const surveyIdResult = await surveyIdRequest.input(
        "public_id",
        sql.Char(8),
        public_id,
      ).query(`
          SELECT id FROM encuestas WHERE public_id = @public_id
        `);
      if (surveyIdResult.rowsAffected[0] === 0) {
        return {
          success: false,
          message: "No se pudo encontrar la encuesta.",
        };
      }
      const surveyId = surveyIdResult.recordset[0].id;

      // New Team Member
      for (const teamMember of newTeamMembers) {
        if (teamMember.user_role === "votante") {
          continue;
        }
        // Pendiente:
        // 1. Si el usuario ya tiene permiso, pero es diferente, actualizarlo.
        // 2. Si no tiene permiso, insertarlo.
        // 3. Si se le quita el permiso al usuario, eliminarlo (de la tabla permisos).
        const access = teamMember.survey_access?.toLowerCase();

        const addUserRequest = new sql.Request(transaction);
        const addUserResult = await addUserRequest
          .input("survey_id", sql.Int, surveyId)
          .input("user_hashed_key", sql.NVarChar, teamMember.user_hash)
          .input("survey_access", sql.NVarChar, access).query(`
            INSERT INTO permisos (survey_id, user_hashed_key, survey_access)
            VALUES (@survey_id, @user_hashed_key, @survey_access)
        `);
        if (addUserResult.rowsAffected[0] === 0) {
          return {
            success: false,
            message: "No se pudo guardar el permiso del usuario.",
          };
        }

        // Update Team Member
        for (const teamMember of membersToUpdate) {
          if (teamMember.user_role === "votante") {
            continue;
          }
          const access = teamMember.survey_access?.toLowerCase();

          const updateUserRequest = new sql.Request(transaction);
          const updateUserResult = await updateUserRequest
            .input("survey_id", sql.Int, surveyId)
            .input("user_hashed_key", sql.NVarChar, teamMember.user_hash)
            .input("survey_access", sql.NVarChar, access).query(`
              UPDATE permisos
              SET survey_access = @survey_access
              WHERE survey_id = @survey_id AND user_hashed_key = @user_hashed_key
            `);
          if (updateUserResult.rowsAffected[0] === 0) {
            return {
              success: false,
              message: "No se pudo actualizar el permiso del usuario.",
            };
          }
        }

        // Remove Team Member
        for (const teamMember of membersToRemove) {
          if (teamMember.user_role === "votante") {
            continue;
          }

          const removeUserRequest = new sql.Request(transaction);
          const removeUserResult = await removeUserRequest
            .input("survey_id", sql.Int, surveyId)
            .input("user_hashed_key", sql.NVarChar, teamMember.user_hash)
            .query(`
              DELETE FROM permisos
              WHERE survey_id = @survey_id AND user_hashed_key = @user_hashed_key
            `);
          if (removeUserResult.rowsAffected[0] === 0) {
            return {
              success: false,
              message: "No se pudo eliminar el permiso del usuario.",
            };
          }
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
