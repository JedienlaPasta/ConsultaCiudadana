"use client";
import useTimeAgo from "@/app/hooks/useTimeAgo";

export type MetricCardProps = {
  title: string;
  value: string;
  color: string;
  icon: React.ReactNode;
  lastUpdated?: Date; // Nueva prop opcional
};

export default function ParticipationMetricCard({
  title,
  value,
  color,
  icon,
  lastUpdated,
}: MetricCardProps) {
  // Crear un timestamp fijo solo una vez si no se proporciona
  const timeAgo = useTimeAgo(lastUpdated);
  const colorClasses = {
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      ring: "ring-emerald-200",
      gradient: "from-emerald-500 to-emerald-600",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      ring: "ring-blue-200",
      gradient: "from-blue-500 to-blue-600",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      ring: "ring-purple-200",
      gradient: "from-purple-500 to-purple-600",
    },
  };

  const colors =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ${colors.ring} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-4`}
      ></div>

      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className={`inline-flex rounded-xl ${colors.bg} p-3 ring-1 ${colors.ring} transition-transform duration-300`}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-600 transition-colors group-hover:text-slate-900">
              {title}
            </h3>
            <p
              className={`text-right text-3xl font-bold ${colors.text} transition-all duration-300`}
            >
              {value}
            </p>
          </div>
        </div>

        <div className="mt-3">
          <div className="mt-2 flex items-center text-xs text-slate-500">
            <svg
              className="mr-1 h-3 w-3 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Actualizado {timeAgo}
          </div>
        </div>
      </div>
    </div>
  );
}
