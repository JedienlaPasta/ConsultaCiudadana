"use client";

import {
  ArrayItemTypeMap,
  FormDataArrays,
  SurveyFormData,
} from "@/app/lib/definitions/encuesta";

type SurveyChronogramProps = {
  formData: SurveyFormData;
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

export default function SurveyConceptsFAQ({
  formData,
  removeArrayItem,
  updateArrayItem,
  addArrayItem,
}: SurveyChronogramProps) {
  return (
    <div className="space-y-8">
      {/* Survey Options Definitions Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative px-8">
          <h2 className="border-b border-gray-200/80 pt-7 pb-5 text-xl font-bold text-slate-700">
            Conceptos Técnicos
          </h2>
          <span className="absolute top-7 right-8 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {formData.survey_options_definitions.length} conceptos
          </span>
        </div>
        <div className="p-8 pt-6 pb-0">
          <p className="text-sm font-semibold text-slate-700">
            Lista todos los términos técnicos utilizados en la consulta.
          </p>
          <p className="text-sm text-slate-600">
            Define y explica brevemente dichos conceptos para el entendimiento
            de los votantes.
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {formData.survey_options_definitions.map((definition, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between bg-emerald-500 px-8 py-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Concepto {index + 1}
                      {definition.name && (
                        <span className="ml-2 text-base font-normal text-white">
                          - {definition.name.substring(0, 40)}
                          {definition.name.length > 40 && "..."}
                        </span>
                      )}
                    </h4>
                  </div>
                  {formData.survey_options_definitions.length > 5 && (
                    <button
                      className="group ml-4 cursor-pointer rounded-lg bg-emerald-700 p-2 text-gray-100 transition-all duration-200 hover:bg-emerald-600"
                      onClick={() =>
                        removeArrayItem("survey_options_definitions", index)
                      }
                      title="Eliminar definición"
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
                <div className="px-8 py-6">
                  <div className="flex-1 space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      Concepto
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                      placeholder={`Ej: Opción para mejorar infraestructura...`}
                      value={definition.name}
                      onChange={(e) =>
                        updateArrayItem("survey_options_definitions", index, {
                          ...definition,
                          name: e.target.value,
                        })
                      }
                    />
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      Descripción
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                      placeholder="Descripción del concepto..."
                      rows={3}
                      value={definition.description}
                      onChange={(e) =>
                        updateArrayItem("survey_options_definitions", index, {
                          ...definition,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="group flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 transition-all duration-200 hover:border-gray-400 hover:bg-blue-600"
              onClick={() =>
                addArrayItem("survey_options_definitions", {
                  name: "",
                  description: "",
                })
              }
            >
              <span className="font-medium text-white">Agregar Concepto</span>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="relative px-8">
          <h2 className="border-b border-gray-200/80 pt-7 pb-5 text-xl font-bold text-slate-700">
            Preguntas Frecuentes
          </h2>
          <span className="absolute top-7 right-8 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {formData.frequently_asked_questions.length} preguntas
          </span>
        </div>
        <div className="p-8 pt-6 pb-0">
          <p className="text-sm font-semibold text-slate-700">
            Lista de preguntas frecuentes referentes a tu consulta.
          </p>
          <p className="text-sm text-slate-600">
            Esta sección puede ser util para explicar por que se hace el
            proyecto, como se hace, etc.
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {formData.frequently_asked_questions.map((faq, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between bg-emerald-500 px-8 py-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Pregunta Frecuente {index + 1}
                      {faq.question && (
                        <span className="ml-2 text-base font-normal text-white">
                          - {faq.question.substring(0, 40)}
                          {faq.question.length > 40 && "..."}
                        </span>
                      )}
                    </h4>
                  </div>
                  {formData.frequently_asked_questions.length > 3 && (
                    <button
                      className="group ml-4 cursor-pointer rounded-lg bg-emerald-700 p-2 text-gray-100 transition-all duration-200 hover:bg-emerald-600"
                      onClick={() =>
                        removeArrayItem("frequently_asked_questions", index)
                      }
                      title="Eliminar pregunta frecuente"
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

                <div className="px-8 py-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        Pregunta
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
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

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-semibold text-gray-700">
                        Respuesta
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                      <textarea
                        className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
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
              className="group flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 transition-all duration-200 hover:border-gray-400 hover:bg-blue-600"
              onClick={() =>
                addArrayItem("frequently_asked_questions", {
                  question: "",
                  answer: "",
                })
              }
            >
              <span className="font-medium text-white">
                Agregar Pregunta Frecuente
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
