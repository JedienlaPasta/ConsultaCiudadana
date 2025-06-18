import React from "react";
import SurveyProgress from "./SurveyProgress";
import MapSection from "./piimep/MapSection";

export default function SurveyLayout() {
  return (
    <div className="grid grid-cols-3 gap-4 rounded-lg border-gray-200 bg-white shadow-gray-200/80 md:border md:p-6 md:shadow-md">
      <div className="col-span-3 lg:col-span-1">
        <SurveyProgress />
      </div>
      <div className="col-span-3 lg:col-span-2">
        <MapSection />
      </div>
    </div>
  );
}
