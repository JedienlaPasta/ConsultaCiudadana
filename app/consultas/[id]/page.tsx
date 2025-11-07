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
import VoteBtn from "@/app/ui/consultas/[id]/VoteBtn";
import ScrollToVoteOnLogin from "@/app/ui/consultas/ScrollToVoteOnLogin";
import type { Metadata } from "next";
import { cache } from "react";
import sanitizeHtml from "sanitize-html";

type SurveyDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function SurveyDetail(props: SurveyDetailsProps) {
  const session = await getSession();
  const isLoggedIn = session !== null;

  const params = await props.params;
  const id = params.id;
  const survey = await getSurveyDetails(id);
  if (!survey.survey_name) {
    redirect("/consultas");
  }

  const sanitizeHTML = (html: string) => {
    return sanitizeHtml(html, {
      allowedTags: ["b", "i", "u", "ol", "ul", "li", "p", "br"],
      allowedAttributes: {},
    });
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Question",
            name: survey.survey_name,
            text: survey.survey_short_description,
            dateCreated: survey.survey_start_date,
            author: {
              "@type": "Organization",
              name: "Municipalidad El Quisco",
            },
            acceptedAnswer: {
              "@type": "Answer",
              text: "Consulta ciudadana para recoger opiniones de la comunidad",
            },
          }),
        }}
      />
      {/* Main Content */}
      <Suspense>
        <AuthErrorHandler />
      </Suspense>
      <div className="container mx-auto max-w-[80rem] px-2 py-3 md:px-8 md:py-8">
        <div className="grid grid-cols-1 md:gap-6 lg:grid-cols-3">
          {/* Left Column - About & Details */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-5 rounded-xl">
              <div className="space-y-2">
                <h2 className="px-5 pt-3 text-xl font-bold text-[#23396f] md:p-0 md:text-2xl">
                  Acerca de esta Consulta
                </h2>

                <p className="mb-3 px-5 pb-2 text-sm leading-relaxed text-slate-600 md:p-0">
                  Conoce más sobre esta iniciativa y cómo tu participación puede
                  marcar una diferencia en los espacios públicos de la comuna de
                  El Quisco.
                </p>

                {survey.survey_links[0] && (
                  <div className="group relative overflow-hidden rounded-xl border border-blue-200/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 px-8 py-5 transition-all duration-200 hover:border-blue-200/80 hover:shadow-md">
                    <div className="absolute top-1/2 left-0 h-[60%] w-1.5 translate-y-[-50%] rounded-r bg-gradient-to-b from-blue-400 to-blue-500 transition-all duration-300 group-hover:h-[65%]"></div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <h4 className="mb-2 text-sm font-semibold text-slate-800">
                          Documentación Complementaria
                        </h4>
                        <p className="mb-0 text-sm leading-relaxed text-slate-600">
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

              <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 p-5 sm:px-8 sm:py-6">
                <h3 className="mb-2 bg-gradient-to-r from-[#23396f] to-blue-700 bg-clip-text text-xl font-bold text-transparent">
                  Descripción General
                </h3>
                <div
                  className="leading-relaxed whitespace-pre-line text-slate-600 sm:pl-1"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(survey.survey_large_description),
                  }}
                ></div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 p-5 sm:px-8 sm:py-6">
                <h3 className="mb-2 bg-gradient-to-r from-[#23396f] to-blue-700 bg-clip-text text-xl font-bold text-transparent">
                  Objetivos
                </h3>
                <ul className="list-disc space-y-1 text-slate-600 marker:text-[#24469c] sm:pl-1 md:space-y-1.5">
                  {survey.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>

              <span className="mb-6">
                <Schedule schedule={survey.chronogram} />
              </span>
            </div>

            {/* Guía de participación */}
            <Definitions
              definitions={survey.survey_concepts_name}
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
            <div className="overflow-hidden border-t border-slate-200/80 from-white via-blue-50/30 to-indigo-50/50 md:mb-5 md:rounded-xl md:border md:bg-gradient-to-br md:shadow md:shadow-gray-200/80">
              <div className="space-y-3 px-5 py-6">
                <h2 className="mb-4 text-xl font-bold text-[#23396f]">
                  Detalles de la Consulta
                </h2>
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
                    className={`flex items-center space-x-2 rounded-full ${stateColor()}`}
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
                  <span className="text-sm font-medium text-[#23396f]">
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
                      Inicio
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#23396f]">
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
                      Término
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#23396f]">
                    {formatDateToSpanish(survey.survey_end_date)}
                  </span>
                </div>
              </div>

              {surveyState() === "Abierta" && (
                <div className="px-5 pb-5">
                  <div className="rounded-xl border border-blue-200/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/80">
                    <h3 className="border-b border-blue-200/80 px-5 pt-3 pb-2 font-semibold text-[#0A4C8A]">
                      Cómo Participar
                    </h3>
                    <ol className="space-y-2 px-5 py-4 text-sm text-slate-700">
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
              )}
            </div>

            <div className="sticky top-23 overflow-hidden border-t border-slate-200/80 from-white via-blue-50/30 to-indigo-50/50 md:mb-8 md:rounded-xl md:border md:bg-gradient-to-br md:shadow md:shadow-gray-200/80">
              {surveyState() === "Cerrada" ? (
                <div className="px-5 pb-5">
                  <VoteBtn id={id} surveyState={surveyState()} />
                </div>
              ) : isLoggedIn ? (
                <div className="space-y-5 px-5 pb-5 md:mt-6">
                  {/* <VoteBtn id={id} surveyState={surveyState()} /> */}
                  <div id="vote-section" className="mt-5 space-y-5 pb-3">
                    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-colors duration-200 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 rounded-full bg-blue-100 p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-blue-600"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 8A6 6 0 006 8v1H5a3 3 0 00-3 3v4a3 3 0 003 3h10a3 3 0 003-3v-4a3 3 0 00-3-3h-1V8zM8 8a4 4 0 118 0v1H8V8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Políticas de Privacidad
                            </p>
                            <p className="text-xs text-gray-500">
                              Conoce cómo usamos tus datos
                            </p>
                          </div>
                        </div>
                        <Link
                          href="/privacidad"
                          className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-blue-600"
                        >
                          Ver
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-1 h-3 w-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                    <VoteBtn id={id} surveyState={surveyState()} />
                  </div>

                  {/* Inserta el detector de retorno al login */}
                  <ScrollToVoteOnLogin />
                </div>
              ) : (
                <div className="px-5 pb-5">
                  <div className="mt-6 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-4">
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
                      <ClaveUnicaBtn
                        isLoggedIn={session !== null}
                        isNavbarBtn={false}
                      />
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

export async function generateMetadata(props: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = props.params;
  const getSurveyDetailsCached = cache(getSurveyDetails);
  const survey = await getSurveyDetailsCached(id);
  return {
    title: `${survey.survey_name} - Consulta Ciudadana El Quisco`,
    description: survey.survey_short_description,
    alternates: {
      canonical: `https://participacion.munielquisco.gob.cl/consultas/${id}`,
    },
    openGraph: {
      title: `${survey.survey_name} - Consulta Ciudadana El Quisco`,
      description: survey.survey_short_description,
      url: `https://participacion.munielquisco.gob.cl/consultas/${id}`,
    },
  };
}
