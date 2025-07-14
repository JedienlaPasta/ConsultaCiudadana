"use server";

import z from "zod";
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

const SurveySchema = z.object({
  // Required Fields
  survey_name: z.string().min(10, { message: "El nombre es requerido" }),
  survey_short_description: z
    .string()
    .min(10, { message: "La descripción es requerida" }),
  survey_large_description: z
    .string()
    .min(10, { message: "La descripción es requerida" }),
  start_date: z
    .string()
    .min(10, { message: "La fecha de inicio es requerida" }),
  end_date: z.string().min(10, { message: "La fecha de fin es requerida" }),
  department: z.string().min(10, { message: "El departamento es requerido" }),

  objectives: z.string().min(10, { message: "Los objetivos son requeridos" }),
  chronogram: z.string().min(10, { message: "El cronograma es requerido" }),
  survey_option_definitions: z.array(
    z.object({
      option_name: z.string().min(10, { message: "El nombre es requerido" }),
      option_short_description: z
        .string()
        .min(10, { message: "La descripción es requerida" }),
      option_large_description: z
        .string()
        .min(10, { message: "La descripción es requerida" }),
    }),
  ),
});

export async function createSurvey(formData: FormData) {
  console.log(formData);
}
