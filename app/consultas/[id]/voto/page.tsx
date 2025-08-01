import { getSession } from "@/app/lib/actions/auth";
import { getSurveyQuestions } from "@/app/lib/data/encuesta";
import { verifyParticipation } from "@/app/lib/data/participacion";
import Footer from "@/app/ui/Footer";
import SurveyLayout from "@/app/ui/consultas/SurveyLayout";

type SurveyDetailsProps = {
  params: Promise<{ id: number }>;
};

export default async function SurveyPage(props: SurveyDetailsProps) {
  const params = await props.params;
  const id = params.id;
  const session = getSession();
  console.log(session);
  const hasParticipated = await verifyParticipation(55555555, id);
  const surveyQuestions = await getSurveyQuestions(id);

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="container mx-auto max-w-[80rem] flex-grow px-4 md:px-8">
        <SurveyLayout
          questions={surveyQuestions}
          surveyId={id}
          hasParticipated={hasParticipated}
        />
      </div>
      <Footer />
    </div>
  );
}
