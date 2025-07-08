"use server";

import { connectToDB } from "../utils/db-connection";
// import sql from "mssql";

export async function registerVote(formdata: FormData) {
  console.log(formdata);
  try {
    const pool = connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    return {
      success: true,
      message: "Voto guardado, gracias por participar!",
    };
  } catch (error) {
    console.error("Error al ingresar el voto:", error);
    return {
      success: false,
      message: "No se pudo registrar el voto, intente nuevamente",
    };
  }
}
