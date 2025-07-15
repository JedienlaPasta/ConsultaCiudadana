"use client";

import {
  ArrayItemTypeMap,
  FormData,
  FormDataArrays,
} from "./NewSurveyContentLayout";

type SurveyChronogramProps = {
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

export default function SurveyChronogram({
  formData,
  removeArrayItem,
  updateArrayItem,
  addArrayItem,
}: SurveyChronogramProps) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-white">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-700">
                  Cronograma del Proyecto
                </h2>
                <p className="mt-1 text-slate-600">
                  Define las fases y etapas del proyecto de consulta ciudadana
                  <span className="mt-1 block text-sm font-medium text-gray-700">
                    Se requieren mínimo 3 fases para el proyecto
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {formData.chronogram.map((phase, index) => (
              <div
                key={index}
                className="relative rounded-lg border border-gray-200 bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                {/* Phase Number Badge */}
                <div className="absolute top-6 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm">
                  <span className="text-sm font-bold text-gray-600">
                    {index + 1}
                  </span>
                </div>

                <div className="py-6 pr-4 pl-16">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Fase {index + 1}
                        {phase.phase && (
                          <span className="ml-2 font-normal text-gray-600">
                            - {phase.phase}
                          </span>
                        )}
                      </h4>
                    </div>
                    {formData.chronogram.length > 3 && (
                      <button
                        className="group ml-4 rounded-lg border border-gray-300 p-2 text-gray-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        onClick={() => removeArrayItem("chronogram", index)}
                        title="Eliminar fase"
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

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          <span className="mr-1">📝</span>
                          Nombre de la Fase
                        </label>
                        <input
                          type="text"
                          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                          placeholder="Ej: Planificación inicial, Recolección de datos..."
                          value={phase.phase}
                          onChange={(e) =>
                            updateArrayItem("chronogram", index, {
                              ...phase,
                              phase: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          <span className="mr-1">📅</span>
                          Fecha Estimada
                        </label>
                        <input
                          type="text"
                          className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                          placeholder="Ej: Enero 2024, Semana 1-2..."
                          value={phase.date}
                          onChange={(e) =>
                            updateArrayItem("chronogram", index, {
                              ...phase,
                              date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        <span className="mr-1">📄</span>
                        Descripción de la Fase
                      </label>
                      <textarea
                        className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                        placeholder="Describe las actividades y objetivos de esta fase..."
                        rows={3}
                        value={phase.description}
                        onChange={(e) =>
                          updateArrayItem("chronogram", index, {
                            ...phase,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Phase Button */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <button
              className="group flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 transition-all duration-200 hover:border-gray-400 hover:bg-gray-100"
              onClick={() =>
                addArrayItem("chronogram", {
                  phase: "",
                  description: "",
                  date: "",
                })
              }
            >
              <span className="mr-3 text-2xl transition-transform duration-200 group-hover:scale-110">
                +
              </span>
              <span className="text-lg font-semibold text-gray-700">
                Agregar Nueva Fase
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
