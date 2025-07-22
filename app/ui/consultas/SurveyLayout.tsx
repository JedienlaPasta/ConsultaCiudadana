"use client";
import { useRef, useState } from "react";
import OptionSelectionList from "./OptionSelectionList";
import VoteConfirmationOverview from "./VoteConfirmationOverview";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RexLoader from "../RexAnimation";
import MapSection from "./MapSection";
import { registerVote } from "../../lib/actions/encuesta";
import SurveyProgress from "./SurveyProgress";
import { Question } from "@/app/lib/definitions/encuesta";

type SurveyLayoutProps = {
  surveyQuestions: Question[];
};

export default function SurveyLayout({ surveyQuestions }: SurveyLayoutProps) {
  const [selectedSectorId, setSelectedSectorId] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedSubOption, setSelectedSubOption] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  console.log(selectedSectorId);

  const router = useRouter();

  const questionSectionProps = {
    isLoading,
    question: surveyQuestions[currentQuestionIndex],
    surveyQuestions: surveyQuestions,
    currentQuestionIndex,
    selectedSectorId,
    selectedOptions,
    selectedSubOption,
    setSelectedSectorId,
    setSelectedOptions,
    setSelectedSubOption,
  };

  const checkSelectedOptions = () => {
    const isSectorQuestion = surveyQuestions[0].isMapQuestion; // Should always be the first question, index 0
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
    if (nextQuestionIndex > surveyQuestions.length - 1) {
      // const toastId = toast.loading("Guardando tu voto");
      // await setTimeout(() => {
      //   toast.success("Voto guardado, gracias por participar!", {
      //     id: toastId,
      //   });
      //   router.push("/");
      // }, 1000);
      return;
    }
    // Check if questions were checked before continuing
    if (nextQuestionIndex > currentQuestionIndex) {
      if (!checkSelectedOptions()) return;
    }
    setCurrentQuestionIndex(nextQuestionIndex);

    if (topRef.current) {
      const elementPosition = topRef.current.offsetTop;
      const offsetPosition = elementPosition - 70;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myFormData = new FormData();
    myFormData.append("sectorId", selectedSectorId);
    myFormData.append("options", selectedOptions.join(","));
    myFormData.append("subOption", selectedSubOption);

    const toastId = toast.loading("Guardando tu voto...");
    try {
      const response = await registerVote(myFormData);
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message, { id: toastId });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Error desconocido");
      toast.error("No se pudo registrar el voto, intente nuevamente", {
        id: toastId,
      });
    }
  };

  return (
    <div
      ref={topRef}
      className="mx-auto grid grid-cols-1 justify-end gap-4 py-6 md:gap-6 md:py-8"
    >
      <div className="rounded-lg bg-slate-200/60 lg:col-span-1">
        <SurveyProgress
          currentQuestionIndex={currentQuestionIndex}
          questions={surveyQuestions}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />
      </div>
      <form
        onSubmit={formAction}
        className="space-y-6 md:space-y-8 lg:col-span-1"
      >
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
              {currentQuestionIndex === surveyQuestions.flat().length - 1
                ? "Enviar"
                : "Continuar"}
            </button>
          </div>
        ) : null}
      </form>
      <div className="col-span- grid-cols-3"></div>
    </div>
  );
}

type QuestionSectionProps = {
  isLoading: boolean;
  question: Question;
  surveyQuestions: Question[];
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
  surveyQuestions,
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
      <div>
        <div className="flex items-center justify-center rounded-lg bg-slate-200/60 p-4">
          <div className="flex w-full flex-col items-center gap-1 rounded-lg bg-white py-5 md:gap-2 md:px-10 md:py-8">
            <RexLoader />
            <p className="animate-pulse text-sm text-slate-500">
              Cargando preguntas...
            </p>
          </div>
        </div>
      </div>
    );

  if (question.step === "Confirmar voto") {
    return (
      <VoteConfirmationOverview
        selectedSectorId={selectedSectorId}
        selectedOptions={selectedOptions}
        selectedSubOption={selectedSubOption}
        questions={surveyQuestions}
      />
    );
  }

  return isMap ? (
    <MapSection
      selectedSectorId={selectedSectorId}
      setSelectedSectorId={setSelectedSectorId}
      sectoresSurveyList={surveyQuestions[0]}
    />
  ) : (
    <OptionSelectionList
      question={surveyQuestions[currentQuestionIndex]}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
      selectedSubOption={selectedSubOption}
      setSelectedSubOption={setSelectedSubOption}
      selectedSectorId={selectedSectorId}
    />
  );
}
