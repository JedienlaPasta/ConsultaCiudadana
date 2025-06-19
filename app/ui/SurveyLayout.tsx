"use client";
import MapSection from "./piimep/MapSection";
import SurveyProgress from "./SurveyProgress";

export default function SurveyLayout() {
  return (
    // <div className="rounded-lgs border-gray-200s bg-whites md:borders md:p-6s md:shadow-mds mx-auto grid grid-cols-1 justify-end gap-4 shadow-gray-200/80">
    <div className="mx-auto grid grid-cols-1 justify-end gap-6">
      <div className="col-span-3s rounded-lg bg-slate-200/60 lg:col-span-1">
        <SurveyProgress />
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
