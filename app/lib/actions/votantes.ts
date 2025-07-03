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
  console.log("RUT_CU:", rutCU);
  console.log("DV_CU:", dvCU);
  console.log("Nombre:", nombreCU);
  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const request = pool.request();
    const result = await request.input("rut", sql.NVarChar, rut).query(`
        SELECT rut, dv FROM Votantes WHERE rut = @rut
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

    console.log("RUT:", rut);
    console.log("DV:", dv);

    // Record not found in DB
    await request
      .input("rut", sql.Int, rut)
      .input("dv", sql.NVarChar, dv)
      .input("nombreCompleto", sql.NVarChar, nombreCU).query(`
        INSERT INTO Votantes (rut, dv, fecha_creacion nombre_completo) 
        VALUES (@rut, @dv, GETUTCDATE(), @nombreCompleto)
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
