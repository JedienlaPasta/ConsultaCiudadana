import React from "react";

export type MetricCardProps = {
  title: string;
  value: string;
  color: string;
  icon: React.ReactNode;
};

export default function ParticipationMetricCard({
  title,
  value,
  color,
  icon,
}: MetricCardProps) {
  return (
    <div className="rounded-lg bg-white px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-lg bg-${color}-100 p-2.5`}>{icon}</div>
          <p className="text-sm font-semibold text-gray-600">{title}</p>
        </div>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
      </div>
    </div>
  );
}
