"use server";

import sql from "mssql";
import { connectToDB } from "../utils/db-connection";
import { getDV } from "../utils/getValues";
import { generateUserHash } from "../utils/userHash";

export async function checkUserRecord(sub: string, dv: string) {
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    // Validate DV
    if (!dv || getDV(sub) !== dv) {
      console.warn("DV incorrecto.");

      return {
        success: false,
        message: "DV incorrecto.",
      };
    }

    const userHash = generateUserHash(sub, dv);

    const checkUserRequest = pool.request();
    const result = await checkUserRequest.input(
      "user_hash",
      sql.Char(64),
      userHash,
    ).query(`
        SELECT user_hash FROM usuarios WHERE user_hash = @user_hash
        `);

    if (result.recordset.length === 0) {
      console.log("Registro no encontrado en la base de datos.");
      return {
        success: false,
        message: "Registro no encontrado en la base de datos.",
      };
    }

    return {
      success: true,
      message: "Registro encontrado en la base de datos.",
    };
  } catch (error) {
    console.error("Error al ingresar el registro:", error);
    return {
      success: false,
      message: "No se pudo generar el registro, datos invalidos",
    };
  }
}
