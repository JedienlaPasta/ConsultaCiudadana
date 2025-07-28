"use client";

import { getDaysLeft } from "@/app/lib/utils/getValues";
import Link from "next/link";
import { useEffect, useState } from "react";
import RexLoader from "./RexAnimation";
import { SurveyGeneralData } from "../lib/definitions/encuesta";
import { formatDateToSpanish } from "@/app/lib/utils/format";
import SurveyState from "./SurveyState";

export default function SurveysList({
  surveys,
}: {
  surveys: SurveyGeneralData[];
}) {
  const [loading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center rounded-lg bg-slate-200/60 p-4">
          <div className="flex w-full flex-col items-center gap-1 rounded-lg bg-white py-5 md:gap-2 md:px-10 md:py-8">
            <RexLoader />
            <p className="animate-pulse text-sm text-slate-500">
              Cargando las consultas...
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {surveys?.map((survey, index) => (
          <Survey key={survey.id + "-" + index} survey={survey} />
        ))}
      </div>
    </div>
  );
}

function Survey({ survey }: { survey: SurveyGeneralData }) {
  const startDate = new Date(survey.survey_start_date);
  const endDate = new Date(survey.survey_end_date);
  const daysLeft = () => {
    if (startDate > new Date()) {
      return getDaysLeft(startDate);
    }
    return getDaysLeft(endDate);
  };

  const calendarDate = () => {
    if (startDate > new Date()) {
      return formatDateToSpanish(survey.survey_start_date);
    }
    return formatDateToSpanish(survey.survey_end_date);
  };

  return (
    <Link
      href={`/consultas/${survey.id}`}
      className="group flex transform transition-all duration-300 hover:translate-y-[-4px]"
    >
      <div className="flex min-h-[185px] grow">
        <div className="col-span-10 flex grow flex-col rounded-l-2xl border border-r-8 border-gray-200 border-r-gray-300 bg-white shadow-md shadow-gray-200/80 transition-all group-hover:shadow-lg">
          <div className="flex h-full grow flex-col px-6.5 pt-5 pb-3 md:gap-1 md:p-8 md:pb-3">
            <div className="flex flex-col justify-between gap-1.5 md:flex-row">
              <h3 className="text-lg font-bold text-[#0A4C8A] transition-colors group-hover:text-[#002F4C] md:text-xl">
                {survey.survey_name}
              </h3>
              <div className="mb-2 flex flex-wrap gap-2">
                <SurveyState startDate={startDate} endDate={endDate} />
                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-slate-700">
                  {survey.department}
                </span>
              </div>
            </div>
            <p className="line-clamp-2 text-sm text-gray-600 md:text-base">
              {survey.survey_short_description}
            </p>
          </div>
          <div className="relative flex w-full justify-between rounded-b-lg border-t border-gray-200 px-6 py-3 text-sm font-medium text-slate-600 md:px-8">
            <p className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{startDate > new Date() ? "Inicio:" : "Término:"}</span>
              <span
                className={daysLeft() > 0 ? "text-slate-600" : "text-rose-400"}
              >
                {daysLeft() + (daysLeft() === 1 ? " día" : " días")}
              </span>
            </p>
            <span
              className={`transition-colors ${daysLeft() > 0 ? "text-slate-600" : "text-rose-400"} [#0A4C8A] group-hover:text-[#002F4C]" : "text-rose-500"}`}
            >
              {startDate > new Date()
                ? "Ver detalle →"
                : endDate > new Date()
                  ? "Participar →"
                  : "Consulta cerrada"}
            </span>
          </div>
        </div>
        <div
          title="Término de la consulta"
          className="rounded-l-lgs col-span-2 hidden min-w-[10rem] items-center justify-center rounded-r-3xl bg-gradient-to-br from-[#093F75] to-[#0A4C8A] text-slate-100 shadow-md transition-all group-hover:from-[#002F4C] group-hover:to-[#0A4C8A] sm:flex"
        >
          <span className="relative -top-[5%] flex flex-col items-center text-nowrap">
            <p className="text-3xl font-bold">{calendarDate().split(" ")[0]}</p>
            <p className="text-sm text-slate-100/90">
              {calendarDate()
                .toString()
                .slice(2, calendarDate().toString().length)}
            </p>
            <p className="absolute top-[110%] border-t border-slate-400 px-2 py-0.5 text-xs text-slate-300">
              {startDate > new Date()
                ? "Inicia"
                : endDate > new Date()
                  ? "Finaliza"
                  : "Finalizó"}
            </p>
          </span>
        </div>
      </div>
    </Link>
  );
}
