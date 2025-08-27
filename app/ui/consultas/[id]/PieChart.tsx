"use client";
import { SurveyAnalytics } from "@/app/lib/data/analytics";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// color: "#8884d8" },
// color: "#82ca9d" },
// color: "#ffc658" },
// color: "#ff8042" },

type TooltipPayload = {
  name: string;
  value: number;
  payload: {
    color: string;
    total: number;
  };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  coordinate?: { x: number; y: number };
};

export default function AnalyticsDonuts({
  analytics,
}: {
  analytics: SurveyAnalytics;
}) {
  console.log(analytics);
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

  // Componente personalizado para el tooltip
  const CustomTooltip = ({
    active,
    payload,
    coordinate,
  }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const { x, y } = coordinate ?? { x: 0, y: 0 };
      const data = payload[0];
      return (
        <div
          className="pointer-events-none absolute z-50 w-fit rounded-lg border border-gray-200 bg-white p-3 shadow-lg"
          style={{ left: x + 10, top: y - 20, position: "absolute" }}
        >
          <div className="flex items-start space-x-1">
            <div
              className="mt-1.5 size-3 rounded-full"
              style={{ backgroundColor: data.payload.color }}
            />
            <div className="px-1">
              <span className="text-sm font-medium text-nowrap text-slate-700">
                {data.name}
              </span>
              <div className="mt-1 text-left text-xs text-gray-600">
                {data.value} votos (
                {((data.value / data.payload.total) * 100).toFixed(1)}%)
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {analytics.questionResults.map((question) => {
        const totalVotes = question.options.reduce(
          (sum, option) => sum + option.voteCount,
          0,
        );

        // Crear un mapeo de colores basado en el índice original de cada opción
        const colorMap = new Map();
        question.options.forEach((option, index) => {
          colorMap.set(option.optionName, colors[index % colors.length]);
        });

        const optionsWithVotes = question.options.filter(
          (option) => option.voteCount > 0,
        );

        // Datos para el gráfico (solo opciones con votos) - usando colorMap
        const data = optionsWithVotes.map((option) => ({
          name: option.optionName,
          value: option.voteCount,
          color: colorMap.get(option.optionName),
          total: totalVotes,
        }));

        // Datos para la leyenda (todas las opciones) - usando colorMap
        const legendData = question.options.map((option) => ({
          name: option.optionName,
          value: option.voteCount,
          color: colorMap.get(option.optionName),
          total: totalVotes,
        }));

        return (
          <div
            key={question.questionId}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="mb-4 rounded-lg px-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {question.question}
              </h3>
            </div>

            <div className="flex flex-col rounded-lg px-4 lg:flex-row lg:items-center lg:space-x-8">
              {/* Gráfico de Dona */}
              <div className="mb-6 flex-shrink-0 outline-none lg:mb-0">
                <div className="relative h-[300px] w-[300px] outline-none">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    className="[&_svg]:outline-none [&_svg_*]:outline-none"
                  >
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        innerRadius={80}
                        outerRadius={150}
                        paddingAngle={1}
                        cornerRadius={5}
                        style={{ outline: "none" }}
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="white"
                            strokeWidth={2}
                            style={{ outline: "none" }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={(props) => <CustomTooltip {...props} />}
                        wrapperStyle={{ zIndex: 1000 }}
                        allowEscapeViewBox={{ x: true, y: true }}
                        cursor={false}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Texto central con z-index menor */}
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">
                        {totalVotes.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Votos</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leyenda */}
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {legendData.map((segment, index) => {
                    const percentage =
                      totalVotes > 0 ? (segment.value / totalVotes) * 100 : 0;
                    const hasVotes = segment.value > 0;
                    return (
                      <div
                        key={index}
                        title={segment.name}
                        className={`flex cursor-context-menu items-start space-x-3 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-slate-200/70 ${
                          hasVotes ? "" : "opacity-60"
                        }`}
                      >
                        <div
                          className="mt-0.5 size-4 flex-shrink-0 rounded-sm"
                          style={{
                            backgroundColor: segment.color,
                            opacity: hasVotes ? 1 : 0.5,
                          }}
                        ></div>
                        <div className="min-w-0 flex-1">
                          <div
                            className={`truncate text-sm font-medium ${
                              hasVotes ? "text-slate-700" : "text-gray-500"
                            }`}
                          >
                            {segment.name}
                          </div>
                          <div className="text-xs text-gray-500/90">
                            {segment.value.toLocaleString()} votos
                          </div>
                        </div>
                        <div
                          className={`text-sm font-semibold ${
                            hasVotes ? "text-slate-700" : "text-gray-400"
                          }`}
                        >
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
