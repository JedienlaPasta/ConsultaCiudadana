"use server";

import sql from "mssql";
import { connectToDB } from "../utils/db-connection";
import { getDV } from "../utils/getValues";
import crypto from "crypto";

const USER_HASH_SECRET =
  process.env.USER_HASH_SECRET ||
  "very_super_long_and_not_so_safe_secret_secret_for_hashes.";

function generateUserHash(rut: string, dv: string) {
  return crypto
    .createHmac("sha256", USER_HASH_SECRET)
    .update(`${rut}-${dv}`)
    .digest("hex");
}

// CU => ClaveUnica
export async function checkUserRecord(
  rutCU: string,
  dvCU: string,
  // nombreCU: string,
) {
  const rut = Number(rutCU);
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const userHash = generateUserHash(rutCU, dvCU);

    const checkUserRequest = pool.request();
    const result = await checkUserRequest.input(
      "user_hash",
      sql.Char(64),
      userHash,
    ).query(`
        SELECT user_hash FROM usuarios WHERE user_hash = @user_hash
        `);

    if (result.recordset.length > 0) {
      console.log("Registro encontrado en la base de datos.");
      return {
        success: true,
        message: "Registro encontrado en la base de datos.",
      };
    }

    // Validate DV
    const dv = getDV(rut);
    if (!dv || dv !== dvCU) {
      console.warn("DV incorrecto.");

      return {
        success: false,
        message: "DV incorrecto.",
      };
    }

    // Asign expiring date for temp users
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 180);

    // Insert new temp user
    const insertUserRequest = pool.request();
    await insertUserRequest
      .input("user_hash", sql.Char(64), userHash)
      .input("expires_at", sql.DateTime2, expiresAt).query(`
        INSERT INTO usuarios (user_hash, user_role, expires_at) 
        VALUES (@user_hash, 'votante', @expires_at)
      `);

    console.log("Registro insertado en la base de datos.");
    return {
      success: true,
      message: "Registro insertado en la base de datos.",
    };
  } catch (error) {
    console.error("Error al ingresar el registro:", error);
    return {
      success: false,
      message: "No se pudo generar el registro, datos invalidos",
    };
  }
}
