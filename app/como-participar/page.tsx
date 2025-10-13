import Image from "next/image";
import HowToParticipateHeader from "../ui/como-participar/HowToParticipateHeader";
import Navbar from "../ui/Navbar";
import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";
import StepsSlider from "../ui/como-participar/StepsSlider";

export default async function ComoParticipar() {
  const session = await getSession();
  return (
    // <div className="container mx-auto max-w-[80rem]">
    <div className="flex min-h-dvh snap-y snap-mandatory flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Navbar isLoggedIn={session !== null} />
      <HowToParticipateHeader />
      <StepsSlider />
      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col">
          {/* View 1 - Inicio */}
          <section
            data-step="inicio"
            className="flex min-h-[105svh] w-full snap-start"
          >
            <div className="container mx-auto flex max-w-[80rem] grid-cols-1 flex-col items-center justify-center gap-10 px-6 lg:grid lg:grid-cols-2 lg:gap-16">
              {/* Panel descriptivo - Inicio */}
              <div className="order-1">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-400/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      1
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="-mt-0.5 text-2xl font-bold text-[#0e4194]">
                        Inicio
                      </h2>
                    </div>
                  </div>

                  {/* Cuerpo con descripción e ítems con íconos */}
                  <div className="px-5 py-4">
                    <p className="max-w-xl text-gray-700">
                      Página inicial de participación. Puedes entrar y
                      participar en una consulta desde la sección{" "}
                      <span className="font-medium">Últimas Consultas</span>.
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-emerald-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0A10 10 0 0 1 2 12Zm14.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586 9.207 10.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l5-5Z"
                          />
                        </svg>
                        Botón {`"Quiero Participar"`} para ver las consultas
                        disponibles.
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-emerald-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0A10 10 0 0 1 2 12Zm14.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586 9.207 10.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l5-5Z"
                          />
                        </svg>
                        Botón {`"Cómo participar"`} para consultar esta guía.
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-emerald-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0A10 10 0 0 1 2 12Zm14.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586 9.207 10.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l5-5Z"
                          />
                        </svg>
                        Cada tarjeta gris en {`"Últimas Consultas"`} representa
                        una consulta disponible.
                      </li>
                    </ul>

                    {/* Callout que conecta con el placeholder */}
                    <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#0e4194] ring-1 ring-blue-200">
                      <span className="font-semibold">Tip:</span> toca una
                      tarjeta en
                      <span className="font-semibold">
                        {" "}
                        Últimas Consultas
                      </span>{" "}
                      para ver el detalle y participar.
                    </div>
                  </div>
                </div>
              </div>
              {/* Teléfono - Preguntas */}
              <div className="order-2 flex justify-center">
                <SurveyParticipationTutorialView>
                  {/* Pantalla 1: Bienvenida mejorada */}
                  <div className="app-screen active">
                    <div className="absolute bottom-[56%] left-0 h-[285%] w-full scale-x-160">
                      <div
                        className="absolute inset-0 scale-x-200 scale-y-102 bg-gradient-to-br from-blue-900/90 via-blue-600/20 to-slate-900/10"
                        style={{
                          clipPath: "ellipse(65% 39.5% at 63% 57%)",
                        }}
                      />
                      <div
                        className="absolute inset-0 scale-x-200 bg-gradient-to-br from-[#0f69c4] via-[#0e4194] to-[#0b1934]"
                        style={{
                          clipPath: "ellipse(93% 94% at 39% 4.8%)",
                        }}
                      />
                      <div
                        className="absolute inset-0 scale-x-200 bg-gradient-to-br from-blue-500/70 via-[#0e4194]/30 to-[#0b1934]/40"
                        style={{
                          clipPath: "ellipse(73% 70.5% at 42% 28%)",
                        }}
                      />
                    </div>

                    <div className="mt-2 flex h-full flex-col items-center justify-start p-4 text-center">
                      <div className="w-full space-y-3">
                        {/* Quiero Participar btn */}
                        <div className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-6 py-4 text-white shadow-2xl">
                          <div className="relative flex items-center justify-center gap-2 text-sm font-bold">
                            <svg
                              className="h-5 w-5"
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
                        </div>

                        {/* Como Participar btn */}
                        <div className="group relative cursor-pointer overflow-hidden rounded-full border-2 border-white/30 bg-white/10 px-6 py-4 text-white shadow-xl backdrop-blur-sm">
                          <div className="relative flex items-center justify-center gap-2 text-sm font-bold">
                            <svg
                              className="h-5 w-5"
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
                            <span>Cómo Participar</span>
                          </div>
                        </div>
                      </div>

                      {/* Placeholder: Tarjeta de consulta */}
                      <div className="mt-22 flex w-full flex-col justify-center gap-2 text-left">
                        <h2 className="grow text-xl font-bold text-[#23396f]">
                          Últimas Consultas
                        </h2>
                        <div className="w-full max-w-[18rem] overflow-hidden rounded-l-2xl border-r-4 border-slate-200 bg-slate-100 shadow-sm ring-1 ring-slate-200">
                          {/* Header */}
                          <div className="flex flex-col items-start justify-between gap-1 px-4 pt-3">
                            <h3 className="font-bold text-slate-700">
                              Nombre de la Consulta
                            </h3>
                            <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-200/50 py-1 pr-2.5 pl-2 text-xs font-medium text-emerald-600">
                              <svg
                                className="size-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Consulta Activa
                            </div>
                          </div>

                          {/* Body */}
                          <div className="px-4 py-2">
                            <p className="text-left text-xs text-slate-600">
                              Breve descripción de la consulta ciudadana para
                              ejemplificar el contenido de este elemento.
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
                            <span className="text-[11px] text-slate-500">
                              Término: 24 días
                            </span>
                            <span className="text-xs font-medium text-[#03529c]">
                              Ver Detalle →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>

          {/* View 2 - Detalle de consulta */}
          <section
            data-step="detalle"
            className="flex min-h-[105svh] w-full snap-start bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452]"
          >
            <div className="container mx-auto flex max-w-[80rem] grid-cols-1 flex-col items-center justify-center gap-10 px-6 lg:grid lg:grid-cols-2 lg:gap-16">
              {/* Panel descriptivo - Detalle de consulta */}
              <div className="order-1 lg:order-2">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-400/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      2
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="-mt-0.5 text-2xl font-bold text-[#0e4194]">
                        Detalle de la Consulta
                      </h2>
                    </div>
                  </div>

                  {/* Cuerpo con descripción e ítems con íconos */}
                  <div className="px-5 py-4">
                    <p className="max-w-xl text-gray-700">
                      Aquí encontrarás el objetivo, etapas, documentos y estado
                      de avance de cada consulta. Para participar necesitas
                      iniciar sesión con{" "}
                      <span className="font-medium">Clave Única</span>.
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-emerald-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0A10 10 0 0 1 2 12Zm14.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586 9.207 10.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l5-5Z"
                          />
                        </svg>
                        Botón {`"Iniciar sesión"`}: habilita la participación y
                        guarda tu avance.
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 text-emerald-600"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0A10 10 0 0 1 2 12Zm14.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586 9.207 10.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l5-5Z"
                          />
                        </svg>
                        Enlace {`"Ver documento completo"`}: accede a las bases
                        y material complementario.
                      </li>
                    </ul>

                    {/* Callout que conecta con el placeholder */}
                    <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#0e4194] ring-1 ring-blue-200">
                      <span className="font-semibold">Tip:</span> tras iniciar
                      sesión, primero acepta los{" "}
                      <span className="font-semibold">
                        términos y condiciones
                      </span>{" "}
                      y luego presiona{" "}
                      <span className="font-semibold">“Ir a votar”</span> para
                      comenzar la encuesta.
                    </div>
                  </div>
                </div>
              </div>
              {/* Teléfono - Preguntas */}
              <div className="order-2 flex justify-center lg:order-1">
                <SurveyParticipationTutorialView>
                  {/* Pantalla 2: Detalle de consulta */}
                  <div className="app-screen active">
                    <div className="bg-gradient-to-r from-[#0b5dae] via-[#184998] to-[#0f3379] p-3 text-white">
                      <div className="flex flex-col items-start justify-between">
                        <h3 className="flex items-center gap-2 font-bold">
                          Nombre de la Consulta
                        </h3>
                        <p className="text-xs">Termina: 15/09/2025</p>
                      </div>
                    </div>
                    <div className="p-3">
                      {/* Question */}
                      <div className="question mb-2">
                        <p className="text-lg font-bold text-[#23396f]">
                          Acerca de esta Consulta
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 p-5 sm:px-4 sm:py-3">
                        <h3 className="text-md mb-1 bg-[#23396f] to-blue-700 bg-clip-text font-bold text-transparent">
                          Descripción General
                        </h3>
                        <div className="text-xs text-slate-600">
                          Un texto que describe en detalle todos los aspectos de
                          la consulta.
                        </div>
                      </div>

                      <div className="mt-3 overflow-hidden border-t border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 md:mb-8 md:rounded-xl md:border md:shadow md:shadow-gray-200/80">
                        <div className="mt-3 space-y-3 px-3 pb-3">
                          <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 transition-colors duration-200 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Políticas de Privacidad
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Conoce cómo usamos tus datos
                                  </p>
                                </div>
                              </div>
                              <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm">
                                Ver
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="ml-1 h-3 w-3"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="group relative flex min-h-11 w-full grow items-center justify-center gap-0.5 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-[8px] pr-5 pl-4 text-center text-white transition-all select-none hover:bg-[#2275C9] active:scale-95">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="relative">Ir a votar</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>

          {/* View 3 - Preguntas */}
          <section
            data-step="preguntas-mapa"
            className="flex min-h-[105svh] w-full"
          >
            <div className="container mx-auto flex max-w-[80rem] grid-cols-1 flex-col items-center justify-center gap-10 px-6 lg:grid lg:grid-cols-2 lg:gap-16">
              {/* Panel descriptivo - Preguntas */}
              <div className="order-1">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-400/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      3
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="-mt-0.5 text-2xl font-bold text-[#0e4194]">
                        Preguntas - Mapa Interactivo
                      </h2>
                    </div>
                  </div>

                  {/* Cuerpo con descripción e ítems con íconos */}
                  <div className="px-5 py-4">
                    <p className="max-w-xl text-gray-700">
                      Al comenzar, algunas consultas muestran un mapa para
                      indicar tu sector. Puedes elegir desde las opciones o
                      tocando directamente el mapa: eso personaliza las
                      preguntas posteriores.
                    </p>

                    {/* Callout que conecta con el placeholder */}
                    <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#0e4194] ring-1 ring-blue-200">
                      <span className="font-semibold">Tip:</span> las siguientes
                      preguntas pueden variar según el sector seleccionado;
                      responde de acuerdo con tu realidad.
                    </div>
                  </div>
                </div>
              </div>
              {/* Teléfono - Preguntas */}
              <div className="order-2 flex justify-center">
                <SurveyParticipationTutorialView>
                  {/* Pantalla 3: Segunda pregunta mejorada */}
                  <div className="app-screen active">
                    <div className="bg-gradient-to-r from-[#0b5dae] via-[#184998] to-[#0f3379] p-3">
                      <div className="flex flex-col items-start justify-between text-white">
                        <h3 className="flex items-center gap-2 font-bold">
                          Nombre de la Consulta
                        </h3>
                        <p className="text-xs">Termina: 15/09/2025</p>
                      </div>
                    </div>
                    <div className="p-3">
                      {/* Progress Bar */}
                      <div className="mt-2.5 mb-4 flex h-2 gap-1">
                        <div className="h-full w-full rounded-xs bg-blue-400 transition-all duration-500" />
                        <div className="h-full w-full rounded-xs bg-gray-200 transition-all duration-500" />
                        <div className="h-full w-full rounded-xs bg-gray-200 transition-all duration-500" />
                      </div>
                      <div className="question mb-2">
                        <p className="text-lg font-bold text-[#23396f]">
                          Selecciona tu Sector
                        </p>
                      </div>

                      <div className="mb-2 space-y-2">
                        <div className="relative flex cursor-pointer flex-col rounded-lg border border-[#0F69C4] bg-[#f2f6fe] px-4 py-3 shadow-md select-none">
                          <div className="absolute top-[50%] right-4 flex size-6 translate-y-[-50%] items-center justify-center rounded-full border-2 border-[#0F69C4] text-[#0F69C4]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          <div className="flex items-center gap-2 text-slate-600">
                            <input
                              type="radio"
                              defaultChecked={true}
                              className="size-4 cursor-pointer accent-[#0F69C4]"
                            />
                            <h5 className="text-sm font-medium">Opción 1</h5>
                          </div>
                        </div>

                        <div className="relative flex cursor-pointer flex-col rounded-lg border border-gray-200/90 bg-gray-200/30 px-4 py-3 select-none">
                          <div className="flex items-center gap-2 text-slate-600">
                            <input
                              type="radio"
                              className="size-4 cursor-pointer accent-[#0F69C4]"
                            />
                            <h5 className="text-sm font-medium">Opción 2</h5>
                          </div>
                        </div>

                        <div className="relative flex cursor-pointer flex-col rounded-lg border border-gray-200/90 bg-gray-200/30 px-4 py-3 select-none">
                          <div className="flex items-center gap-2 text-slate-600">
                            <input
                              type="radio"
                              className="size-4 cursor-pointer accent-[#0F69C4]"
                            />
                            <h5 className="text-sm font-medium">Opción 3</h5>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
                        <Image
                          src="/map.png"
                          alt="Mapa de sectores"
                          width={400}
                          height={300}
                        />
                      </div>
                    </div>
                  </div>
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>

          {/* View 4 - Sub preguntas */}
          <section
            data-step="preguntas"
            className="flex min-h-[105svh] w-full bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452]"
          >
            <div className="container mx-auto flex max-w-[80rem] grid-cols-1 flex-col items-center justify-center gap-10 px-6 lg:grid lg:grid-cols-2 lg:gap-16">
              {/* Panel descriptivo - Sub preguntas */}
              <div className="order-1 lg:order-2">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-400/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      4
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="text-2xl font-bold text-[#0e4194]">
                        Preguntas - En General
                      </h2>
                    </div>
                  </div>

                  {/* Cuerpo con descripción e ítems con íconos */}
                  <div className="px-5 py-4">
                    <p className="max-w-xl text-gray-700">
                      Las preguntas pueden requerir 1 o más respuestas, fijate
                      bien antes de continuar con la siguiente pregunta.
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <svg
                          className="size-4 text-[#0e4194]"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Algunas opciones pueden tener sub-opciones.
                      </li>
                    </ul>

                    {/* Callout que conecta con el placeholder */}
                    <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#0e4194] ring-1 ring-blue-200">
                      <span className="font-semibold">Tip: </span> El botón de
                      <span className="font-semibold"> Continuar</span> solo
                      estará habilitado si marcas la cantidad requerida de
                      respuestas.
                    </div>
                  </div>
                </div>
              </div>
              {/* Teléfono - Preguntas */}
              <div className="order-2 flex justify-center lg:order-1">
                <SurveyParticipationTutorialView>
                  {/* Pantalla 4: Tercera pregunta mejorada */}
                  <div className="app-screen active">
                    <div className="bg-gradient-to-r from-[#0b5dae] via-[#184998] to-[#0f3379] p-3 text-white">
                      <div className="flex flex-col items-start justify-between">
                        <h3 className="flex items-center gap-2 font-bold">
                          Nombre de la Consulta
                        </h3>
                        <p className="text-xs">Termina: 15/09/2025</p>
                      </div>
                    </div>
                    <div className="p-3">
                      {/* Progress Bar */}
                      <div className="mt-2.5 mb-4 flex h-2 gap-1">
                        <div className="h-full w-full rounded-xs bg-blue-400 transition-all duration-500" />
                        <div className="h-full w-full rounded-xs bg-blue-400 transition-all duration-500" />
                        <div className="h-full w-full rounded-xs bg-gray-200 transition-all duration-500" />
                      </div>
                      <div className="question mb-2">
                        <p className="text-lg font-bold text-[#23396f]">
                          ¿Qué opción te gusta más?
                        </p>
                      </div>

                      <div className="mb-2 space-y-2">
                        <div className="relative flex cursor-pointer flex-col rounded-lg border border-[#0F69C4] bg-[#f2f6fe] px-4 py-3 shadow-md select-none">
                          <div className="absolute top-[50%] right-4 flex size-6 translate-y-[-50%] items-center justify-center rounded-full border-2 border-[#0F69C4] text-[#0F69C4]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>

                          <div className="flex items-center gap-2 text-slate-600">
                            <input
                              type="radio"
                              defaultChecked={true}
                              className="size-4 cursor-pointer accent-[#0F69C4]"
                            />
                            <h5 className="text-sm font-medium">Opción 1</h5>
                          </div>
                        </div>

                        <div className="relative flex cursor-pointer flex-col rounded-lg border border-gray-200/90 bg-gray-200/30 px-4 py-3 select-none">
                          <div className="flex items-center gap-2 text-slate-600">
                            <input
                              type="radio"
                              className="size-4 cursor-pointer accent-[#0F69C4]"
                            />
                            <h5 className="text-sm font-medium">Opción 2</h5>
                          </div>
                        </div>

                        <div className="relative flex cursor-pointer flex-col rounded-lg border border-gray-200/90 bg-gray-200/30 px-4 py-3 select-none">
                          <div className="flex items-center gap-2 text-slate-600">
                            <input
                              type="radio"
                              className="size-4 cursor-pointer accent-[#0F69C4]"
                            />
                            <h5 className="text-sm font-medium">Opción 3</h5>
                          </div>
                        </div>

                        <div className="relative flex cursor-pointer flex-col rounded-lg border border-gray-200/90 bg-gray-200/30 px-4 py-3 select-none">
                          <div className="flex items-center gap-2 text-slate-600">
                            <input
                              type="radio"
                              className="size-4 cursor-pointer accent-[#0F69C4]"
                            />
                            <h5 className="text-sm font-medium">Opción 4</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>

          {/* View 5 - Confirmación */}
          <section
            data-step="confirmacion"
            className="flex min-h-[105svh] w-full"
          >
            <div className="container mx-auto flex max-w-[80rem] grid-cols-1 flex-col items-center justify-center gap-10 px-6 lg:grid lg:grid-cols-2 lg:gap-16">
              {/* Panel descriptivo - Confirmación */}
              <div className="order-1">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-400/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      5
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="text-2xl font-bold text-[#0e4194]">
                        Confirmación
                      </h2>
                    </div>
                  </div>

                  {/* Cuerpo con descripción e ítems con íconos */}
                  <div className="px-5 py-4">
                    <p className="max-w-xl text-gray-700">
                      Último paso antes de guardar tu voto, debes verificar que
                      has marcado las opciones que consideras correctas.
                    </p>

                    {/* Callout que conecta con el placeholder */}
                    <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#0e4194] ring-1 ring-blue-200">
                      <span className="font-semibold">Tip: </span> El botón de
                      <span className="font-semibold"> Continuar</span> solo
                      estará habilitado si marcas la cantidad requerida de
                      respuestas.
                    </div>
                  </div>
                </div>
              </div>
              {/* Teléfono - Preguntas */}
              <div className="order-2 flex justify-center">
                <SurveyParticipationTutorialView>
                  {/* Pantalla 5: Agradecimiento mejorado */}
                  <div className="app-screen active">
                    <div className="bg-gradient-to-r from-[#0b5dae] via-[#184998] to-[#0f3379] p-3 text-white">
                      <div className="flex flex-col items-start justify-between">
                        <h3 className="flex items-center gap-2 font-bold">
                          Nombre de la Consulta
                        </h3>
                        <p className="text-xs">Termina: 15/09/2025</p>
                      </div>
                    </div>

                    <div className="p-3">
                      {/* Progress Bar */}
                      <div className="mt-2.5 mb-4 flex h-2 gap-1">
                        <div className="h-full w-full rounded-xs bg-blue-400 transition-all duration-500" />
                        <div className="h-full w-full rounded-xs bg-blue-400 transition-all duration-500" />
                        <div className="h-full w-full rounded-xs bg-blue-400 transition-all duration-500" />
                      </div>

                      <div className="relative mb-2 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-4 text-white shadow-xl">
                        <div className="absolute inset-0 rounded-2xl bg-black/10"></div>
                        <div className="relative z-10">
                          <h2 className="text-center text-xl font-bold">
                            Confirma tu Voto
                          </h2>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2 text-center">
                        {/* Sector seleccionado */}
                        <div className="group relative w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/70 p-3 shadow-lg transition-all duration-300 hover:shadow-xl">
                          <div className="relative z-10">
                            <div className="mb-2 flex items-center gap-2.5">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div className="text-left">
                                <h3 className="-mb-1 font-bold text-slate-800">
                                  Sector de Votación
                                </h3>
                                <p className="text-xs text-slate-600">
                                  Sector seleccionado
                                </p>
                              </div>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
                              <div className="flex items-center">
                                <div className="rounded-l-xls flex h-14 w-11 flex-shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-lg">
                                  1
                                </div>
                                <div className="ml-2.5 text-left">
                                  <h4 className="font-semibold text-slate-800">
                                    Mi Sector
                                  </h4>
                                  <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-1 rounded-lg">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="size-4 text-slate-600"
                                      >
                                        <path
                                          stroke="none"
                                          d="M0 0h24v24H0z"
                                          fill="none"
                                        />
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                      </svg>
                                      <span className="text-xs font-medium text-slate-600">
                                        2000 hab.
                                      </span>
                                    </div>
                                    <div className="py-0.5s flex items-center gap-1 rounded-lg">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="size-4 text-slate-600"
                                      >
                                        <path
                                          stroke="none"
                                          d="M0 0h24v24H0z"
                                          fill="none"
                                        />
                                        <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
                                        <path d="M9 4v13" />
                                        <path d="M15 7v13" />
                                      </svg>
                                      <span className="text-xs font-medium text-slate-600">
                                        10.0 km²
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Opcion seleccionada */}
                        <div className="group relative w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/70 p-3 shadow-lg transition-all duration-300 hover:shadow-xl">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                          <div className="relative z-10">
                            <div className="mb-2 flex items-center gap-2.5">
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                              </div>
                              <div className="text-left">
                                <h3 className="-mb-1 font-bold text-slate-800">
                                  Pregunta 1
                                </h3>
                                <p className="text-xs text-slate-600">
                                  Tus opciones seleccionadas
                                </p>
                              </div>
                            </div>

                            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
                              <div className="flex items-center">
                                <div className="rounded-l-xls flex h-14 w-11 flex-shrink-0 items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 font-bold text-white shadow-lg">
                                  1
                                </div>
                                <div className="ml-2.5 text-left">
                                  <h4 className="font-semibold text-slate-800">
                                    Opción 1
                                  </h4>
                                  <p className="text-xs text-slate-600">
                                    Esta es la opción seleccionada.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Boton de enviar voto */}
                        <button className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-3 text-white shadow-lg">
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:!opacity-0" />
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <span className="z-10 font-semibold">
                              Enviar Voto
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>

          {/* View 6 - Fin */}
          <section
            data-step="fin"
            className="flex min-h-[105svh] w-full bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452]"
          >
            <div className="container mx-auto flex flex-col items-center justify-center px-4">
              <h3 className="text-center text-4xl font-bold text-white">
                ¡Gracias por Participar!
              </h3>
              {/* Teléfono - Fin */}
              <div className="order-1 flex justify-center py-16 lg:order-2">
                <SurveyParticipationTutorialView>
                  {/* Pantalla 5: Agradecimiento mejorado */}
                  <div className="app-screen active">
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <div className="emoji mb-4 animate-pulse text-5xl">
                        🎉
                      </div>
                      <h3 className="mb-3 text-lg font-bold text-emerald-600">
                        ¡Gracias!
                      </h3>
                      <p className="mb-2 text-sm text-gray-700">
                        Tu opinión fue registrada
                      </p>
                      {/* <p className="mb-6 text-xs text-gray-500">
                        Juntos transformamos El Quisco
                      </p> */}
                      <p className="mb-6 text-xs text-gray-500">
                        Juntos traeremos más gatitos al Quisco
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
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section data-step="footer">
        <Footer />
      </section>
    </div>
  );
}

type Props = {
  children: React.ReactNode;
};

function SurveyParticipationTutorialView({ children }: Props) {
  return (
    <div className="relative w-fit">
      <div className="absolute inset-0 scale-100 rounded-3xl bg-gradient-to-br from-slate-700/10 to-gray-700/10 blur-xl xl:scale-120" />
      <div className="relative z-10 w-80 drop-shadow-2xl transition-transform duration-1000">
        {/* Phone container */}
        <div className="phone-container">
          <div className="phone">
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
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
