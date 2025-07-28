import React from "react";

type SurveyStateProps = {
  startDate: Date;
  endDate: Date;
};

export default function SurveyState({ startDate, endDate }: SurveyStateProps) {
  const bgColor = () => {
    if (startDate > new Date()) {
      return "bg-[#7cb3fa]";
    }
    if (endDate > new Date()) {
      return "bg-emerald-400";
    } else {
      return "bg-rose-500";
    }
  };

  const surveyState = () => {
    if (startDate > new Date()) {
      return "Proximamente";
    }
    if (endDate > new Date()) {
      return "Abierta";
    } else {
      return "Cerrada";
    }
  };
  return (
    <span
      className={`rounded-full font-medium ${bgColor()} px-3 py-1 text-xs text-white`}
    >
      {surveyState()}
    </span>
  );
}
