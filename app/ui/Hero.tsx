"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
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

  return (
    <div className="h-[80vh]s relative mx-auto w-full overflow-hidden">
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
          className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-600/20 to-slate-900/10"
          style={{
            clipPath: "ellipse(65% 39.5% at 63% 57%)",
          }}
        />

        <div
          className="absolute inset-0 scale-x-300 bg-gradient-to-br from-[#0f69c4] via-[#0e4194] to-[#0b1934] sm:scale-x-200 md:scale-x-150 lg:scale-x-110"
          style={{
            clipPath: "ellipse(93% 95% at 37% 4.8%)",
          }}
        />
        <div
          className="absolute inset-0 scale-x-300 bg-gradient-to-br from-blue-500/70 via-[#0e4194]/30 to-[#0b1934]/40 sm:scale-x-200 md:scale-x-150 lg:scale-x-110"
          style={{
            clipPath: "ellipse(73% 71.5% at 40% 28%)",
          }}
        />
      </div>
      {/* Hero Content */}
      <div className="items-centers relative inset-0 top-20 z-30 container mx-auto flex h-full max-w-7xl justify-center text-white lg:px-30 xl:px-0">
        <div className="container mx-auto -mt-10 flex max-w-[80rem] grow flex-col items-center px-4 py-12 text-center md:px-8 md:text-left lg:items-start">
          {/* Badge/Tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span>Consultas Activas</span>
          </div>

          {/* Main Heading with enhanced styling */}
          <h1 className="mb-6 text-left text-4xl leading-tight font-black drop-shadow-2xl md:mb-8 md:text-5xl lg:text-6xl xl:text-7xl">
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

          {/* Enhanced subtitle */}
          <p className="mb-6 max-w-2xl text-left text-lg leading-relaxed font-medium text-blue-100 drop-shadow-lg md:mb-8 md:text-xl lg:text-2xl">
            Participa activamente en las decisiones que transformarán nuestra
            comuna.
            {/* <span className="mt-2 block font-semibold text-cyan-200">
              Tu opinión construye el futuro de El Quisco.
            </span> */}
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="mb-28 flex w-full max-w-[36rem] flex-col gap-4 sm:flex-row sm:gap-6">
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
                  className="group-hover:rotate-12s h-5 w-5 transition-transform"
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
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-400" />
              <span className="font-medium">Consultas Activas</span>
            </div>
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
          <div className="absolute top-17 hidden lg:right-37 lg:block xl:right-17">
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
          </div>
        </div>
      </div>
    </div>
  );
}
