"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDateToSpanish } from "@/app/lib/utils/format";
import { SurveyGeneralData } from "@/app/lib/definitions/encuesta";
import RexLoader from "../RexAnimation";
import SurveyState from "../SurveyState";

export default function DashboardSurveysList({
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

  return (
    <Link
      href={`/dashboard/consultas/${survey.id}`}
      className="group flex transform transition-all duration-300"
    >
      <div className="min-h-[185px]s flex grow">
        <div className="col-span-10 flex grow flex-col rounded-xl bg-gray-50/40 p-1.5 shadow-sm ring-1 shadow-gray-200/80 ring-gray-200/70 transition-all ring-inset group-hover:shadow-md hover:shadow-gray-200">
          <div className="col-span-10 flex grow flex-col overflow-hidden rounded-lg bg-white ring-1 ring-gray-900/5 transition-all">
            <div className="flex h-full grow flex-col bg-slate-300/80 px-6 pt-3 pb-2">
              <div className="flex flex-col items-center justify-between gap-1.5 md:flex-row">
                <h3 className="text-[#0A4C8A]s font-semibold text-slate-800 transition-colors group-hover:text-[#002F4C] md:text-lg">
                  {survey.survey_name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <SurveyState startDate={startDate} endDate={endDate} />
                </div>
              </div>
            </div>

            <div className="relative flex w-full flex-col gap-1 border-t border-gray-200/70 px-5 py-2 text-sm font-medium text-slate-600">
              {/* Inicio */}
              <p
                title="Período de la encuesta"
                className="flex items-center gap-1.5"
              >
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
                <span className={"text-slate-600"}>
                  {formatDateToSpanish(survey.survey_start_date)}
                </span>
                -
                <span className={"text-slate-600"}>
                  {formatDateToSpanish(survey.survey_end_date)}
                </span>
              </p>
            </div>

            <div className="relative flex w-full justify-between border-t border-gray-200/70 px-5 py-2 text-sm font-medium text-slate-600">
              {/* Participantes */}
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
                <span>Participantes:</span>
                <span className={"text-slate-600"}>768</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
