import Link from "next/link";

export default function SurveyHeader({ to }: { to: string }) {
  return (
    <div className="bg-[#0A4C8A] text-white">
      <div className="container mx-auto max-w-[80rem] px-4 py-6 md:px-8">
        <Link href={to} className="mb-4 flex items-center gap-2 text-sm">
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al Inicio
        </Link>

        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs text-white">
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
          <span className="mx-2">•</span>
          <span>76 participantes</span>
        </div>
      </div>
    </div>
  );
}
