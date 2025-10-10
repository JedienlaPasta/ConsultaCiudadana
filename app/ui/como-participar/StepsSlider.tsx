"use client";

import { useState } from "react";

export default function StepsSlider() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="-translate-y-1/2s sticky top-1/2 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-slate-200 px-4 py-2 text-sm text-slate-600">
          {currentStep + 1}
        </div>
      </div>
    </div>
  );
}
