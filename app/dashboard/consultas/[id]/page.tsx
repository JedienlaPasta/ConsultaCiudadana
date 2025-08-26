import { getSession } from "@/app/lib/actions/auth";
import { getSurveyAnalytics } from "@/app/lib/data/analytics";
import { getSurveyGeneralDetails } from "@/app/lib/data/encuesta";
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
  console.log(generalData);

  return (
    <div className="flex min-h-dvh flex-col bg-gray-200/70">
      <Navbar isLoggedIn={session !== null} />
      <Header />

      <div className="container mx-auto max-w-[80rem] flex-1 px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <svg
                className="mr-2 h-5 w-5"
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
        </div>

        {/* Survey Info Card */}
        <div className="items-between to-[#007BFF]s mb-8 flex flex-col rounded-xl bg-gradient-to-br from-[#0A4581] to-purple-600 px-6 py-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{generalData?.survey_name}</h1>
              <p className="mt-1 text-sm text-blue-100">
                {generalData?.survey_short_description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex space-x-6">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
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
                Creada: 20 Ago, 2025
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
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
                Inicio: {generalData?.survey_start_date}
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
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
                Término: {generalData?.survey_end_date}
              </div>
            </div>
            <span
              className={`rounded-full bg-emerald-400 px-3 py-1 text-xs font-medium text-purple-900`}
            >
              Activa
            </span>
          </div>
        </div>

        {/* Participation Metrics */}
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ParticipationMetricCard
            title="Participación Promedio"
            value="94.2%"
            color="emerald"
            icon={
              <svg
                className="size-5 text-emerald-600"
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
            }
          />

          <ParticipationMetricCard
            title="Participación Hoy"
            value="89.7%"
            color="blue"
            icon={
              <svg
                className="size-5 text-blue-600"
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
            }
          />

          <ParticipationMetricCard
            title="Participación Total"
            value={String(analytics?.totalParticipants)}
            color="purple"
            icon={
              <svg
                className="size-5 text-purple-600"
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Questions Results */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Resultados por Pregunta
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Ver detalles
                </button>
              </div>

              <div className="space-y-6">
                {analytics.questionResults.map((question, index) => (
                  <div
                    key={question.questionId}
                    className={
                      index < analytics.questionResults.length - 1
                        ? "border-b border-gray-200 pb-6"
                        : ""
                    }
                  >
                    <h3 className="mb-4 font-medium text-gray-900">
                      {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option) => {
                        const widthPercentage = Math.max(option.percentage, 1); // Mínimo 5% para visibilidad
                        const colors = [
                          "bg-gradient-to-r from-emerald-500/85 to-emerald-600/80",
                        ];
                        const colorIndex = option.optionId % colors.length;

                        return (
                          <div
                            key={option.optionId}
                            className="group transition-all duration-200 hover:scale-[1.02]"
                          >
                            <div className="relative flex h-12 w-full items-center justify-between rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 px-4 shadow-sm transition-all duration-200 hover:shadow-md">
                              <div
                                className={`absolute top-0 right-0 h-full rounded-lg ${colors[colorIndex]} transition-all duration-700 ease-out`}
                                style={{
                                  width: `${widthPercentage}%`,
                                  background: `linear-gradient(135deg, ${colors[colorIndex].replace("/70", "")}, ${colors[colorIndex].replace("/70", "/50")})`,
                                }}
                              ></div>
                              <span className="relative z-10 text-sm font-medium text-gray-800 group-hover:text-gray-900">
                                {option.optionName}
                              </span>
                              <div className="relative z-10 flex items-center space-x-2">
                                <span className="text-xs text-gray-600">
                                  {option.voteCount} votos
                                </span>
                                <span className="rounded-full bg-white/80 px-2 py-1 text-sm font-bold text-gray-900">
                                  {option.percentage.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-3 text-right text-sm text-gray-500">
                      Total: {question.totalVotes.toLocaleString()} votos
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participation by Date Chart */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Participación por Fecha
              </h3>
              <div className="space-y-2">
                {analytics.participationByDate.slice(-7).map((dateData) => {
                  const maxCount = Math.max(
                    ...analytics.participationByDate.map((d) => d.count),
                  );
                  const widthPercentage = (dateData.count / maxCount) * 100;

                  return (
                    <div
                      key={dateData.date}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-gray-600">
                        {new Date(dateData.date).toLocaleDateString("es-ES", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-20 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${widthPercentage}%` }}
                          ></div>
                        </div>
                        <span className="w-8 text-right text-xs font-medium text-gray-900">
                          {dateData.count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Actividad Reciente
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Pico de participación
                    </div>
                    <div className="text-xs text-gray-500">Hace 2 horas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      1,000 nuevos votos
                    </div>
                    <div className="text-xs text-gray-500">Hace 4 horas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Compartido en redes
                    </div>
                    <div className="text-xs text-gray-500">Hace 6 horas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
