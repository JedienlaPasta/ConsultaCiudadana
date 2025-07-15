"use client";

import {
  FormData,
  ArrayItemTypeMap,
  FormDataArrays,
} from "./NewSurveyContentLayout";

type SurveyContentProps = {
  formData: FormData;
  updateArrayItem: <K extends keyof FormDataArrays>(
    array: K,
    index: number,
    value: ArrayItemTypeMap<K>,
  ) => void;
  removeArrayItem: <K extends keyof FormDataArrays>(
    array: K,
    index: number,
  ) => void;
  addArrayItem: <K extends keyof FormDataArrays>(
    array: K,
    value: ArrayItemTypeMap<K>,
  ) => void;
};

export default function SurveyContent({
  formData,
  updateArrayItem,
  removeArrayItem,
  addArrayItem,
}: SurveyContentProps) {
  const objectiveColors = [
    "border-l-blue-500 bg-blue-50",
    "border-l-green-500 bg-green-50",
    "border-l-purple-500 bg-purple-50",
    "border-l-orange-500 bg-orange-50",
    "border-l-red-500 bg-red-50",
    "border-l-indigo-500 bg-indigo-50",
  ];

  const definitionColors = [
    "border-l-emerald-500 bg-emerald-50",
    "border-l-teal-500 bg-teal-50",
    "border-l-cyan-500 bg-cyan-50",
    "border-l-sky-500 bg-sky-50",
    "border-l-violet-500 bg-violet-50",
    "border-l-pink-500 bg-pink-50",
  ];

  const faqColors = [
    "border-l-amber-500 bg-amber-50",
    "border-l-yellow-500 bg-yellow-50",
    "border-l-lime-500 bg-lime-50",
    "border-l-rose-500 bg-rose-50",
    "border-l-fuchsia-500 bg-fuchsia-50",
    "border-l-slate-500 bg-slate-50",
  ];

  return (
    <div className="space-y-8">
      {/* Objectives Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 flex items-center text-xl font-semibold text-gray-900">
                <span className="mr-3">🎯</span>
                Objetivos de la Consulta
              </h3>
              <p className="text-gray-600">
                Define los objetivos principales que buscas alcanzar
                <span className="mt-1 block text-sm font-medium text-blue-600">
                  Se requieren mínimo 2 objetivos
                </span>
              </p>
            </div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {formData.objectives.length} objetivos
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {formData.objectives.map((objective, index) => (
              <div
                key={index}
                className={`relative rounded-xl border border-l-4 border-gray-200 transition-all duration-200 ${objectiveColors[index % objectiveColors.length]}`}
              >
                <div className="absolute top-4 -left-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-200 bg-white shadow-sm">
                  <span className="text-lg font-bold text-blue-600">
                    {index + 1}
                  </span>
                </div>

                <div className="ml-6 p-4">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1 space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Objetivo {index + 1}
                      </label>
                      <input
                        type="text"
                        className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                        placeholder={`Ej: Mejorar la calidad de vida en el sector...`}
                        value={objective}
                        onChange={(e) =>
                          updateArrayItem("objectives", index, e.target.value)
                        }
                      />
                    </div>
                    {formData.objectives.length > 3 && (
                      <button
                        className="group flex-shrink-0 rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
                        onClick={() => removeArrayItem("objectives", index)}
                        title="Eliminar objetivo"
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
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
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="group flex w-full items-center justify-center rounded-xl border-2 border-blue-300 bg-blue-50 p-4 transition-all duration-200 hover:border-blue-400 hover:bg-blue-100"
              onClick={() => addArrayItem("objectives", "")}
            >
              <span className="text-lg font-semibold text-blue-700">
                Agregar Nuevo Objetivo
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Survey Options Definitions Section */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 flex items-center text-xl font-semibold text-gray-900">
                <span className="mr-3">📄</span>
                Definiciones de Conceptos
              </h3>
              <p className="text-gray-600">
                Define las opciones principales que estarán disponibles
                <span className="mt-1 block text-sm font-medium text-green-600">
                  Se requieren mínimo 5 definiciones
                </span>
              </p>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              {formData.survey_options_definitions.length} definiciones
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {formData.survey_options_definitions.map((definition, index) => (
              <div
                key={index}
                className={`relative rounded-xl border border-l-4 border-gray-200 transition-all duration-200 hover:shadow-md ${definitionColors[index % definitionColors.length]}`}
              >
                <div className="absolute top-4 -left-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-green-200 bg-white shadow-sm">
                  <span className="text-lg font-bold text-green-600">
                    {index + 1}
                  </span>
                </div>

                <div className="ml-6 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        <span className="mr-1">📄</span>
                        Definición {index + 1}
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                        placeholder={`Ej: Opción para mejorar infraestructura...`}
                        value={definition.name}
                        onChange={(e) =>
                          updateArrayItem("survey_options_definitions", index, {
                            ...definition,
                            name: e.target.value,
                          })
                        }
                      />
                      <label className="my-2 block text-sm font-medium text-gray-700">
                        Descripción
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                        placeholder={`Descripción de la opción...`}
                        value={definition.description}
                        onChange={(e) =>
                          updateArrayItem("survey_options_definitions", index, {
                            ...definition,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    {formData.survey_options_definitions.length > 5 && (
                      <button
                        className="group flex-shrink-0 rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
                        onClick={() =>
                          removeArrayItem("survey_options_definitions", index)
                        }
                        title="Eliminar definición"
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          🗑️
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="group flex w-full items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-4 transition-all duration-200 hover:border-green-400 hover:bg-green-100"
              onClick={() =>
                addArrayItem("survey_options_definitions", {
                  name: "",
                  description: "",
                })
              }
            >
              <span className="mr-3 text-xl transition-transform duration-200 group-hover:scale-110">
                ➕
              </span>
              <span className="text-lg font-semibold text-green-700">
                Agregar Nueva Definición
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 flex items-center text-xl font-semibold text-gray-900">
                <span className="mr-3">❓</span>
                Preguntas Frecuentes
              </h3>
              <p className="text-gray-600">
                Configura las preguntas más comunes y sus respuestas
                <span className="mt-1 block text-sm font-medium text-orange-600">
                  Se requieren mínimo 3 preguntas frecuentes
                </span>
              </p>
            </div>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
              {formData.frequently_asked_questions.length} preguntas
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {formData.frequently_asked_questions.map((faq, index) => (
              <div
                key={index}
                className={`relative rounded-xl border border-l-4 border-gray-200 transition-all duration-200 hover:shadow-md ${faqColors[index % faqColors.length]}`}
              >
                <div className="absolute top-6 -left-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-orange-200 bg-white shadow-sm">
                  <span className="text-lg font-bold text-orange-600">
                    {index + 1}
                  </span>
                </div>

                <div className="ml-6 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1 text-lg font-semibold text-gray-900">
                        Pregunta Frecuente {index + 1}
                        {faq.question && (
                          <span className="ml-2 font-normal text-gray-600">
                            - {faq.question.substring(0, 40)}
                            {faq.question.length > 40 && "..."}
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">
                          ❓ {faq.question ? "Con pregunta" : "Sin pregunta"}
                        </span>
                        <span>
                          💬 {faq.answer ? "Con respuesta" : "Sin respuesta"}
                        </span>
                      </div>
                    </div>
                    {formData.frequently_asked_questions.length > 3 && (
                      <button
                        className="group ml-4 rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
                        onClick={() =>
                          removeArrayItem("frequently_asked_questions", index)
                        }
                        title="Eliminar pregunta frecuente"
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          🗑️
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        <span className="mr-1">❓</span>
                        Pregunta
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                        placeholder="Ej: ¿Cómo puedo participar en la consulta?"
                        value={faq.question}
                        onChange={(e) =>
                          updateArrayItem("frequently_asked_questions", index, {
                            ...faq,
                            question: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        <span className="mr-1">💬</span>
                        Respuesta
                      </label>
                      <textarea
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                        placeholder="Proporciona una respuesta clara y detallada..."
                        rows={4}
                        value={faq.answer}
                        onChange={(e) =>
                          updateArrayItem("frequently_asked_questions", index, {
                            ...faq,
                            answer: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="group flex w-full items-center justify-center rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 p-4 transition-all duration-200 hover:border-orange-400 hover:bg-orange-100"
              onClick={() =>
                addArrayItem("frequently_asked_questions", {
                  question: "",
                  answer: "",
                })
              }
            >
              <span className="mr-3 text-xl transition-transform duration-200 group-hover:scale-110">
                ➕
              </span>
              <span className="text-lg font-semibold text-orange-700">
                Agregar Nueva Pregunta Frecuente
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <h4 className="mb-3 flex items-center font-semibold text-blue-900">
          <span className="mr-2">💡</span>
          Consejos para crear contenido efectivo
        </h4>
        <div className="grid grid-cols-1 gap-4 text-sm text-blue-800 md:grid-cols-3">
          <div className="space-y-2">
            <h5 className="font-medium">🎯 Objetivos</h5>
            <ul className="space-y-1">
              <li className="flex items-start">
                <span className="mt-0.5 mr-2">•</span>
                <span>Sean específicos y medibles</span>
              </li>
              <li className="flex items-start">
                <span className="mt-0.5 mr-2">•</span>
                <span>Reflejen las necesidades reales</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium">📄 Definiciones</h5>
            <ul className="space-y-1">
              <li className="flex items-start">
                <span className="mt-0.5 mr-2">•</span>
                <span>Claras y comprensibles</span>
              </li>
              <li className="flex items-start">
                <span className="mt-0.5 mr-2">•</span>
                <span>Cubran todas las opciones</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium">❓ Preguntas FAQ</h5>
            <ul className="space-y-1">
              <li className="flex items-start">
                <span className="mt-0.5 mr-2">•</span>
                <span>Anticipen dudas comunes</span>
              </li>
              <li className="flex items-start">
                <span className="mt-0.5 mr-2">•</span>
                <span>Respuestas completas y útiles</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
