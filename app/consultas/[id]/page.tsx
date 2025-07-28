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

  const stateColor = () => {
    if (new Date(survey.survey_start_date) > new Date()) {
      return "text-yellow-500";
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
            <div className="mb-6 flex flex-col gap-5 rounded-lg p-6 shadow-gray-200/80 md:gap-7 md:border md:border-gray-200 md:shadow-md">
              <span>
                <h2 className="mb-1 text-xl font-bold text-[#23396f] md:text-2xl">
                  Acerca de esta Consulta
                </h2>
                <p className="text-sm text-gray-500">
                  Conoce más sobre esta iniciativa y cómo tu participación puede
                  marcar una diferencia en los espacios públicos de El Quisco.
                </p>
              </span>

              <span>
                <h3 className="mb-1 text-lg font-semibold text-[#23396f]">
                  Descripción General
                </h3>
                <p className="text-gray-600">
                  {survey.survey_large_description}
                </p>
              </span>

              <span>
                <h3 className="mb-1 text-lg font-semibold text-[#23396f]">
                  Objetivos
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-gray-600 md:space-y-2">
                  {survey.objectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </span>

              <Schedule schedule={survey.chronogram} />
            </div>

            {/* Guía de participación */}
            <Definitions definitions={survey.survey_options_definitions} />

            {/* Preguntas frecuentes Desktop */}
            <div className="hidden md:block">
              <FAQComponent faq={survey.frequently_asked_questions} />
            </div>
          </div>

          {/* Right Column - Participation */}
          <div className="lg:col-span-1">
            <div className="border-t border-gray-200 p-6 py-10 md:mb-6 md:rounded-lg md:border md:py-6 md:shadow-md md:shadow-gray-200/80">
              <h2 className="mb-2 text-xl font-bold text-[#23396f]">
                Detalles de la consulta
              </h2>

              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className={`text-sm font-medium ${stateColor()}`}>
                    {surveyState()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Departamento</span>
                  <span className="text-sm">{survey.department}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha de inicio</span>
                  <span className="text-sm">
                    {formatDateToSpanish(survey.survey_start_date)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha término</span>
                  <span className="text-sm">
                    {formatDateToSpanish(survey.survey_end_date)}
                  </span>
                </div>
              </div>

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
                      Revisa los resultados el día siguiente al término de la
                      votación.
                    </span>
                  </li>
                </ol>
              </div>

              {isLoggedIn ? (
                <Link
                  className="mt-5 flex min-h-11 w-full grow items-center justify-center gap-0.5 rounded-lg bg-[#0F69C4] py-[8px] pr-5 pl-4 text-center text-[#fff] transition-all select-none hover:bg-[#2275C9] hover:underline"
                  href={
                    surveyState() === "Abierta"
                      ? `/consultas/${id}/voto`
                      : surveyState() === "Cerrada"
                        ? `/consultas/${id}/resultados`
                        : "#"
                  }
                >
                  {surveyState() === "Abierta"
                    ? "Ir a votar"
                    : surveyState() === "Cerrada"
                      ? "Consultar resultados"
                      : "Aun no empieza la consulta"}
                </Link>
              ) : (
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
              )}
            </div>

            <div className="mb-6 hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80 md:block">
              <h3 className="mb-3 font-semibold text-[#23396f]">
                Consultas Relacionadas
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                  <h4 className="font-medium text-[#0A4C8A]">
                    Revitalización del Centro
                  </h4>
                  <p className="text-xs text-gray-500">
                    Planificación Urbana • Activa
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                  <h4 className="font-medium text-[#0A4C8A]">
                    Rediseño del Parque Comunitario
                  </h4>
                  <p className="text-xs text-gray-500">
                    Parques y Recreación • Activa
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                  <h4 className="font-medium text-[#0A4C8A]">
                    Proyecto de Expansión de Ciclovías
                  </h4>
                  <p className="text-xs text-gray-500">
                    Transporte • Próximamente
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/consultas"
                  className="text-sm text-[#0A4C8A] hover:underline"
                >
                  Ver Todas las Consultas
                </Link>
              </div>
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
