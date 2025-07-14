"use client";

import { FormData } from "./NewSurveyContentLayout";

type SurveyPreviewProps = {
  formData: FormData;
  handleSubmit: () => void;
};

export default function SurveyPreview({
  formData,
  handleSubmit,
}: SurveyPreviewProps) {
  const completedObjectives = formData.objectives.filter((obj) =>
    obj.trim(),
  ).length;
  const completedFAQs = formData.frequently_asked_questions.filter((faq) =>
    faq.question.trim(),
  ).length;
  const completedChronogram = formData.chronogram.filter((phase) =>
    phase.phase.trim(),
  ).length;

  const completionStats = [
    {
      label: "Objetivos",
      count: completedObjectives,
      icon: "🎯",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      label: "Preguntas",
      count: formData.questions.length,
      icon: "❓",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      label: "FAQ",
      count: completedFAQs,
      icon: "💬",
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      label: "Fases del Cronograma",
      count: completedChronogram,
      icon: "📅",
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-2xl text-white shadow-lg">
          👁️
        </div>
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            Revisión Final
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Revisa cuidadosamente toda la información antes de crear la consulta
            ciudadana
          </p>
        </div>
      </div>

      {/* Survey Overview Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Información General
          </h3>
          <p className="text-gray-600">Datos básicos de la consulta</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="group">
                <div className="mb-2 flex items-center">
                  <span className="mr-2 text-lg">📝</span>
                  <h4 className="font-semibold text-gray-900">
                    Nombre de la Consulta
                  </h4>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="font-medium text-gray-800">
                    {formData.survey_name || "Sin definir"}
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="mb-2 flex items-center">
                  <span className="mr-2 text-lg">🏢</span>
                  <h4 className="font-semibold text-gray-900">Departamento</h4>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="font-medium text-gray-800">
                    {formData.department || "Sin definir"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group">
                <div className="mb-2 flex items-center">
                  <span className="mr-2 text-lg">📅</span>
                  <h4 className="font-semibold text-gray-900">
                    Período de Consulta
                  </h4>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="font-medium text-gray-800">
                    {formData.start_date && formData.end_date
                      ? `${formData.start_date} - ${formData.end_date}`
                      : "Sin definir"}
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="mb-2 flex items-center">
                  <span className="mr-2 text-lg">📄</span>
                  <h4 className="font-semibold text-gray-900">Descripción</h4>
                </div>
                <div className="max-h-24 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm leading-relaxed text-gray-800">
                    {formData.survey_short_description || "Sin definir"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {completionStats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl border-2 p-6 text-center transition-all duration-200 hover:shadow-md ${stat.color}`}
          >
            <div className="mb-2 text-2xl">{stat.icon}</div>
            <div className="mb-1 text-2xl font-bold">{stat.count}</div>
            <div className="text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Detailed Content Preview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Objectives Preview */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-blue-200 bg-blue-50 p-4">
            <h4 className="flex items-center font-semibold text-blue-900">
              <span className="mr-2">🎯</span>
              Objetivos ({completedObjectives})
            </h4>
          </div>
          <div className="max-h-48 overflow-y-auto p-4">
            {completedObjectives > 0 ? (
              <ul className="space-y-2">
                {formData.objectives
                  .filter((obj) => obj.trim())
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mt-1 mr-2 text-blue-500">•</span>
                      <span className="text-sm text-gray-700">{objective}</span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No hay objetivos definidos
              </p>
            )}
          </div>
        </div>

        {/* Questions Preview */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-purple-200 bg-purple-50 p-4">
            <h4 className="flex items-center font-semibold text-purple-900">
              <span className="mr-2">❓</span>
              Preguntas ({formData.questions.length})
            </h4>
          </div>
          <div className="max-h-48 overflow-y-auto p-4">
            {formData.questions.length > 0 ? (
              <ul className="space-y-3">
                {formData.questions.slice(0, 3).map((question, index) => (
                  <li key={index} className="border-l-2 border-purple-200 pl-3">
                    <p className="text-sm font-medium text-gray-800">
                      {index + 1}. {question.text || "Pregunta sin título"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {question.options.length} opciones
                      {question.isMapQuestion && " • Pregunta de mapa"}
                    </p>
                  </li>
                ))}
                {formData.questions.length > 3 && (
                  <li className="pl-3 text-xs text-gray-500 italic">
                    +{formData.questions.length - 3} preguntas más...
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No hay preguntas configuradas
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-8 text-center">
        <div className="mx-auto max-w-md space-y-4">
          <div className="mb-4 text-4xl">🚀</div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            ¿Todo listo para crear la consulta?
          </h3>
          <p className="mb-6 text-gray-600">
            Una vez creada, podrás publicarla y comenzar a recibir respuestas de
            los ciudadanos.
          </p>
          <button
            className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-green-700 hover:to-green-800 hover:shadow-xl"
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
