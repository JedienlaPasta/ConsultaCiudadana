"use client";

export default function ResultsUnavailable() {
  return (
    <div className="container mx-auto flex max-w-[80rem] flex-grow items-center justify-center px-4 md:px-8">
      <div className="w-full max-w-md flex-grow rounded-lg border border-slate-200 bg-slate-100 p-8 text-center shadow-md">
        {/* Icono */}
        <div className="mb-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-8 w-8 text-blue-600"
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
          </div>
        </div>

        {/* Título */}
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Resultados no disponibles
        </h1>

        {/* Mensaje */}
        <p className="mb-6 leading-relaxed text-gray-600">
          Los resultados aún no se encuentran disponibles. Revísalos una vez que
          la consulta haya terminado.
        </p>

        {/* Información adicional */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start">
            <svg
              className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-800">
              Los resultados se generarán automáticamente cuando finalice el
              período de consulta.
            </p>
          </div>
        </div>

        {/* Botón de regreso */}
        <button
          onClick={() => window.history.back()}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}
