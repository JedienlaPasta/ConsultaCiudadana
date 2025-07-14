"use client";

import Dropdown from "../../Dropdown";
import { FormData } from "./NewSurveyContentLayout";
import { useState } from "react";

type SurveyGeneralInfoProps = {
  formData: FormData;
  updateFormData: (field: string, value: string) => void;
};

const departmentsList = [
  { id: 1, name: "SECPLA" },
  { id: 2, name: "Obras Públicas" },
  { id: 3, name: "Medio Ambiente" },
  { id: 4, name: "Turismo" },
  { id: 5, name: "Educación" },
  { id: 6, name: "Salud" },
];

export default function SurveyGeneralInfo({
  formData,
  updateFormData,
}: SurveyGeneralInfoProps) {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

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
        if (value.length < 50) {
          errors[field] =
            "La descripción corta debe tener al menos 20 caracteres";
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

  return (
    <div className="space-y-5">
      {/* Enhanced Main Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-white">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-700">
                  Información General
                </h2>
                <p className="mt-1 text-slate-600">
                  Configura la información principal de la consulta ciudadana
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  Nombre de la Consulta
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={60}
                    className={`h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus-within:border-blue-500 focus:outline-none ${
                      validationErrors.survey_name
                        ? "border-red-300 focus:border-rose-400 focus:ring-red-200"
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
                </div>
                {validationErrors.survey_name && (
                  <p className="flex items-center text-sm text-red-600">
                    {validationErrors.survey_name}
                  </p>
                )}
                <div className="text-xs text-gray-500">
                  {formData.survey_name.length}/60 caracteres
                </div>
              </div>

              <div className="space-y-2">
                <Dropdown
                  label="Departamento"
                  name="department"
                  value={formData.department}
                  setValue={handleFieldChange}
                  options={departmentsList}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                Descripción Corta
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                    validationErrors.survey_short_description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : formData.survey_short_description &&
                          formData.survey_short_description.length >= 50
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                  placeholder="Descripción breve que aparecerá en las listas de consultas"
                  rows={3}
                  value={formData.survey_short_description}
                  minLength={50}
                  maxLength={200}
                  onChange={(e) =>
                    handleFieldChange(
                      "survey_short_description",
                      e.target.value,
                    )
                  }
                />
              </div>
              {validationErrors.survey_short_description && (
                <p className="flex items-center text-sm text-red-600">
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

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                Descripción Detallada
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  className={`w-full resize-none rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
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
              </div>
              {validationErrors.survey_large_description && (
                <p className="flex items-center text-sm text-red-600">
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
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  Fecha de Inicio
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
                      formData.start_date
                        ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    value={formData.start_date}
                    onChange={(e) =>
                      handleFieldChange("start_date", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  Fecha de Término
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className={`w-full rounded-lg border px-4 py-3 text-gray-900 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-1 ${
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
                </div>
                {validationErrors.end_date && (
                  <p className="flex items-center text-sm text-red-600">
                    {validationErrors.end_date}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Card */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <div className="flex items-start space-x-3">
          <div>
            <div className="mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5 text-[#0A4C8A]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="font-semibold text-[#0A4C8A]">
                Consejos para una mejor consulta
              </h3>
            </div>
            <ul className="space-y-1 text-sm text-slate-600">
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
