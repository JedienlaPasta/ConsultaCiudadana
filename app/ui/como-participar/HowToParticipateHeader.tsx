"use client";
import Link from "next/link";
import { useCallback } from "react";

export default function HowToParticipateHeader() {
  const goToNextSection = useCallback(() => {
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>("[data-step]"),
    );
    if (!steps.length) return;

    // Primer [data-step] por debajo del header
    const next =
      steps.find((el) => el.getBoundingClientRect().top > 0) ?? steps[0];

    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    next.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);
  return (
    <div
      data-step="header"
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452] text-white"
    >
      {/* Navbar placeholder */}
      <div className="h-[72px]"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 h-full w-full" aria-hidden="true">
        <div
          className="absolute top-10 left-10 size-32 rounded-full bg-blue-400/10 blur-xl md:size-64"
          aria-hidden="true"
        ></div>
        <div
          className="absolute top-20 right-20 size-48 rounded-full bg-indigo-400/10 blur-2xl md:size-96"
          aria-hidden="true"
        ></div>
        <div
          className="absolute bottom-10 left-1/3 size-24 rounded-full bg-blue-400/10 blur-xl md:size-48"
          aria-hidden="true"
        ></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-[#0e4194]/20 to-[#0b1934]/30" />

      <div className="relative z-10 container mx-auto max-w-[56rem] px-4 md:px-8">
        <div className="mx-auto flex min-h-[calc(100svh-72px)] flex-col items-center justify-center gap-2 text-center md:gap-8">
          <div className="max-w-4xl">
            <h1 className="mb-3 text-3xl leading-tight font-bold md:text-5xl">
              ¿Cómo Participar?
            </h1>
            <p className="mb-6 leading-relaxed text-blue-100 md:text-lg">
              Te guiamos paso a paso para que puedas informarte sobre como
              contribuir a la comuna.
            </p>

            {/* Chips contextuales */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/20">
                Privacidad protegida
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/20">
                Transparencia
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100 ring-1 ring-white/20">
                Clave Única
              </span>
            </div>
          </div>

          {/* Grid de pasos resumidos */}
          <div className="grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-3 md:gap-4">
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
              <span className="flex h-fit items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600/20 text-blue-100 ring-1 ring-white/20">
                  1
                </div>
                <h3 className="text-lg font-semibold">Explora</h3>
              </span>
              <p className="mt-1 text-sm text-blue-100/90">
                Revisa las consultas activas y su objetivo.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
              <span className="flex h-fit items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600/20 text-blue-100 ring-1 ring-white/20">
                  2
                </div>
                <h3 className="text-lg font-semibold">Infórmate</h3>
              </span>
              <p className="mt-1 text-sm text-blue-100/90">
                Lee el detalle, etapas y documentos relacionados.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
              <span className="flex h-fit items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600/20 text-blue-100 ring-1 ring-white/20">
                  3
                </div>
                <h3 className="text-lg font-semibold">Participa</h3>
              </span>
              <p className="mt-1 text-sm text-blue-100/90">
                Inicia sesión con Clave Única y vota.
              </p>
            </div>
          </div>

          {/* Banda informativa */}
          <div className="w-full rounded-2xl bg-white/10 px-5 py-4 text-sm text-blue-100 ring-1 ring-white/20 backdrop-blur">
            <p>
              Tu opinión es anónima y se utiliza solo para fines estadísticos.
              Las decisiones se construyen con tus aportes y se publican de
              manera transparente.
            </p>
          </div>

          {/* Acciones */}
          <div className="mt-3 flex flex-wrap justify-center gap-3 md:mt-0">
            <Link
              href="/consultas"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl md:w-fit"
            >
              Ver Consultas
            </Link>
            <button
              type="button"
              onClick={goToNextSection}
              aria-label="Ir a la siguiente sección de la guía"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white/90 px-6 text-sm font-semibold text-slate-800 ring-1 ring-white/50 transition hover:bg-white md:w-fit"
            >
              Conoce cómo funciona
            </button>
          </div>

          {/* Texto auxiliar */}
          <p className="max-w-xl pt-2 pb-8 text-xs text-blue-100/80 md:pt-0 md:pb-0">
            Sin registro de correo. Para validar tu identidad usamos{" "}
            <span className="font-medium">Clave Única</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
