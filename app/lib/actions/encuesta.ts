"use server";

import z from "zod";
import { connectToDB } from "../utils/db-connection";
import sql from "mssql";
import { SurveyAnswers } from "../definitions/encuesta";
import sanitizeHtml from "sanitize-html";
import { revalidatePath } from "next/cache";
import { generateUserHash } from "../utils/userHash";
import { customAlphabet } from "nanoid";
import { getSession } from "./auth";

export async function registerVote(surveyAnswers: SurveyAnswers) {
  const session = await getSession();
  const sub = session?.sub || "";
  const dv = session?.dv || "";

  if (!sub || !dv) {
    console.log(
      "Sesión inválida o expirada. Por favor, vuelve a iniciar sesión.",
    );
    return {
      success: false,
      message:
        "Sesión inválida o expirada. Por favor, vuelve a iniciar sesión.",
    };
  }

  try {
    const pool = await connectToDB();
    if (!pool) {
      return {
        success: false,
        message: "No se pudo establecer conexión con la base de datos.",
      };
    }

    const userHash = generateUserHash(sub, dv);

    const transaction = new sql.Transaction(pool);
    await transaction.begin();
    console.log("Guardando voto...");
    if (!sub || !dv) {
      throw new Error("Sesión vencida o inválida.");
    }

    // Upsert de usuario temporal dentro de la transacción
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 180);

    const upsertUserRequest = new sql.Request(transaction);
    await upsertUserRequest
      .input("user_hash", sql.Char(64), userHash)
      .input("expires_at", sql.DateTime2, expiresAt).query(`
      IF NOT EXISTS (
        SELECT 1 FROM usuarios WITH (UPDLOCK, HOLDLOCK)
        WHERE user_hash = @user_hash
      )
      BEGIN
        INSERT INTO usuarios (user_hash, user_role, expires_at)
        VALUES (@user_hash, 'votante', @expires_at)
      END
    `);

    try {
      // Obtener ID de la encuesta
      const surveyRequest = new sql.Request(transaction);
      const surveyResult = await surveyRequest
        .input("public_id", sql.NVarChar, surveyAnswers.public_id)
        .query("SELECT id FROM encuestas WHERE public_id = @public_id");

      const surveyId = surveyResult.recordset[0]?.id || 0;

      if (surveyId === 0) {
        throw new Error("No se encontró la encuesta con el ID especificado");
      }

      // Verificar si ya participo
      const checkParticipationRequest = new sql.Request(transaction);
      const checkResult = await checkParticipationRequest
        .input("survey_id", sql.Int, surveyId)
        .input("user_hash", sql.Char(64), userHash).query(`
          SELECT TOP 1 id FROM participacion_encuestas WHERE survey_id = @survey_id AND user_hashed_key = @user_hash
        `);
      if (checkResult.recordset.length > 0) {
        return {
          success: false,
          message:
            "Ya has participado en esta encuesta, solo puedes votar una vez por encuesta.",
        };
      }

      // Registrar participación
      const participationRequest = new sql.Request(transaction);
      const participationResult = await participationRequest
        .input("survey_id", sql.Int, surveyId)
        .input("user_hashed_key", sql.Char(64), userHash).query(`
          INSERT INTO participacion_encuestas (survey_id, user_hashed_key) 
          OUTPUT INSERTED.id
          VALUES (@survey_id, @user_hashed_key)
        `);

      if (
        !participationResult.recordset ||
        participationResult.recordset.length === 0
      ) {
        throw new Error("Error al registrar la participación");
      }

      const participationId = participationResult.recordset[0].id;
      console.log("Participación registrada con ID:", participationId);

      // Detalle de participacion (fecha)
      const participationDetailRequest = new sql.Request(transaction);
      await participationDetailRequest
        .input("survey_id", sql.Int, surveyId)
        .input("participation_id", sql.Int, participationId).query(`
          INSERT INTO participacion_encuesta_detalle (survey_id, participation_id) 
          VALUES (@survey_id, @participation_id)
        `);

      console.log("Detalle de participación guardado");
      // Registrar voto (mapa)
      if (surveyAnswers.answers[0].sector_id) {
        const sector = surveyAnswers.answers[0].sector_id;
        const questionId = surveyAnswers.answers[0].question_id;

        const sectorIdRequest = new sql.Request(transaction);
        const sectorIdResult = await sectorIdRequest.input(
          "sector",
          sql.NVarChar,
          sector,
        ).query(`
            SELECT id FROM sectores WHERE sector = @sector
          `);
        const sectorOptionId = sectorIdResult.recordset[0].id;

        const sectorVoteRequest = new sql.Request(transaction);
        await sectorVoteRequest
          .input("survey_id", sql.Int, surveyId)
          .input("question_id", sql.Int, questionId)
          .input("option_id", sql.Int, sectorOptionId).query(`
            INSERT INTO votos (survey_id, question_id, option_id) 
            VALUES (@survey_id, @question_id, @option_id)
          `);
        // console.log("Registrado voto mapa:", sectorOptionId);
      }

      // Registrar votos
      for (const answer of surveyAnswers.answers) {
        for (const selectedOption of answer.selected_options) {
          const voteRequest = new sql.Request(transaction);
          await voteRequest
            .input("survey_id", sql.Int, surveyId)
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
              .input("survey_id", sql.Int, surveyId)
              .input("question_id", sql.Int, selectedOption.sub_question_id)
              .input("option_id", sql.Int, selectedOption.sub_option_id).query(`
                INSERT INTO votos (survey_id, question_id, option_id) 
                VALUES (@survey_id, @question_id, @option_id)
              `);
          }
          // console.log("Registrado voto:", selectedOption.option_id);
        }
      }

      await transaction.commit();

      revalidatePath(`/consultas/${surveyId}`);
      revalidatePath(`/consultas/${surveyId}/resultados`);
      revalidatePath("/consultas");

      return {
        success: true,
        message: "Tu voto se ha guardado exitosamente.",
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Error al registrar el voto:", error);
    return {
      success: false,
      message: "No se pudo registrar el voto, intente nuevamente.",
    };
  }
}

const SurveySchema = z.object({
  survey_name: z.string().min(10, {
    message: "El nombre de la encuesta debe tener al menos 10 caracteres",
  }),
  department: z.string().min(3, {
    message: "El departamento es requerido y debe tener al menos 3 caracteres",
  }),
  survey_short_description: z.string().min(50, {
    message:
      "La descripción corta de la encuesta debe tener al menos 50 caracteres",
  }),
  survey_large_description: z.string().min(50, {
    message:
      "La descripción detallada de la encuesta debe tener al menos 50 caracteres",
  }),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha de inicio inválida o no ingresada.",
  }),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Fecha de término inválida o no ingresada.",
  }),
  survey_concepts_description: z.string().optional(),
  survey_concepts_link: z.string().optional(),
  survey_links: z.array(z.string()).optional(),
  objectives: z.array(
    z.string().min(10, {
      message: "El objetivo de la encuesta debe tener al menos 10 caracteres",
    }),
  ),
  chronogram: z.array(
    z.object({
      phase: z.string().min(5, {
        message:
          "El nombre de la etapa (cronograma) debe tener al menos 5 caracteres",
      }),
      description: z.string().min(10, {
        message:
          "La descripción de la etapa (cronograma) debe tener al menos 10 caracteres",
      }),
      date: z.string().optional(),
    }),
  ),
  survey_concepts_name: z.array(
    z.object({
      name: z.string().min(5, {
        message: "El nombre del concepto debe tener al menos 5 caracteres",
      }),
      description: z.string().min(10, {
        message:
          "La descripción del concepto debe tener al menos 10 caracteres",
      }),
    }),
  ),
  frequently_asked_questions: z.array(
    z.object({
      question: z.string().min(10, {
        message:
          "La pregunta (pregunta frecuente) debe tener al menos 10 caracteres",
      }),
      answer: z.string().min(10, {
        message:
          "La respuesta (pregunta frecuente) debe tener al menos 10 caracteres",
      }),
    }),
  ),
  questions: z.array(
    z.discriminatedUnion("isMapQuestion", [
      // Variante 1: Pregunta tipo mapa (solo requiere el ID de pregunta existente)
      z.object({
        id: z.number(),
        isMapQuestion: z.literal(true),
        questionId: z.number().refine((val) => val !== 0, {
          message: "questionId inválido para pregunta tipo mapa",
        }),
      }),

      // Variante 2: Pregunta normal (requiere todos los campos)
      z
        .object({
          id: z.number(),
          isMapQuestion: z.literal(false),
          questionId: z.literal(0),
          question: z.string().min(1, {
            message:
              "Contenido Consulta: La pregunta debe tener al menos 10 caracteres",
          }),
          question_description: z.string().optional(),
          step: z.string().min(5, {
            message:
              "Contenido Consulta: El nombre del paso debe tener al menos 5 caracteres",
          }),
          step_description: z.string().min(10, {
            message:
              "Contenido Consulta: La descripción del paso debe tener al menos 10 caracteres",
          }),
          minOptions: z.coerce.number().min(1, {
            message:
              "Contenido Consulta: El mínimo de opciones debe ser al menos 1",
          }),
          maxOptions: z.coerce.number().min(1, {
            message:
              "Contenido Consulta: El máximo de opciones debe ser al menos 1",
          }),
          options: z.array(
            z.object({
              id: z.number(),
              option_name: z.string().min(1, {
                message:
                  "Contenido Consulta: La opción debe tener al menos 1 caracteres",
              }),
              option_description: z.string().optional(),
              hasSubQuestion: z.boolean(),
              subQuestion: z.string().optional(),
              subQuestionDescription: z.string().optional(),
              subOptions: z
                .array(
                  z.object({
                    id: z.number(),
                    option_name: z.string().min(1, {
                      message:
                        "Contenido Consulta: La opción debe tener al menos 1 caracteres",
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
});

export async function createSurvey(
  formData: FormData,
  sub: string,
  dv: string,
) {
  if (!sub || !dv) {
    throw new Error("No has iniciado sesión o esta ha caducado.");
  }
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
  const surveyConceptsDescription = formData.get(
    "survey_concepts_description",
  ) as string;
  const surveyConceptsLink = formData.get("survey_concepts_link") as string;
  console.log(surveyConceptsLink);

  const surveyLinks = JSON.parse(
    (formData.get("survey_links") as string) || "[]",
  );
  const objectives = JSON.parse((formData.get("objectives") as string) || "[]");
  const chronogram = JSON.parse((formData.get("chronogram") as string) || "[]");
  const surveyOptionDefinitions = JSON.parse(
    (formData.get("survey_concepts_name") as string) || "[]",
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
    survey_concepts_description: surveyConceptsDescription,
    survey_concepts_link: surveyConceptsLink,
    survey_links: surveyLinks,
    objectives: objectives,
    chronogram: chronogram,
    survey_concepts_name: surveyOptionDefinitions,
    frequently_asked_questions: frequentlyAskedQuestions,
    questions: questions,
  });
  console.log("================================");
  console.log("validatedData: ", validatedData);
  console.log("================================");

  console.log(questions);

  if (!validatedData.success) {
    console.error("Error al validar los datos:", validatedData.error);

    const errors = validatedData.error.issues;

    // Acepta PropertyKey[] y convierte a string para comparar
    const getIndex = (path: PropertyKey[], key: string) => {
      const i = path.findIndex((p) => String(p) === key);
      const next = path[i + 1];
      return typeof next === "number" ? next + 1 : undefined;
    };

    const fieldErrors = errors.map((error) => {
      const issuePath = error.path as PropertyKey[];
      const field = issuePath.map(String).join(".");

      // min/max options
      if (field.includes("minOptions") || field.includes("maxOptions")) {
        const qIndex = getIndex(issuePath, "questions");
        return `Configura la cantidad de opciones a elegir en la pregunta ${qIndex ?? "correspondiente"}: mínimo y máximo deben ser números enteros válidos.`;
      }

      // Campos generales
      if (field.includes("survey_name")) {
        return "Información general: El nombre de la encuesta debe tener al menos 10 caracteres.";
      }
      if (field.includes("survey_short_description")) {
        return "Información general: La descripción corta de la encuesta debe tener al menos 50 caracteres.";
      }
      if (field.includes("survey_large_description")) {
        return "Información general: La descripción detallada de la encuesta debe tener al menos 50 caracteres.";
      }
      if (field.includes("start_date")) {
        return "Información general: Fecha de inicio inválida o no ingresada.";
      }
      if (field.includes("end_date")) {
        return "Información general: Fecha de término inválida o no ingresada.";
      }
      if (field.includes("department")) {
        return "Información general: El departamento es requerido y debe tener al menos 3 caracteres.";
      }

      // Objetivos
      if (field.includes("objectives")) {
        return "Objetivos y Cronograma: El objetivo de la encuesta debe tener al menos 10 caracteres.";
      }

      // Cronograma
      if (field.includes("chronogram")) {
        const cIndex = getIndex(issuePath, "chronogram");
        if (field.includes("phase")) {
          return `Objetivos y Cronograma: La etapa ${cIndex ?? ""} requiere un nombre de al menos 5 caracteres.`;
        }
        if (field.includes("description")) {
          return `Objetivos y Cronograma: La etapa ${cIndex ?? ""} requiere una descripción de al menos 10 caracteres.`;
        }
      }

      // Definiciones de términos
      if (field.includes("survey_concepts_name")) {
        const tIndex = getIndex(issuePath, "survey_concepts_name");
        if (field.includes("name")) {
          return `Conceptos y FAQ: El término ${tIndex ?? ""} requiere un nombre de al menos 5 caracteres.`;
        }
        if (field.includes("description")) {
          return `Conceptos y FAQ: El término ${tIndex ?? ""} requiere una descripción de al menos 10 caracteres.`;
        }
      }

      // FAQ
      if (field.includes("frequently_asked_questions")) {
        const fIndex = getIndex(issuePath, "frequently_asked_questions");
        if (field.includes("question")) {
          return `Conceptos y FAQ: La pregunta frecuente ${fIndex ?? ""} debe tener al menos 10 caracteres.`;
        }
        if (field.includes("answer")) {
          return `Conceptos y FAQ: La respuesta frecuente ${fIndex ?? ""} debe tener al menos 10 caracteres.`;
        }
      }

      // Preguntas y opciones
      if (field.includes("questions")) {
        const qIndex = getIndex(issuePath, "questions");

        if (field.includes("step") && !field.includes("step_description")) {
          return `Contenido Consulta: El nombre del paso de la pregunta ${qIndex ?? ""} debe tener al menos 5 caracteres.`;
        }
        if (field.includes("step_description")) {
          return `Contenido Consulta: La descripción del paso de la pregunta ${qIndex ?? ""} debe tener al menos 10 caracteres.`;
        }

        if (
          field.includes("question") &&
          !field.includes("question_description")
        ) {
          return `Contenido Consulta: La pregunta ${qIndex ?? ""} debe tener al menos 10 caracteres.`;
        }

        if (field.includes("options")) {
          const oIndex = getIndex(issuePath, "options");
          if (field.includes("option_name")) {
            return `Contenido Consulta: La opción ${oIndex ?? ""} de la pregunta ${qIndex ?? ""} debe tener al menos 2 caracteres.`;
          }
        }

        if (field.includes("subOptions")) {
          const sIndex = getIndex(issuePath, "subOptions");
          if (field.includes("option_name")) {
            return `Contenido Consulta: La sub-opción ${sIndex ?? ""} de la pregunta ${qIndex ?? ""} debe tener al menos 2 caracteres.`;
          }
        }
      }

      // Fallback: mensaje nativo de Zod
      return error.message;
    });

    return {
      success: false,
      message: fieldErrors[0] || "Se encontraron errores de validación.",
      errors: fieldErrors,
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

    const userHash = generateUserHash(sub, dv);

    const generatePublicId = customAlphabet(
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789",
      8,
    );

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

      const publicId = generatePublicId();
      const encuestaRequest = new sql.Request(transaction);
      // 1. Insertar encuesta
      const encuestaResult = await encuestaRequest
        .input("public_id", sql.NVarChar, publicId)
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
        .input(
          "survey_concepts_description",
          sql.NVarChar,
          validatedData.data.survey_concepts_description,
        )
        .input(
          "survey_concepts_link",
          sql.NVarChar,
          validatedData.data.survey_concepts_link,
        )
        .input("created_by", sql.Char(64), userHash).query(`
          INSERT INTO encuestas (public_id, survey_name, survey_short_description, survey_large_description, survey_start_date, survey_end_date, department, survey_concepts_description, survey_concepts_link, created_by) 
          OUTPUT INSERTED.id
          VALUES (@public_id, @survey_name, @survey_short_description, @survey_large_description, @survey_start_date, @survey_end_date, @department, @survey_concepts_description, @survey_concepts_link, @created_by)
        `);

      const surveyId = encuestaResult.recordset[0].id;

      // 2. Asignar permiso
      const permisoRequest = new sql.Request(transaction);
      await permisoRequest
        .input("survey_id", sql.Int, surveyId)
        .input("user_hash", sql.Char(64), userHash)
        .input("survey_access", sql.NVarChar, "propietario")
        .query(
          `INSERT INTO permisos (survey_id, user_hashed_key, survey_access) VALUES (@survey_id, @user_hash, @survey_access)`,
        );

      // 3. Insertar links
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

      // 4. Insertar objetivos
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

      // 5. Insertar cronograma
      for (let i = 0; i < validatedData.data.chronogram.length; i++) {
        const item = validatedData.data.chronogram[i];
        if (item.phase.trim() && item.description.trim()) {
          // En caso de no especificar un periodo
          const estimatedPeriod = item.date || null;
          const cronogramaRequest = new sql.Request(transaction);
          await cronogramaRequest
            .input("survey_id", sql.Int, surveyId)
            .input("chronogram_name", sql.NVarChar, item.phase)
            .input("chronogram_description", sql.NVarChar, item.description)
            .input("estimated_period", sql.NVarChar, estimatedPeriod)
            .input("chronogram_order", sql.Int, i + 1).query(`
              INSERT INTO cronogramas (survey_id, chronogram_name, chronogram_description, estimated_period, chronogram_order) 
              VALUES (@survey_id, @chronogram_name, @chronogram_description, @estimated_period, @chronogram_order)
            `);
        }
      }

      // 6. Insertar términos (survey_concepts_name)
      for (const termino of validatedData.data.survey_concepts_name) {
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

      // 7. Insertar FAQ
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

      // 8. Insertar preguntas y opciones
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
        } else if (!question.isMapQuestion) {
          // const questionDescription = question?.question_description || null;
          const questionDescription = question.question_description || null;
          const questionType = "normal";
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
        } else {
          continue;
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
        if (
          (!question.questionId || question.questionId <= 0) &&
          !question.isMapQuestion
        ) {
          if (Array.isArray(question.options) && question.options.length > 0) {
            for (let j = 0; j < question.options.length; j++) {
              const option = question.options[j];
              let subQuestionId: number | null = null;

              const hasSubQuestion =
                option.hasSubQuestion &&
                typeof option.subQuestion === "string" &&
                option.subQuestion.trim().length > 0;

              const hasValidSubOptions =
                Array.isArray(option.subOptions) &&
                option.subOptions.some(
                  (subOption) =>
                    typeof subOption.option_name === "string" &&
                    subOption.option_name.trim().length > 0,
                );

              if (hasSubQuestion && hasValidSubOptions) {
                const subQuestionDescription =
                  option.subQuestionDescription || null;
                const subPreguntaRequest = new sql.Request(transaction);
                const subPreguntaResult = await subPreguntaRequest
                  .input("step", sql.NVarChar, `SubPaso de ${question.step}`) // Nombre del paso, ej: Selecciona tu sector
                  .input("question", sql.NVarChar, option.subQuestion)
                  .input(
                    "question_description",
                    sql.NVarChar,
                    subQuestionDescription,
                  )
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

export async function deleteSurvey(publicId: string) {
  try {
    const pool = await connectToDB();
    if (!pool) {
      return {
        success: false,
        message: "No se pudo conectar a la base de datos",
      };
    }

    const session = await getSession();
    console.log("=============================");
    console.log("user:", session?.sub);

    if (!session?.sub) {
      return {
        success: false,
        message: "No se pudo obtener el usuario",
      };
    }

    const userhash = generateUserHash(session?.sub || "", session?.dv || "");

    // ID Encuesta
    const encuestaRequest = await pool
      .request()
      .input("public_id", sql.NVarChar, publicId)
      .query(`SELECT id FROM encuestas WHERE public_id = @public_id`);

    if (encuestaRequest.recordset.length === 0) {
      console.log("Encuesta no encontrada:", publicId);
      return {
        success: false,
        message: "Encuesta no encontrada",
      };
    }
    const surveyId = encuestaRequest.recordset[0].id;

    // Verificar si el usuario tiene permiso para eliminar la encuesta
    const permissionRequest = await pool
      .request()
      .input("userhash", sql.NVarChar, userhash)
      .input("survey_id", sql.Int, surveyId).query(`
      SELECT survey_access FROM permisos WHERE user_hashed_key = @userhash AND survey_id = @survey_id
    `);

    if (
      permissionRequest.recordset.length === 0 ||
      permissionRequest.recordset[0].survey_access !== "propietario"
    ) {
      console.log(
        "El usuario no tiene permisos para eliminar la encuesta:",
        surveyId,
      );
      return {
        success: false,
        message: "No se encontraron permisos para eliminar la encuesta",
      };
    }

    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      // Borrar tabla de relaciones encuesta-preguntas
      const encuestasPreguntasRequest = await new sql.Request(
        transaction,
      ).input("survey_id", sql.Int, surveyId).query(`
          SELECT question_id FROM encuestas_preguntas WHERE survey_id = @survey_id
        `);

      const questionsToDelete = encuestasPreguntasRequest.recordset.map(
        (row) => row.question_id,
      );
      console.log(questionsToDelete);

      console.log("======================================");
      console.log("Borrando relacion encuestas-preguntas");
      await new sql.Request(transaction).input("survey_id", sql.Int, surveyId)
        .query(`
        DELETE FROM encuestas_preguntas WHERE survey_id = @survey_id
      `);

      console.log("======================================");
      // Borrar preguntas / is_global <> 1 para saltar preguntas que se reutilizan en distintas consultas.
      for (const questionId of questionsToDelete) {
        console.log("Borrando pregunta:", questionId);
        await new sql.Request(transaction).input(
          "question_id",
          sql.Int,
          questionId,
        ).query(`
            DELETE FROM preguntas WHERE id = @question_id AND is_global <> 1
          `);
      }

      console.log("======================================");
      console.log("Borrando encuesta:", surveyId);
      // Borrar encuesta
      await new sql.Request(transaction).input("survey_id", sql.Int, surveyId)
        .query(`
          DELETE FROM encuestas WHERE id = @survey_id
        `);

      await transaction.commit();
      revalidatePath(`/dashboard/consultas`);
      return {
        success: true,
        message: "Encuesta eliminada exitosamente",
      };
    } catch (error) {
      console.error("Error al eliminar la encuesta:", error);
      await transaction.rollback();
      return {
        success: false,
        message: "No se pudo eliminar la encuesta, intente nuevamente",
      };
    }
  } catch (error) {
    console.error("Error al eliminar la encuesta:", error);
    return {
      success: false,
      message: "No se pudo eliminar la encuesta, intente nuevamente",
    };
  }
}
