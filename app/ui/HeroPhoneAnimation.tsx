import Image from "next/image";

export default function HeroPhoneAnimation({
  currentScreen,
}: {
  currentScreen: number;
}) {
  return (
    <div className="absolute hidden lg:top-10 lg:right-14 lg:block xl:top-24 xl:right-27">
      <div className="relative">
        <div className="absolute inset-0 scale-100 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-xl xl:scale-120" />
        <div className="w-50s relative z-10 w-72 drop-shadow-2xl transition-transform duration-1000 hover:scale-105">
          {/* Phone container */}
          <div className="phone-container scale-90 xl:scale-110">
            <div className="hero-phone">
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
                      src="/logos/2.png"
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
                    <div className="emoji mb-4 animate-bounce text-4xl">🗳️</div>
                    <h3 className="mb-3 text-lg font-bold text-[#0e4194]">
                      ¡Tu voz cuenta!
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-600">
                      Ayúdanos a mejorar El Quisco con tu opinión.
                    </p>
                    <div className="w-full space-y-3">
                      <div className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl">
                        <span className="emoji">⭐</span>
                        <span>Comenzar</span>
                      </div>
                      <div className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200">
                        <span className="emoji">📦</span>
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
                        <span className="emoji">🌳</span> Más áreas verdes
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                        <span className="emoji">💡</span> Mejor iluminación
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                        <span className="emoji">🪑</span> Mobiliario urbano
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                        <span className="emoji">🚔</span> Más seguridad
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
                        <span className="emoji">🏛️</span> Plaza de Armas
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-blue-400/80 bg-blue-100/50 px-3 py-3 text-xs">
                        <span className="emoji">🏖️</span> Playa las Conchitas
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                        <span className="emoji">🏟️</span> Estadio Municipal
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                        <span className="emoji">❓</span> Otro lugar
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
                        <span className="emoji">🎭</span> Eventos culturales
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                        <span className="emoji">⚽</span> Deportes
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-gray-200 px-3 py-3 text-xs">
                        <span className="emoji">🛒</span> Ferias locales
                      </div>
                      <div className="flex cursor-pointer items-center gap-2 rounded-lg border border-blue-400/80 bg-blue-100/50 px-3 py-3 text-xs">
                        <span className="emoji">🐈</span> Más gatitos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pantalla 5: Agradecimiento mejorado */}
                <div
                  className={`app-screen ${currentScreen === 5 ? "active" : ""}`}
                >
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <div className="emoji mb-4 animate-pulse text-5xl">🎉</div>
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
  );
}
