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

export default function SurveyProgressV2() {
  return (
    <div className="rounded-lg border border-gray-200 bg-[#f8fafc] p-6 shadow-md shadow-gray-200/80">
      {/* <h3 className="mb-6 text-center text-xl font-bold text-[#0a4c8a]">
        Progreso de Cuestionario
      </h3> */}
      <div className={`flex flex-nowrap justify-center gap-4`}>
        {steps.map((step, index) => (
          <ProgressStep
            key={step.id}
            step={step}
            isLast={index === steps.length - 1}
            index={index + 1}
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

function ProgressStep({
  step,
  isLast,
  index,
}: {
  step: Step;
  isLast: boolean;
  index: number;
}) {
  return (
    <div className="relative flex w-20 shrink-0 flex-col items-center sm:w-38 md:w-52">
      {/* Horizontal line */}
      {!isLast && (
        <div
          className={`absolute top-[21%] h-[2px] w-[calc(100%-40px)] translate-x-[calc(50%+28px)] rounded-full sm:top-[28%] md:top-[21%] ${step.completed ? "bg-[#0A4C8A]" : "bg-gray-200"}`}
        />
      )}

      {/* Step indicator with icon */}
      <div
        className={`flex size-8 flex-shrink-0 items-center justify-center rounded-full border-2 ${step.completed ? "border-[#0A4C8A] !bg-[#0A4C8A] text-white" : step.current ? "border-[#0A4C8A] !bg-[#0A4C8A] text-white" : "border-gray-300 text-gray-500"} bg-gray-200 text-sm font-medium text-[#0A4C8A]`}
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
        ) : (
          index
        )}
      </div>

      {/* Step content */}
      <div>
        <h4
          className={`text-center text-sm font-semibold md:text-base ${step.completed || step.current ? "text-[#0A4C8A]" : "text-gray-500"} ${!step.current ? "hidden sm:block" : ""}`}
        >
          {step.title}
        </h4>
        <p className="hidden text-center text-xs text-gray-600 md:block">
          {step.description}
        </p>
      </div>
    </div>
  );
}

// step.current ? (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5 rotate-90"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//         clipRule="evenodd"
//       />
//     </svg>
//   )
