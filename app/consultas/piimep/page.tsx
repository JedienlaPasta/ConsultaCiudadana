import Link from "next/link";
import ClaveUnicaBtn from "@/app/ui/ClaveUnicaBtn";
import Footer from "@/app/ui/Footer";
import { roboto } from "@/app/ui/fonts";
import { getSession } from "@/app/lib/actions/auth";

export default async function SurveyDetail() {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto max-w-[80rem] px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 md:gap-6 lg:grid-cols-3">
          {/* Left Column - About & Details */}
          <div className="order-1s lg:order-1s lg:col-span-2">
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80">
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
                <div className="relative flex">
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
                    <p className="mt-1 text-xs text-gray-500">Agosto 2025</p>
                  </div>
                  <div className="sborder-l-2 absolute top-10 left-[14px] h-10 w-[4px] rounded-full border-blue-400 bg-slate-300"></div>
                </div>
                <div className="relative flex">
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
                      Agosto - Septiembre 2025
                    </p>
                  </div>
                  <div className="sborder-l-2 absolute top-10 left-[14px] h-10 w-[4px] rounded-full border-blue-400 bg-slate-300"></div>
                </div>
                <div className="relative flex">
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
                    <p className="mt-1 text-xs text-gray-500">
                      Septiembre 2025
                    </p>
                  </div>
                  <div className="sborder-l-2 absolute top-10 left-[14px] h-10 w-[4px] rounded-full border-blue-400 bg-slate-300"></div>
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
                    <p className="mt-1 text-xs text-gray-500">Octubre 2025</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Guía de participación */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80">
              <h4 className="text-lg font-semibold text-[#0A4C8A]">
                Definición de términos
              </h4>
            </div>
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80">
              <h4 className="text-lg font-semibold text-[#0A4C8A]">
                Preguntas Frecuentes
              </h4>
              <p className="text-sm text-gray-500">
                Preguntas comunes sobre esta consulta
              </p>
              <div className="border-b border-gray-200 py-4">
                <h5 className="mb-1 font-semibold">
                  ¿Cuánto tiempo tomará la construcción?
                </h5>
                <p className="text-gray-600">
                  El proyecto está planificado para implementarse en fases
                  durante aproximadamente 24 meses, comenzando en enero de 2026.
                  Diferentes áreas serán afectadas en diferentes momentos para
                  minimizar las interrupciones.
                </p>
              </div>
              <div className="border-b border-gray-200 py-4">
                <h5 className="mb-1 font-semibold">
                  ¿Habrá cambios en la disponibilidad de estacionamiento?
                </h5>
                <p className="text-gray-600">
                  Cada opción tiene diferentes impactos en el estacionamiento.
                  La Opción A reduce el estacionamiento en superficie pero
                  incluye una nueva estructura de estacionamiento. La Opción B
                  mantiene la mayoría del estacionamiento existente. La Opción C
                  incorpora estacionamiento dentro de nuevos desarrollos.
                </p>
              </div>
              <div className="border-b border-gray-200 py-4">
                <h5 className="mb-1 font-semibold">
                  ¿Cómo se financiará este proyecto?
                </h5>
                <p className="text-gray-600">
                  El proyecto será financiado a través de una combinación de
                  fondos de mejoras de capital de la ciudad, subvenciones
                  estatales y federales, y potencialmente asociaciones
                  público-privadas dependiendo de la opción final seleccionada.
                </p>
              </div>
              <div className="pt-4">
                <h5 className="mb-1 font-semibold">
                  ¿Los negocios permanecerán abiertos durante la construcción?
                </h5>
                <p className="text-gray-600">
                  Sí, estamos comprometidos a mantener el acceso a todos los
                  negocios durante la construcción. Se implementará un programa
                  de apoyo empresarial para ayudar con señalización, marketing y
                  posible asistencia financiera.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Participation */}
          <div className="order-2s lg:order-2s lg:col-span-1">
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80">
              <h2 className="mb-2 text-xl font-bold text-[#23396f]">
                Detalles de la consulta
              </h2>

              {/* <div className="mb-3 border-b border-gray-200 pb-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Votos actuales</span>
                  <span className="text-sm text-gray-600">Meta: 500</span>
                </div>
                <div className="h-3 w-full rounded-full border border-slate-300/60 bg-slate-200/60">
                  <div
                    className="h-full rounded-full bg-[#0A4C8A]"
                    style={{
                      width: "38%",
                    }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-gray-600">76 votos</p>
              </div> */}

              <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className="text-sm font-medium text-green-600">
                    Activa
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Departamento</span>
                  <span className="text-sm">SECPLA</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha de inicio</span>
                  <span className="text-sm">04 Agosto, 2025</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha límite</span>
                  <span className="text-sm">31 Agosto, 2025</span>
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50">
                <h3 className="border-b border-blue-200 px-4 pt-3 pb-2 font-semibold text-[#0A4C8A]">
                  Cómo Participar
                </h3>
                <ol className="space-y-2 p-4 text-sm text-gray-600">
                  <li className="flex">
                    <span className="mr-2">1.</span>
                    <span>
                      Revisa la información detallada sobre el proyecto.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">2.</span>
                    <span>Inicia sesión con ClaveÚnica.</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">3.</span>
                    <span>Elige en el mapa el sector en el que vives.</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">4.</span>
                    <span>Envía tu voto antes de la fecha límite.</span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">5.</span>
                    <span>
                      Revisa los resultados el día siguiente al término de la
                      votación.
                    </span>
                  </li>
                </ol>
              </div>

              <Link
                className="mt-5 flex min-h-11 w-full grow items-center justify-center gap-0.5 rounded-lg bg-[#0F69C4] py-[8px] pr-5 pl-4 text-center text-[#fff] transition-all select-none hover:bg-[#2275C9] hover:underline"
                href="/consultas/piimep/votacion"
                aria-label="Iniciar sesión con ClaveÚnica"
              >
                <span className={`${roboto.className} `} aria-hidden="true">
                  Ir a votar
                </span>
              </Link>
            </div>

            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
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
                <span className="flex">
                  <ClaveUnicaBtn isLoggedIn={session !== null} />
                </span>
              </div>
            </div>

            <div className="mb-6 hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md shadow-gray-200/80 md:block">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
