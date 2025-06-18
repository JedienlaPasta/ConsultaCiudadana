import Footer from "@/app/ui/Footer";
import MapSection from "@/app/ui/piimep/MapSection";
import SurveyHeader from "@/app/ui/SurveyHeader";
import SurveyProgress from "@/app/ui/SurveyProgress";

export default function Piimep() {
  return (
    <div>
      <SurveyHeader />
      <div className="container mx-auto max-w-[80rem] px-4 py-8 md:px-8">
        <div className="grid grid-cols-3 gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80">
          <div className="col-span-3 md:col-span-1">
            <SurveyProgress />
          </div>
          <div className="col-span-3 md:col-span-2">
            <MapSection />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
