"use client";
import Link from "next/link";
import { useState } from "react";

type VoteBtnProps = {
  id: string;
  surveyState: string;
};

export default function VoteBtn({ id, surveyState }: VoteBtnProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      {surveyState === "Abierta" && (
        <div className="group rounded-xl border border-gray-200 bg-gray-50 select-none">
          <label
            className={`group flex cursor-pointer items-start gap-3 rounded-lg px-4.5 py-4 ${isChecked ? "text-white ring-2 ring-blue-500 ring-offset-0" : ""}`}
          >
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <div className="flex-1">
              <p className="text-sm leading-relaxed font-medium text-gray-700">
                Confirmo que he leído la documentación de esta encuesta y acepto
                las políticas de privacidad y uso de datos.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Te recomendamos leer toda la documentación de la consulta y las
                políticas de privacidad antes de votar.
              </p>
            </div>
          </label>
        </div>
      )}
      {surveyState === "Cerrada" ? (
        <Link
          className="group relative flex min-h-11 w-full grow items-center justify-center gap-0.5 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-[8px] pr-5 pl-4 text-center text-white transition-all select-none hover:bg-[#2275C9] active:scale-95"
          href={`/consultas/${id}/resultados`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative">Ver resultados</span>
        </Link>
      ) : isChecked ? (
        <Link
          className="group relative mt-5 flex min-h-11 w-full grow items-center justify-center gap-0.5 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-[8px] pr-5 pl-4 text-center text-white transition-all select-none hover:bg-[#2275C9] active:scale-95"
          href={
            surveyState === "Abierta"
              ? `/consultas/${id}/voto`
              : `/consultas/${id}/resultados`
          }
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative">
            {surveyState === "Abierta"
              ? "Ir a votar"
              : "Aun no empieza la consulta"}
          </span>
        </Link>
      ) : (
        <button
          disabled
          className="mt-5 flex min-h-11 w-full grow cursor-not-allowed items-center justify-center gap-0.5 rounded-lg bg-gray-400 py-[8px] pr-5 pl-4 text-center text-[#fff] opacity-60 transition-transform active:scale-95"
        >
          {surveyState === "Abierta"
            ? "Ir a votar"
            : surveyState === "Cerrada"
              ? "Consultar resultados"
              : "Aun no empieza la consulta"}
        </button>
      )}
    </div>
  );
}
