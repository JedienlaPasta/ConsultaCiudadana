import React from "react";
import SurveyProgress from "./SurveyProgress";
import MapSection from "./piimep/MapSection";

export default function SurveyLayout() {
  return (
    <div className="grid grid-cols-3 gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80">
      <div className="col-span-3 lg:col-span-1">
        <SurveyProgress />
      </div>
      <div className="col-span-3 lg:col-span-2">
        <MapSection />
      </div>
    </div>
  );
}
