"use server";

import sql from "mssql";
import { connectToDB } from "../utils/db-connection";
import { getDV } from "../utils/getValues";

// CU => ClaveUnica
export async function checkVotanteRecord(
  rutCU: string,
  dvCU: string,
  nombreCU: string,
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

    const checkVotanteRequest = pool.request();
    const result = await checkVotanteRequest.input("rut", sql.Int, rut).query(`
        SELECT rut, dv FROM usuarios WHERE rut = @rut
        `);

    if (result.recordset.length > 0) {
      console.log("Registro encontrado en la base de datos.");
      return {
        success: true,
        message: "Registro encontrado en la base de datos.",
      };
    }

    const dv = getDV(rut);
    if (!dv || dv !== dvCU) {
      console.warn("DV incorrecto.");

      return {
        success: false,
        message: "DV incorrecto.",
      };
    }

    // Record not found in DB
    const insertVotanteRequest = pool.request();
    await insertVotanteRequest
      .input("rut", sql.Int, rut)
      .input("dv", sql.NVarChar, dv)
      .input("full_name", sql.NVarChar, nombreCU).query(`
        INSERT INTO usuarios (rut, dv, full_name) 
        VALUES (@rut, @dv, @full_name)
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
