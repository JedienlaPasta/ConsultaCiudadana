"use client";
import { QuestionResult } from "@/app/lib/data/analytics";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useRef, useState } from "react";

// color: "#8884d8" },
// color: "#82ca9d" },
// color: "#ffc658" },
// color: "#ff8042" },

export default function AnalyticsDonuts({
  question,
}: {
  question: QuestionResult;
}) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const chartSize = 300;
  const innerRadius = 80;
  const outerRadius = 150;

  const initialHover = {
    show: false,
    x: chartSize / 2,
    y: chartSize / 2,
    name: "",
    value: 0,
    color: "",
    total: 0,
  };
  const [hover, setHover] = useState(initialHover);
  const hoverRef = useRef(initialHover);

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

  // helper clamp
  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  // Centralizado: inner/outer radius (usa los mismos valores que en <Pie>)
  const INNER_RADIUS = 80;
  const OUTER_RADIUS = 150;
  const MOUSE_OFFSET_X = 12;
  const MOUSE_OFFSET_Y = -12;
  const PAD = 8;

  const updateHover = (next: Partial<typeof initialHover>) => {
    hoverRef.current = { ...hoverRef.current, ...next };
    setHover({ ...hoverRef.current });
  };

  // Handler principal: Pie onMouseMove
  const handlePieMouseMove = (
    entry: {
      name?: string;
      value?: number;
      payload?: { color?: string };
      color?: string;
    },
    _index: number,
    e: React.MouseEvent<SVGElement> | { clientX?: number; clientY?: number },
  ) => {
    if (!chartRef.current) return;

    const clientX = "clientX" in e ? (e.clientX ?? 0) : 0;
    const clientY = "clientY" in e ? (e.clientY ?? 0) : 0;

    const rect = chartRef.current.getBoundingClientRect();
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = relX - centerX;
    const dy = relY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // fuera del anillo -> ocultar inmediatamente
    if (distance < INNER_RADIUS || distance > OUTER_RADIUS) {
      if (hoverRef.current.show) {
        updateHover({ show: false });
      }
      return;
    }

    // medir tooltip (si está montado) para hacer clamp
    const tooltipRect = tooltipRef.current?.getBoundingClientRect();
    const TW = tooltipRect?.width ?? 180; // fallback
    const TH = tooltipRect?.height ?? 64;

    // calcular posición relativa y clamp dentro del rect
    const rawX = relX + MOUSE_OFFSET_X;
    const rawY = relY + MOUSE_OFFSET_Y;
    const clampedX = clamp(rawX, PAD, rect.width - TW - PAD);
    const clampedY = clamp(rawY, PAD, rect.height - TH - PAD);

    // calcular datos del slice
    const name = entry?.name ?? "";
    const value = entry?.value ?? 0;
    const color = entry?.payload?.color ?? entry.color ?? "#999";

    // evitar actualizaciones innecesarias (reduce parpadeo y re-renders)
    const dxState = Math.abs(hoverRef.current.x - clampedX);
    const dyState = Math.abs(hoverRef.current.y - clampedY);
    const sameSlice =
      hoverRef.current.name === name && hoverRef.current.value === value;

    if (!hoverRef.current.show || !sameSlice || dxState > 2 || dyState > 2) {
      updateHover({
        show: true,
        x: clampedX,
        y: clampedY,
        name,
        value,
        color,
        total: totalVotes,
      });
    }
  };

  // Fallback: cuando el mouse salga del bounding box del chart, ocultar tooltip
  const handleChartMouseLeave = () => {
    // ocultado suave por CSS (solo cambiar show a false)
    if (hoverRef.current.show) updateHover({ show: false });
  };

  return (
    <div className="space-y-8">
      <div
        key={question.questionId}
        className="rounded-lg bg-white p-6 shadow-sm"
      >
        {/* <div className="mb-4 rounded-lg px-4 py-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {question.question}
          </h3>
        </div> */}

        <div className="flex flex-col rounded-lg px-4 lg:flex-row lg:items-center lg:space-x-8">
          {/* Gráfico de Dona */}
          <div className="mb-6 flex-shrink-0 outline-none lg:mb-0">
            <div
              ref={chartRef}
              onMouseLeave={handleChartMouseLeave}
              className="relative h-[350px] w-[350px] rounded-full outline-none"
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
                className="[&_svg]:outline-none [&_svg_*]:outline-none"
              >
                <PieChart className="borders rounded-full bg-slate-100">
                  <Pie
                    data={data}
                    dataKey="value"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={1}
                    cornerRadius={5}
                    style={{ outline: "none" }}
                    onMouseMove={handlePieMouseMove}
                    isAnimationActive={false}
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
                </PieChart>
              </ResponsiveContainer>
              {/* Texto central */}
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex h-34 w-34 flex-col items-center justify-center rounded-full bg-white text-center">
                  <div className="text-2xl font-bold text-slate-800">
                    {totalVotes.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Votos</div>
                </div>
              </div>

              {/* Tooltip custom, encima del chart */}
              <div
                ref={tooltipRef}
                className={`pointer-events-none absolute z-50 w-fit transform rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg transition-all duration-150 ease-out ${
                  hover.show ? "scale-100 opacity-95" : "scale-95 opacity-0"
                }`}
                style={{ left: hover.x, top: hover.y }}
                aria-hidden={!hover.show}
              >
                <div className="flex items-start space-x-1">
                  <div
                    className="mt-1.5 size-3 rounded-full"
                    style={{ backgroundColor: hover.color }}
                  />
                  <div className="px-1">
                    <span className="text-sm font-medium text-nowrap text-slate-700">
                      {hover.name}
                    </span>
                    <div className="text-left text-xs text-gray-600">
                      {hover.value.toLocaleString()} votos (
                      {hover.total > 0
                        ? ((hover.value / hover.total) * 100).toFixed(1)
                        : "0.0"}
                      %)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leyenda */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {legendData.map((segment, index) => {
                const percentage =
                  totalVotes > 0 ? (segment.value / totalVotes) * 100 : 0;
                const hasVotes = segment.value > 0;
                return (
                  <div
                    key={index}
                    title={segment.name}
                    className={`flex cursor-context-menu items-start space-x-3 rounded-lg px-3.5 py-2.5 transition-colors duration-200 hover:bg-slate-200/50 ${
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
    </div>
  );
}
