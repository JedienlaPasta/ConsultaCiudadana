import { getSession } from "@/app/lib/actions/auth";
import { getSurveyQuestions } from "@/app/lib/data/encuesta";
import { verifyParticipation } from "@/app/lib/data/participacion";
import Footer from "@/app/ui/Footer";
import SurveyLayout from "@/app/ui/consultas/SurveyLayout";
import { redirect } from "next/navigation";

type SurveyDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function SurveyPage(props: SurveyDetailsProps) {
  const params = await props.params;
  const publicId = params.id;

  const session = await getSession();
  const sub = session?.sub || "";
  const dv = session?.dv || "";

  const hasParticipated = await verifyParticipation(publicId, "19973725", "2");

  const surveyQuestions = await getSurveyQuestions(publicId);
  if (surveyQuestions.length === 0) {
    redirect("/consultas");
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="container mx-auto max-w-[80rem] flex-grow px-4 md:px-8">
        <SurveyLayout
          questions={surveyQuestions}
          publicId={publicId}
          sub={sub}
          dv={dv}
          hasParticipated={hasParticipated}
        />
      </div>
      <Footer />
    </div>
  );
}
