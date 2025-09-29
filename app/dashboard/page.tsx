import React from "react";
import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";
import Header from "../ui/dashboard/Header";
import { getSurveysListByAccess } from "../lib/data/encuesta";
import Link from "next/link";
import AnalyticsCard from "../ui/dashboard/AnalyticsCard";
import Navbar from "../ui/Navbar";
import DashboardSurveysList from "../ui/dashboard/SurveysList";

export default async function Dashboard() {
  const session = await getSession();
  const surveys = await getSurveysListByAccess(
    session?.sub || "19973725",
    session?.dv || "2",
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
    (survey) => new Date(survey.survey_start_date) > new Date(),
  ).length;

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navbar isLoggedIn={session !== null} />
      <Header />

      <div className="container mx-auto max-w-[80rem] flex-1 px-4 py-8 md:px-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-1 text-2xl font-bold text-slate-800 md:text-3xl">
                ¡Bienvenido de vuelta!
              </h2>
              <p className="text-slate-600">
                Aquí tienes un resumen de tus consultas ciudadanas y sus
                métricas de participación.
              </p>
            </div>
            <Link
              href="/dashboard/nueva-consulta"
              className="group flex items-center gap-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-600/30"
            >
              <div className="rounded-lg bg-white/20 p-2">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Nueva Consulta</h3>
                <p className="text-sm text-blue-100">
                  Crear consulta ciudadana
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Total Consultas"
            value={totalSurveys}
            textColor="text-slate-700"
            icon={
              <div className="rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 p-3 shadow-sm">
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
          />

          <AnalyticsCard
            title="Consultas Activas"
            value={activeSurveys}
            textColor="text-emerald-700"
            icon={
              <div className="rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 shadow-sm">
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
          />

          <AnalyticsCard
            title="Consultas Pendientes"
            value={pendingSurveys}
            textColor="text-orange-700"
            icon={
              <div className="rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 p-3 shadow-sm">
                <svg
                  className="h-6 w-6 text-orange-600"
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
          />

          <AnalyticsCard
            title="Consultas Finalizadas"
            value={completedSurveys}
            textColor="text-slate-700"
            icon={
              <div className="rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-3 shadow-sm">
                <svg
                  className="h-6 w-6 text-slate-600"
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
          />
        </div>

        {/* Survey Management Section */}
        <div className="">
          <div className="py-4 md:py-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="mb-1 text-2xl font-bold text-slate-800 md:text-3xl">
                  Mis Consultas
                </h2>
                <p className="text-slate-600">
                  Gestiona y monitorea tus consultas ciudadanas
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-600">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Buscar
              </div>
            </div>
          </div>

          <div className="p-0">
            <DashboardSurveysList surveys={surveys} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
