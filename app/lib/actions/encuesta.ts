"use server";

import z from "zod";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";

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
  survey_name: z.string().min(10, { message: "El nombre es requerido" }),
  survey_short_description: z
    .string()
    .min(50, { message: "La descripción es requerida" }),
  survey_large_description: z
    .string()
    .min(50, { message: "La descripción es requerida" }),
  start_date: z.string(),
  end_date: z.string(),
  department: z.string().min(3, { message: "El departamento es requerido" }),

  objectives: z.array(z.string()),
  chronogram: z.array(
    z.object({
      phase: z.string().min(5, { message: "La fase es requerida" }),
      description: z
        .string()
        .min(10, { message: "La descripción es requerida" }),
      date: z.string().min(1, { message: "La fecha es requerida" }),
    }),
  ),
  survey_options_definitions: z.array(
    z.object({
      name: z.string().min(5, { message: "El nombre es requerido" }),
      description: z
        .string()
        .min(10, { message: "La descripción es requerida" }),
    }),
  ),
  frequently_asked_questions: z.array(
    z.object({
      question: z.string().min(10, { message: "La pregunta es requerida" }),
      answer: z.string().min(10, { message: "La respuesta es requerida" }),
    }),
  ),
  questions: z.array(
    z.object({
      id: z.number(),
      question: z
        .string()
        .min(5, { message: "El texto de la pregunta es requerido" }),
      isMapQuestion: z.boolean(),
      options: z.array(
        z.object({
          id: z.number(),
          option: z
            .string()
            .min(1, { message: "El texto de la opción es requerido" }),
          hasSubQuestion: z.boolean(),
          subQuestion: z.string().optional(),
          subOptions: z.array(z.string()).optional(),
        }),
      ),
    }),
  ),
});

export async function createSurvey(formData: FormData) {
  // console.log(formData);
  const surveyName = formData.get("survey_name") as string;
  const surveyShortDescription = formData.get(
    "survey_short_description",
  ) as string;
  const surveyLargeDescription = formData.get(
    "survey_large_description",
  ) as string;
  const startDate = formData.get("start_date") as string;
  const endDate = formData.get("end_date") as string;
  const department = formData.get("department") as string;
  const objectives = JSON.parse((formData.get("objectives") as string) || "[]");
  const chronogram = JSON.parse((formData.get("chronogram") as string) || "[]");
  const surveyOptionDefinitions = JSON.parse(
    (formData.get("survey_options_definitions") as string) || "[]",
  );
  const frequentlyAskedQuestions = JSON.parse(
    (formData.get("frequently_asked_questions") as string) || "[]",
  );
  const questions = JSON.parse((formData.get("questions") as string) || "[]");

  const validatedData = SurveySchema.safeParse({
    survey_name: surveyName,
    survey_short_description: surveyShortDescription,
    survey_large_description: surveyLargeDescription,
    start_date: startDate,
    end_date: endDate,
    department: department,
    objectives: objectives,
    chronogram: chronogram,
    survey_options_definitions: surveyOptionDefinitions,
    frequently_asked_questions: frequentlyAskedQuestions,
    questions: questions,
  });
  console.log("validatedData: ", validatedData);

  if (!validatedData.success) {
    console.error("Error al validar los datos:", validatedData.error);
    return {
      success: false,
      message: "No se pudo registrar la consulta, intente nuevamente",
    };
  }

  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos.");
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      const encuestaRequest = new sql.Request(transaction);
      // 1. Insertar encuesta
      const encuestaResult = await encuestaRequest
        .input("titulo", sql.NVarChar, validatedData.data.survey_name)
        .input(
          "descripcion_corta",
          sql.NVarChar,
          validatedData.data.survey_short_description,
        )
        .input(
          "descripcion_larga",
          sql.NVarChar,
          validatedData.data.survey_large_description,
        )
        .input("fecha_inicio", sql.DateTime2, validatedData.data.start_date)
        .input("fecha_termino", sql.DateTime2, validatedData.data.end_date)
        .input("departamento", sql.NVarChar, validatedData.data.department)
        .input("created_by", sql.Int, 12345678).query(`
          INSERT INTO encuestas (titulo, descripcion_corta, descripcion_larga, fecha_inicio, fecha_termino, departamento, created_by) 
          OUTPUT INSERTED.id
          VALUES (@titulo, @descripcion_corta, @descripcion_larga, @fecha_inicio, @fecha_termino, @departamento, @created_by)
        `);

      const encuestaId = encuestaResult.recordset[0].id;

      // 2. Insertar objetivos
      for (const objetivo of validatedData.data.objectives) {
        if (objetivo.trim()) {
          const objetivoRequest = new sql.Request(transaction);
          await objetivoRequest
            .input("encuesta_id", sql.Int, encuestaId)
            .input("objetivo", sql.NVarChar, objetivo)
            .query(
              `INSERT INTO objetivos (encuesta_id, objetivo) VALUES (@encuesta_id, @objetivo)`,
            );
        }
      }

      // 3. Insertar cronograma
      for (let i = 0; i < validatedData.data.chronogram.length; i++) {
        const item = validatedData.data.chronogram[i];
        if (item.phase.trim() && item.description.trim()) {
          const cronogramaRequest = new sql.Request(transaction);
          await cronogramaRequest
            .input("encuesta_id", sql.Int, encuestaId)
            .input("nombre", sql.NVarChar, item.phase)
            .input("descripcion", sql.NVarChar, item.description)
            .input("periodo", sql.NVarChar, item.date)
            .input("orden", sql.Int, i + 1).query(`
              INSERT INTO cronogramas (encuesta_id, nombre, descripcion, periodo, orden) 
              VALUES (@encuesta_id, @nombre, @descripcion, @periodo, @orden)
            `);
        }
      }

      // 4. Insertar términos (survey_options_definitions)
      for (const termino of validatedData.data.survey_options_definitions) {
        if (termino.name.trim() && termino.description.trim()) {
          const terminoRequest = new sql.Request(transaction);
          await terminoRequest
            .input("encuesta_id", sql.Int, encuestaId)
            .input("nombre", sql.NVarChar, termino.name)
            .input("descripcion", sql.NVarChar, termino.description)
            .query(
              `INSERT INTO terminos (encuesta_id, nombre, descripcion) VALUES (@encuesta_id, @nombre, @descripcion)`,
            );
        }
      }

      // 5. Insertar FAQ
      for (const faq of validatedData.data.frequently_asked_questions) {
        if (faq.question.trim() && faq.answer.trim()) {
          const faqRequest = new sql.Request(transaction);
          await faqRequest
            .input("encuesta_id", sql.Int, encuestaId)
            .input("pregunta", sql.NVarChar, faq.question)
            .input("respuesta", sql.NVarChar, faq.answer)
            .query(
              `INSERT INTO faq (encuesta_id, pregunta, respuesta) VALUES (@encuesta_id, @pregunta, @respuesta)`,
            );
        }
      }

      // 6. Insertar preguntas y opciones
      for (let i = 0; i < validatedData.data.questions.length; i++) {
        const question = validatedData.data.questions[i];
        if (question.question.trim()) {
          // Insertar pregunta
          const preguntaRequest = new sql.Request(transaction);
          const preguntaResult = await preguntaRequest
            .input("encuesta_id", sql.Int, encuestaId)
            .input("indice", sql.Int, i + 1)
            .input("paso", sql.NVarChar, `Paso ${i + 1}`)
            .input(
              "paso_descripcion",
              sql.NVarChar,
              `Descripción del paso ${i + 1}`,
            )
            .input("pregunta", sql.NVarChar, question.question)
            .input("pregunta_descripcion", sql.NVarChar, question.question)
            .input(
              "tipo",
              sql.NVarChar,
              question.isMapQuestion ? "mapa" : "normal",
            ).query(`
              INSERT INTO preguntas (encuesta_id, indice, paso, paso_descripcion, pregunta, pregunta_descripcion, tipo) 
              OUTPUT INSERTED.id
              VALUES (@encuesta_id, @indice, @paso, @paso_descripcion, @pregunta, @pregunta_descripcion, @tipo)
            `);

          const preguntaId = preguntaResult.recordset[0].id;

          // Insertar opciones de la pregunta (subpreguntas y subopciones tambien)
          for (let j = 0; j < question.options.length; j++) {
            const option = question.options[j];
            if (option.hasSubQuestion && option.subQuestion?.trim()) {
              const subPreguntaRequest = new sql.Request(transaction);
              const subPreguntaResult = await subPreguntaRequest
                .input("encuesta_id", sql.Int, encuestaId)
                .input("indice", sql.Int, i + 1)
                .input("paso", sql.NVarChar, `SubPaso de ${i + 1}.${j + 1}`)
                .input(
                  "paso_descripcion",
                  sql.NVarChar,
                  `SubPregunta ligada a opción ${option.option}`,
                )
                .input("pregunta", sql.NVarChar, option.subQuestion)
                .input("pregunta_descripcion", sql.NVarChar, option.subQuestion)
                .input("tipo", sql.NVarChar, "normal").query(`
                  INSERT INTO preguntas (encuesta_id, indice, paso, paso_descripcion, pregunta, pregunta_descripcion, tipo) 
                  OUTPUT INSERTED.id
                  VALUES (@encuesta_id, @indice, @paso, @paso_descripcion, @pregunta, @pregunta_descripcion, @tipo)
                `);
              const subPreguntaId = subPreguntaResult.recordset[0].id;
              // Insertar subopciones de la subpregunta
              if (option.subOptions && option.subOptions.length > 0) {
                for (let k = 0; k < option.subOptions.length; k++) {
                  const subOption = option.subOptions[k];
                  if (subOption.trim()) {
                    const subOpcionRequest = new sql.Request(transaction);
                    await subOpcionRequest
                      .input("pregunta_id", sql.Int, subPreguntaId)
                      .input("indice", sql.Int, k + 1)
                      .input("opcion", sql.NVarChar, subOption)
                      .input("descripcion", sql.NVarChar, subOption).query(`
                        INSERT INTO opciones (pregunta_id, indice, opcion, descripcion) 
                        VALUES (@pregunta_id, @indice, @opcion, @descripcion)
                      `);
                  }
                }
              }
            } else if (option.option.trim()) {
              const opcionRequest = new sql.Request(transaction);
              await opcionRequest
                .input("pregunta_id", sql.Int, preguntaId)
                .input("indice", sql.Int, j + 1)
                .input("opcion", sql.NVarChar, option.option)
                .input("descripcion", sql.NVarChar, option.option).query(`
                  INSERT INTO opciones (pregunta_id, indice, opcion, descripcion) 
                  VALUES (@pregunta_id, @indice, @opcion, @descripcion)
                `);
            }
          }
        }
      }

      await transaction.commit();
      console.log("Encuesta creada exitosamente con ID:", encuestaId);

      return {
        success: true,
        message: "Encuesta creada exitosamente",
        encuestaId: encuestaId,
      };
    } catch (error) {
      console.error("Error al registrar la encuesta:", error);
      await transaction.rollback();
      return {
        success: false,
        message: "No se pudo registrar la consulta, intente nuevamente",
      };
    }
  } catch (error) {
    console.error("Error al ingresar la consulta:", error);
    return {
      success: false,
      message: "No se pudo registrar la consulta, intente nuevamente",
    };
  }
}
