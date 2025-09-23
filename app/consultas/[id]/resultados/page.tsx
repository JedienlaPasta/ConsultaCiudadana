import { getSurveyAnalytics } from "@/app/lib/data/analytics";
import { getAreSurveyResultsAvailable } from "@/app/lib/data/encuesta";
import BarsAndPieChart from "@/app/ui/consultas/[id]/resultados/Bars&PieChart";
import ResultsUnavailable from "@/app/ui/consultas/[id]/resultados/ResultsUnavailable";
import Footer from "@/app/ui/Footer";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SurveyDetailsOverview({ params }: PageProps) {
  const surveyId = Number((await params).id);
  // PENDIENTE
  // Quizas separar en distintos componentes para renderizar, en el que primero se verifique si ya se pueden mostrar los resultados y si no, se muestre un mensaje de resultados no disponibles.
  // Luego, en caso de que si esten disponibles los resultados, se renderiza el otro componente que hace la consulta a la base de datos y muestra los resultados.
  const analytics = await getSurveyAnalytics(surveyId);
  const areResultsAvailable = await getAreSurveyResultsAvailable(surveyId);
  let counter = 0;

  if (!areResultsAvailable) {
    return (
      <div className="flex min-h-dvh flex-col">
        <ResultsUnavailable />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="container mx-auto max-w-[80rem] flex-1 px-4 md:py-10 lg:px-8">
        {/* Enhanced Results Section */}
        <div className="rounded-2xl bg-white ring-slate-200 md:shadow-lg md:ring-1">
          <div className="border-b border-slate-200 bg-slate-50/50 py-6 md:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Resultados por Pregunta
                </h2>
                <p className="text-sm text-slate-600 md:mt-1">
                  Conteo oficial de las opciones elegidas en la encuesta.
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

          <div className="space-y-8 pt-5 md:p-8">
            {analytics.questionResults.map((question) => {
              if (question.isMapQuestion) return;

              counter++;
              return (
                <div
                  key={question.questionId}
                  className="group border-slate-200 pb-4 not-last:border-b sm:pb-12"
                >
                  <div className="mb-3 flex items-center space-x-4 md:mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                      {counter}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
                        {question.question || `Pregunta ${counter}`}
                      </h3>
                    </div>
                  </div>
                  <div className="md:ml-12">
                    <BarsAndPieChart
                      key={question.questionId}
                      question={question}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
