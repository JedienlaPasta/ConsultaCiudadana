"use client";

import { FormData } from "@/app/dashboard/nueva-consulta/page";

type SurveyPreviewProps = {
  formData: FormData;
  handleSubmit: () => void;
};

export default function SurveyPreview({
  formData,
  handleSubmit,
}: SurveyPreviewProps) {
  const completedObjectives = formData.objectives.filter((obj) => obj.trim()).length;
  const completedFAQs = formData.frequently_asked_questions.filter((faq) => faq.question.trim()).length;
  const completedChronogram = formData.chronogram.filter((phase) => phase.phase.trim()).length;
  
  const completionStats = [
    { label: "Objetivos", count: completedObjectives, icon: "🎯", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Preguntas", count: formData.questions.length, icon: "❓", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { label: "FAQ", count: completedFAQs, icon: "💬", color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Fases del Cronograma", count: completedChronogram, icon: "📅", color: "bg-orange-50 text-orange-700 border-orange-200" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full text-white text-2xl shadow-lg">
          👁️
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Revisión Final</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Revisa cuidadosamente toda la información antes de crear la consulta ciudadana
          </p>
        </div>
      </div>

      {/* Survey Overview Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Información General</h3>
          <p className="text-gray-600">Datos básicos de la consulta</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">📝</span>
                  <h4 className="font-semibold text-gray-900">Nombre de la Consulta</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-800 font-medium">
                    {formData.survey_name || "Sin definir"}
                  </p>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">🏢</span>
                  <h4 className="font-semibold text-gray-900">Departamento</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-800 font-medium">
                    {formData.department || "Sin definir"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">📅</span>
                  <h4 className="font-semibold text-gray-900">Período de Consulta</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-800 font-medium">
                    {formData.start_date && formData.end_date
                      ? `${formData.start_date} - ${formData.end_date}`
                      : "Sin definir"}
                  </p>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">📄</span>
                  <h4 className="font-semibold text-gray-900">Descripción</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-24 overflow-y-auto">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {formData.survey_short_description || "Sin definir"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {completionStats.map((stat, index) => (
          <div key={index} className={`rounded-xl border-2 p-6 text-center transition-all duration-200 hover:shadow-md ${stat.color}`}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold mb-1">{stat.count}</div>
            <div className="text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Detailed Content Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Objectives Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-50 border-b border-blue-200 p-4">
            <h4 className="font-semibold text-blue-900 flex items-center">
              <span className="mr-2">🎯</span>
              Objetivos ({completedObjectives})
            </h4>
          </div>
          <div className="p-4 max-h-48 overflow-y-auto">
            {completedObjectives > 0 ? (
              <ul className="space-y-2">
                {formData.objectives.filter(obj => obj.trim()).map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    <span className="text-sm text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">No hay objetivos definidos</p>
            )}
          </div>
        </div>

        {/* Questions Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-purple-50 border-b border-purple-200 p-4">
            <h4 className="font-semibold text-purple-900 flex items-center">
              <span className="mr-2">❓</span>
              Preguntas ({formData.questions.length})
            </h4>
          </div>
          <div className="p-4 max-h-48 overflow-y-auto">
            {formData.questions.length > 0 ? (
              <ul className="space-y-3">
                {formData.questions.slice(0, 3).map((question, index) => (
                  <li key={index} className="border-l-2 border-purple-200 pl-3">
                    <p className="text-sm font-medium text-gray-800">
                      {index + 1}. {question.text || "Pregunta sin título"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {question.options.length} opciones
                      {question.isMapQuestion && " • Pregunta de mapa"}
                    </p>
                  </li>
                ))}
                {formData.questions.length > 3 && (
                  <li className="text-xs text-gray-500 italic pl-3">
                    +{formData.questions.length - 3} preguntas más...
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">No hay preguntas configuradas</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¿Todo listo para crear la consulta?
          </h3>
          <p className="text-gray-600 mb-6">
            Una vez creada, podrás publicarla y comenzar a recibir respuestas de los ciudadanos.
          </p>
          <button
            className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
            onClick={handleSubmit}
          >
            <span className="mr-3 text-xl">💾</span>
            Crear Consulta Ciudadana
          </button>
        </div>
      </div>
    </div>
  );
}
