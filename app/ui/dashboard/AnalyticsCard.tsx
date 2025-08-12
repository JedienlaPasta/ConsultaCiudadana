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
    <div className="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/80 transition-shadow hover:shadow-md hover:shadow-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
