"use client";

import { Question } from "@/app/lib/definitions/encuesta";
// import { useEffect } from "react";

type SurveyProgressProps = {
  currentQuestionIndex: number;
  questions: Question[];
  setCurrentQuestionIndex: (index: number) => void;
};

export default function SurveyProgress({
  currentQuestionIndex,
  questions,
  setCurrentQuestionIndex,
}: SurveyProgressProps) {
  return (
    <div className="md:borders md:bg-[#f8fafc]s md:shadow-mds rounded-lg border-gray-200 py-4 shadow-gray-200/80 md:p-6">
      <div className={`flex flex-nowrap justify-center gap-4`}>
        {questions.map((question, index) => (
          <ProgressStep
            key={index}
            title={question.step}
            description={question.step_description}
            isLast={index === questions.length - 1}
            index={index + 1}
            current={index === currentQuestionIndex}
            completed={index < currentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        ))}
      </div>
    </div>
  );
}

type ProgressStepProps = {
  title: string;
  description: string;
  isLast: boolean;
  index: number;
  current: boolean;
  completed: boolean;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
};

function ProgressStep({
  title,
  description,
  isLast,
  index,
  current,
  completed,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: ProgressStepProps) {
  const handleClick = () => {
    if (index - 1 < currentQuestionIndex) setCurrentQuestionIndex(index - 1);
  };
  return (
    <div className="relative flex w-20 shrink-0 flex-col items-center sm:w-38 md:w-52">
      {/* Horizontal line */}
      {!isLast && (
        <div
          className={`absolute top-[21%] h-[2px] w-[calc(100%-40px)] translate-x-[calc(50%+28px)] rounded-full sm:top-[28%] md:top-[21%] ${completed ? "bg-[#0A4C8A]" : "bg-gray-200"}`}
        />
      )}
      {/* Step indicator with icon */}
      <div
        onClick={handleClick}
        className={`flex size-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-2 ${completed ? "border-[#0A4C8A] !bg-[#0A4C8A] text-white" : current ? "border-[#0A4C8A] !bg-[#0A4C8A] text-white" : "border-gray-300 text-gray-500"} bg-gray-200 text-sm font-medium text-[#0A4C8A]`}
      >
        {completed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          index
        )}
      </div>

      {/* Step content */}
      <div>
        <h4
          className={`text-center text-sm md:text-base ${current ? "font-semibold text-[#0A4C8A]" : "text-slate-400"} ${!current ? "hiddens sm:block" : ""}`}
        >
          {title}
        </h4>
        <p className="hidden text-center text-xs text-gray-600 md:block">
          {description}
        </p>
      </div>
    </div>
  );
}
