import Link from "next/link";
import ClaveUnicaBtn from "@/app/ui/ClaveUnicaBtn";
import Footer from "@/app/ui/Footer";
import { getSession } from "@/app/lib/actions/auth";
import AuthErrorHandler from "@/app/ui/error/AuthErrorHandler";
import { Suspense } from "react";
import FAQComponent from "@/app/ui/consultas/FAQ";
import Definitions from "@/app/ui/consultas/Definitions";
import Schedule from "@/app/ui/consultas/Schedule";
import { getSurveyDetails } from "@/app/lib/data/encuesta";
import { formatDateToSpanish } from "@/app/lib/utils/format";
import { redirect } from "next/navigation";
import DOMPurify from "dompurify";
import VoteBtn from "@/app/ui/consultas/[id]/VoteBtn";

type SurveyDetailsProps = {
  params: Promise<{ id: number }>;
};

export default async function SurveyDetail(props: SurveyDetailsProps) {
  const session = await getSession();
  const isLoggedIn = session !== null;

  const params = await props.params;
  const id = params.id;
  const survey = await getSurveyDetails(id);
  // console.log(survey);
  if (!survey.survey_name) {
    redirect("/consultas");
  }

  const sanitizeHTML = (html: string) => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(html);
    }
    return html; // Fallback for SSR
  };

  const stateColor = () => {
    if (new Date(survey.survey_start_date) > new Date()) {
      return "text-[#277ff2]";
    }
    if (new Date(survey.survey_end_date) > new Date()) {
      return "text-emerald-500";
    } else {
      return "text-rose-500";
    }
  };

  const surveyState = () => {
    if (new Date(survey.survey_start_date) > new Date()) {
      return "Proximamente";
    }
    if (new Date(survey.survey_end_date) > new Date()) {
      return "Abierta";
    } else {
      return "Cerrada";
    }
  };

  const getStateIcon = () => {
    if (new Date(survey.survey_start_date) > new Date()) {
      return (
        <svg
          className="h-4 w-4"
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
      );
    }
    if (new Date(survey.survey_end_date) > new Date()) {
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <Suspense>
        <AuthErrorHandler />
      </Suspense>
      <div className="container mx-auto max-w-[80rem] px-2 py-3 md:px-8 md:py-8">
        <div className="grid grid-cols-1 md:gap-6 lg:grid-cols-3">
          {/* Left Column - About & Details */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-col gap-5 rounded-xl shadow-gray-200/80 md:border md:border-gray-200 md:shadow-md">
              <span className="-mb-2 flex w-full border-gray-200 px-6 pt-4 md:mb-0 md:border-b md:pt-6 md:pb-4">
                <h2 className="text-xl font-bold text-[#23396f] md:text-2xl">
                  Acerca de esta Consulta
                </h2>
              </span>
              {/* <span className="px-6 text-sm text-gray-500">
                <p>
                  Conoce más sobre esta iniciativa y cómo tu participación puede
                  marcar una diferencia en los espacios públicos de la comuna de
                  El Quisco.
                  {survey.survey_links[0] && (
                    <span>
                      {" "}
                      Antes de responder la consulta, es fundamental leer las
                      siguientes definiciones y revisar el documento completo en
                      el siguiente enlace:{" "}
                      <Link
                        className="text-[#23396f] underline"
                        href={survey.survey_links[0]}
                        target="_blank"
                      >
                        {survey.survey_links[0]}
                      </Link>
                    </span>
                  )}
                </p>
              </span> */}

              <div className="space-y-4 px-6">
                <p className="text-sm leading-relaxed text-slate-600">
                  Conoce más sobre esta iniciativa y cómo tu participación puede
                  marcar una diferencia en los espacios públicos de la comuna de
                  El Quisco.
                </p>

                {survey.survey_links[0] && (
                  <div className="relative overflow-hidden rounded-xl border border-blue-100/60 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 p-4 transition-all duration-200 hover:border-blue-200/80 hover:shadow-md">
                    <div className="absolute top-0 left-0 h-full w-1 rounded-r bg-gradient-to-b from-blue-400 to-blue-500"></div>
                    <div className="ml-3 flex items-start space-x-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-500">
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="mb-2 text-sm font-semibold text-slate-800">
                          Documentación Complementaria
                        </h4>
                        <p className="mb-3 text-sm leading-relaxed text-slate-600">
                          Para una participación informada, te recomendamos
                          revisar el documento completo antes de votar.
                        </p>
                        <Link
                          className="group inline-flex items-center space-x-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
                          href={survey.survey_links[0]}
                          target="_blank"
                        >
                          <svg
                            className="h-4 w-4 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          <span>Ver documento completo</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <span className="px-6">
                <h3 className="mb-1 text-lg font-semibold text-[#23396f]">
                  Descripción General
                </h3>
                <div
                  className="whitespace-pre-line text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(survey.survey_large_description),
                  }}
                ></div>
              </span>

              <span className="px-6">
                <h3 className="mb-1 text-lg font-semibold text-[#23396f]">
                  Objetivos
                </h3>
                <ul className="!ml-0 list-disc space-y-1 pl-5 text-gray-600 md:space-y-2">
                  {survey.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </span>

              <span className="mb-6 px-6">
                <Schedule schedule={survey.chronogram} />
              </span>
            </div>

            {/* Guía de participación */}
            <Definitions
              definitions={survey.survey_options_definitions}
              description={survey.survey_concepts_description}
              link={survey.survey_concepts_link}
            />

            {/* Preguntas frecuentes Desktop */}
            <div className="hidden md:block">
              <FAQComponent faq={survey.frequently_asked_questions} />
            </div>
          </div>

          {/* Right Column - Participation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden border-t border-gray-200 md:mb-6 md:rounded-xl md:border md:shadow-md md:shadow-gray-200/80">
              <span className="bg-gradient-to-rs flex w-full border-b border-gray-200 from-gray-700 to-gray-800 px-6 py-10 md:pt-6 md:pb-3">
                <h2 className="mb-2 text-xl font-bold text-[#23396f]">
                  Detalles de la Consulta
                </h2>
              </span>

              <div className="space-y-3 px-6 py-10 md:py-6">
                {/* Status */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50/30 px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-slate-600">
                      Estado
                    </span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 rounded-full bg-white/80 ${stateColor()}`}
                  >
                    {getStateIcon()}
                    <span className="text-sm font-medium">{surveyState()}</span>
                  </div>
                </div>

                {/* Department */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50/30 px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4 text-slate-600"
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
                    <span className="text-sm font-medium text-slate-600">
                      Departamento
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">
                    {survey.department}
                  </span>
                </div>

                {/* Start Date */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50/30 px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4 text-slate-600"
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
                    <span className="text-sm font-medium text-slate-600">
                      Fecha de inicio
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {formatDateToSpanish(survey.survey_start_date)}
                  </span>
                </div>

                {/* End Date */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200/50 bg-gradient-to-r from-slate-50 to-blue-50/30 px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4 text-slate-600"
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
                    <span className="text-sm font-medium text-slate-600">
                      Fecha término
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-800">
                    {formatDateToSpanish(survey.survey_end_date)}
                  </span>
                </div>
              </div>

              <div className="px-6">
                <div className="rounded-lg border border-blue-200 bg-blue-50">
                  <h3 className="border-b border-blue-200 px-4 pt-3 pb-2 font-semibold text-[#0A4C8A]">
                    Cómo Participar
                  </h3>
                  <ol className="space-y-2 p-4 text-sm text-gray-600">
                    <li className="flex">
                      <span className="mr-2">1.</span>
                      <span>
                        Revisa la información detallada sobre el proyecto.
                      </span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">2.</span>
                      <span>Inicia sesión con ClaveÚnica.</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">3.</span>
                      <span>Envía tu voto antes de la fecha límite.</span>
                    </li>
                    <li className="flex">
                      <span className="mr-2">4.</span>
                      <span>
                        Revisa los resultados una vez terminado el proceso de
                        votación.
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="px-6 pb-6">
                  <VoteBtn id={id} surveyState={surveyState()} />
                </div>
              ) : (
                <div className="px-6 pb-6">
                  <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="mb-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5 text-[#0A4C8A]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h3 className="font-semibold text-[#0A4C8A]">
                        Autenticación Requerida
                      </h3>
                    </div>
                    <p className="mb-3 text-sm text-gray-600">
                      Necesitas iniciar sesión para participar en esta consulta.
                    </p>
                    <span className="flex">
                      <ClaveUnicaBtn isLoggedIn={session !== null} />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preguntas frecuentes Mobile */}
          <div className="md:hidden">
            <FAQComponent faq={survey.frequently_asked_questions} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
