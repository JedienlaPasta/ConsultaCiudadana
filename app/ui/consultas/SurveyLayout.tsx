"use client";
import { useEffect, useRef, useState } from "react";
import OptionSelectionList from "./OptionSelectionList";
import VoteConfirmationOverview from "./VoteConfirmationOverview";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RexLoader from "../RexAnimation";
import MapSection from "./MapSection";
import { registerVote } from "../../lib/actions/encuesta";
import SurveyProgress from "./SurveyProgress";
import {
  QuestionAnswer,
  SurveyAnswers,
  SurveyQuestion,
} from "@/app/lib/definitions/encuesta";

type SurveyLayoutProps = {
  questions: SurveyQuestion[];
  surveyId: number;
  rut: number;
  hasParticipated: boolean;
};

export default function SurveyLayout({
  questions,
  surveyId,
  rut,
  hasParticipated,
}: SurveyLayoutProps) {
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({
    survey_id: surveyId,
    answers: [],
  });
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>(
    questions.map((question) => ({ ...question, answer: undefined })),
  );

  const [selectedSectorId, setSelectedSectorId] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (!rut) {
      toast.error("No se ha encontrado el RUT del usuario");
      // router.push("/");
      return;
    }

    if (hasParticipated) {
      toast.error("Ya has participado de esta encuesta");
      // router.push("/");
    }
  }, [hasParticipated, router]);

  // Actualizar respuesta de una pregunta específica
  const updateQuestionAnswer = (questionId: number, answer: QuestionAnswer) => {
    setSurveyAnswers((prev) => ({
      ...prev,
      answers: prev.answers
        .filter((a) => a.question_id !== questionId)
        .concat([answer]),
    }));

    // También actualizar en surveyQuestions para UI
    setSurveyQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId ? { ...question, answer } : question,
      ),
    );
  };

  // Función para obtener respuesta de una pregunta
  const getQuestionAnswer = (
    questionId: number,
  ): QuestionAnswer | undefined => {
    return surveyAnswers.answers.find(
      (answer) => answer.question_id === questionId,
    );
  };

  // Función para validar si las opciones están seleccionadas
  const checkSelectedOptions = () => {
    const currentQuestion = surveyQuestions[currentQuestionIndex];
    const currentAnswer = getQuestionAnswer(currentQuestion.id);

    if (currentQuestion.isMapQuestion) {
      return !!currentAnswer?.sector_id;
    }

    const selectedOptionsCount = currentAnswer?.selected_options?.length || 0;

    // Check if minimum options requirement is met
    if (selectedOptionsCount < currentQuestion.minOptions) {
      return false;
    }

    // Check if options with sub-questions have sub-options selected
    const selectedOptions = currentAnswer?.selected_options || [];
    for (const selectedOption of selectedOptions) {
      // Find the option definition to check if it has a sub-question
      const optionDefinition = currentQuestion.options.find(
        (option) => option.id === selectedOption.option_id,
      );
      // If the option has a sub-question but no sub-option is selected, validation fails
      if (optionDefinition?.hasSubQuestion && !selectedOption.sub_option_id) {
        return false;
      }
    }

    return true;
  };

  const handleQuestionChange = async (nextQuestionIndex: number) => {
    // Check if its within the limits of the questions array
    if (nextQuestionIndex < 0) return;
    if (nextQuestionIndex > surveyQuestions.length - 1) return;
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

    const toastId = toast.loading("Guardando tu voto...");
    try {
      const response = await registerVote(surveyAnswers, rut || 19973725); // TODO: Obtener RUT real del usuario
      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success(response.message, { id: toastId });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Error desconocido");
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo registrar el voto, intente nuevamente";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <>
      {!hasParticipated ? (
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
            <QuestionSection
              isLoading={isLoading}
              question={surveyQuestions[currentQuestionIndex]}
              surveyQuestions={surveyQuestions}
              currentQuestionIndex={currentQuestionIndex}
              selectedSectorId={selectedSectorId}
              setSelectedSectorId={setSelectedSectorId}
              onAnswerChange={updateQuestionAnswer}
            />
            {!isLoading ? (
              <div className="grids justify-between gap-4 md:flex">
                <button
                  onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                  className="w-full max-w-40 cursor-pointer rounded-lg border border-gray-300 py-3 text-sm text-slate-800 transition-all hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Volver
                </button>
                <button
                  onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
                  disabled={!checkSelectedOptions()}
                  className="w-full max-w-80 cursor-pointer rounded-lg bg-[#0F69C4] py-3 text-sm text-white transition-all hover:bg-[#0A4C8A] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#0F69C4]/70"
                >
                  {currentQuestionIndex === surveyQuestions.flat().length - 1
                    ? "Enviar Voto"
                    : "Continuar"}
                </button>
              </div>
            ) : null}
          </form>
          <div className="col-span- grid-cols-3"></div>
        </div>
      ) : (
        <div className="mx-auto grid grid-cols-1 justify-end gap-4 py-6 md:gap-6 md:py-8">
          <div className="flex items-center justify-center rounded-lg bg-slate-200/60 p-4">
            <div className="flex w-full flex-col items-center gap-1 rounded-lg bg-white py-5 md:gap-2 md:px-10 md:py-8">
              <RexLoader />
              <p className="animate-pulse text-sm text-slate-500">
                Cargando preguntas...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type QuestionSectionProps = {
  isLoading: boolean;
  question: SurveyQuestion;
  surveyQuestions: SurveyQuestion[];
  currentQuestionIndex: number;
  selectedSectorId: string;
  setSelectedSectorId: (sectorId: string) => void;
  onAnswerChange: (questionId: number, answer: QuestionAnswer) => void;
};

function QuestionSection({
  isLoading,
  question,
  surveyQuestions,
  currentQuestionIndex,
  selectedSectorId,
  setSelectedSectorId,
  onAnswerChange,
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
    return <VoteConfirmationOverview surveyQuestions={surveyQuestions} />;
  }

  return isMap ? (
    <MapSection
      selectedSectorId={selectedSectorId}
      setSelectedSectorId={(sectorId) => {
        setSelectedSectorId(sectorId);
        // Actualizar respuesta para pregunta de mapa
        onAnswerChange(question.id, {
          question_id: question.id,
          selected_options: [],
          sector_id: sectorId,
        });
      }}
      sectoresSurveyList={surveyQuestions[0]}
    />
  ) : (
    <OptionSelectionList
      question={surveyQuestions[currentQuestionIndex]}
      selectedSectorId={selectedSectorId}
      onAnswerChange={onAnswerChange}
    />
  );
}
