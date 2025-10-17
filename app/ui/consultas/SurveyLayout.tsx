"use client";
import { useEffect, useRef, useState } from "react";
import OptionSelectionList from "./OptionSelectionList";
import VoteConfirmationOverview from "./VoteConfirmationOverview";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RexLoader from "../RexAnimation";
import MapSection from "./MapSection";
import { registerVote } from "../../lib/actions/encuesta";
import {
  QuestionAnswer,
  SurveyAnswers,
  SurveyQuestion,
} from "@/app/lib/definitions/encuesta";
import VoteResponseModal from "./[id]/VoteResponseModal";
import SurveyProgress from "./SurveyProgress";

type SurveyLayoutProps = {
  questions: SurveyQuestion[];
  publicId: string;
  sub: string;
  dv: string;
  hasParticipated: boolean;
};

export default function SurveyLayout({
  questions,
  publicId,
  sub,
  dv,
  hasParticipated,
}: SurveyLayoutProps) {
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({
    public_id: publicId,
    answers: [],
  });
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>(
    questions.map((question) => ({ ...question, answer: undefined })),
  );

  const [selectedSectorId, setSelectedSectorId] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResponseModal, setShowResponseModal] = useState<boolean>(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [response, setResponse] = useState<{
    success: boolean;
    message: string;
  }>({
    success: false,
    message: "Verificando...",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const [shouldRender, setShouldRender] = useState(!hasParticipated);

  const router = useRouter();

  useEffect(() => {
    if (!sub || !dv) {
      toast.error("No se ha encontrado el RUT del usuario");
      // router.replace("/");
      return;
    }
    console.log("Si se encontro el rut (66)...");
    if (hasParticipated) {
      console.log("Ya ha participado (68)...");
      setShouldRender(false);
      toast.error("Ya has participado de esta encuesta");
      // Usar replace para no agregar al historial
      router.replace("/");
      return;
    }
  }, [hasParticipated, router, sub, dv]);

  // Efecto para manejar navegación del navegador
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (hasVoted && document.visibilityState === "visible") {
        console.log("La página se volvió visible después de votar (81)...");
        // Si ya votó y la página se vuelve visible, redirigir
        router.replace("/");
      }
    };

    const handleBeforeUnload = () => {
      if (hasVoted) {
        // Marcar en sessionStorage que ya votó
        sessionStorage.setItem(`voted_${publicId}_${sub}_${dv}`, "true");
      }
    };

    const handlePopState = () => {
      // Verificar si ya votó en esta sesión
      const hasVotedInSession =
        sessionStorage.getItem(`voted_${publicId}_${sub}_${dv}`) === "true";
      if (hasVoted || hasParticipated || hasVotedInSession) {
        console.log("Ya ha participado de esta encuesta (99)...");
        toast.error("Ya has participado de esta encuesta");
        router.replace("/");
      }
    };

    // Verificar al cargar si ya votó en esta sesión
    const hasVotedInSession =
      sessionStorage.getItem(`voted_${publicId}_${sub}_${dv}`) === "true";
    if (hasVotedInSession && !hasVoted) {
      setHasVoted(true);
      router.replace("/");
      return;
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasVoted, hasParticipated, router, publicId, sub, dv]);

  if (!shouldRender || hasParticipated) {
    return null;
  }

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasVoted) {
      toast.error("Ya has enviado tu voto");
      return;
    }

    setResponse({
      success: false,
      message: "Verificando...",
    });
    setIsLoadingResponse(true);
    setShowResponseModal(true);

    try {
      const response = await registerVote(surveyAnswers, sub, dv);
      if (!response.success) {
        throw new Error(response.message);
      }

      setHasVoted(true);
      // Guardar en sessionStorage inmediatamente
      sessionStorage.setItem(`voted_${publicId}_${sub}_${dv}`, "true");

      // Limpiar el historial del navegador
      if (window.history.length > 1) {
        window.history.replaceState(null, "", "/");
      }

      setTimeout(() => {
        setResponse({
          success: true,
          message: response.message,
        });
      }, 3000);
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Error desconocido");
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo registrar el voto, intente nuevamente";

      setTimeout(() => {
        setResponse({
          success: false,
          message: message,
        });
      }, 3000);
    } finally {
      setTimeout(() => {
        setIsLoadingResponse(false);
      }, 3000);
    }
  };

  // Modal de respuesta exitosa
  if (hasVoted && response.success) {
    return (
      <VoteResponseModal
        response={response}
        show={true}
        isLoading={false}
        onClose={() => {
          // Limpiar completamente el historial y redirigir
          sessionStorage.setItem(`voted_${publicId}_${sub}_${dv}`, "true");
          window.history.replaceState(null, "", "/");
          router.replace("/");
        }}
      />
    );
  }

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
      // return !!currentAnswer?.sector_id;
      if (!currentAnswer?.sector_id) {
        toast.error(
          <span>
            No has seleccionado la opción requerida en:{" "}
            <strong className="font-semibold text-[#0c4696]">
              {currentQuestion.question ||
                `Pregunta ${currentQuestionIndex + 1}`}
            </strong>
          </span>,
        );
        return false;
      }
      return true;
    }

    const selectedOptionsCount = currentAnswer?.selected_options?.length || 0;

    // Check if minimum options requirement is met
    if (selectedOptionsCount < currentQuestion.minOptions) {
      toast.error(
        <span>
          Haz marcado {selectedOptionsCount} de las {currentQuestion.minOptions}{" "}
          opciones requeridas en:{" "}
          <strong className="font-semibold text-[#0c4696]">
            {currentQuestion.question || `Pregunta ${currentQuestionIndex + 1}`}
          </strong>
        </span>,
      );
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
        toast.error(
          <span>
            No has seleccionado la opción requerida en:{" "}
            <strong className="font-semibold text-[#0c4696]">
              {optionDefinition.subQuestion}
            </strong>
          </span>,
        );
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

  if (hasVoted && response.success) {
    return (
      <VoteResponseModal
        response={response}
        show={true}
        isLoading={false}
        onClose={() => {
          window.history.replaceState(null, "", "/");
          router.replace("/");
        }}
      />
    );
  }

  return (
    <>
      {!hasParticipated ? (
        <>
          <VoteResponseModal
            response={{
              success: response.success,
              message: response.message,
            }}
            show={showResponseModal}
            isLoading={isLoadingResponse}
            onClose={() => setShowResponseModal(false)}
          />

          <div
            ref={topRef}
            className="mx-auto grid grid-cols-1 justify-end gap-0 py-6 md:gap-2 md:py-8"
          >
            <div className="rounded-lg lg:col-span-1">
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
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between">
                  {/* Botón Volver */}
                  <button
                    type="button"
                    onClick={() =>
                      handleQuestionChange(currentQuestionIndex - 1)
                    }
                    disabled={currentQuestionIndex === 0}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-300 bg-gradient-to-bl from-slate-50 via-slate-100 to-slate-200/80 px-8 py-4 text-slate-700 shadow-sm transition-all duration-300 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-sm sm:max-w-48"
                  >
                    <div className="absolute inset-0 bg-gradient-to-bl from-slate-200/80 via-slate-100 to-slate-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:!opacity-0" />
                    <div className="relative flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-disabled:translate-x-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span className="font-medium">Volver</span>
                    </div>
                  </button>

                  {/* Botón Continuar/Enviar */}
                  <button
                    type={
                      currentQuestionIndex === surveyQuestions.flat().length - 1
                        ? "submit"
                        : "button"
                    }
                    onClick={() =>
                      handleQuestionChange(currentQuestionIndex + 1)
                    }
                    // disabled={!checkSelectedOptions(true)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-12 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-md sm:max-w-80"
                  >
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:opacity-0"></div> */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:!opacity-0" />
                    <div className="flex items-center justify-center gap-2">
                      <span className="z-10 font-semibold">
                        {currentQuestionIndex ===
                        surveyQuestions.flat().length - 1
                          ? "Enviar Voto"
                          : "Continuar"}
                      </span>
                      {currentQuestionIndex ===
                      surveyQuestions.flat().length - 1 ? null : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Indicador de progreso sutil */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-300 to-blue-400 transition-all duration-300 group-hover:h-1 group-disabled:h-0"></div>
                  </button>
                </div>
              ) : null}
            </form>
            <div className="col-span- grid-cols-3"></div>
          </div>
        </>
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

  return question.isMapQuestion ? (
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
