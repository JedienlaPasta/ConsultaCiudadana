"use client";

import {
  Question,
  QuestionOption,
  SubOption,
  SurveyFormData,
} from "@/app/lib/definitions/encuesta";

type SurveyQuestionsProps = {
  formData: SurveyFormData;
  setFormData: React.Dispatch<React.SetStateAction<SurveyFormData>>;
  updateQuestion: (
    questionIndex: number,
    field: keyof Question,
    value: string | boolean | QuestionOption[],
  ) => void;
  updateQuestionOption: (
    questionIndex: number,
    optionIndex: number,
    field: keyof QuestionOption,
    value: string | boolean | string[] | SubOption[],
  ) => void;
  addQuestionOption: (questionIndex: number) => void;
  addQuestion: () => void;
};

export default function SurveyQuestions({
  formData,
  updateQuestion,
  setFormData,
  updateQuestionOption,
  addQuestionOption,
  addQuestion,
}: SurveyQuestionsProps) {
  const removeOption = (questionIndex: number, optionIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.filter((_, j) => j !== optionIndex),
            }
          : q,
      ),
    }));
  };

  const removeSubOption = (
    questionIndex: number,
    optionIndex: number,
    subIndex: number,
  ) => {
    const question = formData.questions[questionIndex];
    const option = question.options[optionIndex];
    const newSubOptions = option.subOptions.filter((_, i) => i !== subIndex);
    updateQuestionOption(
      questionIndex,
      optionIndex,
      "subOptions",
      newSubOptions,
    );
  };

  // const addSubOption = (questionIndex: number, optionIndex: number) => {
  //   const question = formData.questions[questionIndex];
  //   const option = question.options[optionIndex];
  //   const newSubOptions = [...option.subOptions, ""];
  //   updateQuestionOption(
  //     questionIndex,
  //     optionIndex,
  //     "subOptions",
  //     newSubOptions,
  //   );
  // };

  const updateSubOption = (
    questionIndex: number,
    optionIndex: number,
    subIndex: number,
    field: keyof SubOption,
    value: string,
  ) => {
    const question = formData.questions[questionIndex];
    const option = question.options[optionIndex];
    const newSubOptions = [...option.subOptions];

    // Update the specific field of the SubOption object
    newSubOptions[subIndex] = {
      ...newSubOptions[subIndex],
      [field]: value,
    };

    // Check if we need to add a new sub-option BEFORE updating
    const shouldAddNew =
      subIndex === option.subOptions.length - 1 &&
      field === "option_name" &&
      value.trim() !== "";

    // If we're adding a new sub-option, include it in the same state update
    if (shouldAddNew) {
      newSubOptions.push({
        id: "",
        option_name: "",
        description: "",
        sector_id: "",
      });
    }

    updateQuestionOption(
      questionIndex,
      optionIndex,
      "subOptions",
      newSubOptions,
    );
  };

  const updateOptionWithAutoAdd = (
    questionIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const question = formData.questions[questionIndex];

    // Update the current option
    updateQuestionOption(questionIndex, optionIndex, "option_name", value);

    // Check if this is the last option and it's not empty
    const isLastOption = optionIndex === question.options.length - 1;
    const isNotEmpty = value.trim() !== "";

    if (isLastOption && isNotEmpty) {
      // Add a new empty option
      addQuestionOption(questionIndex);
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-8">
          <h2 className="border-b border-gray-200/80 pt-7 pb-5 text-xl font-bold text-slate-700">
            Preguntas de la Consulta
          </h2>
        </div>
        <div className="p-8 py-6">
          <p className="text-sm font-semibold text-slate-700">
            Define las preguntas y respuestas que tendrá tu consulta.
          </p>
          <p className="text-sm text-slate-600">
            Ten en cuenta que el orden de las preguntas que defines aquí es
            importante.
          </p>
        </div>
      </div>

      {/* Questions Container */}
      <div className="space-y-6">
        {formData.questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className="overflow-hidden rounded-xl bg-gray-100/80 shadow-sm"
          >
            {/* Question Header */}
            <div className="flex items-center bg-[#06539b] px-8 py-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100">
                  Pregunta {questionIndex + 1}
                  {question.isMapQuestion ? (
                    <span className="ml-2 text-base font-normal text-slate-100">
                      - Selecciona tu Sector de Votación
                    </span>
                  ) : (
                    question.question && (
                      <span className="ml-2 text-base font-normal text-slate-100">
                        - {question.question.substring(0, 50)}
                        {question.question.length > 50 && "..."}
                      </span>
                    )
                  )}
                </h3>
              </div>
              {formData.questions.length > 2 && (
                <button
                  className="group ml-4 cursor-pointer rounded-lg bg-[#02427e] p-2 text-gray-100 transition-all duration-200 hover:bg-[#003261]"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      questions: prev.questions.filter(
                        (_, i) => i !== questionIndex,
                      ),
                    }));
                  }}
                  title="Eliminar pregunta"
                >
                  <span className="transition-transform duration-200 group-hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
            <div className="rounded-b-xl border border-t-0 border-gray-200 px-8 pt-6 pb-2">
              {questionIndex === 0 && (
                <div className="flex- mb-4 flex items-center justify-center lg:justify-start">
                  <label className="flex w-full cursor-pointer items-center space-x-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 transition-all duration-200 hover:bg-blue-100">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded text-blue-600 focus:ring-blue-500"
                      checked={question.isMapQuestion}
                      onChange={(e) =>
                        updateQuestion(
                          questionIndex,
                          "isMapQuestion",
                          e.target.checked,
                        )
                      }
                    />
                    <span className="text-sm text-blue-600">
                      <span className="mr-1">📍</span>
                      Mapa interactivo
                    </span>
                  </label>
                </div>
              )}

              {/* Question Configuration */}
              <div className="mb-6">
                {!question.isMapQuestion && (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                        Pregunta o Enunciado
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                        placeholder="Ej: ¿Cuál es tu opinión sobre...?"
                        value={question.question}
                        onChange={(e) =>
                          updateQuestion(
                            questionIndex,
                            "question",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="mb-6 flex gap-4">
                      <div className="flex-1">
                        <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                          Nombre del Paso
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                          placeholder="Seleccionar sector"
                          value={question.step}
                          onChange={(e) =>
                            updateQuestion(
                              questionIndex,
                              "step",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                          Descripcion del Paso
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                          placeholder="Tu lugar de residencia"
                          value={question.step_description}
                          onChange={(e) =>
                            updateQuestion(
                              questionIndex,
                              "step_description",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mb-6 flex gap-4">
                      <div className="flex-1">
                        <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                          Mínimo de opciones a elegir
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                          placeholder="1"
                          value={question.minOptions}
                          onChange={(e) =>
                            updateQuestion(
                              questionIndex,
                              "minOptions",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                          Máximo de opciones a elegir
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                          placeholder="1"
                          value={question.maxOptions}
                          onChange={(e) =>
                            updateQuestion(
                              questionIndex,
                              "maxOptions",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Map Question Info */}
                {question.isMapQuestion && (
                  <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                    <div className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-map-icon lucide-map mr-2 hidden size-6 text-[#0a4c8a] sm:block"
                      >
                        <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                        <path d="M15 5.764v15" />
                        <path d="M9 3.236v15" />
                      </svg>
                      <div>
                        <h4 className="mb-1 font-semibold text-blue-900">
                          Pregunta con Mapa Interactivo
                        </h4>
                        <p className="text-sm text-blue-600">
                          Esta pregunta mostrará un mapa interactivo donde los
                          ciudadanos podrán seleccionar su sector de interés
                          para contextualizar su respuesta.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Options Section */}
                {!question.isMapQuestion && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="flex items-center text-lg font-semibold text-gray-800">
                        Opciones de Respuesta
                      </h4>
                      <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                        {
                          question.options.filter(
                            (option) =>
                              option.option_name &&
                              option.option_name.trim().length > 0,
                          ).length
                        }{" "}
                        opciones
                      </span>
                    </div>

                    <div className="space-y-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="relative rounded-xl border border-gray-200 bg-gray-50 p-5 transition-all duration-200 hover:shadow-sm"
                        >
                          {/* Option Header */}
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                {optionIndex + 1}
                              </div>
                              <span className="font-semibold text-gray-900">
                                Opción {optionIndex + 1}
                              </span>
                              {option.hasSubQuestion && (
                                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                  Con sub-pregunta
                                </span>
                              )}
                            </div>
                            {question.options.length > 3 &&
                              optionIndex !== question.options.length - 1 && (
                                <button
                                  className="group absolute top-5 right-5 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-gray-500 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"
                                  onClick={() =>
                                    removeOption(questionIndex, optionIndex)
                                  }
                                  title="Eliminar opción"
                                >
                                  <span className="transition-transform duration-200 group-hover:scale-110">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      />
                                      <path d="M4 7l16 0" />
                                      <path d="M10 11l0 6" />
                                      <path d="M14 11l0 6" />
                                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                  </span>
                                </button>
                              )}
                          </div>

                          {/* Option Text */}
                          <div className="mb-4">
                            <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                              Texto de la Opción
                              <span className="ml-1 text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                              placeholder={`Ej: Opción ${optionIndex + 1}`}
                              value={option.option_name}
                              onChange={(e) =>
                                updateOptionWithAutoAdd(
                                  questionIndex,
                                  optionIndex,
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          {/* Sub-question Toggle */}
                          <div className="">
                            <label className="flex h-10 cursor-pointer items-center space-x-3 rounded-lg border border-slate-300 bg-white p-4 shadow-sm transition-all duration-200 select-none hover:bg-gray-50">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                                checked={option.hasSubQuestion}
                                onChange={(e) =>
                                  updateQuestionOption(
                                    questionIndex,
                                    optionIndex,
                                    "hasSubQuestion",
                                    e.target.checked,
                                  )
                                }
                              />
                              <span className="text-sm font-medium text-gray-700">
                                Esta opción tiene sub-pregunta
                              </span>
                            </label>
                          </div>

                          {/* Sub-question Section */}
                          {option.hasSubQuestion && (
                            <div className="mt-4 space-y-4 rounded-lg p-4 pt-0">
                              <div className="mb-2 flex items-center">
                                <h5 className="font-semibold text-gray-900">
                                  Sub-pregunta
                                </h5>
                              </div>

                              <div>
                                <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                                  Texto de la Sub-pregunta
                                  <span className="ml-1 text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                                  placeholder="Ej: ¿Podrías especificar...?"
                                  value={option.subQuestion}
                                  onChange={(e) =>
                                    updateQuestionOption(
                                      questionIndex,
                                      optionIndex,
                                      "subQuestion",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>

                              <div>
                                <div className="mb-2 flex items-center justify-between">
                                  <label className="flex items-center text-sm font-semibold text-gray-700">
                                    Sub-opciones de Respuesta
                                    <span className="ml-1 text-red-500">*</span>
                                  </label>
                                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                                    {
                                      option.subOptions.filter(
                                        (subOption) =>
                                          subOption &&
                                          subOption.option_name.trim().length >
                                            0,
                                      ).length
                                    }{" "}
                                    sub-opciones
                                  </span>
                                </div>
                                <div className="space-y-3">
                                  {option.subOptions.map(
                                    (subOption, subIndex) => (
                                      <div
                                        key={subIndex}
                                        className="flex items-center space-x-3"
                                      >
                                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-100 text-xs font-bold text-emerald-600">
                                          {subIndex + 1}
                                        </span>
                                        <input
                                          type="text"
                                          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                                          placeholder={`Sub-opción ${subIndex + 1}`}
                                          value={subOption.option_name}
                                          onChange={(e) =>
                                            updateSubOption(
                                              questionIndex,
                                              optionIndex,
                                              subIndex,
                                              "option_name",
                                              e.target.value,
                                            )
                                          }
                                        />
                                        {option.subOptions.length > 2 &&
                                          option.subOptions.length - 1 >
                                            subIndex && (
                                            <button
                                              className="group flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-gray-500 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"
                                              onClick={() =>
                                                removeSubOption(
                                                  questionIndex,
                                                  optionIndex,
                                                  subIndex,
                                                )
                                              }
                                              title="Eliminar sub-opción"
                                            >
                                              <span className="transition-transform duration-200 group-hover:scale-110">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="20"
                                                  height="20"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                >
                                                  <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                  />
                                                  <path d="M4 7l16 0" />
                                                  <path d="M10 11l0 6" />
                                                  <path d="M14 11l0 6" />
                                                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                </svg>
                                              </span>
                                            </button>
                                          )}
                                      </div>
                                    ),
                                  )}
                                  {/* <button
                                      className="group flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 transition-all duration-200 hover:border-gray-400 hover:bg-blue-600"
                                      onClick={() =>
                                        addSubOption(questionIndex, optionIndex)
                                      }
                                    >
                                      <span className="text-sm font-medium text-white">
                                        Agregar Sub-opción
                                      </span>
                                    </button> */}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Add Option Button */}
                      {/* <button
                        className="group flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 transition-all duration-200 hover:border-gray-400 hover:bg-blue-600"
                        onClick={() => addQuestionOption(questionIndex)}
                      >
                        <span className="font-medium text-white">
                          Agregar Opción
                        </span>
                      </button> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <div className="">
          <button
            className="group flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 transition-all duration-200 hover:border-gray-400 hover:bg-blue-600"
            onClick={addQuestion}
          >
            <span className="text-lg font-medium text-white">
              Agregar Pregunta
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
