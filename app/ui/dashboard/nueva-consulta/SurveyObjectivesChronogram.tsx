"use client";

import {
  ArrayItemTypeMap,
  FormDataArrays,
  SurveyFormData,
} from "@/app/lib/definitions/encuesta";

type SurveyContentProps = {
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

export default function SurveyContent({
  formData,
  updateArrayItem,
  removeArrayItem,
  addArrayItem,
}: SurveyContentProps) {
  return (
    <div className="space-y-8">
      {/* Objectives Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-8">
          <h2 className="border-b border-gray-200/80 pt-7 pb-5 text-xl font-bold text-slate-700">
            Objetivos de la Consulta
          </h2>
        </div>
        <div className="p-8 pt-6 pb-0">
          <p className="text-sm font-semibold text-slate-700">
            Especifica los objetivos principales que buscas alcanzar.
          </p>
          <p className="text-sm text-slate-600">
            Se requieren 2 objetivos como mínimo.
          </p>
        </div>

        <div className="p-6 pt-4">
          <div className="">
            {formData.objectives.map((objective, index) => (
              <div key={index} className="relative">
                <div className="py-2">
                  <div className="flex items-end space-x-3">
                    <div className="relative flex-1 space-y-1 pl-8">
                      <label className="block text-sm font-semibold text-gray-700">
                        Objetivo {index + 1}
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="h-10 w-full rounded-r-lg border border-l-0 border-slate-300 bg-white p-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                        placeholder={`Ej: Mejorar la calidad de vida en el sector...`}
                        value={objective}
                        onChange={(e) =>
                          updateArrayItem("objectives", index, e.target.value)
                        }
                      />
                      <div className="absolute bottom-1 left-0 flex h-10 w-8 items-center justify-center rounded-l-lg bg-emerald-400">
                        <span className="text-sm font-bold text-white">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    {formData.objectives.length > 3 && (
                      <button
                        className="group mb-2 flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-gray-500 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"
                        onClick={() => removeArrayItem("objectives", index)}
                        title="Eliminar objetivo"
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
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="group flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 transition-all duration-200 hover:border-gray-400 hover:bg-blue-600"
              onClick={() => addArrayItem("objectives", "")}
            >
              <span className="font-medium text-white">Agregar Objetivo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chronogram Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-8">
          <h2 className="border-b border-gray-200/80 pt-7 pb-5 text-xl font-bold text-slate-700">
            Cronograma del Proyecto
          </h2>
        </div>
        <div className="p-8 pt-6 pb-0">
          <p className="text-sm font-semibold text-slate-700">
            Define las etapas que tendrá el proyecto.
          </p>
          <p className="text-sm text-slate-600">
            Se requieren 2 fases como mínimo.
          </p>
        </div>

        <div className="pt-6">
          <div className="">
            {formData.chronogram.map((phase, index) => (
              <div
                key={index}
                className="relative border-y border-b-0 border-gray-200/80 bg-gray-50 last:border-b"
              >
                {/* Phase Number Badge */}
                <div className="sflex absolute top-5.5 left-4 hidden h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm">
                  <span className="text-sm font-bold text-gray-600">
                    {index + 1}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-emerald-500 px-8 py-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Etapa {index + 1}
                      {phase.phase && (
                        <span className="ml-2 text-base font-normal text-white">
                          - {phase.phase}
                        </span>
                      )}
                    </h4>
                  </div>
                  {formData.chronogram.length > 3 && (
                    <button
                      className="group ml-4 cursor-pointer rounded-lg bg-emerald-700 p-2 text-gray-100 transition-all duration-200 hover:bg-emerald-600"
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
                <div className="px-8 py-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div>
                        <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                          Nombre de la Etapa
                          <span className="ml-1 text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={40}
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
                        <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                          Fecha Estimada
                          <span className="ml-1 text-red-500">*</span>
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
                      <label className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                        Descripción de la Etapa
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                      <textarea
                        maxLength={70}
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
          <div className="m-8">
            <button
              className="group flex h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 transition-all duration-200 hover:border-gray-400 hover:bg-blue-600"
              onClick={() =>
                addArrayItem("chronogram", {
                  phase: "",
                  description: "",
                  date: "",
                })
              }
            >
              <span className="font-medium text-white">Agregar Etapa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
