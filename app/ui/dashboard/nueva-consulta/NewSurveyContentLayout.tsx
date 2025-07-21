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

export type OptionDefinition = {
  name: string;
  description: string;
};

export type QuestionOption = {
  id: number;
  option: string;
  hasSubQuestion: boolean;
  subQuestion: string;
  subOptions: string[];
};

export type Question = {
  id: number;
  questionId: number;
  question: string;
  step: string;
  step_description: string;
  isMapQuestion: boolean;
  maxOptions: number;
  minOptions: number;
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
  survey_options_definitions: OptionDefinition[];
  frequently_asked_questions: FAQ[];
  questions: Question[];
};

// Create a mapped type to get the correct array type for each FormData key
export type FormDataArrays = {
  objectives: string[];
  chronogram: ChronogramItem[];
  survey_options_definitions: OptionDefinition[];
  frequently_asked_questions: FAQ[];
  questions: Question[];
};

// Helper type to get the item type from array name
export type ArrayItemTypeMap<K extends keyof FormDataArrays> =
  FormDataArrays[K] extends (infer U)[] ? U : never;

// Define initial form data as a constant
const INITIAL_FORM_DATA: FormData = {
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
  survey_options_definitions: [
    { name: "", description: "" },
    { name: "", description: "" },
    { name: "", description: "" },
    { name: "", description: "" },
    { name: "", description: "" },
  ],
  frequently_asked_questions: [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ],

  // Questions and Options
  questions: [
    {
      id: 1,
      questionId: 0,
      question: "",
      step: "",
      step_description: "",
      isMapQuestion: false,
      maxOptions: 1,
      minOptions: 1,
      options: [
        {
          id: 1,
          option: "",
          hasSubQuestion: false,
          subQuestion: "",
          subOptions: ["", ""],
        },
        {
          id: 2,
          option: "",
          hasSubQuestion: false,
          subQuestion: "",
          subOptions: ["", ""],
        },
      ],
    },
    {
      id: 2,
      questionId: 0,
      question: "",
      step: "",
      step_description: "",
      isMapQuestion: false,
      maxOptions: 1,
      minOptions: 1,
      options: [
        {
          id: 1,
          option: "",
          hasSubQuestion: false,
          subQuestion: "",
          subOptions: ["", ""],
        },
        {
          id: 2,
          option: "",
          hasSubQuestion: false,
          subQuestion: "",
          subOptions: ["", ""],
        },
      ],
    },
  ],
};

const STORAGE_KEY = "survey_form_data";

export default function NewSurveyContentLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

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
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  console.log(formData);
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
          updatedQuestion.questionId = 1;
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
      questionId: 0,
      question: "",
      step: "",
      step_description: "",
      isMapQuestion: false,
      maxOptions: 1,
      minOptions: 1,
      options: [
        {
          id: 1,
          option: "",
          hasSubQuestion: false,
          subQuestion: "",
          subOptions: ["", ""],
        },
        {
          id: 2,
          option: "",
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
      option: "",
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

  const handleSubmit = async () => {
    // Filter out empty questions before submitting
    const validQuestions = formData.questions
      .filter((question) => {
        // Keep the question if it has meaningful content
        const hasQuestionText = question.question.trim() !== "";
        const isMapQuestion = question.isMapQuestion;
        const hasValidOptions = question.options.some((option) => {
          const hasOptionText = option.option.trim() !== "";
          const hasSubQuestion = option.subQuestion.trim() !== "";
          const hasValidSubOptions = option.subOptions.some(
            (subOpt) => subOpt.trim() !== "",
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
            const hasOptionText = option.option.trim() !== "";
            const hasSubQuestion = option.subQuestion.trim() !== "";
            const hasValidSubOptions = option.subOptions.some(
              (subOpt) => subOpt.trim() !== "",
            );
            return hasOptionText || hasSubQuestion || hasValidSubOptions;
          })
          .map((option) => ({
            ...option,
            // Clean up empty sub-options
            subOptions: option.subOptions.filter(
              (subOpt) => subOpt.trim() !== "",
            ),
          })),
      }));

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
    myFormData.append("start_date", formData.start_date);
    myFormData.append("end_date", formData.end_date);
    myFormData.append("department", formData.department);

    // Content - Serialize objects as JSON strings
    myFormData.append("objectives", JSON.stringify(formData.objectives));
    myFormData.append("chronogram", JSON.stringify(formData.chronogram));
    myFormData.append(
      "survey_options_definitions",
      JSON.stringify(formData.survey_options_definitions),
    );
    myFormData.append(
      "frequently_asked_questions",
      JSON.stringify(formData.frequently_asked_questions),
    );
    // Use the filtered questions instead of the original formData.questions
    myFormData.append("questions", JSON.stringify(validQuestions));

    const toastId = toast.loading("Guardando consulta...");
    try {
      const response = await createSurvey(myFormData);
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message, { id: toastId });
      // router.push("/");
      // console.log("Survey creation result:", response);
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
      <div className="space-y-5s flex gap-5">
        {/* <button onClick={resetForm} className="cursor-pointer">
          Reset
        </button> */}
        <div className="flex w-80 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <TabBtn
            currentStep={currentStep}
            index={1}
            onClick={() => setCurrentStep(1)}
          >
            Información General
          </TabBtn>
          <TabBtn
            currentStep={currentStep}
            index={2}
            onClick={() => setCurrentStep(2)}
          >
            Objetivos y Cronograma
          </TabBtn>
          <TabBtn
            currentStep={currentStep}
            index={3}
            onClick={() => setCurrentStep(3)}
          >
            Conceptos y FAQ
          </TabBtn>
          <TabBtn
            currentStep={currentStep}
            index={4}
            onClick={() => setCurrentStep(4)}
          >
            Contenido Consulta
          </TabBtn>
          <TabBtn
            currentStep={currentStep}
            index={5}
            onClick={() => setCurrentStep(5)}
          >
            Vista Previa
          </TabBtn>
        </div>

        {/* Enhanced Content Area */}
        <div className="flex-1">
          {currentStep === 1 ? (
            <SurveyGeneralInfo
              formData={formData}
              updateFormData={updateFormData}
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
            />
          ) : (
            <SurveyPreview formData={formData} handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
