import { getSession } from "@/app/lib/actions/auth";
import { getSurveyAnalytics } from "@/app/lib/data/analytics";
import { getSurveyGeneralDetails } from "@/app/lib/data/encuesta";
import { formatDateToSpanish } from "@/app/lib/utils/format";
import AnalyticsDonuts from "@/app/ui/consultas/[id]/PieChart";
import ParticipationMetricCard from "@/app/ui/dashboard/consultas/ParticipationMetricCard";
import Header from "@/app/ui/dashboard/Header";
import Footer from "@/app/ui/Footer";
import Navbar from "@/app/ui/Navbar";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SurveyDetailsOverview({ params }: PageProps) {
  const session = await getSession();
  const surveyId = Number((await params).id);
  const analytics = await getSurveyAnalytics(surveyId);
  const generalData = await getSurveyGeneralDetails(surveyId);
  // console.log(generalData);
  console.log(analytics);

  const dataLoadedAt = new Date();

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Navbar isLoggedIn={session !== null} />
      <Header />

      <div className="container mx-auto max-w-[85rem] flex-1 px-6 py-10 lg:px-8">
        {/* Enhanced Header Section with Breadcrumbs */}
        <div className="mb-10">
          <nav className="mb-6 flex items-center space-x-2 text-sm">
            <Link
              href="/dashboard"
              className="flex items-center text-slate-500 transition-colors hover:text-slate-700"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
                />
              </svg>
              Dashboard
            </Link>
            <svg
              className="h-4 w-4 text-slate-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-slate-700">
              Análisis de Consulta
            </span>
          </nav>

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
            <div className="flex items-center space-x-3">
              <button className="rounded-lg bg-white/80 p-2.5 text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-white hover:text-slate-900 hover:shadow-md">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Survey Info Card */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800/95 via-blue-600 to-blue-800/95 shadow-xl">
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
                    {generalData?.survey_name}
                  </h1>
                  <p className="text text-blue-100">
                    {generalData?.survey_short_description}
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
                        {formatDateToSpanish(generalData?.survey_start_date)}
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
                        {formatDateToSpanish(generalData?.survey_end_date)}
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
                      <p className="text-sm font-medium text-blue-100">
                        Estado
                      </p>
                      <p className="font-semibold text-emerald-400">Activa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Participation Metrics */}
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

        {/* Enhanced Participation by Date Chart */}
        <div className="mb-10 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
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
              {analytics.participationByDate
                .slice(-7)
                .map((dateData, index) => {
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
                            {new Date(dateData.date).toLocaleDateString(
                              "es-ES",
                              {
                                weekday: "long",
                                month: "short",
                                day: "numeric",
                              },
                            )}
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

        {/* Enhanced Results Section */}
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-slate-200">
          <div className="border-b border-slate-200 bg-slate-50/50 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Resultados por Pregunta
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Análisis detallado de las respuestas
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-2">
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
                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-8">
              {analytics.questionResults.map((question, index) => (
                <div key={question.questionId} className="group">
                  <div className="mb-6 flex items-center space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
                        {question.question || `Pregunta ${index + 1}`}
                      </h3>
                    </div>
                  </div>
                  <div className="ml-12">
                    <AnalyticsDonuts
                      key={question.questionId}
                      question={question}
                    />
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
