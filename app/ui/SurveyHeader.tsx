export default function SurveyHeader() {
  return (
    <div className="bg-[#0A4C8A] text-white">
      {/* Navbar placeholder */}
      <div className="h-[68px] bg-[#0A4581]"></div>
      <div className="container mx-auto max-w-[80rem] px-4 py-6 md:px-8 md:py-8">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs text-white">
            Activa
          </span>
          <span className="rounded-full bg-[#1E5A9A] px-3 py-1 text-xs text-white">
            SECPLA
          </span>
        </div>

        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          Plan PIIMEP - Mejora de Espacios Públicos
        </h1>
        <div className="flex items-center text-sm">
          <span>Fecha límite: 30 Junio, 2025</span>
        </div>
      </div>
    </div>
  );
}
