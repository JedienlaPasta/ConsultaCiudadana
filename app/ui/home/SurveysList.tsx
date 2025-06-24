"use client";

import { formatDate } from "../../lib/utils/format";
import { getDaysLeft } from "../../lib/utils/getValues";
import Link from "next/link";

const surveysList = [
  {
    id: 1,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2021-01-02",
  },
  {
    id: 2,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco, Consulta para la mejora de espacios públicos de la comuna de El Quisco, Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2025-06-15",
  },
  {
    id: 3,
    title: "Plan PIIMEP",
    description:
      "Consulta para la mejora de espacios públicos de la comuna de El Quisco",
    endDate: "2025-07-03",
  },
];

export default function SurveysList() {
  return (
    <div id="surveys" className="mx-auto flex flex-col gap-4 py-12">
      <div className="flex flex-col gap-1">
        <h2 className="grow text-3xl font-bold text-[#23396f]">
          Consultas en Curso
        </h2>
        <p className="text-lg text-gray-600">
          Participa en las consultas ciudadanas activas y ayuda a mejorar
          nuestra comuna.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {surveysList.map((survey, index) => (
          <Link
            href={`/consultas/piimep`}
            // href={`/consultas/${survey.id}`}
            key={survey.id + "-" + index}
            className="group flex transform transition-all duration-300 hover:translate-y-[-4px]"
          >
            <div className="gap-5s flex h-[185px] grow">
              <div className="col-span-10 flex grow flex-col rounded-l-2xl border border-r-8 border-gray-200 border-r-gray-300 bg-white shadow-md shadow-gray-200/80 transition-all group-hover:shadow-lg">
                <div className="flex h-full grow flex-col gap-2 p-8 pb-3">
                  <h3 className="text-xl font-bold text-[#0A4C8A] transition-colors group-hover:text-[#002F4C]">
                    {survey.title}
                  </h3>
                  <p className="line-clamp-2 text-gray-600">
                    {survey.description}
                  </p>
                </div>
                <div className="relative flex w-full justify-between rounded-b-lg border-t border-gray-200 px-8 py-4 text-sm font-medium text-slate-600">
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
                    <span>Término:</span>
                    {getDaysLeft(new Date(survey.endDate)) + " días"}
                  </p>
                  <span className="text-[#0A4C8A] transition-colors group-hover:text-[#002F4C]">
                    Participar →
                  </span>
                </div>
              </div>
              <div
                title="Término de la consulta"
                className="rounded-l-lgs relative col-span-2 hidden min-w-[10rem] items-center justify-center rounded-r-3xl bg-gradient-to-br from-[#093F75] to-[#0A4C8A] text-slate-100 shadow-md transition-all group-hover:from-[#002F4C] group-hover:to-[#0A4C8A] sm:flex"
              >
                <span className="flex flex-col items-center text-nowrap">
                  <p className="text-3xl font-bold">
                    {survey?.endDate.split("-")[2]}
                  </p>
                  <p className="text-sm text-slate-100/90">
                    {formatDate(new Date(survey.endDate))
                      .toString()
                      .slice(2, 12)}
                  </p>
                  <p className="absolute top-[64%] text-xs text-slate-300">
                    Finaliza
                  </p>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 gap-6">
        {surveysList.map((survey, index) => (
          <Link
            href={`/consultas/piimep`}
            // href={`/consultas/${survey.id}`}
            key={survey.id + "-" + index}
            className="group flex transform transition-all duration-300 hover:translate-y-[-4px]"
          >
            <div className="gap-5s flex h-[187px] grow">
              <div className="flex grow flex-col overflow-hidden rounded-3xl border border-gray-200 border-r-gray-300 bg-white shadow-md shadow-gray-200/80 transition-all group-hover:shadow-lg">
                <div className="flex h-full">
                  <div className="flex h-full grow flex-col gap-3 p-8 pb-3">
                    <h3 className="text-xl font-bold text-[#0A4C8A] transition-colors group-hover:text-[#002F4C]">
                      {survey.title}
                    </h3>
                    <p className="line-clamp-2 text-gray-600">
                      {survey.description}
                    </p>
                  </div>
                  <div
                    title="Término de la consulta"
                    className="border-b-8s min-w-[10rem] items-center justify-center border-l-2 border-gray-300 bg-gradient-to-br from-[#093F75] to-[#0A4C8A] text-slate-100 transition-all group-hover:from-[#002F4C] group-hover:to-[#0A4C8A] sm:flex"
                  >
                    <span className="flex flex-col items-center text-nowrap">
                      <p className="text-3xl font-bold">
                        {survey?.endDate.split("-")[2]}
                      </p>
                      <p className="text-sm text-slate-100/90">
                        {formatDate(new Date(survey.endDate))
                          .toString()
                          .slice(2, 12)}
                      </p>
                      <p className="text-xs text-slate-300">Finaliza</p>
                    </span>
                  </div>
                </div>
                <div className="relative flex w-full justify-between rounded-b-lg border-t border-gray-200 px-8 py-4 text-sm font-medium text-slate-600">
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
                    <span>Término:</span>
                    {getDaysLeft(new Date(survey.endDate)) + " días"}
                  </p>
                  <span className="text-[#0A4C8A] transition-colors group-hover:text-[#002F4C]">
                    Participar →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div> */}

      <Link
        href="/consultas"
        className="font-semibolds mx-auto mt-5 cursor-pointer rounded-lg border border-[#0A4C8A] bg-white px-5 py-2 text-center text-[#0A4C8A] transition-colors hover:text-[#002F4C]"
      >
        Ver todas las consultas
      </Link>
    </div>
  );
}
