import { getAreSurveyResultsAvailable } from "@/app/lib/data/encuesta";
import ResultsAvailable from "@/app/ui/consultas/[id]/resultados/ResultsAvailable";
import ResultsUnavailable from "@/app/ui/consultas/[id]/resultados/ResultsUnavailable";
import Footer from "@/app/ui/Footer";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SurveyDetailsOverview({ params }: PageProps) {
  const surveyId = (await params).id;
  const areResultsAvailable = await getAreSurveyResultsAvailable(surveyId);

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
      <ResultsAvailable surveyId={surveyId} />
      <Footer />
    </div>
  );
}
