import { getSession } from "@/app/lib/actions/auth";
import { getSurveyAnalytics } from "@/app/lib/data/analytics";
import { getSurveyGeneralDetails } from "@/app/lib/data/encuesta";
import { formatDateToSpanish } from "@/app/lib/utils/format";
import BarsChart from "@/app/ui/dashboard/consultas/[id]/BarsChart";
import SurveyOptionsMenu from "@/app/ui/dashboard/consultas/[id]/OptionsMenu";
import PermissionsModal from "@/app/ui/dashboard/consultas/[id]/PermissionsModal";
import AnalyticsDonuts from "@/app/ui/dashboard/consultas/[id]/PieChart";
import ParticipationMetricCard from "@/app/ui/dashboard/consultas/ParticipationMetricCard";
import Header from "@/app/ui/dashboard/Header";
import Footer from "@/app/ui/Footer";
import Navbar from "@/app/ui/Navbar";
import Link from "next/link";

type PageProps = {
  searchParams?: Promise<{
    permissions?: string;
  }>;
  params: Promise<{ id: string }>;
};

export default async function SurveyDetailsOverview({
  searchParams,
  params,
}: PageProps) {
  const session = await getSession();
  const publicId = (await params).id;
  const permissions = (await searchParams)?.permissions;
  const analytics = await getSurveyAnalytics(publicId);
  const generalData = await getSurveyGeneralDetails(publicId);

  const splitName = generalData?.created_by_name?.split(" ") || [];
  const createdBy =
    splitName.length >= 3
      ? splitName[0] + " " + splitName[2]
      : generalData?.created_by_name || "Desconocido";

  const surveyState = () => {
    if (new Date(generalData.survey_start_date) > new Date()) {
      return "En Espera";
    }
    if (new Date(generalData.survey_end_date) > new Date()) {
      return "Activa";
    } else {
      return "Terminada";
    }
  };

  const stateTextColor = () => {
    if (new Date(generalData.survey_start_date) > new Date()) {
      return "text-orange-600";
    }
    if (new Date(generalData.survey_end_date) > new Date()) {
      return "text-emerald-600 ";
    } else {
      return "text-rose-600";
    }
  };

  const stateBgColor = () => {
    if (new Date(generalData.survey_start_date) > new Date()) {
      return "bg-orange-200/50";
    }
    if (new Date(generalData.survey_end_date) > new Date()) {
      return "bg-emerald-200/50";
    } else {
      return "bg-rose-200/50";
    }
  };

  const dataLoadedAt = new Date();

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Navbar isLoggedIn={session !== null} />
      <Header />

      {permissions === "true" && <PermissionsModal />}

      <div className="container mx-auto max-w-[85rem] flex-1 px-4 py-8 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="group flex items-center rounded-lg bg-white/80 px-4 py-2.5 text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-white hover:text-slate-900 hover:shadow-md hover:ring-slate-300"
              >
                <svg
                  className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Volver al Dashboard
              </Link>
            </div>
            <SurveyOptionsMenu />
          </div>
        </div>

        {/* Survey Info Card */}
        <div className="group mb-8 overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-blue-50/60 via-blue-50/30 to-indigo-50/50 shadow-lg shadow-gray-300/70">
          <div className="px-8 py-6">
            <div className="w-full">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2"></div>
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
                <h1 className="text-xl font-bold text-slate-700 transition-colors group-hover:text-[#03529c] lg:text-2xl">
                  {generalData.survey_name}
                </h1>
                <div
                  className={`inline-flex items-center gap-1.5 rounded-md py-1 pr-2.5 pl-2 text-xs font-medium backdrop-blur-sm ${stateBgColor()} ${stateTextColor()}`}
                >
                  {surveyState() === "Terminada" ? (
                    <svg
                      className="size-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="size-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  Consulta {surveyState()}
                </div>
              </div>
              <div>
                <div className="mb-2 flex flex-wrap gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <svg
                      className="size-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Encargado:</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {createdBy}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <svg
                      className="size-4 text-slate-500"
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
                    <span className="text-sm font-medium">Departamento:</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {generalData.department}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <svg
                      className="size-4 text-slate-500"
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
                    <span className="text-sm font-medium">Inicio:</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {formatDateToSpanish(generalData.survey_start_date)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <svg
                      className="size-4 text-slate-500"
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
                    <span className="text-sm font-medium">Término:</span>
                    <span className="text-sm font-semibold text-slate-700">
                      {formatDateToSpanish(generalData.survey_end_date)}
                    </span>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-slate-500">
                  {generalData.survey_short_description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Participation Metrics */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ParticipationMetricCard
            title="Participación Promedio"
            value={String(analytics.averageDailyParticipation)}
            color="emerald"
            lastUpdated={dataLoadedAt}
            icon={
              <svg
                className="h-6 w-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
          />

          <ParticipationMetricCard
            title="Participación Hoy"
            value={String(analytics.todayParticipation)}
            color="blue"
            lastUpdated={dataLoadedAt}
            icon={
              <svg
                className="h-6 w-6 text-blue-600"
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
            }
          />

          <ParticipationMetricCard
            title="Participación Total"
            value={String(analytics.totalParticipants)}
            color="purple"
            lastUpdated={dataLoadedAt}
            icon={
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Participation by Date Chart */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 shadow-gray-300/70 ring-slate-200">
          <div className="border-b border-slate-200 bg-slate-50/50 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Participación por Fecha
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Últimos 7 días de actividad
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-2">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              {analytics.participationByDate.slice(-7).map((dateData) => {
                const maxCount = Math.max(
                  ...analytics.participationByDate.map((d) => d.count),
                );
                const widthPercentage = (dateData.count / maxCount) * 100;

                return (
                  <div
                    key={dateData.date}
                    className="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-semibold text-white">
                        {new Date(dateData.date).getDate()}
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">
                          {new Date(dateData.date).toLocaleDateString("es-ES", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <p className="text-sm text-slate-500">
                          {dateData.count} participaciones
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="relative h-3 w-32 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                          style={{ width: `${widthPercentage}%` }}
                        ></div>
                      </div>
                      <span className="w-12 text-right text-lg font-bold text-slate-900">
                        {dateData.count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white ring-slate-200 md:rounded-2xl md:shadow-lg md:ring-1">
          <div className="border-b border-slate-200 bg-slate-50/50 py-6 md:px-8 md:pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Resultados por Pregunta
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Análisis detallado de las respuestas
                </p>
              </div>
              <div className="hidden rounded-lg bg-rose-100/80 p-2 md:block">
                <svg
                  className="size-6 text-rose-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                  <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-4 md:p-8">
            <div className="space-y-8">
              {analytics.questionResults.map((question, index) => (
                <div key={question.questionId} className="group">
                  <div className="mb-6 flex items-center space-x-2 md:space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 transition-colors group-hover:text-indigo-600 md:text-lg">
                        {question.question || `Pregunta ${index + 1}`}
                      </h3>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <AnalyticsDonuts
                      key={question.questionId}
                      question={question}
                    />
                  </div>
                  <div className="block md:hidden">
                    <BarsChart question={question} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
