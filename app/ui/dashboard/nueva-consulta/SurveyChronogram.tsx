"use client";

import {
  ArrayItemTypeMap,
  FormData,
  FormDataArrays,
} from "@/app/dashboard/nueva-consulta/page";

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
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full text-white text-2xl shadow-lg">
          ⏱️
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Cronograma del Proyecto</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Define las fases y etapas del proyecto de consulta ciudadana
            <span className="block text-sm mt-1 text-orange-600 font-medium">
              Se requieren mínimo 3 fases para el proyecto
            </span>
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Progreso del Cronograma</h3>
          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {formData.chronogram.length} fases definidas
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((formData.chronogram.length / 5) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {formData.chronogram.length < 3 
            ? `Faltan ${3 - formData.chronogram.length} fases mínimas`
            : "Cronograma completo"}
        </p>
      </div>

      {/* Timeline Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
            <span className="mr-3">📋</span>
            Fases del Proyecto
          </h3>
          <p className="text-gray-600">Organiza las etapas de tu consulta ciudadana</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {formData.chronogram.map((phase, index) => (
              <div 
                key={index} 
                className={`relative border-l-4 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md ${phaseColors[index % phaseColors.length]}`}
              >
                {/* Phase Number Badge */}
                <div className="absolute -left-6 top-6 w-12 h-12 bg-white border-4 border-orange-200 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-orange-600 font-bold text-lg">{index + 1}</span>
                </div>
                
                <div className="p-6 ml-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        Fase {index + 1}
                        {phase.phase && (
                          <span className="text-gray-600 font-normal ml-2">- {phase.phase}</span>
                        )}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">📅 {phase.date || "Fecha por definir"}</span>
                        <span>📝 {phase.description ? "Con descripción" : "Sin descripción"}</span>
                      </div>
                    </div>
                    {formData.chronogram.length > 3 && (
                      <button
                        className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-200 transition-all duration-200 hover:border-red-300 group"
                        onClick={() => removeArrayItem("chronogram", index)}
                        title="Eliminar fase"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-200">🗑️</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="mr-1">📝</span>
                          Nombre de la Fase
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="mr-1">📅</span>
                          Fecha Estimada
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="mr-1">📄</span>
                        Descripción de la Fase
                      </label>
                      <textarea
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
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
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              className="w-full flex items-center justify-center rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 p-6 transition-all duration-200 group"
              onClick={() =>
                addArrayItem("chronogram", {
                  phase: "",
                  description: "",
                  date: "",
                })
              }
            >
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-200">➕</span>
              <span className="text-lg font-semibold text-orange-700">
                Agregar Nueva Fase
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
          <span className="mr-2">💡</span>
          Consejos para un buen cronograma
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="mr-2 mt-0.5">•</span>
            <span>Define fases claras y específicas para cada etapa del proyecto</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-0.5">•</span>
            <span>Incluye tiempo suficiente para la recolección y análisis de respuestas</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 mt-0.5">•</span>
            <span>Considera fechas realistas que permitan una participación ciudadana efectiva</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
