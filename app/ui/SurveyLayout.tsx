"use client";
import { useRef, useState } from "react";
import MapSection from "./piimep/MapSection";
import SurveyProgress from "./SurveyProgress";
import SectorSelectionList from "./piimep/SectorSelectionList";
import RexLoader from "./piimep/rex-animaton";

const QUESTIONS_LIST = [
  {
    index: 0,
    step: "Seleccionar sector",
    step_description: "Tu lugar de residencia",
    question: "¿En que sector se ubica tu vivienda?",
    description: "Haz clic en el mapa para seleccionar el sector donde vives.",
    options: [
      {
        id: "EL QUISCO NORTE",
        nombre: "El Quisco Norte",
        poblacion: "~2,300 hab.",
        area: "1.2 km²",
      },
      {
        id: "EL QUISCO ALTO",
        nombre: "El Quisco Alto",
        poblacion: "~1,500 hab.",
        area: "0.8 km²",
      },
      {
        id: "PINOMAR",
        nombre: "Pinomar",
        poblacion: "~1,600 hab.",
        area: "0.6 km²",
      },
      {
        id: "EL QUISCO CENTRO ORIENTE",
        nombre: "Quisco Centro Oriente",
        poblacion: "~1,500 hab.",
        area: "1.5 km²",
      },
      {
        id: "EL QUISCO CENTRO PONIENTE",
        nombre: "Quisco Centro Poniente",
        poblacion: "~2,100 hab.",
        area: "1.3 km²",
      },
      {
        id: "EL QUISCO SUR ORIENTE",
        nombre: "Quisco Sur Oriente",
        poblacion: "~1,100 hab.",
        area: "1.0 km²",
      },
      {
        id: "EL QUISCO SUR PONIENTE",
        nombre: "Quisco Sur Poniente",
        poblacion: "~2,300 hab.",
        area: "0.9 km²",
      },
      {
        id: "EL TOTORAL BAJO",
        nombre: "El Totoral Bajo",
        poblacion: "~400 hab.",
        area: "0.4 km²",
      },
      {
        id: "PUNTA DE TRALCA",
        nombre: "Punta de Tralca",
        poblacion: "~2.500 hab.",
        area: "0.7 km²",
      },
      {
        id: "ISLA NEGRA",
        nombre: "Isla Negra",
        poblacion: "~1,300 hab.",
        area: "1.1 km²",
      },
      {
        id: "EL TOTORAL MEDIO",
        nombre: "El Totoral Medio",
        poblacion: "~500 hab.",
        area: "0.5 km²",
      },
      {
        id: "EL TOTORAL NORTE",
        nombre: "El Totoral Norte",
        poblacion: "~200 hab.",
        area: "0.6 km²",
      },
      {
        id: "EL TOTORAL",
        nombre: "El Totoral",
        poblacion: "~1,000 hab.",
        area: "0.5 km²",
      },
    ],
  },
  {
    index: 1,
    step: "Componentes urbanos",
    step_description: "Mejoras a implementar en tu sector",
    question: "Pregunta 2",
    description: "",
    options: [],
  },
  {
    index: 2,
    step: "Confirmar voto",
    step_description: "Confirma que los datos son correctos",
    question: "Pregunta 3",
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
  options: {
    id: string;
    nombre: string;
    poblacion: string;
    area: string;
  }[];
};

export default function SurveyLayout() {
  const [selectedSectorId, setSelectedSectorId] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const handleQuestionChange = (nextQuestionIndex: number) => {
    if (
      nextQuestionIndex < 0 ||
      nextQuestionIndex > QUESTIONS_LIST.length - 1
    ) {
      return;
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
        <QuestionSection
          isLoading={isLoading}
          question={QUESTIONS_LIST[currentQuestionIndex]}
          selectedSectorId={selectedSectorId}
          setSelectedSectorId={setSelectedSectorId}
        />
        {!isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
              className="col-span-1 w-full cursor-pointer rounded-lg bg-gray-400 py-3 text-sm text-white transition-all active:scale-90"
            >
              Volver
            </button>
            <button
              onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
              className="col-span-1 w-full cursor-pointer rounded-lg bg-blue-500 py-3 text-sm text-white transition-all active:scale-90"
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
  selectedSectorId: string;
  setSelectedSectorId: (sectorId: string) => void;
};

function QuestionSection({
  isLoading,
  question,
  selectedSectorId,
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

  return isMap ? (
    <MapSection
      selectedSectorId={selectedSectorId}
      setSelectedSectorId={setSelectedSectorId}
      sectoresSurveyList={QUESTIONS_LIST[0]}
    />
  ) : (
    <SectorSelectionList
      sectoresSurveyList={QUESTIONS_LIST[0]}
      selectedSector={selectedSectorId}
      setSelectedSector={setSelectedSectorId}
    />
  );
}
