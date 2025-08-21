"use client";

import {
  ArrayItemTypeMap,
  FormDataArrays,
  SurveyFormData,
} from "@/app/lib/definitions/encuesta";
import Dropdown from "../../Dropdown";
import { useState } from "react";

type SurveyGeneralInfoProps = {
  formData: SurveyFormData;
  updateFormData: (field: string, value: string) => void;
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
  updateArrayItem,
  removeArrayItem,
  addArrayItem,
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
            "La descripción corta debe tener al menos 50 caracteres";
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
      case "survey_start_date":
      case "survey_end_date":
        if (
          field === "survey_end_date" &&
          formData.survey_start_date &&
          value <= formData.survey_start_date
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

  const handleLinkUpdate = (index: number, value: string) => {
    const shouldAddNew =
      index === formData.survey_links.length - 1 && value !== "";
    if (shouldAddNew) {
      addArrayItem("survey_links", "");
    }
    updateArrayItem("survey_links", index, value);
  };

  return (
    <div className="space-y-5">
      {/* Información General */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-8">
          <h2 className="border-b border-gray-200/80 pt-7 pb-5 text-xl font-bold text-slate-700">
            Información General
          </h2>
        </div>
        <div className="p-8 pt-6 pb-0">
          <p className="text-sm font-semibold text-slate-700">
            Especifica los datos principales de tu consulta.
          </p>
          <p className="text-sm text-slate-600">
            Rellena cada uno de los campos con información relevante para tu
            consulta.
          </p>
        </div>

        <div className="p-8 pt-6">
          <div className="space-y-6">
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
                    className={`h-10 w-full rounded-lg border bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-offset-1 ${
                      validationErrors.survey_name
                        ? "border-red-300 focus:border-rose-400 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
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

            {/* Survey Links */}
            <div className="">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                Enlaces de Interés
                <span className="ml-1.5 text-sm font-light text-gray-500">
                  (opcional)
                </span>
              </label>
              {formData.survey_links.map((link, index) => (
                <div key={index} className="relative">
                  <div className="py-2">
                    <div className="flex items-end space-x-3">
                      <div className="relative flex-1 space-y-1 pl-8">
                        <input
                          type="text"
                          className="h-10 w-full rounded-r-lg border border-l-0 border-slate-300 bg-white p-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1"
                          placeholder={`Ej: https://test-participacion.munielquisco.gob.cl/...`}
                          value={link}
                          onChange={(e) =>
                            handleLinkUpdate(index, e.target.value)
                          }
                        />
                        <div className="absolute bottom-1 left-0 flex h-10 w-8 items-center justify-center rounded-l-lg bg-emerald-400">
                          <span className="text-sm font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      {formData.survey_links.length > 1 && (
                        <button
                          className="group mb-1 flex size-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-gray-500 shadow-sm transition-all duration-200 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"
                          onClick={() => removeArrayItem("survey_links", index)}
                          title="Eliminar enlace"
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
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
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

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                Descripción Corta
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  className={`h-20 w-full resize-none rounded-lg border bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-offset-1 ${
                    validationErrors.survey_short_description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
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
                <span>Mínimo 50 caracteres</span>
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
                  className={`h-30 w-full resize-none rounded-lg border bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-offset-1 ${
                    validationErrors.survey_large_description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
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
                    className={`h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1`}
                    value={formData.survey_start_date}
                    onChange={(e) =>
                      handleFieldChange("survey_start_date", e.target.value)
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
                    className={`h-10 w-full rounded-lg border bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-offset-1 ${
                      validationErrors.survey_end_date
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                    }`}
                    value={formData.survey_end_date}
                    onChange={(e) =>
                      handleFieldChange("survey_end_date", e.target.value)
                    }
                  />
                </div>
                {validationErrors.survey_end_date && (
                  <p className="flex items-center text-sm text-red-600">
                    {validationErrors.survey_end_date}
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
