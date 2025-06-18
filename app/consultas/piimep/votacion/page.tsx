import Footer from "@/app/ui/Footer";
import SurveyHeader from "@/app/ui/SurveyHeader";
import SurveyLayout from "@/app/ui/SurveyLayout";

export default function Piimep() {
  return (
    <div>
      <SurveyHeader />
      <div className="container mx-auto max-w-[80rem] px-4 py-8 md:px-8">
        <SurveyLayout />
      </div>
      <Footer />
    </div>
  );
}
