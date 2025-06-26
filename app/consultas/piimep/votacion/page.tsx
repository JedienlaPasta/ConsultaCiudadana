import Footer from "@/app/ui/Footer";
import SurveyLayout from "@/app/ui/SurveyLayout";

export default async function SurveyPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="container mx-auto max-w-[80rem] flex-grow px-4 md:px-8">
        <SurveyLayout />
      </div>
      <Footer />
    </div>
  );
}
