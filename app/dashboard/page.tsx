import React from "react";
import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";
import Header from "../ui/dashboard/Header";
import { getSurveysListByAccess } from "../lib/data/encuesta";
import Link from "next/link";
import AnalyticsCard from "../ui/dashboard/AnalyticsCard";
import AlternativeSurveyList from "../ui/dashboard/AlternativeSurveyList";
import Navbar from "../ui/Navbar";

export default async function Dashboard() {
  const session = await getSession();
  const surveys = await getSurveysListByAccess(
    session?.sub || String(19973725),
  );

  // Calculate analytics
  const totalSurveys = surveys?.length;
  const activeSurveys = surveys?.filter(
    (survey) => new Date(survey.survey_end_date) >= new Date(),
  ).length;
  const completedSurveys = surveys?.filter(
    (survey) => new Date(survey.survey_end_date) < new Date(),
  ).length;
  const pendingSurveys = surveys?.filter(
    // Filtrar consultas pendientes (consultas que no han sido revisadas y autorizadas)
    (survey) => new Date(survey.survey_start_date) > new Date(),
  ).length;

  return (
    <div className="flex min-h-dvh flex-col bg-gray-50">
      <Navbar isLoggedIn={session !== null} />
      <Header />

      <div className="container mx-auto max-w-[80rem] flex-1 px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-200/80">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/dashboard/nueva-consulta"
              className="group flex items-center rounded-lg border border-blue-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100/60"
            >
              <div className="mr-4 rounded-lg bg-blue-100 p-2 transition-colors group-hover:bg-blue-200/70">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Nueva Consulta</h3>
                <p className="text-sm text-gray-600">
                  Crear una nueva consulta ciudadana
                </p>
              </div>
            </Link>

            <Link
              href="/consultas"
              className="group flex items-center rounded-lg border border-emerald-200 bg-emerald-50 p-4 transition-colors hover:bg-emerald-100/60"
            >
              <div className="mr-4 rounded-lg bg-emerald-100 p-2 transition-colors group-hover:bg-emerald-200/70">
                <svg
                  className="h-5 w-5 text-emerald-600"
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
              <div>
                <h3 className="font-medium text-gray-900">Ver Resultados</h3>
                <p className="text-sm text-gray-600">
                  Revisar métricas y participación
                </p>
              </div>
            </Link>

            <Link
              href="/consultas"
              className="group flex items-center rounded-lg border border-purple-200 bg-purple-50 p-4 transition-colors hover:bg-purple-100/60"
            >
              <div className="mr-4 rounded-lg bg-purple-100 p-2 transition-colors group-hover:bg-purple-200/70">
                <svg
                  className="h-5 w-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Ver Todas</h3>
                <p className="text-sm text-gray-600">
                  Explorar todas las consultas
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Total Consultas"
            value={totalSurveys}
            textColor="text-slate-700"
            icon={
              <div className="rounded-full bg-blue-100 p-3">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            }
          ></AnalyticsCard>

          <AnalyticsCard
            title="Consultas Activas"
            value={activeSurveys}
            textColor="text-emerald-600"
            icon={
              <div className="rounded-full bg-emerald-100 p-3">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            }
          ></AnalyticsCard>

          <AnalyticsCard
            title="Consultas Pendientes"
            value={pendingSurveys}
            textColor="text-blue-600"
            icon={
              <div className="rounded-full bg-blue-100 p-3">
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
              </div>
            }
          ></AnalyticsCard>

          <AnalyticsCard
            title="Consultas Finalizadas"
            value={completedSurveys}
            textColor="text-gray-600"
            icon={
              <div className="rounded-full bg-gray-100 p-3">
                <svg
                  className="h-6 w-6 text-gray-600"
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
            }
          ></AnalyticsCard>
        </div>

        {/* Survey Management Section */}
        <div className="mb-6">
          <div className="mb-6 flex items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Mis Consultas
              </h2>
              <p className="text-gray-600">
                Gestiona y monitorea tus consultas ciudadanas
              </p>
            </div>
          </div>

          <AlternativeSurveyList surveys={surveys} />
          {/* <DashboardSurveysList surveys={surveys} /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
