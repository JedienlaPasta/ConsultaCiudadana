// ================================================================================================
// New Survey Definitions
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

export type SurveyFormData = {
  survey_name: string;
  survey_short_description: string;
  survey_large_description: string;
  survey_start_date: string;
  survey_end_date: string;
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

// ================================================================================================
// Survey Data Definitions
// export type SurveyData = {
//   id: number;
//   survey_name: string;
//   survey_short_description: string;
//   survey_large_description: string;
//   survey_start_date: string;
//   survey_end_date: string;
//   department: string;
//   objectives: string[];
//   chronogram: ChronogramItem[];
//   survey_options_definitions: OptionDefinition[];
//   frequently_asked_questions: FAQ[];
//   questions: Question[];
// };
