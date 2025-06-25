import { getSession } from "@/app/lib/actions/auth";
import Footer from "@/app/ui/Footer";
import SurveyHeader from "@/app/ui/SurveyHeader";
import SurveyLayout from "@/app/ui/SurveyLayout";

export default async function Piimep() {
  const session = await getSession();
  const user = session ? { name: session.name, rut: session.rut } : null;
  console.log(user?.name);
  console.log(user?.rut);
  return (
    <div className="flex min-h-dvh flex-col">
      <SurveyHeader to={"/consultas/piimep"} />
      <div className="container mx-auto max-w-[80rem] flex-grow px-4 md:px-8">
        <SurveyLayout />
      </div>
      <Footer />
    </div>
  );
}
