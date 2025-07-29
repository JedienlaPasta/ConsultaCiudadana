"use client";
import { SurveyData } from "@/app/lib/definitions/encuesta";
import { formatDateToSpanish } from "@/app/lib/utils/format";
import SurveyState from "../SurveyState";

export default function SurveyHeader({ survey }: { survey: SurveyData }) {
  const endDate = survey?.survey_end_date;
  const surveyDepartment = survey?.department || "No disponible";
  const surveyName = survey?.survey_name || "No disponible";

  const formatedEndDate = endDate
    ? formatDateToSpanish(endDate)
    : "No disponible";

  return (
    <div className="bg-[#0A4C8A] text-white">
      {/* Navbar placeholder */}
      <div className="h-[72px] bg-[#0A4581]"></div>
      <div className="container mx-auto max-w-[80rem] px-4 py-6 md:px-8 md:py-8">
        <div className="mb-2 flex flex-wrap gap-2">
          <SurveyState
            startDate={new Date(survey?.survey_start_date)}
            endDate={new Date(survey?.survey_end_date)}
          />
          <span className="rounded-full bg-[#1E5A9A] px-3 py-1 text-xs text-white">
            {surveyDepartment}
          </span>
        </div>

        <h1 className="mb-2 text-2xl font-bold md:text-3xl">{surveyName}</h1>
        <div className="flex items-center text-sm">
          <span>Fecha término: {formatedEndDate}</span>
        </div>
      </div>
    </div>
  );
}
