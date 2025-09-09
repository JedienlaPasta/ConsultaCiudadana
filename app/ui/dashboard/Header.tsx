"use client";

export default function Header() {
  return (
    <div className="relative bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452] text-white">
      {/* Navbar placeholder */}
      <div className="bg-[#0e4194]s h-[72px]"></div>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-blue-800/30 via-[#0e4194]/30 to-[#0b1934]/40" />
      <div className="relative z-10 container mx-auto max-w-[80rem] px-4 pt-3 pb-6 md:px-8 md:pt-5 md:pb-10">
        <h1 className="text-2xl font-bold md:text-3xl">Panel de Control</h1>
        <div className="flex items-center text-sm">
          <span>
            Gestiona tus consultas ciudadanas y revisa las métricas de
            participación
          </span>
        </div>
        {/* <SurveySearchBar /> */}
      </div>
    </div>
  );
}
