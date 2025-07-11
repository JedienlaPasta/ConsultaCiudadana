"use client";

import { FormData } from "@/app/dashboard/nueva-consulta/page";
import { useState, useEffect } from "react";

type SurveyGeneralInfoProps = {
  formData: FormData;
  updateFormData: (field: string, value: string) => void;
};

export default function SurveyGeneralInfo({
  formData,
  updateFormData,
}: SurveyGeneralInfoProps) {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Calculate completion percentage
  useEffect(() => {
    const requiredFields = [
      "survey_name",
      "department",
      "survey_short_description",
      "survey_large_description",
      "start_date",
      "end_date",
    ];

    const completedFields = requiredFields.filter(
      (field) =>
        formData[field as keyof FormData] &&
        String(formData[field as keyof FormData]).trim() !== "",
    ).length;

    const percentage = Math.round(
      (completedFields / requiredFields.length) * 100,
    );
    setCompletionPercentage(percentage);
  }, [formData]);

  // Validation function
  const validateField = (field: string, value: string) => {
    const errors: Record<string, string> = { ...validationErrors };

    switch (field) {
      case "survey_name":
        if (value.length < 10) {
          errors[field] = "El nombre debe tener al menos 10 caracteres";
        } else {
          delete errors[field];
        }
        break;
      case "survey_short_description":
        if (value.length < 20) {
          errors[field] =
            "La descripción corta debe tener al menos 20 caracteres";
        } else if (value.length > 200) {
          errors[field] =
            "La descripción corta no puede exceder 200 caracteres";
        } else {
          delete errors[field];
        }
        break;
      case "survey_large_description":
        if (value.length < 50) {
          errors[field] =
            "La descripción detallada debe tener al menos 50 caracteres";
        } else {
          delete errors[field];
        }
        break;
      case "start_date":
      case "end_date":
        if (
          field === "end_date" &&
          formData.start_date &&
          value <= formData.start_date
        ) {
          errors[field] =
            "La fecha de término debe ser posterior a la fecha de inicio";
        } else {
          delete errors[field];
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleFieldChange = (field: string, value: string) => {
    updateFormData(field, value);
    validateField(field, value);
  };

  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-green-500";
    if (completionPercentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getProgressTextColor = () => {
    if (completionPercentage >= 80) return "text-green-700";
    if (completionPercentage >= 50) return "text-yellow-700";
    return "text-red-700";
  };

  return (
    <div className="space-y-8">
      {/* Progress Overview Card */}
      <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Progreso de Información Básica
              </h3>
              <p className="text-sm text-gray-600">
                Completa todos los campos requeridos
              </p>
            </div>
          </div>
          <div className={`text-2xl font-bold ${getProgressTextColor()}`}>
            {completionPercentage}%
          </div>
        </div>
        <div className="h-3 w-full rounded-full bg-gray-200">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Enhanced Main Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="border-b border-gray-100 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Información Básica
                </h2>
                <p className="mt-1 text-blue-100">
                  Configura la información principal de la consulta ciudadana
                </p>
              </div>
            </div>
            <div className="hidden items-center space-x-2 text-white/80 md:flex">
              <span className="text-sm">Paso 1 de 5</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <span className="text-sm font-semibold">1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="mr-2">📝</span>
                  Nombre de la Consulta
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                      validationErrors.survey_name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : formData.survey_name
                          ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    placeholder="Ej: Plan PIIMEP - Mejora de Espacios Públicos"
                    value={formData.survey_name}
                    onChange={(e) =>
                      handleFieldChange("survey_name", e.target.value)
                    }
                  />
                  {formData.survey_name && !validationErrors.survey_name && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <span className="text-green-500">✓</span>
                    </div>
                  )}
                </div>
                {validationErrors.survey_name && (
                  <p className="flex items-center text-sm text-red-600">
                    <span className="mr-1">⚠️</span>
                    {validationErrors.survey_name}
                  </p>
                )}
                <div className="text-xs text-gray-500">
                  {formData.survey_name.length}/100 caracteres
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="mr-2">🏢</span>
                  Departamento
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className={`w-full appearance-none rounded-lg border px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                      formData.department
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    value={formData.department}
                    onChange={(e) =>
                      handleFieldChange("department", e.target.value)
                    }
                  >
                    <option value="">Selecciona el departamento</option>
                    <option value="secpla">SECPLA</option>
                    <option value="obras">Obras Públicas</option>
                    <option value="medio-ambiente">Medio Ambiente</option>
                    <option value="turismo">Turismo</option>
                    <option value="educacion">Educación</option>
                    <option value="salud">Salud</option>
                  </select>
                  <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                    <span className="text-gray-400">▼</span>
                  </div>
                  {formData.department && (
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 transform">
                      <span className="text-green-500">✓</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">📝</span>
                Descripción Corta
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                    validationErrors.survey_short_description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : formData.survey_short_description &&
                          formData.survey_short_description.length >= 20
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  placeholder="Descripción breve que aparecerá en las listas de consultas"
                  rows={3}
                  value={formData.survey_short_description}
                  onChange={(e) =>
                    handleFieldChange(
                      "survey_short_description",
                      e.target.value,
                    )
                  }
                />
                {formData.survey_short_description &&
                  !validationErrors.survey_short_description &&
                  formData.survey_short_description.length >= 20 && (
                    <div className="absolute top-3 right-3">
                      <span className="text-green-500">✓</span>
                    </div>
                  )}
              </div>
              {validationErrors.survey_short_description && (
                <p className="flex items-center text-sm text-red-600">
                  <span className="mr-1">⚠️</span>
                  {validationErrors.survey_short_description}
                </p>
              )}
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mínimo 20 caracteres</span>
                <span
                  className={
                    formData.survey_short_description.length > 200
                      ? "text-red-500"
                      : ""
                  }
                >
                  {formData.survey_short_description.length}/200 caracteres
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <span className="mr-2">📄</span>
                Descripción Detallada
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                    validationErrors.survey_large_description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : formData.survey_large_description &&
                          formData.survey_large_description.length >= 50
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  placeholder="Descripción completa que aparecerá en la página de detalle de la consulta"
                  rows={6}
                  value={formData.survey_large_description}
                  onChange={(e) =>
                    handleFieldChange(
                      "survey_large_description",
                      e.target.value,
                    )
                  }
                />
                {formData.survey_large_description &&
                  !validationErrors.survey_large_description &&
                  formData.survey_large_description.length >= 50 && (
                    <div className="absolute top-3 right-3">
                      <span className="text-green-500">✓</span>
                    </div>
                  )}
              </div>
              {validationErrors.survey_large_description && (
                <p className="flex items-center text-sm text-red-600">
                  <span className="mr-1">⚠️</span>
                  {validationErrors.survey_large_description}
                </p>
              )}
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mínimo 50 caracteres</span>
                <span>
                  {formData.survey_large_description.length} caracteres
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="mr-2">📅</span>
                  Fecha de Inicio
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                      formData.start_date
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    value={formData.start_date}
                    onChange={(e) =>
                      handleFieldChange("start_date", e.target.value)
                    }
                  />
                  {formData.start_date && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <span className="text-green-500">✓</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="mr-2">📅</span>
                  Fecha de Término
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${
                      validationErrors.end_date
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : formData.end_date
                          ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    value={formData.end_date}
                    onChange={(e) =>
                      handleFieldChange("end_date", e.target.value)
                    }
                  />
                  {formData.end_date && !validationErrors.end_date && (
                    <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <span className="text-green-500">✓</span>
                    </div>
                  )}
                </div>
                {validationErrors.end_date && (
                  <p className="flex items-center text-sm text-red-600">
                    <span className="mr-1">⚠️</span>
                    {validationErrors.end_date}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
        <div className="flex items-start space-x-3">
          <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-amber-800">
              Consejos para una mejor consulta
            </h3>
            <ul className="space-y-1 text-sm text-amber-700">
              <li>• Usa un nombre descriptivo y claro para la consulta</li>
              <li>• La descripción corta debe resumir el objetivo principal</li>
              <li>
                • La descripción detallada debe explicar el contexto y la
                importancia
              </li>
              <li>
                • Asegúrate de que las fechas permitan suficiente tiempo para la
                participación
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
