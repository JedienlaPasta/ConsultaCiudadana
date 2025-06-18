"use client";

const steps = [
  {
    id: 1,
    title: "Seleccionar sector",
    description: "Tu lugar de residencia",
    completed: true,
    current: false,
  },
  {
    id: 2,
    title: "Componentes urbanos",
    description: "Mejoras a implementar en tu sector",
    completed: false,
    current: true,
  },
  {
    id: 3,
    title: "Confirma tu voto",
    description: "Confirma que los datos son correctos",
    completed: false,
    current: false,
  },
];

export default function SurveyProgress() {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-[#f8fafc] p-6 shadow-md shadow-gray-200/80">
      <h3 className="mb-6 text-xl font-bold text-[#0a4c8a]">
        Progreso de Cuestionario
      </h3>
      <div className="flex flex-col">
        {steps.map((step, index) => (
          <ProgressStep
            key={step.id}
            step={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

type Step = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
};

function ProgressStep({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <div className="relative flex items-start">
      {/* Vertical line */}
      {!isLast && (
        <div
          className={`absolute top-9.5 left-4 h-full w-[2px] rounded-full ${step.completed ? "bg-[#0A4C8A]" : "bg-gray-200"}`}
          style={{ transform: "translateX(-50%)", height: "calc(100% - 44px)" }}
        />
      )}

      {/* Step indicator with icon */}
      <div
        className={`z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 ${step.completed ? "border-[#0A4C8A]" : step.current ? "bg-blue-300" : "bg-gray-200"} text-sm font-medium text-[#0A4C8A]`}
      >
        {step.completed ? (
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
        ) : step.current ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Step content */}
      <div className="ml-4 pb-8">
        <h4
          className={`font-semibold ${step.completed || step.current ? "text-[#0A4C8A]" : "text-gray-500"}`}
        >
          {step.title}
        </h4>
        <p className="text-xs text-gray-600">{step.description}</p>
      </div>
    </div>
  );
}
