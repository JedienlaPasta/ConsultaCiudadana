import React from "react";
import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";
import Header from "../ui/dashboard/Header";
import { getSurveysListByAccess } from "../lib/data/encuesta";
import Link from "next/link";
import AnalyticsCard from "../ui/dashboard/AnalyticsCard";
import Navbar from "../ui/Navbar";
import DashboardSurveysList from "../ui/dashboard/SurveysList";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  const allowed = ["admin", "encuestador"];

  if (!session || !allowed.includes(session.role as string)) {
    console.log(
      "sub:",
      session?.sub,
      ", role:",
      session?.role,
      "not allowed on /dashboard",
    );
    redirect("/");
  }
  const surveys = await getSurveysListByAccess(
    session?.sub || "",
    session?.dv || "",
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
      <Navbar session={session} />
      <Header />

      <div className="container mx-auto max-w-[80rem] flex-1 px-4 py-8 md:px-8">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 md:text-2xl">
                ¡Bienvenido de vuelta!
              </h2>
              <p className="text-slate-600">
                Aquí tienes un resumen de tus consultas ciudadanas y sus
                métricas de participación.
              </p>
            </div>
            <Link
              href="/dashboard/nueva-consulta"
              aria-label="Crear nueva consulta"
              className="group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 text-white shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-600 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="flex items-center justify-center rounded-lg bg-white/15 p-3">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <h3 className="font-semibold">Crear consulta</h3>
                <p className="text-xs text-white/85">
                  Inicia una nueva participación
                </p>
              </div>
              <svg
                className="ml-auto h-5 w-5 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5" />
            </Link>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <AnalyticsCard
            title="Total Consultas"
            value={totalSurveys}
            textColor="text-slate-600"
            icon={
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-200 p-3 shadow-sm">
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
            textColor="text-emerald-600"
            icon={
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-200 p-3 shadow-sm">
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
            textColor="text-rose-600"
            icon={
              <div className="rounded-xl bg-gradient-to-br from-rose-50 to-rose-200 p-3 shadow-sm">
                <svg
                  className="h-6 w-6 text-rose-600"
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
            textColor="text-slate-600"
            icon={
              <div className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-200 p-3 shadow-sm">
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
          <div className="py-4 md:py-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800 md:text-2xl">
                  Mis Consultas
                </h2>
                <p className="text-slate-600">
                  Gestiona y monitorea tus consultas ciudadanas
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4 p-0 md:mb-8">
            <DashboardSurveysList surveys={surveys} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
