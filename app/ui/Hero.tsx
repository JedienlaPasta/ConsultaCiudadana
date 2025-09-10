"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const totalScreens = 5;

  const handleCTABtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("surveys");
    if (element) {
      const isMobile = window.innerWidth <= 768;
      const headerOffset = isMobile ? 30 : 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => {
        if (prev < totalScreens) return prev + 1;
        return 1; // Reiniciar
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 h-32 w-32 animate-pulse rounded-full bg-blue-500/20 blur-xl" />
      <div className="absolute top-1/2 left-1/4 h-16 w-16 animate-pulse rounded-full bg-cyan-500/10 blur-lg delay-500" />

      {/* <Image
        src="/Blob19.svg"
        width={1920}
        height={1080}
        alt="Banner"
        className="scale-105s md:h-[280%]s h-[285%]s absolute bottom-1.5 left-0 -z-10 w-full scale-x-140 scale-y-101 object-cover transition-transform duration-1000"
        priority
      /> */}

      {/* Gradient overlay with clip-path */}
      <div className="absolute bottom-2 left-0 -z-5 h-[285%] w-full scale-x-130 md:h-[280%]">
        <div
          className="absolute inset-0 scale-x-300 scale-y-102 bg-gradient-to-br from-blue-900/90 via-blue-600/20 to-slate-900/10 sm:scale-x-140 md:scale-y-101 lg:scale-x-100"
          style={{
            clipPath: "ellipse(65% 39.5% at 63% 57%)",
          }}
        />
        {/* <div
          className="absolute inset-0 scale-x-300 scale-y-102 bg-gradient-to-br from-blue-900/90 via-blue-600/20 to-slate-900/10 sm:scale-x-140 md:scale-y-101 lg:scale-x-100"
          style={{
            clipPath: "ellipse(65% 39.5% at 63% 57%)",
          }}
        /> */}

        <div
          className="absolute inset-0 scale-x-240 bg-gradient-to-br from-[#0f69c4] via-[#0e4194] to-[#0b1934] sm:scale-x-180 md:scale-x-150 lg:scale-x-110 xl:scale-x-120 2xl:scale-x-110"
          style={{
            clipPath: "ellipse(93% 95% at 37% 4.8%)",
          }}
        />
        <div
          className="absolute inset-0 scale-x-240 bg-gradient-to-br from-blue-500/70 via-[#0e4194]/30 to-[#0b1934]/40 sm:scale-x-180 md:scale-x-150 lg:scale-x-110"
          style={{
            clipPath: "ellipse(73% 71.5% at 40% 28%)",
          }}
        />
      </div>
      {/* Hero Content */}
      <div className="items-centers relative inset-0 top-12 z-30 container mx-auto flex h-full max-w-7xl justify-center text-white lg:px-30 xl:px-0">
        <div className="container mx-auto flex max-w-[80rem] grow flex-col items-center px-4 py-12 text-center md:px-8 md:text-left lg:items-start">
          {/* Hero Main Text */}
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span>Consultas Activas</span>
            </div>
            {/* Main Heading */}
            <h1 className="mb-6 text-left text-4xl leading-tight font-black drop-shadow-2xl sm:mb-8 sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Transformando
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-white bg-clip-text text-transparent">
                El Quisco
              </span>
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-cyan-200 via-blue-100 to-white bg-clip-text text-transparent">
                  con tu voto
                </span>
                <div className="absolute -bottom-2 left-0 h-1 w-32 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-80" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-6 max-w-sm text-left text-lg leading-relaxed font-medium text-blue-100 drop-shadow-lg sm:text-xl md:mb-8 lg:max-w-xl lg:text-2xl xl:max-w-2xl">
              Participa activamente en las decisiones que transformarán nuestra
              comuna.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="mb-8 flex w-full max-w-[28rem] flex-col gap-4 md:w-fit md:max-w-full md:flex-row md:gap-6">
            <button
              onClick={handleCTABtn}
              className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-8 py-4 text-lg font-black text-white shadow-2xl transition-all duration-300 hover:scale-103 hover:shadow-blue-700/25 active:scale-95"
            >
              {/* Overlay gradiente para hover con transición suave */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <span>Quiero Participar</span>
              </div>
            </button>

            <Link
              href="/resultados"
              className="group relative overflow-hidden rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-black text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-103 hover:border-white/50 hover:bg-white/15 hover:shadow-white/5 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Ver Resultados</span>
              </div>
            </Link>
          </div>

          {/* Stats or additional info */}
          <div className="mb-30 flex flex-wrap gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-400" />
              <span className="font-medium">Participación Ciudadana</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-indigo-400" />
              <span className="font-medium">Transparencia Municipal</span>
            </div>
          </div>

          {/* Enhanced phone image with better positioning */}
          {/* <div className="absolute top-17 hidden lg:right-37 lg:block xl:right-17">
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-xl" />
              <Image
                src="/phone.svg"
                width={280}
                height={560}
                alt="Mobile App Preview"
                className="relative z-10 w-50 drop-shadow-2xl transition-transform duration-1000 hover:scale-105 xl:w-64"
              />
            </div>
          </div> */}

          {/* Phone animation component */}
          <div className="absolute hidden lg:top-10 lg:right-14 lg:block xl:top-24 xl:right-27">
            <div className="relative">
              <div className="absolute inset-0 scale-100 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-xl xl:scale-120" />
              <div className="w-50s relative z-10 w-72 drop-shadow-2xl transition-transform duration-1000 hover:scale-105">
                {/* Phone container */}
                <div className="phone-container scale-90 xl:scale-110">
                  <div className="phone">
                    {/* Phone Side Buttons */}
                    <div className="absolute top-[100px] right-[-3px] h-10 w-[3px] bg-[#444]"></div>
                    <div className="absolute top-[160px] right-[-3px] h-15 w-[3px] bg-[#444]"></div>
                    <div className="absolute top-[240px] right-[-3px] h-15 w-[3px] bg-[#444]"></div>

                    {/* App Header */}
                    <div className="flex h-16 items-center justify-between rounded-t-4xl bg-gradient-to-r from-[#0b5dae] via-[#184998] to-[#0f3379] p-4 text-white shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-white/20 blur-sm"></div>
                          <Image
                            src="/logos/6.png"
                            alt="logo"
                            width={50}
                            height={50}
                            className="relative size-6 rounded-full"
                          />
                        </div>
                        <span className="flex flex-col items-start">
                          <span className="text-sm font-bold tracking-wide">
                            Participa
                          </span>
                          <span className="-mt-1 text-[10px] font-light opacity-90">
                            El Quisco
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src="/cu-blanco.svg"
                          width={18}
                          height={18}
                          aria-hidden="true"
                          alt="Cerrar sesión de ClaveÚnica"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 transition-transform hover:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="relative h-[calc(100%-64px)] w-full overflow-hidden rounded-b-4xl bg-white">
                      {/* Pantalla 1: Bienvenida mejorada */}
                      <div
                        className={`app-screen ${currentScreen === 1 ? "active" : ""}`}
                      >
                        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                          <div className="mb-4 animate-bounce text-4xl">🗳️</div>
                          <h3 className="mb-3 text-lg font-bold text-[#0e4194]">
                            ¡Tu voz cuenta!
                          </h3>
                          <p className="mb-6 text-sm leading-relaxed text-gray-600">
                            Ayúdanos a mejorar El Quisco con tu opinión.
                          </p>
                          <div className="w-full space-y-3">
                            <div className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl">
                              <span>✨</span>
                              <span>Comenzar</span>
                            </div>
                            <div className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200">
                              <span>📊</span>
                              <span>Ver resultados</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pantalla 2: Primera pregunta mejorada */}
                      <div
                        className={`app-screen ${currentScreen === 2 ? "active" : ""}`}
                      >
                        <div className="rounded-t-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-sm font-bold text-[#0e4194]">
                              Espacios Públicos
                            </h3>
                            <span className="text-xs text-gray-500">1/3</span>
                          </div>
                        </div>
                        <div className="p-3">
                          {/* Progress Bar */}
                          <div className="mt-2.5 mb-4 flex h-2 gap-1">
                            <div className="h-full w-full rounded-xs bg-emerald-400 transition-all duration-500" />
                            <div className="h-full w-full rounded-xs bg-gray-200 transition-all duration-500" />
                            <div className="h-full w-full rounded-xs bg-gray-200 transition-all duration-500" />
                          </div>
                          {/* Question */}
                          <div className="question mb-4">
                            <p className="text-sm font-semibold text-gray-800">
                              ¿Qué mejorarías primero?
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 space-y-1">
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-blue-400/80 bg-blue-100/50 px-3 py-3 text-xs">
                              <span>🌳</span> Más áreas verdes
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>💡</span> Mejor iluminación
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>🪑</span> Mobiliario urbano
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>🛡️</span> Más seguridad
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pantalla 3: Segunda pregunta mejorada */}
                      <div
                        className={`app-screen ${currentScreen === 3 ? "active" : ""}`}
                      >
                        <div className="rounded-t-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-sm font-bold text-[#0e4194]">
                              Ubicación
                            </h3>
                            <span className="text-xs text-gray-500">2/3</span>
                          </div>
                        </div>
                        <div className="p-3">
                          {/* Progress Bar */}
                          <div className="mt-2.5 mb-4 flex h-2 gap-1">
                            <div className="h-full w-full rounded-xs bg-emerald-400 transition-all duration-500" />
                            <div className="h-full w-full rounded-xs bg-emerald-400 transition-all duration-500" />
                            <div className="h-full w-full rounded-xs bg-gray-200 transition-all duration-500" />
                          </div>
                          <div className="question mb-4">
                            <p className="text-sm font-semibold text-gray-800">
                              ¿Dónde empezamos?
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 space-y-1">
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>🏛️</span> Plaza de Armas
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-blue-400/80 bg-blue-100/50 px-3 py-3 text-xs">
                              <span>🌊</span> Playa las Conchitas
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>🏟️</span> Estadio Municipal
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>📝</span> Otro lugar
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pantalla 4: Tercera pregunta mejorada */}
                      <div
                        className={`app-screen ${currentScreen === 4 ? "active" : ""}`}
                      >
                        <div className="rounded-t-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                          <div className="flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-sm font-bold text-[#0e4194]">
                              Actividades
                            </h3>
                            <span className="text-xs text-gray-500">3/3</span>
                          </div>
                        </div>
                        <div className="p-3">
                          {/* Progress Bar */}
                          <div className="mt-2.5 mb-4 flex h-2 gap-1">
                            <div className="h-full w-full rounded-xs bg-emerald-400 transition-all duration-500" />
                            <div className="h-full w-full rounded-xs bg-emerald-400 transition-all duration-500" />
                            <div className="h-full w-full rounded-xs bg-emerald-400 transition-all duration-500" />
                          </div>
                          <div className="question mb-4">
                            <p className="text-sm font-semibold text-gray-800">
                              ¿Qué actividades prefieres?
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 space-y-1">
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>🎭</span> Eventos culturales
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>⚽</span> Deportes
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                              <span>🛒</span> Ferias locales
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-blue-400/80 bg-blue-100/50 px-3 py-3 text-xs">
                              <span>🐈</span> Más gatitos
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pantalla 5: Agradecimiento mejorado */}
                      <div
                        className={`app-screen ${currentScreen === 5 ? "active" : ""}`}
                      >
                        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                          <div className="mb-4 animate-pulse text-5xl">🎉</div>
                          <h3 className="mb-3 text-lg font-bold text-emerald-600">
                            ¡Gracias!
                          </h3>
                          <p className="mb-2 text-sm text-gray-700">
                            Tu opinión fue registrada
                          </p>
                          <p className="mb-6 text-xs text-gray-500">
                            Juntos transformamos El Quisco
                          </p>
                          <div className="mb-4 flex items-center gap-2">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></div>
                            <span className="text-xs font-medium text-emerald-600">
                              Completado
                            </span>
                          </div>
                          <div className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl">
                            Volver al inicio
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Animation End */}
        </div>
      </div>
    </div>
  );
}
