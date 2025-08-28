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
  return (
    <Link
      href={`/dashboard/consultas/${survey.id}`}
      className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800/95 via-blue-600 to-blue-800/95 shadow-xl"
    >
      <div className="relative px-8 py-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <svg
                  className="mr-1.5 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Consulta Activa
              </div>
              <h1 className="mb-2 text-2xl font-bold text-white">
                {survey.survey_name}
              </h1>
              <p className="text text-blue-100">
                {survey.survey_short_description}
              </p>
            </div>
            <div className="ml-6 hidden lg:block">
              <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                <svg
                  className="size-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="flex items-center">
                <div className="rounded-lg bg-white/20 p-2">
                  <svg
                    className="h-5 w-5 text-white"
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
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-100">
                    Fecha de Inicio
                  </p>
                  <p className="font-semibold text-white">
                    {formatDateToSpanish(survey.survey_start_date)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="flex items-center">
                <div className="rounded-lg bg-white/20 p-2">
                  <svg
                    className="h-5 w-5 text-white"
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
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-100">
                    Fecha de Término
                  </p>
                  <p className="font-semibold text-white">
                    {formatDateToSpanish(survey.survey_end_date)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="flex items-center">
                <div className="rounded-lg bg-emerald-500 p-2">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-100">Estado</p>
                  <p className="font-semibold text-emerald-400">Activa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  // return (
  //   <Link
  //     href={`/dashboard/consultas/${survey.id}`}
  //     className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
  //   >
  //     {/* Header */}
  //     <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#3674fa] to-[#235acf] p-6">
  //       <h3 className="line-clamp-2 text-lg font-semibold text-gray-200 transition-colors group-hover:text-gray-50">
  //         {survey.survey_name}
  //       </h3>
  //       <div className="flex-shrink-0">
  //         <SurveyState startDate={startDate} endDate={endDate} />
  //       </div>
  //     </div>
  //     <div className="p-6">
  //       {/* Survey Description */}
  //       <p className="mb-4 line-clamp-2 text-sm text-gray-600">
  //         {survey.survey_short_description}
  //       </p>

  //       {/* Survey Details */}
  //       <div className="space-y-3">
  //         {/* Date Range */}
  //         <div className="flex items-center gap-2 text-sm text-gray-500">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-4 w-4 text-gray-400"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
  //             />
  //           </svg>
  //           <span>
  //             {formatDateToSpanish(survey.survey_start_date)} -{" "}
  //             {formatDateToSpanish(survey.survey_end_date)}
  //           </span>
  //         </div>

  //         {/* Participants */}
  //         <div className="flex items-center gap-2 text-sm text-gray-500">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-4 w-4 text-gray-400"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
  //             />
  //           </svg>
  //           <span>Participantes: 768</span>
  //         </div>

  //         {/* Department */}
  //         <div className="flex items-center gap-2 text-sm text-gray-500">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             className="h-4 w-4 text-gray-400"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             stroke="currentColor"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //               d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  //             />
  //           </svg>
  //           <span>{survey.department}</span>
  //         </div>
  //       </div>
  //     </div>
  //   </Link>
  // );
}
