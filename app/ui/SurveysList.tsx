"use client";

import { getDaysLeft } from "@/app/lib/utils/getValues";
import Link from "next/link";
import { useEffect, useState } from "react";
import RexLoader from "./RexAnimation";
import { SurveyGeneralData } from "../lib/definitions/encuesta";
import { formatDateToSpanish } from "@/app/lib/utils/format";

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

  const surveyState = () => {
    if (new Date(survey.survey_start_date) > new Date()) {
      return "En Espera";
    }
    if (new Date(survey.survey_end_date) > new Date()) {
      return "Activa";
    } else {
      return "Terminada";
    }
  };

  const stateTextColor = () => {
    if (new Date(survey.survey_start_date) > new Date()) {
      return "text-orange-600";
    }
    if (new Date(survey.survey_end_date) > new Date()) {
      return "text-emerald-600 ";
    } else {
      return "text-rose-600";
    }
  };

  const stateBgColor = () => {
    if (new Date(survey.survey_start_date) > new Date()) {
      return "bg-orange-200/50";
    }
    if (new Date(survey.survey_end_date) > new Date()) {
      return "bg-emerald-200/50 ";
    } else {
      return "bg-rose-200/50";
    }
  };

  return (
    <Link
      href={`/consultas/${survey.id}`}
      className="group flex transform transition-all duration-300 hover:translate-y-[-4px]"
    >
      <div className="flex grow">
        <div className="col-span-10 flex grow flex-col rounded-l-2xl border border-r-8 border-slate-200/80 border-r-gray-300 bg-slate-100/80 shadow-md shadow-gray-200/80 transition-all group-hover:shadow-lg">
          <div className="pt-5s flex h-full grow flex-col p-4 pb-3 sm:p-6.5 sm:pb-4 md:gap-1 md:p-7 md:pb-5">
            <div>
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
                <h1 className="text-lg font-bold text-slate-700 transition-colors group-hover:text-[#03529c] sm:text-xl lg:text-2xl">
                  {survey.survey_name}
                </h1>
                <div
                  className={`inline-flex items-center gap-1.5 rounded-md py-1 pr-2.5 pl-2 text-xs font-medium backdrop-blur-sm ${stateBgColor()} ${stateTextColor()}`}
                >
                  {surveyState() === "Terminada" ? (
                    <svg
                      className="size-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="size-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  Consulta {surveyState()}
                </div>
              </div>
              {/* Miscellaneous Info */}
              <div className="mb-2 flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <svg
                    className="size-4 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="text-sm font-medium">Departamento:</span>
                  <span className="text-sm font-semibold text-slate-700">
                    {survey.department}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <svg
                    className="size-4 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Inicio:</span>
                  <span className="text-sm font-semibold text-slate-700">
                    {formatDateToSpanish(survey.survey_start_date)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <svg
                    className="size-4 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Término:</span>
                  <span className="text-sm font-semibold text-slate-700">
                    {formatDateToSpanish(survey.survey_end_date)}
                  </span>
                </div>
              </div>
            </div>
            <p className="line-clamp-6 text-sm text-slate-500 sm:line-clamp-2">
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
                className={daysLeft() > 0 ? "text-slate-600" : "text-rose-500"}
              >
                {daysLeft() + (daysLeft() === 1 ? " día" : " días")}
              </span>
            </p>
            <span
              className={`text-slate-600 transition-colors group-hover:text-[#03529c]`}
            >
              Ver Detalle →
            </span>
          </div>
        </div>
        <div
          title="Término de la consulta"
          className="rounded-l-lgs col-span-2 hidden min-w-[10rem] items-center justify-center rounded-r-3xl bg-gradient-to-br from-[#082b4e] to-[#2e7ec8] text-slate-100 shadow-md transition-all duration-500 group-hover:from-[#021f31] group-hover:to-[#1d74c6] sm:flex"
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
