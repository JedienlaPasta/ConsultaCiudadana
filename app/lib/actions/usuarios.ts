"use server";

import { TeamMember } from "../definitions/usuarios";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

export async function updateSurveyUsersPermissions(
  public_id: string,
  newTeamMembers: TeamMember[],
  membersToUpdate: TeamMember[],
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

    const allowedAccess = new Set(["lector", "editor", "propietario"]);

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
        const normalizedAccess = teamMember.survey_access
          ? teamMember.survey_access.toLowerCase()
          : undefined;

        if (!normalizedAccess) {
          throw new Error("El permiso del usuario es requerido.");
        }

        if (!allowedAccess.has(normalizedAccess)) {
          throw new Error(
            "Permiso inválido. Debe ser 'Lector', 'Editor' o 'Propietario'.",
          );
        }
        console.log(normalizedAccess);

        const addUserRequest = new sql.Request(transaction);
        const addUserResult = await addUserRequest
          .input("survey_id", sql.Int, surveyId)
          .input("user_hashed_key", sql.NVarChar, teamMember.user_hash)
          .input("survey_access", sql.NVarChar, normalizedAccess).query(`
            INSERT INTO permisos (survey_id, user_hashed_key, survey_access)
            VALUES (@survey_id, @user_hashed_key, @survey_access)
        `);
        if (addUserResult.rowsAffected[0] === 0) {
          throw new Error("No se pudo agregar el permiso del usuario.");
        }
      }

      for (const teamMember of membersToUpdate) {
        if (teamMember.user_role === "votante") {
          continue;
        }

        const normalizedAccess = teamMember.survey_access
          ? teamMember.survey_access.toLowerCase()
          : undefined;

        if (!normalizedAccess) {
          throw new Error("El permiso del usuario es requerido.");
        }

        if (normalizedAccess === "quitar acceso") {
          const deleteUserRequest = new sql.Request(transaction);
          const deleteUserResult = await deleteUserRequest
            .input("survey_id", sql.Int, surveyId)
            .input("user_hashed_key", sql.NVarChar, teamMember.user_hash)
            .query(`
                DELETE FROM permisos
                WHERE survey_id = @survey_id AND user_hashed_key = @user_hashed_key
              `);
          if (deleteUserResult.rowsAffected[0] === 0) {
            throw new Error(
              "No se encontró un permiso para eliminar para este usuario.",
            );
          }
          continue;
        }

        if (!allowedAccess.has(normalizedAccess)) {
          throw new Error(
            "Permiso inválido. Debe ser 'Lector', 'Editor' o 'Propietario'.",
          );
        }

        const updateUserRequest = new sql.Request(transaction);
        const updateUserResult = await updateUserRequest
          .input("survey_id", sql.Int, surveyId)
          .input("user_hashed_key", sql.NVarChar, teamMember.user_hash)
          .input("survey_access", sql.NVarChar, normalizedAccess).query(`
              UPDATE permisos
              SET survey_access = @survey_access
              WHERE survey_id = @survey_id AND user_hashed_key = @user_hashed_key
            `);
        if (updateUserResult.rowsAffected[0] === 0) {
          throw new Error(
            "No se pudo actualizar el permiso del usuario (registro no encontrado).",
          );
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
