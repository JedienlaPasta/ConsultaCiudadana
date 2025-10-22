import Navbar from "@/app/ui/Navbar";
import { getSession } from "@/app/lib/actions/auth";
import NewSurveyContentLayout from "@/app/ui/dashboard/nueva-consulta/NewSurveyContentLayout";
import Footer from "@/app/ui/Footer";
import { getSectors } from "@/app/lib/data/sectores";
import Header from "@/app/ui/dashboard/Header";

export default async function NewSurveyPage() {
  const session = await getSession();
  const sectors = await getSectors();
  return (
    <div className="min-h-screen">
      {/* Enhanced Header */}
      <Navbar session={session} />
      <Header
        title="Crear Nueva Consulta"
        description="Define el contenido y los aspectos de tu consulta ciudadana."
      />
      <NewSurveyContentLayout
        sectors={sectors}
        sessionSub={session?.sub || ""}
        sessionDv={session?.dv || ""}
      />
      <Footer />
    </div>
  );
}
