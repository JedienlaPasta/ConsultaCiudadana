import { ChronogramItem } from "@/app/lib/definitions/encuesta";
import React from "react";

export default function Schedule({ schedule }: { schedule: ChronogramItem[] }) {
  console.log(schedule[0].date);
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-[#23396f]">
        {schedule[0].date ? "Cronograma" : "Plan de Acción"}
      </h3>
      <div className="space-y-6">
        {schedule?.map((item, index) => (
          <div className="relative flex" key={item.phase}>
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
              {index + 1}
            </div>
            <div className="ml-4">
              <h4 className="font-semibold text-[#0A4C8A]">{item.phase}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-1 text-xs text-gray-500">{item.date}</p>
            </div>
            {index < schedule.length - 1 && (
              <div className="absolute top-10 left-[14px] h-[70%] w-[4px] rounded-full border-blue-400 bg-slate-300 sm:top-[38px]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
