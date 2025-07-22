import { getSurveyQuestions } from "@/app/lib/data/encuesta";
import Footer from "@/app/ui/Footer";
import SurveyLayout from "@/app/ui/consultas/SurveyLayout";

type SurveyDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function SurveyPage(props: SurveyDetailsProps) {
  const params = await props.params;
  const id = params.id;
  const surveyQuestions = await getSurveyQuestions(id);
  console.log("Survey questions in page.tsx:", surveyQuestions);

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="container mx-auto max-w-[80rem] flex-grow px-4 md:px-8">
        <SurveyLayout surveyQuestions={surveyQuestions} />
      </div>
      <Footer />
    </div>
  );
}
