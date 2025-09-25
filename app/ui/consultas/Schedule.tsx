import { ChronogramItem } from "@/app/lib/definitions/encuesta";
import React from "react";

export default function Schedule({ schedule }: { schedule: ChronogramItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 p-5 sm:px-8 sm:py-6">
      <h3 className="mb-3 bg-gradient-to-r from-[#23396f] to-blue-700 bg-clip-text text-xl font-bold text-transparent">
        {schedule[0].date ? "Cronograma" : "Plan de Acción"}
      </h3>
      <div className="space-y-6s">
        {schedule?.map((item, index) => (
          <div
            className="pb-4s relative flex min-h-[80px] not-last:pb-6"
            key={item.phase}
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#407eb7] to-[#23396f] text-sm font-bold text-white">
              {index + 1}
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-[#0A4C8A]">{item.phase}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.date && (
                <p className="mt-1 text-xs text-gray-500">{item.date}</p>
              )}
            </div>
            {index < schedule.length - 1 && (
              <div className="absolute top-[37px] left-[14px] h-[calc(100%-42px)] w-[4px] rounded-full border-blue-400 bg-slate-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
