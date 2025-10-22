"use server";

import { TeamMember } from "../definitions/usuarios";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";
import { generateUserHash } from "../utils/userHash";
import { getDV } from "../utils/getValues";
import { revalidatePath } from "next/cache";

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

export async function addNewUser(rut: string, name: string, user_role: string) {
  const splitRut = rut.split("-");
  const userHash = generateUserHash(splitRut[0], splitRut[1]);

  if (!splitRut[1] || getDV(splitRut[0]) !== splitRut[1]) {
    console.warn("DV incorrecto.");

    return {
      success: false,
      message: "DV incorrecto.",
    };
  }

  const pool = await connectToDB();
  try {
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const checkUserRequest = new sql.Request(pool);
    const checkUserResult = await checkUserRequest.input(
      "user_hashed_key",
      sql.NVarChar,
      userHash,
    ).query(`
        SELECT 1 FROM usuarios WHERE user_hash = @user_hashed_key
      `);

    if (checkUserResult.rowsAffected[0] > 0) {
      const updateRequest = new sql.Request(pool);
      const updateResult = await updateRequest
        .input("user_hashed_key", sql.NVarChar, userHash)
        .input("name", sql.NVarChar, name)
        .input("user_role", sql.NVarChar, user_role).query(`
          UPDATE usuarios
          SET name = @name, user_role = @user_role
          WHERE user_hash = @user_hashed_key
        `);

      if (updateResult.rowsAffected[0] === 0) {
        throw new Error("No se pudo actualizar el usuario.");
      }
      return {
        success: true,
        message: "Usuario actualizado exitosamente.",
      };
    } else {
      const insertRequest = new sql.Request(pool);
      const insertResult = await insertRequest
        .input("user_hashed_key", sql.NVarChar, userHash)
        .input("name", sql.NVarChar, name)
        .input("user_role", sql.NVarChar, user_role).query(`
        INSERT INTO usuarios (user_hash, name, user_role)
        VALUES (@user_hashed_key, @name, @user_role)
      `);

      if (insertResult.rowsAffected[0] === 0) {
        throw new Error("No se pudo agregar el usuario.");
      }

      revalidatePath("/dashboard/usuarios");
      return {
        success: true,
        message: "Usuario agregado exitosamente.",
      };
    }
  } catch (error) {
    console.error("Error al agregar el usuario:", error);
    return {
      success: false,
      message: "Error al agregar el usuario.",
    };
  }
}

export async function updateUser(
  user_hash: string,
  name: string,
  role: string,
) {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const request = new sql.Request(pool);
    const result = await request
      .input("user_hashed_key", sql.NVarChar, user_hash)
      .input("name", sql.NVarChar, name)
      .input("role", sql.NVarChar, role).query(`
        UPDATE usuarios
        SET name = @name, user_role = @role
        WHERE user_hash = @user_hashed_key
      `);
    if (result.rowsAffected[0] === 0) {
      throw new Error("No se pudo actualizar el usuario.");
    }

    revalidatePath("/dashboard/usuarios");
    return {
      success: true,
      message: "Usuario actualizado exitosamente.",
    };
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return {
      success: false,
      message: "Error al actualizar el usuario.",
    };
  }
}

export async function revokeUserRole(user_hash: string) {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 60);

    const request = new sql.Request(pool);
    const result = await request
      .input("user_hashed_key", sql.NVarChar, user_hash)
      .input("expires_at", sql.DateTime, expiresAt).query(`
        UPDATE usuarios
        SET user_role = 'votante', expires_at = @expires_at
        WHERE user_hash = @user_hashed_key
      `);
    if (result.rowsAffected[0] === 0) {
      throw new Error("No se pudo revocar el permiso del usuario.");
    }

    revalidatePath("/dashboard/usuarios");
    return {
      success: true,
      message: "Permiso del usuario revocado exitosamente.",
    };
  } catch (error) {
    console.error("Error al revocar el permiso del usuario:", error);
    return {
      success: false,
      message: "Error al revocar el permiso del usuario.",
    };
  }
}
