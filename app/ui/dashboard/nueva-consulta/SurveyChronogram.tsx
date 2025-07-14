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
  const phaseColors = [
    "border-l-blue-500 bg-blue-50",
    "border-l-green-500 bg-green-50",
    "border-l-purple-500 bg-purple-50",
    "border-l-orange-500 bg-orange-50",
    "border-l-red-500 bg-red-50",
    "border-l-indigo-500 bg-indigo-50",
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-2xl text-white shadow-lg">
          ⏱️
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Cronograma del Proyecto
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Define las fases y etapas del proyecto de consulta ciudadana
            <span className="mt-1 block text-sm font-medium text-orange-600">
              Se requieren mínimo 3 fases para el proyecto
            </span>
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-6">
          <h3 className="mb-2 flex items-center text-xl font-semibold text-gray-900">
            <span className="mr-3">📋</span>
            Fases del Proyecto
          </h3>
          <p className="text-gray-600">
            Organiza las etapas de tu consulta ciudadana
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {formData.chronogram.map((phase, index) => (
              <div
                key={index}
                className={`relative rounded-xl border border-l-4 border-gray-200 transition-all duration-200 hover:shadow-md ${phaseColors[index % phaseColors.length]}`}
              >
                {/* Phase Number Badge */}
                <div className="absolute top-6 -left-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-orange-200 bg-white shadow-sm">
                  <span className="text-lg font-bold text-orange-600">
                    {index + 1}
                  </span>
                </div>

                <div className="ml-6 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1 text-lg font-semibold text-gray-900">
                        Fase {index + 1}
                        {phase.phase && (
                          <span className="ml-2 font-normal text-gray-600">
                            - {phase.phase}
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">
                          📅 {phase.date || "Fecha por definir"}
                        </span>
                        <span>
                          📝{" "}
                          {phase.description
                            ? "Con descripción"
                            : "Sin descripción"}
                        </span>
                      </div>
                    </div>
                    {formData.chronogram.length > 3 && (
                      <button
                        className="group ml-4 rounded-lg border border-red-200 p-2 text-red-500 transition-all duration-200 hover:border-red-300 hover:bg-red-50"
                        onClick={() => removeArrayItem("chronogram", index)}
                        title="Eliminar fase"
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          🗑️
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
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
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
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
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
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
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
              className="group flex w-full items-center justify-center rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 p-6 transition-all duration-200 hover:border-orange-400 hover:bg-orange-100"
              onClick={() =>
                addArrayItem("chronogram", {
                  phase: "",
                  description: "",
                  date: "",
                })
              }
            >
              <span className="mr-3 text-2xl transition-transform duration-200 group-hover:scale-110">
                ➕
              </span>
              <span className="text-lg font-semibold text-orange-700">
                Agregar Nueva Fase
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
        <h4 className="mb-3 flex items-center font-semibold text-blue-900">
          <span className="mr-2">💡</span>
          Consejos para un buen cronograma
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="mt-0.5 mr-2">•</span>
            <span>
              Define fases claras y específicas para cada etapa del proyecto
            </span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2">•</span>
            <span>
              Incluye tiempo suficiente para la recolección y análisis de
              respuestas
            </span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2">•</span>
            <span>
              Considera fechas realistas que permitan una participación
              ciudadana efectiva
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
