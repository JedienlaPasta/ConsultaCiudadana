"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function StepsSlider() {
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const snappingRef = useRef<boolean>(false);

  useEffect(() => {
    // Selecciona explícitamente los pasos por data-step (header, secciones y footer)
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-step]"),
    );

    setSections(nodes);
    sectionsRef.current = nodes;

    const findActiveIndex = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionsRef.current.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const elCenter = window.scrollY + rect.top + rect.height / 2;
        const d = Math.abs(elCenter - viewportCenter);
        if (d < closestDistance) {
          closestDistance = d;
          closestIndex = idx;
        }
      });

      // Fuerza el último paso al llegar al final del documento
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      setCurrentStep(
        nearBottom ? sectionsRef.current.length - 1 : closestIndex,
      );
    };

    const onWheel = (e: WheelEvent) => {
      // Paginación por rueda: prev/next sin scroll parcial
      e.preventDefault();
      const dir = Math.sign(e.deltaY);
      const next =
        dir > 0
          ? Math.min(currentStep + 1, sectionsRef.current.length - 1)
          : Math.max(currentStep - 1, 0);
      sectionsRef.current[next]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    window.addEventListener("scroll", findActiveIndex, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    findActiveIndex();

    return () => {
      window.removeEventListener("scroll", findActiveIndex);
      window.removeEventListener("wheel", onWheel);
    };
  }, [currentStep]);

  const goTo = useCallback((idx: number) => {
    const els = sectionsRef.current;
    if (!els.length) return;
    const clamped = Math.max(0, Math.min(idx, els.length - 1));
    els[clamped].scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll("section"),
    ) as HTMLElement[];

    sectionsRef.current = els;
    setSections(els);

    const onScroll = () => {
      const items = sectionsRef.current;
      if (!items.length) return;

      // Si estás al fondo del documento, fuerza el último paso
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const atBottom = window.innerHeight + window.scrollY >= scrollHeight - 2;
      if (atBottom) {
        setCurrentStep(items.length - 1);
        return;
      }

      // Selección por cercanía al centro del viewport (más estable)
      const viewportCenter = window.innerHeight / 2;
      const nearestIndex = items.reduce((bestIdx, el, idx) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;

        const bestRect = items[bestIdx].getBoundingClientRect();
        const bestCenter = bestRect.top + bestRect.height / 2;

        return Math.abs(center - viewportCenter) <
          Math.abs(bestCenter - viewportCenter)
          ? idx
          : bestIdx;
      }, 0);

      setCurrentStep(nearestIndex);
    };

    const isFinePointer =
      window.matchMedia && window.matchMedia("(pointer: fine)").matches;

    const onWheel = (e: WheelEvent) => {
      if (!isFinePointer) return;
      if (snappingRef.current) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 20) return; // ignora microrruedas
      e.preventDefault();

      snappingRef.current = true;
      const target = delta > 0 ? currentStep + 1 : currentStep - 1;
      const clamped = Math.max(
        0,
        Math.min(target, sectionsRef.current.length - 1),
      );
      sectionsRef.current[clamped]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        snappingRef.current = false;
      }, 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, [currentStep]);

  const isLastStep = currentStep === sectionsRef.current.length - 1;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 transition-transform duration-300 md:block ${isLastStep ? "-translate-y-90" : ""}`}
    >
      <div className="flex items-center gap-3 rounded-full bg-slate-900/80 px-3 py-2 text-white shadow-lg ring-1 ring-slate-700 backdrop-blur-md">
        <button
          className={`flex items-center gap-1 rounded rounded-l-3xl bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white ${currentStep === 0 ? "pointer-events-none opacity-50" : ""}`}
          onClick={() => goTo(currentStep - 1)}
          aria-label="Ir al paso anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          Anterior
        </button>

        <div className="flex items-center gap-2 px-2">
          <span className="rounded bg-white/90 px-2 py-1 text-xs font-medium text-slate-700">
            {sections.length
              ? // No se incluye el último section porque este corresponde al footer
                currentStep === sections.length - 1
                ? currentStep - 1
                : currentStep
              : 0}
            /{sections.length - 2 || 0}
          </span>
          <div className="flex items-center gap-1">
            {sections.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al paso ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === currentStep
                    ? "bg-white"
                    : "bg-slate-500 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Botón Siguiente */}
        <button
          className={`flex items-center gap-1 rounded rounded-r-3xl bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white ${sections.length && currentStep === sections.length - 1 ? "pointer-events-none opacity-50" : ""}`}
          onClick={() => goTo(currentStep + 1)}
          aria-label="Ir al siguiente paso"
        >
          Siguiente
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
