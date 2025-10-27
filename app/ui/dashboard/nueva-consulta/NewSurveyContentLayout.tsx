"use client";

import { useState, useEffect } from "react";
import TabBtn from "./TabBtn";
import SurveyGeneralInfo from "./SurveyGeneralInfo";
import SurveyObjectivesChronogram from "./SurveyObjectivesChronogram";
import SurveyConceptsFAQ from "./SurveyConceptsFAQ";
import SurveyQuestions from "./SurveyQuestions";
import SurveyPreview from "./SurveyPreview";
import { createSurvey } from "@/app/lib/actions/encuesta";
import { toast } from "sonner";
import {
  ArrayItemTypeMap,
  FormDataArrays,
  Question,
  QuestionOption,
  SubOption,
  SurveyFormData,
} from "@/app/lib/definitions/encuesta";
import { useRouter } from "next/navigation";
import { INITIAL_FORM_DATA } from "@/app/lib/data";

const STORAGE_KEY = "survey_form_data";

export default function NewSurveyContentLayout({
  sectors,
  sessionSub,
  sessionDv,
}: {
  sectors: { sector_name: string }[];
  sessionSub: string;
  sessionDv: string;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SurveyFormData>(INITIAL_FORM_DATA);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const stepsList = [
    { id: 1, label: "Información General" },
    { id: 2, label: "Objetivos y Cronograma" },
    { id: 3, label: "Conceptos y FAQ" },
    { id: 4, label: "Contenido Consulta" },
    { id: 5, label: "Vista Previa" },
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save data to localStorage whenever formData changes (but not on initial mount)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isInitialized]);

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
      questions: prev.questions.map((question, index) => {
        if (index !== questionIndex) return question;
        const updatedQuestion = { ...question, [field]: value };

        if (field === "isMapQuestion" && value === true) {
          updatedQuestion.questionId = 1; // Global question ID (map)
        } else {
          updatedQuestion.questionId = 0;
        }

        return updatedQuestion;
      }),
    }));
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    field: keyof QuestionOption,
    value: string | boolean | string[] | SubOption[], // Add SubOption[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              options: question.options.map((option, j) =>
                j === optionIndex ? { ...option, [field]: value } : option,
              ),
            }
          : question,
      ),
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: formData.questions.length + 1,
      questionId: 0,
      question: "",
      question_description: "",
      step: "",
      step_description: "",
      isMapQuestion: false,
      maxOptions: 1,
      minOptions: 1,
      options: [
        {
          id: 1,
          option_name: "",
          option_description: "",
          hasSubQuestion: false,
          sector_id: null,
          sector: null,
          subQuestion: "",
          subQuestionDescription: "",
          subOptions: [
            {
              id: 1,
              option_name: "",
              option_description: "",
              sector_id: null,
              sector: null,
            },
            {
              id: 2,
              option_name: "",
              option_description: "",
              sector_id: null,
              sector: null,
            },
          ],
        },
        {
          id: 2,
          option_name: "",
          option_description: "",
          hasSubQuestion: false,
          sector_id: null,
          sector: null,
          subQuestion: "",
          subQuestionDescription: "",
          subOptions: [
            {
              id: 1,
              option_name: "",
              option_description: "",
              sector_id: null,
              sector: null,
            },
            {
              id: 2,
              option_name: "",
              option_description: "",
              sector_id: null,
              sector: null,
            },
          ],
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
      option_name: "",
      option_description: "",
      hasSubQuestion: false,
      sector_id: null,
      sector: null,
      subQuestion: "",
      subQuestionDescription: "",
      subOptions: [
        {
          id: 1,
          option_name: "",
          option_description: "",
          sector_id: null,
          sector: null,
        },
        {
          id: 2,
          option_name: "",
          option_description: "",
          sector_id: null,
          sector: null,
        },
      ],
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

  const handleSubmit = async () => {
    // Filter out empty questions before submitting
    const validQuestions = formData.questions
      .filter((question) => {
        // Keep the question if it has meaningful content
        const hasQuestionText = question.question.trim() !== "";
        const isMapQuestion = question.isMapQuestion;
        const hasValidOptions = question.options.some((option) => {
          const hasOptionText = option?.option_name?.trim() !== "";
          const hasSubQuestion = option?.subQuestion?.trim() !== "";
          const hasValidSubOptions = option?.subOptions?.some(
            (subOpt) => subOpt?.option_name?.trim() !== "",
          );
          return hasOptionText || hasSubQuestion || hasValidSubOptions;
        });

        return hasQuestionText || isMapQuestion || hasValidOptions;
      })
      .map((question) => ({
        ...question,
        // Also clean up empty options within each question
        options: question.options
          .filter((option) => {
            const hasOptionText = option?.option_name?.trim() !== "";
            const hasSubQuestion = option?.subQuestion?.trim() !== "";
            const hasValidSubOptions = option?.subOptions?.some(
              (subOpt) => subOpt?.option_name?.trim() !== "",
            );
            return hasOptionText || hasSubQuestion || hasValidSubOptions;
          })
          .map((option) => ({
            ...option,
            // Clean up empty sub-options
            subOptions: option.subOptions.filter(
              (subOpt) => subOpt?.option_name?.trim() !== "",
            ),
          })),
      }));

    // Filter out empty links values before submitting
    const validLinks = formData.survey_links.filter(
      (link) => link.trim() !== "",
    );

    const myFormData = new FormData();
    // General Info
    myFormData.append("survey_name", formData.survey_name);
    myFormData.append(
      "survey_short_description",
      formData.survey_short_description,
    );
    myFormData.append(
      "survey_large_description",
      formData.survey_large_description,
    );
    myFormData.append("start_date", formData.survey_start_date);
    myFormData.append("end_date", formData.survey_end_date);
    myFormData.append("department", formData.department);

    // Concepts General Info
    myFormData.append(
      "survey_concepts_description",
      formData.survey_concepts_description,
    );
    myFormData.append("survey_concepts_link", formData.survey_concepts_link);

    // Content - Serialize objects as JSON strings
    myFormData.append("survey_links", JSON.stringify(validLinks));
    myFormData.append("objectives", JSON.stringify(formData.objectives));
    myFormData.append("chronogram", JSON.stringify(formData.chronogram));
    myFormData.append(
      "survey_concepts_name",
      JSON.stringify(formData.survey_concepts_name),
    );
    myFormData.append(
      "frequently_asked_questions",
      JSON.stringify(formData.frequently_asked_questions),
    );
    // Use the filtered questions instead of the original formData.questions
    myFormData.append("questions", JSON.stringify(validQuestions));

    const toastId = toast.loading("Guardando consulta...");
    try {
      const response = await createSurvey(
        myFormData,
        sessionSub || "",
        sessionDv || "",
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message, { id: toastId });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      // console.error("Error creating survey:", error);
      const message =
        error instanceof Error ? error.message : "Error al iniciar sesión";
      toast.error(message, { id: toastId });
    }
  };

  // const resetForm = () => {
  //   setFormData(INITIAL_FORM_DATA);
  //   localStorage.removeItem(STORAGE_KEY);
  // };

  return (
    <div className="container mx-auto max-w-[80rem] space-y-2 px-4 py-6 md:px-8 md:py-8">
      {/* Enhanced Tab Navigation */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-5">
        {/* <button onClick={resetForm} className="cursor-pointer">
          Reset
        </button> */}
        {/* Desktop View */}
        <div
          role="tablist"
          aria-label="Pasos de creación"
          className="hidden w-full flex-col rounded-xl border border-gray-200 bg-white shadow-lg md:sticky md:top-24 md:flex md:w-80"
        >
          {stepsList.map((step) => (
            <TabBtn
              key={step.id}
              currentStep={currentStep}
              index={step.id}
              onClick={() => setCurrentStep(step.id)}
            >
              {step.label}
            </TabBtn>
          ))}
        </div>
        {/* Mobile View */}
        <div
          role="tablist"
          aria-label="Pasos de creación"
          className="relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg md:hidden"
        >
          {/* Scrollable segmented control */}
          <div className="relative">
            <div className="overflow-x-autos flex snap-x snap-mandatory gap-1 scroll-smooth px-2 py-2">
              {stepsList.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`step-panel-${step.id}`}
                    onClick={() => setCurrentStep(step.id)}
                    className={`group flex-1 shrink-0 snap-center rounded-lg px-4 py-3 text-sm font-semibold ring-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                      isActive
                        ? "bg-blue-50 text-[#06539b] ring-blue-200"
                        : isCompleted
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : "bg-white text-slate-700 ring-slate-200 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      {isCompleted ? (
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Indicador de progreso */}
          <div className="mx-3 mt-1 h-1 rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${(currentStep / stepsList.length) * 100}%` }}
            />
          </div>

          {/* Contexto del paso actual */}
          <div className="flex items-center justify-between px-4 pt-2 pb-3">
            <span className="text-xs font-medium text-slate-600">
              Paso {currentStep} de {stepsList.length}
            </span>
            <h3 className="text-sm font-semibold text-slate-800">
              {stepsList[currentStep - 1].label}
            </h3>
          </div>
        </div>

        {/* Enhanced Content Area */}
        <div className="w-full flex-1">
          {currentStep === 1 ? (
            <SurveyGeneralInfo
              formData={formData}
              updateFormData={updateFormData}
              updateArrayItem={updateArrayItem}
              removeArrayItem={removeArrayItem}
              addArrayItem={addArrayItem}
            />
          ) : currentStep === 2 ? (
            <SurveyObjectivesChronogram
              formData={formData}
              updateArrayItem={updateArrayItem}
              removeArrayItem={removeArrayItem}
              addArrayItem={addArrayItem}
            />
          ) : currentStep === 3 ? (
            <SurveyConceptsFAQ
              formData={formData}
              updateFormData={updateFormData}
              updateArrayItem={updateArrayItem}
              removeArrayItem={removeArrayItem}
              addArrayItem={addArrayItem}
            />
          ) : currentStep === 4 ? (
            <SurveyQuestions
              formData={formData}
              updateQuestion={updateQuestion}
              setFormData={setFormData}
              updateQuestionOption={updateQuestionOption}
              addQuestionOption={addQuestionOption}
              addQuestion={addQuestion}
              sectors={sectors}
            />
          ) : (
            <SurveyPreview formData={formData} handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
