"use client";
import { useRef, useState } from "react";
import MapSection from "./piimep/MapSection";
import SurveyProgress from "./SurveyProgress";
import RexLoader from "./piimep/rex-animaton";
import OptionSelectionList from "./OptionSelectionList";
import VoteConfirmationOverview from "./VoteConfirmationOverview";
import { useRouter } from "next/navigation";

export const QUESTIONS_LIST = [
  {
    index: 0,
    step: "Seleccionar sector",
    step_description: "Tu lugar de residencia",
    question: "¿En que sector se ubica tu vivienda?",
    answers: 1,
    description: "Haz clic en el mapa para seleccionar el sector donde vives.",
    options: [
      {
        id: "EL QUISCO NORTE",
        name: "El Quisco Norte",
        population: "~2300 hab.",
        area: "1.2 km²",
      },
      {
        id: "EL QUISCO ALTO",
        name: "El Quisco Alto",
        population: "~1500 hab.",
        area: "0.8 km²",
      },
      {
        id: "PINOMAR",
        name: "Pinomar",
        population: "~1600 hab.",
        area: "0.6 km²",
      },
      {
        id: "EL QUISCO CENTRO ORIENTE",
        name: "Quisco Centro Oriente",
        population: "~1500 hab.",
        area: "1.5 km²",
      },
      {
        id: "EL QUISCO CENTRO PONIENTE",
        name: "Quisco Centro Poniente",
        population: "~2100 hab.",
        area: "1.3 km²",
      },
      {
        id: "EL QUISCO SUR ORIENTE",
        name: "Quisco Sur Oriente",
        population: "~1100 hab.",
        area: "1.0 km²",
      },
      {
        id: "EL QUISCO SUR PONIENTE",
        name: "Quisco Sur Poniente",
        population: "~2300 hab.",
        area: "0.9 km²",
      },
      {
        id: "EL TOTORAL BAJO",
        name: "El Totoral Bajo",
        population: "~400 hab.",
        area: "0.4 km²",
      },
      {
        id: "PUNTA DE TRALCA",
        name: "Punta de Tralca",
        population: "~2500 hab.",
        area: "0.7 km²",
      },
      {
        id: "ISLA NEGRA",
        name: "Isla Negra",
        population: "~1300 hab.",
        area: "1.1 km²",
      },
      {
        id: "EL TOTORAL MEDIO",
        name: "El Totoral Medio",
        population: "~500 hab.",
        area: "0.5 km²",
      },
      {
        id: "EL TOTORAL NORTE",
        name: "El Totoral Norte",
        population: "~200 hab.",
        area: "0.6 km²",
      },
      {
        id: "EL TOTORAL",
        name: "El Totoral",
        population: "~1000 hab.",
        area: "0.5 km²",
      },
    ],
  },
  {
    index: 1,
    step: "Componentes urbanos",
    step_description: "Mejoras a implementar en tu sector",
    question: "Seleccione tres componentes",
    answers: 3,
    description: "",
    options: [
      {
        id: "1",
        name: "Tramo conector",
        question: "Seleccione un tramo",
        description: "Descripcion de la opción numero uno...",
        answers: 1,
        options: [
          {
            id: "1.1",
            name: "Tramo 1 Peñablanca",
            description: "Descripcion del tramo numero uno...",
            sector: "EL QUISCO NORTE",
          },
          {
            id: "1.2",
            name: "Tramo 2 Ruca pedrera",
            description: "Descripcion del tramo numero dos...",
            sector: "EL QUISCO NORTE",
          },
          {
            id: "1.3",
            name: "Tramo 3 Miramar",
            description: "Descripcion del tramo numero tres...",
            sector: "",
          },
          {
            id: "1.4",
            name: "Tramo 4 Narciso Aguirre",
            description: "Descripcion del tramo numero cuatro...",
            sector: "",
          },
          {
            id: "1.5",
            name: "Tramo 5 Lobos tranquilos",
            description: "Descripcion del tramo numero cinco...",
            sector: "",
          },
          {
            id: "1.6",
            name: "Tramo 6 Cisne negro",
            description: "Descripcion del tramo numero seis...",
            sector: "EL QUISCO SUR",
          },
          {
            id: "1.7",
            name: "Tramo 7 Av Punta tralca",
            description: "Descripcion del tramo numero siete...",
            sector: "",
          },
          {
            id: "1.8",
            name: "Tramo 8 Av Punta tralca, Piedra trueno",
            description: "Descripcion del tramo numero ocho...",
            sector: "",
          },
          {
            id: "1.9",
            name: "Tramo 9 Isla negra",
            description: "Descripcion del tramo numero nueve...",
            sector: "",
          },
        ],
      },
      {
        id: "2",
        name: "Peatonalizacion permanente",
        description: "Descripcion de la opción numero dos...",
      },
      {
        id: "3",
        name: "Peatonalizacion temporal",
        description: "Descripcion de la opción numero tres...",
      },
      {
        id: "4",
        name: "Sentido de tránsito",
        description: "Descripcion de la opción numero cuatro...",
      },
      {
        id: "5",
        name: "Cruce piimep dubornais",
        description: "Descripcion de la opción numero cinco...",
      },
      {
        id: "6",
        name: "Ciclovia táctica",
        description: "Descripcion de la opción numero seis...",
      },
      {
        id: "7",
        name: "Eliminación estacionamiento",
        description: "Descripcion de la opción numero siete...",
      },
      {
        id: "8",
        name: "Sendero quebrada",
        description: "Descripcion de la opción numero siete...",
      },
    ],
  },
  {
    index: 2,
    step: "Confirmar voto",
    step_description: "Confirma que los datos son correctos",
    question: "Resumen",
    answers: 1,
    description: "",
    options: [],
  },
];

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
    console.log(isTramoConectorSelected);
    if (isSectorQuestion && !selectedSectorId) return false;
    if (!isSectorQuestion && selectedOptions.length < 3) return false;
    if (!isSectorQuestion && isTramoConectorSelected && !selectedSubOption)
      return false;
    return true;
  };

  const handleQuestionChange = (nextQuestionIndex: number) => {
    // Check if its within the limits of the questions array
    if (nextQuestionIndex < 0) {
      return;
    }
    if (nextQuestionIndex > QUESTIONS_LIST.length - 1) {
      router.push("/");
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
              Continuar
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
    />
  );
}
