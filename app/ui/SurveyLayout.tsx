"use client";
import { useRef, useState } from "react";
import SurveyProgress from "./SurveyProgress";
import OptionSelectionList from "./OptionSelectionList";
import VoteConfirmationOverview from "./VoteConfirmationOverview";
import { useRouter } from "next/navigation";
import { QUESTIONS_LIST } from "../lib/data";
import { toast } from "sonner";
import RexLoader from "./piimep/RexAnimation";
import MapSection from "./piimep/MapSection";

export type Question = {
  index: number;
  step: string;
  step_description: string;
  question: string;
  description: string;
  answers: number;
  options: {
    id: string;
    name: string;
    question?: string;
    description?: string;
    answers?: number;
    population?: string;
    area?: string;
    options?: {
      id: string;
      name: string;
      description: string;
      sector?: string;
    }[];
  }[];
};

export default function SurveyLayout() {
  const [selectedSectorId, setSelectedSectorId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedSubOption, setSelectedSubOption] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const questionSectionProps = {
    isLoading,
    question: QUESTIONS_LIST[currentQuestionIndex],
    currentQuestionIndex,
    selectedSectorId,
    selectedOptions,
    selectedSubOption,
    setSelectedSectorId,
    setSelectedOptions,
    setSelectedSubOption,
  };

  const checkSelectedOptions = () => {
    const isSectorQuestion = QUESTIONS_LIST[0].index === currentQuestionIndex; // Should always be the first question, index 0
    const isTramoConectorSelected = selectedOptions.some(
      (option) => option === "1",
    );
    if (isSectorQuestion && !selectedSectorId) return false;
    if (!isSectorQuestion && selectedOptions.length < 3) return false;
    if (!isSectorQuestion && isTramoConectorSelected && !selectedSubOption)
      return false;
    return true;
  };

  const handleQuestionChange = async (nextQuestionIndex: number) => {
    // Check if its within the limits of the questions array
    if (nextQuestionIndex < 0) {
      return;
    }
    if (nextQuestionIndex > QUESTIONS_LIST.length - 1) {
      const toastId = toast.loading("Enviando respuesta");
      await setTimeout(() => {
        toast.success("Respuesta enviada, gracias por participar!", {
          id: toastId,
        });
        router.push("/");
      }, 1000);
      return;
    }
    // Check if questions were checked before continuing
    if (nextQuestionIndex > currentQuestionIndex) {
      if (!checkSelectedOptions()) return;
    }
    setCurrentQuestionIndex(nextQuestionIndex);
    topRef.current?.scrollIntoView({
      behavior: "smooth",
    });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  return (
    // <div className="rounded-lgs border-gray-200s bg-whites md:borders md:p-6s md:shadow-mds mx-auto grid grid-cols-1 justify-end gap-4 shadow-gray-200/80">
    <div
      ref={topRef}
      className="mx-auto grid grid-cols-1 justify-end gap-4 py-6 md:gap-6 md:py-8"
    >
      <div className="rounded-lg bg-slate-200/60 lg:col-span-1">
        <SurveyProgress
          currentQuestionIndex={currentQuestionIndex}
          questions={QUESTIONS_LIST}
        />
      </div>
      <div className="space-y-6 md:space-y-8 lg:col-span-1">
        <QuestionSection {...questionSectionProps} />
        {!isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            <button
              onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
              className="col-span-1 w-full cursor-pointer rounded-lg bg-gray-400 py-3 text-sm text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Volver
            </button>
            <button
              onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
              disabled={!checkSelectedOptions()}
              className="col-span-1 w-full cursor-pointer rounded-lg bg-blue-500 py-3 text-sm text-white transition-all active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {currentQuestionIndex === QUESTIONS_LIST.flat().length - 1
                ? "Enviar"
                : "Continuar"}
            </button>
          </div>
        ) : null}
      </div>
      <div className="col-span- grid-cols-3"></div>
    </div>
  );
}

type QuestionSectionProps = {
  isLoading: boolean;
  question: Question;
  selectedOptions: string[];
  selectedSubOption: string;
  selectedSectorId: string;
  setSelectedOptions: (options: string[]) => void;
  setSelectedSubOption: (subOption: string) => void;
  currentQuestionIndex: number;
  setSelectedSectorId: (sectorId: string) => void;
};

function QuestionSection({
  isLoading,
  question,
  selectedOptions,
  selectedSubOption,
  selectedSectorId,
  currentQuestionIndex,
  setSelectedOptions,
  setSelectedSubOption,
  setSelectedSectorId,
}: QuestionSectionProps) {
  const isMap = question.step === "Seleccionar sector";

  if (isLoading)
    return (
      <div className="flex flex-col items-center gap-1 rounded-lg bg-slate-200/70 px-4 py-5 md:gap-2 md:px-10 md:py-8">
        <RexLoader />
        <p className="animate-pulse text-sm text-slate-500">
          Cargando encuesta...
        </p>
      </div>
    );

  // Check if this is the confirmation step
  if (question.step === "Confirmar voto") {
    return (
      <VoteConfirmationOverview
        selectedSectorId={selectedSectorId}
        selectedOptions={selectedOptions}
        selectedSubOption={selectedSubOption}
        questions={QUESTIONS_LIST}
      />
    );
  }

  return isMap ? (
    <MapSection
      selectedSectorId={selectedSectorId}
      setSelectedSectorId={setSelectedSectorId}
      sectoresSurveyList={QUESTIONS_LIST[0]}
    />
  ) : (
    <OptionSelectionList
      question={QUESTIONS_LIST[currentQuestionIndex]}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      selectedSubOption={selectedSubOption}
      setSelectedSubOption={setSelectedSubOption}
      selectedSectorId={selectedSectorId}
    />
  );
}
