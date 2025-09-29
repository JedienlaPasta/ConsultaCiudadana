import React from "react";

export default function AnalyticsCard({
  title,
  value,
  textColor,
  icon,
}: {
  title: string;
  value: number;
  textColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-slate-200/60 bg-white/80 px-6 py-5 shadow-lg shadow-blue-900/5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/10">
      <div className="flex items-center justify-between gap-4">
        <div className="transition-transform duration-200 group-hover:scale-105">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p
            className={`text-3xl font-bold transition-colors ${textColor} transform duration-200`}
          >
            {value || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
