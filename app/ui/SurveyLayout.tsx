"use client";
import React from "react";
// import SurveyProgress from "./SurveyProgress";
import MapSection from "./piimep/MapSection";
import SurveyProgressV2 from "./SurveyProgressV2";

export default function SurveyLayout() {
  return (
    <div className="w-2/3s mx-auto grid grid-cols-1 justify-end gap-4 rounded-lg border-gray-200 bg-white shadow-gray-200/80 md:border md:p-6 md:shadow-md">
      <div className="col-span-3s lg:col-span-1">
        {/* <SurveyProgress /> */}
        <SurveyProgressV2 />
      </div>
      <div className="col-span-3s space-y-4 lg:col-span-1">
        <MapSection />
        <button className="col-span-3s w-full cursor-pointer rounded-lg bg-blue-500 py-3 text-sm text-white transition-all active:scale-90 lg:col-span-2">
          Continuar
        </button>
      </div>
      <div className="col-span- grid-cols-3"></div>
    </div>
  );
}
