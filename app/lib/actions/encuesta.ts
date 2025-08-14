"use server";

import z from "zod";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";
import { SubOption, SurveyAnswers } from "../definitions/encuesta";
import sanitizeHtml from "sanitize-html";

export async function registerVote(
  surveyAnswers: SurveyAnswers,
  userRut: number,
) {
  try {
    const pool = await connectToDB();
    if (!pool) {
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      // Verificar si ya participo
      const checkParticipationRequest = new sql.Request(transaction);
      const checkResult = await checkParticipationRequest
        .input("survey_id", sql.Int, surveyAnswers.survey_id)
        .input("user_rut", sql.Int, userRut).query(`
          SELECT TOP 1 id FROM encuestas_participadas WHERE survey_id = @survey_id AND user_rut = @user_rut
        `);
      if (checkResult.recordset.length > 0) {
        console.log("Ya ha participado de esta encuesta anteriormente");
        return {
          success: false,
          message:
            "Ya has participado en esta encuesta, no puedes votar dos veces.",
        };
      }

      // Registrar participación
      const participationRequest = new sql.Request(transaction);
      await participationRequest
        .input("survey_id", sql.Int, surveyAnswers.survey_id)
        .input("user_rut", sql.Int, userRut).query(`
          INSERT INTO encuestas_participadas (survey_id, user_rut) 
          VALUES (@survey_id, @user_rut)
        `);

      // Registrar votos
      for (const answer of surveyAnswers.answers) {
        for (const selectedOption of answer.selected_options) {
          const voteRequest = new sql.Request(transaction);
          await voteRequest
            .input("survey_id", sql.Int, surveyAnswers.survey_id)
            .input("question_id", sql.Int, answer.question_id)
            .input("option_id", sql.Int, selectedOption.option_id).query(`
              INSERT INTO votos (survey_id, question_id, option_id) 
              VALUES (@survey_id, @question_id, @option_id)
            `);

          // Si hay subopción, registrarla también
          if (selectedOption.sub_option_id && selectedOption.sub_question_id) {
            // console.log(
            //   "Insertando subopción:",
            //   selectedOption.sub_question_id,
            //   selectedOption.sub_option_id,
            // );
            const subVoteRequest = new sql.Request(transaction);
            await subVoteRequest
              .input("survey_id", sql.Int, surveyAnswers.survey_id)
              .input("question_id", sql.Int, selectedOption.sub_question_id)
              .input("option_id", sql.Int, selectedOption.sub_option_id).query(`
                INSERT INTO votos (survey_id, question_id, option_id) 
                VALUES (@survey_id, @question_id, @option_id)
              `);
          }
        }
      }

      await transaction.commit();
      return {
        success: true,
        message: "Voto guardado, gracias por participar!",
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error al registrar el voto:", error);
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
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha de inicio inválida",
  }),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha de término inválida",
  }),
  department: z.string().min(3, { message: "El departamento es requerido" }),
  survey_links: z.array(z.string()).optional(),
  objectives: z.array(z.string()),
  chronogram: z.array(
    z.object({
      phase: z.string().min(5, { message: "Las etapas son requeridas" }),
      description: z
        .string()
        .min(10, { message: "La descripción es requerida" }),
      date: z.string().min(1, { message: "La fecha es requerida" }),
    }),
  ),
  survey_options_definitions: z.array(
    z.object({
      name: z
        .string()
        .min(5, { message: "El nombre de los términos es requerido" }),
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
    z
      .object({
        id: z.number(),
        questionId: z.number(),
        step: z.string(),
        step_description: z.string(),
        isMapQuestion: z.boolean(),
        minOptions: z.coerce.number(),
        maxOptions: z.coerce.number(),
      })
      .and(
        z.discriminatedUnion("isMapQuestion", [
          // Case 1: Map question with questionId !== 0
          z.object({
            isMapQuestion: z.literal(true),
            questionId: z.number().refine((val) => val !== 0, {
              message: "questionId invalido para pregunta tipo Mapa",
            }),
            question: z.string().optional(),
            options: z.array(z.any()).optional(),
          }),
          // Case 2: Regular question with questionId === 0
          z
            .object({
              isMapQuestion: z.literal(false),
              questionId: z.literal(0),
              question: z
                .string()
                .min(5, { message: "El texto de la pregunta es requerido" }),
              step: z.string(),
              step_description: z.string(),
              minOptions: z.coerce.number().min(1, {
                message: "El mínimo de opciones debe ser al menos 1",
              }),
              maxOptions: z.coerce.number().min(1, {
                message: "El máximo de opciones debe ser al menos 1",
              }),
              options: z.array(
                z.object({
                  id: z.number(),
                  option_name: z
                    .string()
                    .min(1, { message: "El texto de la opción es requerido" }),
                  option_description: z.string().optional(),
                  hasSubQuestion: z.boolean(),
                  subQuestion: z.string().optional(),
                  subOptions: z
                    .array(
                      z.object({
                        id: z.number(),
                        option_name: z.string().min(1, {
                          message: "El texto de la opción es requerido",
                        }),
                        option_description: z.string().optional(),
                        sector_id: z.string().optional(),
                      }),
                    )
                    .optional(),
                }),
              ),
            })
            .refine((data) => data.maxOptions >= data.minOptions, {
              message:
                "El número máximo de opciones a elegir debe ser mayor o igual al mínimo",
              path: ["maxOptions"],
            }),
        ]),
      ),
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
  const surveyLinks = JSON.parse(
    (formData.get("survey_links") as string) || "[]",
  );
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
    survey_links: surveyLinks,
    objectives: objectives,
    chronogram: chronogram,
    survey_options_definitions: surveyOptionDefinitions,
    frequently_asked_questions: frequentlyAskedQuestions,
    questions: questions,
  });
  // console.log("validatedData: ", validatedData);

  if (!validatedData.success) {
    console.error("Error al validar los datos:", validatedData.error);

    const errors = validatedData.error.issues;
    const fieldErrors = errors.map((error) => {
      const field = error.path.join(".");
      if (field.includes("minOptions") || field.includes("maxOptions")) {
        return "Las opciones mínimas y máximas deben ser números válidos";
      }
      if (field.includes("survey_name")) {
        return "El nombre de la encuesta es requerido";
      }
      return error.message;
    });

    return {
      success: false,
      message: fieldErrors[0] || "Error de validación",
    };
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return {
      success: false,
      message: "La fecha de término debe ser posterior a la de inicio",
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
      const cleanDescription = sanitizeHtml(
        validatedData.data.survey_large_description,
        {
          allowedTags: ["b", "i", "u", "ol", "ul", "li", "p", "br"],
          allowedAttributes: {},
        },
      );

      const encuestaRequest = new sql.Request(transaction);
      // 1. Insertar encuesta
      const encuestaResult = await encuestaRequest
        .input("survey_name", sql.NVarChar, validatedData.data.survey_name)
        .input(
          "survey_short_description",
          sql.NVarChar,
          validatedData.data.survey_short_description,
        )
        .input("survey_large_description", sql.NVarChar, cleanDescription)
        .input("survey_start_date", sql.Date, validatedData.data.start_date)
        .input("survey_end_date", sql.Date, validatedData.data.end_date)
        .input("department", sql.NVarChar, validatedData.data.department)
        .input("created_by", sql.Int, 55555555).query(`
          INSERT INTO encuestas (survey_name, survey_short_description, survey_large_description, survey_start_date, survey_end_date, department, created_by) 
          OUTPUT INSERTED.id
          VALUES (@survey_name, @survey_short_description, @survey_large_description, @survey_start_date, @survey_end_date, @department, @created_by)
        `);

      const surveyId = encuestaResult.recordset[0].id;

      // 2. Insertar links
      const surveyLinks = validatedData.data.survey_links;
      if (surveyLinks && surveyLinks.length > 0) {
        for (const link of surveyLinks) {
          if (link.trim()) {
            const linkRequest = new sql.Request(transaction);
            await linkRequest
              .input("survey_id", sql.Int, surveyId)
              .input("survey_link", sql.NVarChar, link)
              .query(
                `INSERT INTO links (survey_id, survey_link) VALUES (@survey_id, @survey_link)`,
              );
          }
        }
      }

      // 3. Insertar objetivos
      for (const objetivo of validatedData.data.objectives) {
        if (objetivo.trim()) {
          const objetivoRequest = new sql.Request(transaction);
          await objetivoRequest
            .input("survey_id", sql.Int, surveyId)
            .input("objective", sql.NVarChar, objetivo)
            .query(
              `INSERT INTO objetivos (survey_id, objective) VALUES (@survey_id, @objective)`,
            );
        }
      }

      // 4. Insertar cronograma
      for (let i = 0; i < validatedData.data.chronogram.length; i++) {
        const item = validatedData.data.chronogram[i];
        if (item.phase.trim() && item.description.trim()) {
          const cronogramaRequest = new sql.Request(transaction);
          await cronogramaRequest
            .input("survey_id", sql.Int, surveyId)
            .input("chronogram_name", sql.NVarChar, item.phase)
            .input("chronogram_description", sql.NVarChar, item.description)
            .input("estimated_period", sql.NVarChar, item.date)
            .input("chronogram_order", sql.Int, i + 1).query(`
              INSERT INTO cronogramas (survey_id, chronogram_name, chronogram_description, estimated_period, chronogram_order) 
              VALUES (@survey_id, @chronogram_name, @chronogram_description, @estimated_period, @chronogram_order)
            `);
        }
      }

      // 5. Insertar términos (survey_options_definitions)
      for (const termino of validatedData.data.survey_options_definitions) {
        if (termino.name.trim() && termino.description.trim()) {
          const cleanDescription = sanitizeHtml(termino.description, {
            allowedTags: ["b", "i", "u", "ol", "ul", "li", "p", "br"],
            allowedAttributes: {},
          });

          const terminoRequest = new sql.Request(transaction);
          await terminoRequest
            .input("survey_id", sql.Int, surveyId)
            .input("concept_name", sql.NVarChar, termino.name)
            .input(
              "concept_description",
              sql.NVarChar(sql.MAX),
              cleanDescription,
            )
            .query(
              `INSERT INTO terminos (survey_id, concept_name, concept_description) VALUES (@survey_id, @concept_name, @concept_description)`,
            );
        }
      }

      // 6. Insertar FAQ
      for (const faq of validatedData.data.frequently_asked_questions) {
        if (faq.question.trim() && faq.answer.trim()) {
          const cleanDescription = sanitizeHtml(faq.answer, {
            allowedTags: ["b", "i", "u", "ol", "ul", "li", "p", "br"],
            allowedAttributes: {},
          });

          const faqRequest = new sql.Request(transaction);
          await faqRequest
            .input("survey_id", sql.Int, surveyId)
            .input("faq_question", sql.NVarChar, faq.question)
            .input("faq_answer", sql.NVarChar(sql.MAX), cleanDescription)
            .query(
              `INSERT INTO faq (survey_id, faq_question, faq_answer) VALUES (@survey_id, @faq_question, @faq_answer)`,
            );
        }
      }

      const sectorsRequest = new sql.Request(transaction);
      const sectoresResult = await sectorsRequest.query(
        "SELECT id, sector FROM sectores",
      );

      // 7. Insertar preguntas y opciones
      for (let i = 0; i < validatedData.data.questions.length; i++) {
        const question = validatedData.data.questions[i];
        let questionId: number;

        if (question.questionId > 0) {
          console.log(`questionId 0${i}:`, question.questionId);

          // Si questionId !== 0, la pregunta ya existe, por lo que solo se asocia (le estaria pasando el id de la pregunta)
          questionId = question.questionId;

          const checkPreguntaRequest = new sql.Request(transaction);
          const checkPreguntaResult = await checkPreguntaRequest.input(
            "id",
            sql.Int,
            question.questionId,
          ).query(`
              SELECT is_global FROM preguntas WHERE id = @id
            `);
          if (checkPreguntaResult.recordset.length === 0) {
            throw new Error(
              `La pregunta con ID ${question.questionId} no existe`,
            );
          }
          if (!checkPreguntaResult.recordset[0].is_global) {
            throw new Error(
              `La pregunta con ID ${question.questionId} no es reutilizable`,
            );
          }
        } else {
          // const questionDescription = question?.question_description || null;
          const questionDescription = null;
          const questionType = question.isMapQuestion ? "mapa" : "normal";
          // Si questionId === 0, insertar nueva pregunta
          const preguntaRequest = new sql.Request(transaction);
          const preguntaResult = await preguntaRequest
            .input("step", sql.NVarChar, question.step)
            .input("step_description", sql.NVarChar, question.step_description)
            .input("question", sql.NVarChar, question.question)
            .input("question_description", sql.NVarChar, questionDescription) // Falta este valor <=======================
            .input("question_type", sql.NVarChar, questionType)
            .input("multiple_answers", sql.Bit, question.maxOptions > 1)
            .input("min_answers", sql.Int, question.minOptions)
            .input("max_answers", sql.Int, question.maxOptions).query(`
              INSERT INTO preguntas (step, step_description, question, question_description, question_type, multiple_answers, min_answers, max_answers) 
              OUTPUT INSERTED.id
              VALUES (@step, @step_description, @question, @question_description, @question_type, @multiple_answers, @min_answers, @max_answers)
            `);

          questionId = preguntaResult.recordset[0].id;
        }

        // Asociar pregunta a la encuesta
        const encuestaPreguntaRequest = new sql.Request(transaction);
        await encuestaPreguntaRequest
          .input("survey_id", sql.Int, surveyId)
          .input("question_id", sql.Int, questionId)
          .input("question_order", sql.Int, i + 1).query(`
            INSERT INTO encuestas_preguntas (survey_id, question_id, question_order) 
            VALUES (@survey_id, @question_id, @question_order)
          `);

        // Insertar opciones de la pregunta (subpreguntas y subopciones tambien)
        if (!question.questionId || question.questionId <= 0) {
          if (question.options && question.options.length > 0) {
            for (let j = 0; j < question.options.length; j++) {
              const option = question.options[j];
              let subQuestionId: number | null = null;

              if (
                option.hasSubQuestion &&
                option.subQuestion?.trim() &&
                option.subOptions.some(
                  (subOption: SubOption) =>
                    subOption?.option_name?.trim().length > 0,
                )
              ) {
                const subPreguntaRequest = new sql.Request(transaction);
                const subPreguntaResult = await subPreguntaRequest
                  .input("step", sql.NVarChar, `SubPaso de ${question.step}`) // Nombre del paso, ej: Selecciona tu sector
                  .input("question", sql.NVarChar, option.subQuestion)
                  .input("question_description", sql.NVarChar, null)
                  .input("question_type", sql.NVarChar, "normal").query(`
                  INSERT INTO preguntas (step, question, question_description, question_type) 
                  OUTPUT INSERTED.id
                  VALUES (@step, @question, @question_description, @question_type)
                `);

                subQuestionId = subPreguntaResult.recordset[0].id;

                // Insertar subopciones de la subpregunta
                if (option.subOptions && option.subOptions.length > 0) {
                  for (let k = 0; k < option.subOptions.length; k++) {
                    const subOption = option.subOptions[k];
                    if (subOption.option_name?.trim()) {
                      const sectorId =
                        sectoresResult.recordset.find(
                          (sector) => sector.sector === subOption.sector_id,
                        )?.id ?? null;
                      const subOpcionRequest = new sql.Request(transaction);
                      await subOpcionRequest
                        .input("question_id", sql.Int, subQuestionId)
                        .input("option_order", sql.Int, k + 1)
                        .input(
                          "option_name",
                          sql.NVarChar,
                          subOption.option_name,
                        )
                        .input(
                          "option_description",
                          sql.NVarChar,
                          subOption.option_description,
                        )
                        .input("sector_id", sql.Int, sectorId).query(`
                        INSERT INTO opciones (question_id, option_order, option_name, option_description, sector_id) 
                        VALUES (@question_id, @option_order, @option_name, @option_description, @sector_id)
                      `);
                    }
                  }
                }
              }

              // Insertar opcion principal
              if (option.option_name?.trim()) {
                const opcionRequest = new sql.Request(transaction);
                await opcionRequest
                  .input("question_id", sql.Int, questionId)
                  .input("option_order", sql.Int, j + 1)
                  .input("option_name", sql.NVarChar, option.option_name)
                  .input(
                    "option_description",
                    sql.NVarChar,
                    option.option_description,
                  )
                  .input("sub_question_id", sql.Int, subQuestionId ?? null)
                  .query(`
                  INSERT INTO opciones (question_id, option_order, option_name, option_description, sub_question_id) 
                  VALUES (@question_id, @option_order, @option_name, @option_description, @sub_question_id)
                `);
              }
            }
          }
        }
      }

      await transaction.commit();
      console.log("Encuesta creada exitosamente con ID:", surveyId);

      return {
        success: true,
        message: "Encuesta creada exitosamente",
        surveyId: surveyId,
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
