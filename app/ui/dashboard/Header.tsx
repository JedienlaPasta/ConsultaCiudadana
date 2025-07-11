"use client";

export default function Header() {
  return (
    <div className="bg-[#0A4C8A] text-white">
      {/* Navbar placeholder */}
      <div className="h-[68px] bg-[#0A4581]"></div>
      <div className="container mx-auto max-w-[80rem] space-y-2 px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-2xl font-bold md:text-3xl">Todas las Consultas</h1>
        <div className="flex items-center text-sm">
          <span>Buscar consultas activas o terminadas</span>
        </div>
        {/* <SurveySearchBar /> */}
      </div>
    </div>
  );
}
