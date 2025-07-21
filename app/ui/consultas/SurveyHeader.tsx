"use client";
import { SurveyFormData } from "@/app/lib/definitions/encuesta";
import { formatDate } from "@/app/lib/utils/format";

export default function SurveyHeader({ survey }: { survey: SurveyFormData }) {
  const endDate = String(survey.survey_end_date);
  const isActive = new Date(endDate) > new Date() ? "Activa" : "Finalizada";

  return (
    <div className="bg-[#0A4C8A] text-white">
      {/* Navbar placeholder */}
      <div className="h-[68px] bg-[#0A4581]"></div>
      <div className="container mx-auto max-w-[80rem] px-4 py-6 md:px-8 md:py-8">
        <div className="mb-2 flex flex-wrap gap-2">
          <span
            className={`rounded-full bg-emerald-400 px-3 py-1 text-xs text-white ${isActive === "Activa" ? "bg-emerald-500" : "bg-rose-500"}`}
          >
            {isActive}
          </span>
          <span className="rounded-full bg-[#1E5A9A] px-3 py-1 text-xs text-white">
            {survey.department}
          </span>
        </div>

        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          {survey.survey_name}
        </h1>
        <div className="flex items-center text-sm">
          <span>Fecha límite: {formatDate(new Date(endDate))}</span>
        </div>
      </div>
    </div>
  );
}
