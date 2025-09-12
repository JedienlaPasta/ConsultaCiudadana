import Navbar from "@/app/ui/Navbar";
import Header from "@/app/ui/dashboard/nueva-consulta/Header";
import { getSession } from "@/app/lib/actions/auth";
import NewSurveyContentLayout from "@/app/ui/dashboard/nueva-consulta/NewSurveyContentLayout";
import Footer from "@/app/ui/Footer";
import { getSectors } from "@/app/lib/data/encuesta";

export default async function NewSurveyPage() {
  const session = await getSession();
  const sectors = await getSectors();
  return (
    <div className="min-h-screen">
      {/* Enhanced Header */}
      <Navbar isLoggedIn={session !== null} />
      <Header />
      <NewSurveyContentLayout
        sectors={sectors}
        sessionSub={Number(session?.sub)}
      />
      <Footer />
    </div>
  );
}
