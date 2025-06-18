import Footer from "@/app/ui/Footer";
import MapSection from "@/app/ui/piimep/MapSection";
import SurveyHeader from "@/app/ui/SurveyHeader";
import SurveyProgress from "@/app/ui/SurveyProgress";

export default function Piimep() {
  return (
    <div className="">
      <SurveyHeader />
      <div className="container mx-auto max-w-[80rem] px-4 py-6 md:px-8">
        <SurveyProgress />
        <MapSection />
      </div>
      <Footer />
    </div>
  );
}
