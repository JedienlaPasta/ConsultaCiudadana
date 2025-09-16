"use client";
import { QuestionResult } from "@/app/lib/data/analytics";

export default function BarsChart({ question }: { question: QuestionResult }) {
  const colors = [
    "#3B82F6", // blue-500
    "#8B5CF6", // purple-500
    "#10B981", // emerald-500
    "#F59E0B", // amber-500
    "#EF4444", // red-500
    "#EC4899", // pink-500
    "#06B6D4", // cyan-500
    "#84CC16", // lime-500
  ];

  const totalVotes = question.options.reduce(
    (sum, option) => sum + option.voteCount,
    0,
  );

  // Crear un mapeo de colores basado en el índice original de cada opción
  const colorMap = new Map();
  question.options.forEach((option, index) => {
    colorMap.set(option.optionName, colors[index % colors.length]);
  });

  // Datos para la leyenda (todas las opciones) - usando colorMap
  const legendData = question.options.map((option) => ({
    name: option.optionName,
    value: option.voteCount,
    color: colorMap.get(option.optionName),
    total: totalVotes,
  }));

  return (
    <div className="space-y-8">
      <div
        key={question.questionId}
        className="borders rounded-xl border-slate-200 bg-white md:pr-6"
      >
        <div className="flex flex-col items-center gap-6 rounded-lg lg:flex-row lg:space-x-8">
          {/* Bars Graph */}
          <div className="w-full">
            <div className="grid grid-cols-1 gap-1.5">
              <span className="flex justify-between text-sm font-medium text-slate-500">
                <span className="flex gap-1.5">
                  <p className="ml-3 rounded bg-slate-200/80 px-2">%</p>
                  <p className="rounded bg-slate-200/80 px-2">Opciones</p>
                </span>
                <p className="rounded bg-slate-200/80 px-2">Votos</p>
              </span>
              {legendData.map((segment, index) => {
                // Encontrar el valor máximo de votos
                const maxVotes = Math.max(
                  ...legendData.map((item) => item.value),
                );

                // Calcular el porcentaje basado en el valor máximo
                const percentage =
                  maxVotes > 0 ? (segment.value / maxVotes) * 100 : 0;
                const hasVotes = segment.value > 0;
                return (
                  <div
                    key={index}
                    title={segment.name}
                    className="relative flex cursor-pointer items-center space-x-2 overflow-hidden rounded-lg bg-slate-200/50 px-3.5 py-2.5 transition-all duration-300 hover:scale-105"
                  >
                    <div
                      className="absolute top-0 left-0 h-full flex-shrink-0 rounded-sm"
                      style={{
                        backgroundColor: segment.color,
                        width: `${percentage}%`,
                        opacity: hasVotes ? 0.8 : 0.5,
                      }}
                    ></div>
                    <div
                      className={`z-10 text-sm font-semibold ${
                        hasVotes
                          ? "text-slate-900/90"
                          : "text-gray-400 opacity-60"
                      }`}
                    >
                      {percentage.toFixed(0)}%
                    </div>
                    <div className="z-10 min-w-0 flex-1">
                      <div
                        className={`truncate text-sm font-medium ${
                          hasVotes
                            ? "text-slate-900/90"
                            : "text-gray-400 opacity-60"
                        }`}
                      >
                        {segment.name}
                      </div>
                    </div>
                    <div
                      className={`z-10 text-sm font-medium ${
                        hasVotes
                          ? "text-slate-900/90"
                          : "text-gray-400 opacity-60"
                      }`}
                    >
                      {segment.value.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
