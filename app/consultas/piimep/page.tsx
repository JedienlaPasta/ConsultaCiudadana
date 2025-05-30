import Image from "next/image";
import Link from "next/link";
import MapSection from "@/app/ui/piimep/MapSection";
import elquiscoImg from "@/public/elquisco.svg";

export default function SurveyDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#0A4C8A] text-white">
        <div className="container mx-auto max-w-[80rem] px-4 py-6 md:px-8">
          <Link href="/" className="mb-4 flex items-center gap-2 text-sm">
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
              Infraestructura
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-bold md:text-3xl">
            Plan PIIMEP - Mejoramiento de Espacios Públicos
          </h1>
          <div className="flex items-center text-sm">
            <span>Fecha límite: Julio 30, 2025</span>
            <span className="mx-2">•</span>
            <span>76 participantes</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-[80rem] px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - About & Details */}
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-2xl font-bold text-[#23396f]">
                Acerca de esta Consulta
              </h2>
              <p className="mb-4 text-gray-500">
                Conoce más sobre esta iniciativa y cómo tu participación puede
                marcar una diferencia en los espacios públicos de El Quisco.
              </p>

              <h3 className="mt-6 mb-3 text-lg font-semibold text-[#23396f]">
                Descripción General
              </h3>
              <p className="mb-4 text-gray-600">
                El Plan PIIMEP tiene como objetivo rediseñar los espacios
                públicos de nuestra comuna para mejorar la calidad de vida de
                los residentes. Con el crecimiento de la población en nuevas
                áreas y los cambios en los patrones de uso, es momento de
                evaluar y actualizar nuestros espacios para asegurar que
                satisfagan las necesidades actuales mientras nos preparamos para
                el crecimiento futuro.
              </p>

              {/* Map Section */}
              {/* <div className="mt-8 mb-6">
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-gray-100">
                  <MapSection />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Mapa actual con los cambios propuestos destacados
                </p>
              </div> */}

              <h3 className="mt-8 mb-3 text-lg font-semibold text-[#23396f]">
                Objetivos
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-gray-600">
                <li>
                  Mejorar la frecuencia de servicios en áreas de alta demanda
                </li>
                <li>Extender la cobertura a barrios desatendidos</li>
                <li>Reducir los tiempos de traslado para destinos comunes</li>
                <li>Mejor integración con sistemas de transporte regionales</li>
                <li>Implementar más infraestructura sostenible y accesible</li>
              </ul>

              <h3 className="mt-8 mb-3 text-lg font-semibold text-[#23396f]">
                Cronograma
              </h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#0A4C8A]">
                      Participación Ciudadana
                    </h4>
                    <p className="text-sm text-gray-600">
                      Recolección de opiniones sobre espacios actuales y
                      necesidades
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Abril - Mayo 2023
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#0A4C8A]">
                      Análisis de Propuestas
                    </h4>
                    <p className="text-sm text-gray-600">
                      Análisis de datos y desarrollo de nuevas opciones de
                      diseño
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Junio - Julio 2023
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#0A4C8A]">
                      Selección Final
                    </h4>
                    <p className="text-sm text-gray-600">
                      Finalización de cambios basados en la retroalimentación
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Agosto 2023</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-[#0A4C8A]">
                      Implementación
                    </h4>
                    <p className="text-sm text-gray-600">
                      Despliegue de nuevas rutas y horarios
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Octubre 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Participation */}
          <div className="lg:col-span-1">
            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#23396f]">
                Participación
              </h2>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Participantes actuales
                  </span>
                  <span className="text-sm text-gray-600">Meta: 200</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2.5 rounded-full bg-[#0A4C8A]"
                    style={{ width: "38%" }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-gray-600">76 participantes</p>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className="text-sm font-medium text-green-600">
                    Activa
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Departamento</span>
                  <span className="text-sm font-medium">Infraestructura</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha de inicio</span>
                  <span className="text-sm font-medium">Abril 15, 2023</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha límite</span>
                  <span className="text-sm font-medium">Mayo 30, 2023</span>
                </div>
              </div>

              <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <h3 className="mb-3 font-semibold text-[#0A4C8A]">
                  Cómo Participar
                </h3>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li className="flex">
                    <span className="mr-2">1.</span>
                    <span>
                      Revisa la información detallada sobre el proyecto
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">2.</span>
                    <span>Explora las opciones disponibles en el mapa</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">3.</span>
                    <span>
                      Inicia sesión en tu cuenta (requerido para votar)
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">4.</span>
                    <span>Envía tu voto antes de la fecha límite</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">5.</span>
                    <span>Únete a la discusión para compartir tus ideas</span>
                  </li>
                </ol>
              </div>

              <div className="mb-6 rounded-lg bg-blue-50 p-4">
                <div className="mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5 text-[#0A4C8A]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="font-semibold text-[#0A4C8A]">
                    Autenticación Requerida
                  </h3>
                </div>
                <p className="mb-3 text-sm text-gray-600">
                  Necesitas iniciar sesión para participar en esta consulta.
                </p>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A4C8A] px-4 py-2 text-white transition-colors hover:bg-[#0A3C6A]">
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Iniciar Sesión
                </button>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-[#23396f]">
                  Consultas Relacionadas
                </h3>
                <div className="space-y-3">
                  <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <h4 className="font-medium text-[#0A4C8A]">
                      Revitalización del Centro
                    </h4>
                    <p className="text-xs text-gray-500">
                      Planificación Urbana • Activa
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <h4 className="font-medium text-[#0A4C8A]">
                      Rediseño del Parque Comunitario
                    </h4>
                    <p className="text-xs text-gray-500">
                      Parques y Recreación • Activa
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <h4 className="font-medium text-[#0A4C8A]">
                      Proyecto de Expansión de Ciclovías
                    </h4>
                    <p className="text-xs text-gray-500">
                      Transporte • Próximamente
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href="/consultas"
                    className="text-sm text-[#0A4C8A] hover:underline"
                  >
                    Ver Todas las Consultas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Blob */}
      <div className="relative h-[30vh] w-full overflow-hidden bg-[#1F2937]">
        {/* <Image
          src="/Blob-Footer.svg"
          width={1920}
          height={1080}
          alt="Hero Banner"
          className="max-h-[170%]s absolute -top-[0%] left-0 w-full object-cover"
          priority
        /> */}
        <div className="container mx-auto flex max-w-[80rem] items-center gap-0.5 border-t px-4 py-3 md:px-8">
          <Image
            width={60}
            loading="lazy"
            alt="El Quisco logo"
            src={elquiscoImg}
            className="object-contain"
          />
          <div
            className={`flex flex-col text-sm leading-tight font-black text-slate-200`}
          >
            <p className="text-blue-500">MUNICIPALIDAD</p>
            <p>EL QUISCO</p>
          </div>
        </div>
      </div>
    </div>
  );
}
