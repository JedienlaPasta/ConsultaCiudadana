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
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#3674fa] to-[#235acf] p-6">
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-200 transition-colors group-hover:text-gray-50">
          {survey.survey_name}
        </h3>
        <div className="flex-shrink-0">
          <SurveyState startDate={startDate} endDate={endDate} />
        </div>
      </div>
      <div className="p-6">
        {/* Survey Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {survey.survey_short_description}
        </p>

        {/* Survey Details */}
        <div className="space-y-3">
          {/* Date Range */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
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
            <span>
              {formatDateToSpanish(survey.survey_start_date)} -{" "}
              {formatDateToSpanish(survey.survey_end_date)}
            </span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <span>Participantes: 768</span>
          </div>

          {/* Department */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>{survey.department}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
