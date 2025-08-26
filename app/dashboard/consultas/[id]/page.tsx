import { getSession } from "@/app/lib/actions/auth";
import { getSurveyAnalytics } from "@/app/lib/data/analytics";
import Header from "@/app/ui/dashboard/Header";
import Footer from "@/app/ui/Footer";
import Navbar from "@/app/ui/Navbar";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SurveyDetailsOverview({ params }: PageProps) {
  const session = await getSession();
  const surveyId = Number((await params).id);
  const response = await getSurveyAnalytics(surveyId);
  console.log(response);

  return (
    <div className="flex min-h-dvh flex-col bg-gray-200/70">
      <Navbar isLoggedIn={session !== null} />
      <Header />

      <div className="container mx-auto max-w-[80rem] flex-1 px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Volver al Dashboard
            </Link>
          </div>
        </div>

        {/* Survey Info Card */}
        <div className="items-between to-[#007BFF]s mb-8 flex flex-col rounded-xl bg-gradient-to-br from-[#0A4581] to-purple-600 px-6 py-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Consulta sobre Mejoras Urbanas
              </h1>
              <p className="mt-2 text-blue-100">
                Evaluación de propuestas para el desarrollo urbano sostenible en
                la comuna
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">87,342</div>
              <div className="text-blue-100">Total Participantes</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex space-x-6">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Creada: 20 Ago, 2025
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Inicio: 15 Nov, 2025
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Término: 15 Dic, 2025
              </div>
            </div>
            <span
              className={`rounded-full bg-emerald-400 px-3 py-1 text-xs font-medium text-purple-900`}
            >
              Activa
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tasa de Respuesta
                </p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
                <p className="text-xs text-green-600">+2.1%</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tiempo Promedio
                </p>
                <p className="text-2xl font-bold text-blue-600">4m 32s</p>
                <p className="text-xs text-red-600">-0.8%</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Participación Diaria
                </p>
                <p className="text-2xl font-bold text-purple-600">1,247</p>
                <p className="text-xs text-green-600">+15.3%</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tasa de Finalización
                </p>
                <p className="text-2xl font-bold text-orange-600">89.7%</p>
                <p className="text-xs text-green-600">+3.2%</p>
              </div>
              <div className="rounded-full bg-orange-100 p-3">
                <svg
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Questions Results */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Resultados por Pregunta
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Ver detalles
                </button>
              </div>

              <div className="space-y-6">
                {/* Question 1 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="mb-4 font-medium text-gray-900">
                    ¿Cuál considera la prioridad más importante para el
                    desarrollo urbano?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Transporte público
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div className="h-2 w-20 rounded-full bg-blue-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          42.3%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Espacios verdes
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div className="h-2 w-16 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          31.7%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Vivienda social
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div className="h-2 w-8 rounded-full bg-purple-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          26.0%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-right text-sm text-gray-500">
                    Total: 78,432 votos
                  </div>
                </div>

                {/* Question 2 */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="mb-4 font-medium text-gray-900">
                    ¿Está de acuerdo con la implementación de ciclovías en las
                    principales avenidas?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Totalmente de acuerdo
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div className="h-2 w-24 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          58.9%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Parcialmente de acuerdo
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div className="h-2 w-8 rounded-full bg-yellow-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          23.4%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        En desacuerdo
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div className="h-2 w-6 rounded-full bg-red-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          17.7%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-right text-sm text-gray-500">
                    Total: 81,205 votos
                  </div>
                </div>

                {/* Question 3 */}
                <div>
                  <h3 className="mb-4 font-medium text-gray-900">
                    ¿Qué tipo de comercio prefiere en su sector?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Comercio local
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div className="h-2 w-28 rounded-full bg-blue-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          67.2%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Centros comerciales
                      </span>
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-32 rounded-full bg-gray-200">
                          <div className="h-2 w-10 rounded-full bg-orange-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          32.8%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-right text-sm text-gray-500">
                    Total: 76,891 votos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participation by Sector */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Participación por Sector
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-600">Centro</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      24,567
                    </div>
                    <div className="text-xs text-gray-500">28.1%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Norte</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      19,234
                    </div>
                    <div className="text-xs text-gray-500">22.0%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-gray-600">Sur</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      18,901
                    </div>
                    <div className="text-xs text-gray-500">21.6%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-600">Este</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      15,432
                    </div>
                    <div className="text-xs text-gray-500">17.7%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Oeste</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      9,208
                    </div>
                    <div className="text-xs text-gray-500">10.5%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Demografía
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">18-25 años</span>
                    <span className="font-medium text-gray-900">15.2%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 w-3 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">26-35 años</span>
                    <span className="font-medium text-gray-900">28.7%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 w-6 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">36-50 años</span>
                    <span className="font-medium text-gray-900">34.1%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 w-7 rounded-full bg-purple-500"></div>
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">51+ años</span>
                    <span className="font-medium text-gray-900">22.0%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 w-4 rounded-full bg-orange-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Actividad Reciente
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Pico de participación
                    </div>
                    <div className="text-xs text-gray-500">Hace 2 horas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      1,000 nuevos votos
                    </div>
                    <div className="text-xs text-gray-500">Hace 4 horas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      Compartido en redes
                    </div>
                    <div className="text-xs text-gray-500">Hace 6 horas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
