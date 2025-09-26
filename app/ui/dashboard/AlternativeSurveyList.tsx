"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDateToSpanish } from "@/app/lib/utils/format";
import { SurveyGeneralData } from "@/app/lib/definitions/encuesta";
import RexLoader from "../RexAnimation";

export default function AlternativeSurveyList({
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
        <div className="flex items-center justify-center rounded-lg bg-slate-200/50 p-4">
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
      <div className="grid grid-cols-1">
        {surveys?.map((survey, index) => (
          <Survey key={survey.id + "-" + index} survey={survey} />
        ))}
      </div>
    </div>
  );
}

function Survey({ survey }: { survey: SurveyGeneralData }) {
  const splitName = survey?.created_by_name?.split(" ") || [];
  const createdBy =
    splitName.length >= 3
      ? splitName[0] + " " + splitName[2]
      : survey?.created_by_name || "Desconocido";

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
      return "bg-emerald-200/50";
    } else {
      return "bg-rose-200/50";
    }
  };

  return (
    <Link
      href={`/dashboard/consultas/${survey.id}`}
      className="group overflow-hidden border-b-2 border-slate-200 bg-slate-100 hover:bg-slate-200/50"
    >
      <div className="px-8 py-6">
        {/* Background Pattern */}

        <div className="w-full">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2"></div>
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <h1 className="text-xl font-bold text-slate-700 transition-colors group-hover:text-[#03529c] lg:text-2xl">
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
          <div>
            {/* <div className="mb-1.5 flex flex-wrap gap-x-3 divide-x divide-slate-400/50 font-medium text-slate-600/95">
              <p className="pr-3 text-sm">Creada por: {createdBy}</p>
              <p className="pr-3 text-sm">Departamento: {survey.department}</p>
              <p className="pr-3 text-sm">
                Creada: {formatDateToSpanish(survey.created_at)}
              </p>
              <p className="pr-3 text-sm">
                Termina: {formatDateToSpanish(survey.survey_end_date)}
              </p>
            </div> */}
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium">Encargado:</span>
                <span className="text-sm font-semibold text-slate-700">
                  {createdBy}
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
            <p className="line-clamp-2 text-sm text-slate-500">
              {survey.survey_short_description}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <button className="relative left-0 flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-all duration-300 group-hover:left-2 group-hover:text-[#03529c] group-hover:underline hover:text-[#03529c]">
                Ver Detalles
                <svg
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </button>
              <div
                title="Votos"
                className="flex items-center gap-1.5 rounded-lg bg-slate-200/60 px-3 py-1 text-sm text-slate-600 transition-colors group-hover:text-[#03529c]"
              >
                <svg
                  className="size-4.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                  <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                </svg>

                <span className="font-semibold">{survey.participation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
