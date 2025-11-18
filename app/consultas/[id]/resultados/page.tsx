import {
  getAreSurveyResultsAvailable,
  getSurveyDetails,
} from "@/app/lib/data/encuesta";
import ResultsAvailable from "@/app/ui/consultas/[id]/resultados/ResultsAvailable";
import ResultsUnavailable from "@/app/ui/consultas/[id]/resultados/ResultsUnavailable";
import Footer from "@/app/ui/Footer";
import { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;

  let title = "Resultados — Consultas Ciudadanas El Quisco";
  let description =
    "Revisa los resultados oficiales de esta consulta ciudadana de El Quisco.";

  try {
    const survey = await getSurveyDetails(id);
    if (survey?.survey_name) {
      title = `Resultados — ${survey.survey_name}`;
      description = `Resultados oficiales de "${survey.survey_name}" en la Municipalidad de El Quisco.`;
    }
  } catch {}

  const url = `https://participacion.munielquisco.gob.cl/consultas/${id}/resultados`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SurveyDetailsOverview({ params }: PageProps) {
  const { id } = await params;
  const areResultsAvailable = await getAreSurveyResultsAvailable(id);

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
      <ResultsAvailable surveyId={id} />
      <Footer />
    </div>
  );
}
