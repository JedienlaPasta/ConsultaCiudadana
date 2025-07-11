"use client";

import { useState } from "react";
import Link from "next/link";
import SurveyGeneralInfo from "@/app/ui/dashboard/nueva-consulta/SurveyGeneralInfo";
import SurveyContent from "@/app/ui/dashboard/nueva-consulta/SurveyContent";
import SurveyChronogram from "@/app/ui/dashboard/nueva-consulta/SurveyChronogram";
import SurveyQuestions from "@/app/ui/dashboard/nueva-consulta/SurveyQuestions";
import SurveyPreview from "@/app/ui/dashboard/nueva-consulta/SurveyPreview";
import TabBtn from "@/app/ui/dashboard/nueva-consulta/TabBtn";

// Type definitions
export type ChronogramItem = {
  phase: string;
  description: string;
  date: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type QuestionOption = {
  id: number;
  text: string;
  hasSubQuestion: boolean;
  subQuestion: string;
  subOptions: string[];
};

export type Question = {
  id: number;
  text: string;
  isMapQuestion: boolean;
  options: QuestionOption[];
};

export type FormData = {
  survey_name: string;
  survey_short_description: string;
  survey_large_description: string;
  start_date: string;
  end_date: string;
  department: string;
  objectives: string[];
  chronogram: ChronogramItem[];
  survey_options_definitions: string[];
  frequently_asked_questions: FAQ[];
  questions: Question[];
};

// Create a mapped type to get the correct array type for each FormData key
export type FormDataArrays = {
  objectives: string[];
  chronogram: ChronogramItem[];
  survey_options_definitions: string[];
  frequently_asked_questions: FAQ[];
  questions: Question[];
};

// Helper type to get the item type from array name
export type ArrayItemTypeMap<K extends keyof FormDataArrays> =
  FormDataArrays[K] extends (infer U)[] ? U : never;

export default function NewSurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    // General Info
    survey_name: "",
    survey_short_description: "",
    survey_large_description: "",
    start_date: "",
    end_date: "",
    department: "",

    // Dynamic Arrays
    objectives: ["", "", ""],
    chronogram: [
      { phase: "", description: "", date: "" },
      { phase: "", description: "", date: "" },
      { phase: "", description: "", date: "" },
    ],
    survey_options_definitions: ["", "", "", "", ""],
    frequently_asked_questions: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],

    // Questions and Options
    questions: [
      {
        id: 1,
        text: "",
        isMapQuestion: false,
        options: [
          {
            id: 1,
            text: "",
            hasSubQuestion: false,
            subQuestion: "",
            subOptions: ["", ""],
          },
          {
            id: 2,
            text: "",
            hasSubQuestion: false,
            subQuestion: "",
            subOptions: ["", ""],
          },
          {
            id: 3,
            text: "",
            hasSubQuestion: false,
            subQuestion: "",
            subOptions: ["", ""],
          },
        ],
      },
      {
        id: 2,
        text: "",
        isMapQuestion: false,
        options: [
          {
            id: 1,
            text: "",
            hasSubQuestion: false,
            subQuestion: "",
            subOptions: ["", ""],
          },
          {
            id: 2,
            text: "",
            hasSubQuestion: false,
            subQuestion: "",
            subOptions: ["", ""],
          },
          {
            id: 3,
            text: "",
            hasSubQuestion: false,
            subQuestion: "",
            subOptions: ["", ""],
          },
        ],
      },
    ],
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = <K extends keyof FormDataArrays>(
    arrayName: K,
    index: number,
    value: ArrayItemTypeMap<K>,
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: (prev[arrayName] as FormDataArrays[K]).map(
        (item, i: number) => (i === index ? value : item),
      ),
    }));
  };

  const addArrayItem = <K extends keyof FormDataArrays>(
    arrayName: K,
    defaultValue: ArrayItemTypeMap<K>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...(prev[arrayName] as FormDataArrays[K]), defaultValue],
    }));
  };

  const removeArrayItem = <K extends keyof FormDataArrays>(
    arrayName: K,
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: (prev[arrayName] as FormDataArrays[K]).filter(
        (_, i) => i !== index,
      ),
    }));
  };

  const updateQuestion = (
    questionIndex: number,
    field: keyof Question,
    value: string | boolean | QuestionOption[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    field: keyof QuestionOption,
    value: string | boolean | string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optionIndex ? { ...opt, [field]: value } : opt,
              ),
            }
          : q,
      ),
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: formData.questions.length + 1,
      text: "",
      isMapQuestion: false,
      options: [
        {
          id: 1,
          text: "",
          hasSubQuestion: false,
          subQuestion: "",
          subOptions: ["", ""],
        },
        {
          id: 2,
          text: "",
          hasSubQuestion: false,
          subQuestion: "",
          subOptions: ["", ""],
        },
        {
          id: 3,
          text: "",
          hasSubQuestion: false,
          subQuestion: "",
          subOptions: ["", ""],
        },
      ],
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const addQuestionOption = (questionIndex: number) => {
    const newOption = {
      id: formData.questions[questionIndex].options.length + 1,
      text: "",
      hasSubQuestion: false,
      subQuestion: "",
      subOptions: ["", ""],
    };
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: [...q.options, newOption],
            }
          : q,
      ),
    }));
  };

  const handleSubmit = () => {
    console.log("Survey Data:", formData);
    // Here you would submit to your backend
    alert("Consulta creada exitosamente!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#0a4c8a] to-[#0d5aa7] shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/dashboard"
              className="group mb-6 inline-flex items-center text-white/90 transition-colors duration-200 hover:text-white"
            >
              <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
              Volver al Panel de Administración
            </Link>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-white">
                <h1 className="mb-2 text-3xl font-bold">
                  Crear Nueva Consulta
                </h1>
                <p className="text-lg text-white/90">
                  Configura todos los aspectos de la nueva consulta ciudadana
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-[#0a4c8a]">
                  <span className="mr-2">👁️</span>
                  Vista Previa
                </button>
                <button
                  className="flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:bg-green-700 hover:shadow-xl"
                  onClick={handleSubmit}
                >
                  <span className="mr-2">💾</span>
                  Guardar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-8">
            {/* Enhanced Tab Navigation */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50">
                <TabBtn
                  isActive={0 === currentStep}
                  onClick={() => setCurrentStep(0)}
                >
                  📋 Información General
                </TabBtn>
                <TabBtn
                  isActive={1 === currentStep}
                  onClick={() => setCurrentStep(1)}
                >
                  📝 Contenido
                </TabBtn>
                <TabBtn
                  isActive={2 === currentStep}
                  onClick={() => setCurrentStep(2)}
                >
                  📅 Cronograma
                </TabBtn>
                <TabBtn
                  isActive={3 === currentStep}
                  onClick={() => setCurrentStep(3)}
                >
                  ❓ Preguntas
                </TabBtn>
                <TabBtn
                  isActive={4 === currentStep}
                  onClick={() => setCurrentStep(4)}
                >
                  ✅ Revisión
                </TabBtn>
              </div>

              {/* Enhanced Content Area */}
              <div className="p-8">
                {currentStep === 0 ? (
                  <SurveyGeneralInfo
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                ) : currentStep === 1 ? (
                  <SurveyContent
                    formData={formData}
                    updateArrayItem={updateArrayItem}
                    removeArrayItem={removeArrayItem}
                    addArrayItem={addArrayItem}
                  />
                ) : currentStep === 2 ? (
                  <SurveyChronogram
                    formData={formData}
                    updateArrayItem={updateArrayItem}
                    removeArrayItem={removeArrayItem}
                    addArrayItem={addArrayItem}
                  />
                ) : currentStep === 3 ? (
                  <SurveyQuestions
                    formData={formData}
                    updateQuestion={updateQuestion}
                    setFormData={setFormData}
                    updateQuestionOption={updateQuestionOption}
                    addQuestionOption={addQuestionOption}
                    addQuestion={addQuestion}
                  />
                ) : (
                  <SurveyPreview
                    formData={formData}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
