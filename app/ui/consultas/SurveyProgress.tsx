"use client";

import { Question } from "@/app/lib/definitions/encuesta";

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
  const total = Math.max(questions.length - 1, 1);

  return (
    <div className="rounded-xl pt-2">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Tu progreso</span>
        <span className="text-sm font-semibold text-[#0A4C8A]">
          {currentQuestionIndex + 1} / {total + 1}
        </span>
      </div>
      <div className="grid grid-flow-col gap-1 overflow-hidden overflow-x-auto pb-14">
        {questions.map((question, index) => (
          <div key={question.step + index} className="relative">
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
            <div
              className={
                currentQuestionIndex === index
                  ? "absolute top-6 left-1/2 -translate-x-1/2"
                  : "hidden"
              }
            >
              <h4
                className={`line-clamp-2 text-center text-xs md:text-sm ${currentQuestionIndex === index ? "font-semibold text-slate-700" : "text-slate-500"}`}
              >
                {question.step}
              </h4>
              <p className="-mt-0.5 hidden text-center text-[11px] text-slate-600 md:block">
                {question.step_description}
              </p>
            </div>
          </div>
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
  const isClickable = index - 1 < currentQuestionIndex;

  const handleClick = () => {
    if (isClickable) setCurrentQuestionIndex(index - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && isClickable) {
      e.preventDefault();
      setCurrentQuestionIndex(index - 1);
    }
  };
  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? "button" : "img"}
      tabIndex={isClickable ? 0 : -1}
      aria-current={current ? "step" : undefined}
      aria-label={`${current ? "Paso actual" : completed ? "Paso completado" : "Paso pendiente"}: ${title}`}
      title={description}
      className={`relative flex h-4 w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-xs border-2 transition-colors duration-200 ${isLast && "rounded-r-full"} ${index === 1 && "rounded-l-full"} ${completed ? "border-blue-500 bg-blue-500 text-white" : current ? "border-blue-300 bg-blue-300 text-white" : "border-slate-200 bg-slate-200 text-slate-600"} ${isClickable ? "cursor-pointer hover:border-blue-700" : "cursor-not-allowed opacity-80"}`}
    ></div>
  );
}
