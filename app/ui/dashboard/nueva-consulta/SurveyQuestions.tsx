"use client";

import { FormData, Question, QuestionOption } from "./NewSurveyContentLayout";

type SurveyQuestionsProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  updateQuestion: (
    questionIndex: number,
    field: keyof Question,
    value: string | boolean | QuestionOption[],
  ) => void;
  updateQuestionOption: (
    questionIndex: number,
    optionIndex: number,
    field: keyof QuestionOption,
    value: string | boolean | string[],
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
  const questionColors = [
    "border-l-purple-500 bg-purple-50",
    "border-l-blue-500 bg-blue-50",
    "border-l-green-500 bg-green-50",
    "border-l-orange-500 bg-orange-50",
    "border-l-red-500 bg-red-50",
    "border-l-indigo-500 bg-indigo-50",
  ];

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

  const addSubOption = (questionIndex: number, optionIndex: number) => {
    const question = formData.questions[questionIndex];
    const option = question.options[optionIndex];
    const newSubOptions = [...option.subOptions, ""];
    updateQuestionOption(
      questionIndex,
      optionIndex,
      "subOptions",
      newSubOptions,
    );
  };

  const updateSubOption = (
    questionIndex: number,
    optionIndex: number,
    subIndex: number,
    value: string,
  ) => {
    const question = formData.questions[questionIndex];
    const option = question.options[optionIndex];
    const newSubOptions = [...option.subOptions];
    newSubOptions[subIndex] = value;
    updateQuestionOption(
      questionIndex,
      optionIndex,
      "subOptions",
      newSubOptions,
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-2xl text-white shadow-lg">
          ❓
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Preguntas de la Consulta
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Configura las preguntas que responderán los ciudadanos
            <span className="mt-1 block text-sm font-medium text-purple-600">
              Se requieren mínimo 2 preguntas para la consulta
            </span>
          </p>
        </div>
      </div>

      {/* Questions Container */}
      <div className="space-y-6">
        {formData.questions.map((question, questionIndex) => (
          <div
            key={question.id}
            className={`relative rounded-2xl border border-l-4 border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
              questionColors[questionIndex % questionColors.length]
            }`}
          >
            {/* Question Number Badge */}
            <div className="absolute top-6 -left-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-purple-200 bg-white shadow-sm">
              <span className="text-lg font-bold text-purple-600">
                {questionIndex + 1}
              </span>
            </div>

            <div className="ml-6 p-6">
              {/* Question Header */}
              <div className="mb-6 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Pregunta {questionIndex + 1}
                    {question.question && (
                      <span className="ml-2 font-normal text-gray-600">
                        - {question.question.substring(0, 50)}
                        {question.question.length > 50 && "..."}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <span className="mr-1">📝</span>
                      {question.options.length} opciones
                    </span>
                    {question.isMapQuestion && (
                      <span className="flex items-center text-blue-600">
                        <span className="mr-1">📍</span>
                        Con mapa interactivo
                      </span>
                    )}
                  </div>
                </div>
                {formData.questions.length > 2 && (
                  <button
                    className="group ml-4 rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
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
                      🗑️
                    </span>
                  </button>
                )}
              </div>

              {/* Question Configuration */}
              <div className="space-y-6">
                {/* Question Text and Map Toggle */}
                <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      <span className="mr-1">📝</span>
                      Texto de la Pregunta
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
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
                  <div className="flex items-center justify-center lg:justify-start">
                    <label className="flex cursor-pointer items-center space-x-3 rounded-lg border border-blue-200 bg-blue-50 p-3 transition-all duration-200 hover:bg-blue-100">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                        checked={question.isMapQuestion}
                        onChange={(e) =>
                          updateQuestion(
                            questionIndex,
                            "isMapQuestion",
                            e.target.checked,
                          )
                        }
                      />
                      <span className="text-sm font-medium text-blue-700">
                        <span className="mr-1">📍</span>
                        Incluir mapa
                      </span>
                    </label>
                  </div>
                </div>

                {/* Map Question Info */}
                {question.isMapQuestion && (
                  <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                    <div className="flex items-start">
                      <span className="mr-3 text-2xl">🗺️</span>
                      <div>
                        <h4 className="mb-1 font-semibold text-blue-900">
                          Pregunta con Mapa Interactivo
                        </h4>
                        <p className="text-sm text-blue-700">
                          Esta pregunta mostrará un mapa interactivo donde los
                          ciudadanos podrán seleccionar su ubicación o sector de
                          interés para contextualizar su respuesta.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Options Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="flex items-center text-lg font-semibold text-gray-900">
                      <span className="mr-2">🎯</span>
                      Opciones de Respuesta
                    </h4>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                      {question.options.length} opciones
                    </span>
                  </div>

                  <div className="space-y-4">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={option.id}
                        className="rounded-xl border border-gray-200 bg-gray-50 p-5 transition-all duration-200 hover:shadow-sm"
                      >
                        {/* Option Header */}
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple-200 bg-white text-sm font-bold text-purple-600">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            <span className="font-semibold text-gray-900">
                              Opción {optionIndex + 1}
                            </span>
                            {option.hasSubQuestion && (
                              <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                Con sub-pregunta
                              </span>
                            )}
                          </div>
                          {question.options.length > 3 && (
                            <button
                              className="group rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
                              onClick={() =>
                                removeOption(questionIndex, optionIndex)
                              }
                              title="Eliminar opción"
                            >
                              <span className="transition-transform duration-200 group-hover:scale-110">
                                🗑️
                              </span>
                            </button>
                          )}
                        </div>

                        {/* Option Text */}
                        <div className="mb-4">
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Texto de la Opción
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                            placeholder={`Ej: Opción ${optionIndex + 1}`}
                            value={option.option}
                            onChange={(e) =>
                              updateQuestionOption(
                                questionIndex,
                                optionIndex,
                                "option",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        {/* Sub-question Toggle */}
                        <div className="mb-4">
                          <label className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-200 bg-white p-3 transition-all duration-200 hover:bg-gray-50">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
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
                              <span className="mr-1">🔗</span>
                              Esta opción tiene sub-pregunta
                            </span>
                          </label>
                        </div>

                        {/* Sub-question Section */}
                        {option.hasSubQuestion && (
                          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
                            <div className="mb-3 flex items-center">
                              <span className="mr-2 text-lg">🔗</span>
                              <h5 className="font-semibold text-gray-900">
                                Sub-pregunta
                              </h5>
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Texto de la Sub-pregunta
                              </label>
                              <input
                                type="text"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
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
                              <div className="mb-3 flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">
                                  Sub-opciones de Respuesta
                                </label>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                  {option.subOptions.length} sub-opciones
                                </span>
                              </div>
                              <div className="space-y-3">
                                {option.subOptions.map(
                                  (subOption, subIndex) => (
                                    <div
                                      key={subIndex}
                                      className="flex items-center space-x-3"
                                    >
                                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-green-200 bg-green-100 text-xs font-bold text-green-600">
                                        {subIndex + 1}
                                      </span>
                                      <input
                                        type="text"
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                        placeholder={`Sub-opción ${subIndex + 1}`}
                                        value={subOption}
                                        onChange={(e) =>
                                          updateSubOption(
                                            questionIndex,
                                            optionIndex,
                                            subIndex,
                                            e.target.value,
                                          )
                                        }
                                      />
                                      {option.subOptions.length > 2 && (
                                        <button
                                          className="group flex-shrink-0 rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
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
                                            🗑️
                                          </span>
                                        </button>
                                      )}
                                    </div>
                                  ),
                                )}
                                <button
                                  className="group flex w-full items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-3 transition-all duration-200 hover:border-green-400 hover:bg-green-100"
                                  onClick={() =>
                                    addSubOption(questionIndex, optionIndex)
                                  }
                                >
                                  <span className="mr-2 text-lg transition-transform duration-200 group-hover:scale-110">
                                    ➕
                                  </span>
                                  <span className="text-sm font-semibold text-green-700">
                                    Agregar Sub-opción
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add Option Button */}
                    <button
                      className="group flex w-full items-center justify-center rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 p-4 transition-all duration-200 hover:border-purple-400 hover:bg-purple-100"
                      onClick={() => addQuestionOption(questionIndex)}
                    >
                      <span className="mr-3 text-xl transition-transform duration-200 group-hover:scale-110">
                        ➕
                      </span>
                      <span className="text-lg font-semibold text-purple-700">
                        Agregar Nueva Opción
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Question Button */}
        <div className="pt-6">
          <button
            className="group flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-8 transition-all duration-200 hover:border-purple-400 hover:bg-purple-100"
            onClick={addQuestion}
          >
            <span className="mr-4 text-3xl transition-transform duration-200 group-hover:scale-110">
              ➕
            </span>
            <div className="text-center">
              <span className="block text-xl font-bold text-purple-700">
                Agregar Nueva Pregunta
              </span>
              <span className="mt-1 text-sm text-purple-600">
                Configura una pregunta adicional para la consulta
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <h4 className="mb-3 flex items-center font-semibold text-blue-900">
          <span className="mr-2">💡</span>
          Consejos para crear buenas preguntas
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="mt-0.5 mr-2">•</span>
            <span>
              Utiliza preguntas claras y específicas que sean fáciles de
              entender
            </span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2">•</span>
            <span>
              Las preguntas con mapa son ideales para consultas sobre
              ubicaciones específicas
            </span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2">•</span>
            <span>
              Usa sub-preguntas para obtener información más detallada cuando
              sea necesario
            </span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2">•</span>
            <span>
              Proporciona opciones de respuesta equilibradas y representativas
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
