import Image from "next/image";
import HowToParticipateHeader from "../ui/como-participar/HowToParticipateHeader";
import Navbar from "../ui/Navbar";
import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";

export default async function ComoParticipar() {
  const session = await getSession();
  return (
    // <div className="container mx-auto max-w-[80rem]">
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Navbar isLoggedIn={session !== null} />
      <HowToParticipateHeader />
      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col">
          {/* View 1 - Inicio */}
          <section className="flex min-h-[105svh] w-full">
            <div className="container mx-auto grid max-w-[80rem] grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
              {/* Panel descriptivo - Inicio */}
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      1
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="text-2xl font-bold text-[#0e4194]">
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
              <div className="order-1 flex justify-center lg:order-2">
                <SurveyParticipationTutorialView>
                  {/* Pantalla 1: Bienvenida mejorada */}
                  <div className="app-screen active">
                    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                      <div className="w-full space-y-3">
                        <div className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl">
                          <span>Quiero Participar</span>
                        </div>
                        <div className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-200 px-4 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-200">
                          <span>Ver resultados</span>
                        </div>
                      </div>

                      {/* Placeholder: Tarjeta de consulta */}
                      <div className="mt-8 flex w-full flex-col justify-center gap-2 text-left">
                        <h2 className="grow text-xl font-bold text-[#23396f]">
                          Últimas Consultas
                        </h2>
                        <div className="w-full max-w-[18rem] overflow-hidden rounded-l-2xl border-r-4 border-slate-200 bg-slate-100 shadow-sm ring-1 ring-slate-200">
                          {/* Header */}
                          <div className="flex flex-col items-start justify-between gap-1 px-4 pt-3">
                            <h3 className="font-bold text-slate-700">
                              Nombre de Consulta
                            </h3>
                            <div
                              className={`inline-flex items-center gap-1.5 rounded-md bg-emerald-200/50 py-1 pr-2.5 pl-2 text-xs font-medium text-emerald-600 backdrop-blur-sm`}
                            >
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
                            <p className="text-left text-xs leading-relaxed text-slate-600">
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
          <section className="flex min-h-[105svh] w-full bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452]">
            <div className="container mx-auto grid max-w-[80rem] grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
              {/* Panel descriptivo - Detalle de consulta */}
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      2
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="text-2xl font-bold text-[#0e4194]">
                        Detalle de la Consulta
                      </h2>
                    </div>
                  </div>

                  {/* Cuerpo con descripción e ítems con íconos */}
                  <div className="px-5 py-4">
                    <p className="max-w-xl text-gray-700">
                      Información detallada sobre la consulta ciudadana,
                      incluyendo el objetivo, las etapas, definiciones y enlaces
                      al material complementario. Para participar debes iniciar
                      sesión con{" "}
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
                        Botón {`"Iniciar sesión"`} para participar en la
                        consulta en caso de no haber iniciado sesión.
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
                        Enlaces {`"Ver documento completo"`} para acceder al
                        material completo relativo a la consulta.
                      </li>
                    </ul>

                    {/* Callout que conecta con el placeholder */}
                    <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#0e4194] ring-1 ring-blue-200">
                      <span className="font-semibold">Tip:</span> No seras
                      redirigido inmediatamente a la encuesta una vez iniciada
                      la sesión, ya que primero debes aceptar los{" "}
                      <span className="font-semibold">
                        términos y condiciones de uso de datos
                      </span>{" "}
                      y luego presionar el botón de
                      <span className="font-semibold"> Ir a votar</span> para
                      iniciar el proceso de consulta.
                    </div>
                  </div>
                </div>
              </div>

              {/* Teléfono - Preguntas */}
              <div className="flex justify-center">
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
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>
          {/* View 3 - Preguntas */}
          <section className="flex min-h-[105svh] w-full">
            <div className="container mx-auto grid max-w-[80rem] grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
              {/* Panel descriptivo - Preguntas */}
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      3
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="text-2xl font-bold text-[#0e4194]">
                        Preguntas
                      </h2>
                    </div>
                  </div>

                  {/* PENDING!! */}
                  {/* Cuerpo con descripción e ítems con íconos */}
                  <div className="px-5 py-4">
                    <p className="max-w-xl text-gray-700">
                      Una vez iniciada la encuesta, te apareceran las preguntas
                      de a una. En algunas hay un mapa interactivo en la que te
                      permite seleccionar tu sector.
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
                        Botón {`"Iniciar sesión"`} para participar en la
                        consulta en caso de no haber iniciado sesión.
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
                        Enlaces {`"Ver documento completo"`} para acceder al
                        material completo relativo a la consulta.
                      </li>
                    </ul>

                    {/* Callout que conecta con el placeholder */}
                    <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#0e4194] ring-1 ring-blue-200">
                      <span className="font-semibold">Tip:</span> No seras
                      redirigido inmediatamente a la encuesta una vez iniciada
                      la sesión, ya que primero debes aceptar los{" "}
                      <span className="font-semibold">
                        términos y condiciones de uso de datos
                      </span>{" "}
                      y luego presionar el botón de
                      <span className="font-semibold"> Ir a votar</span> para
                      iniciar el proceso de consulta.
                    </div>
                  </div>
                </div>
              </div>

              {/* Teléfono - Preguntas */}
              <div className="order-1 flex justify-center lg:order-2">
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
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>
          {/* View 4 - Sub preguntas */}
          <section className="flex min-h-[105svh] w-full bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452]">
            <div className="container mx-auto grid max-w-[80rem] grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
              {/* Panel descriptivo - Sub preguntas */}
              <div className="order-2 lg:order-1">
                <div className="rounded-2xl bg-white shadow-md ring-1 ring-gray-200 backdrop-blur">
                  {/* Encabezado con icono y chip */}
                  <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-lg font-bold text-blue-700 ring-1 ring-blue-200">
                      3
                    </div>
                    <div className="flex flex-col">
                      <span className="ring-1s inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                        Guía
                      </span>
                      <h2 className="text-2xl font-bold text-[#0e4194]">
                        Preguntas
                      </h2>
                    </div>
                  </div>

                  {/* PENDING!! */}
                  {/* Cuerpo con descripción e ítems con íconos */}
                  <div className="px-5 py-4">
                    <p className="max-w-xl text-gray-700">
                      Una vez iniciada la encuesta, te apareceran las preguntas
                      de a una. En algunas hay un mapa interactivo en la que te
                      permite seleccionar tu sector.
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
                        Botón {`"Iniciar sesión"`} para participar en la
                        consulta en caso de no haber iniciado sesión.
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
                        Enlaces {`"Ver documento completo"`} para acceder al
                        material completo relativo a la consulta.
                      </li>
                    </ul>

                    {/* Callout que conecta con el placeholder */}
                    <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-[#0e4194] ring-1 ring-blue-200">
                      <span className="font-semibold">Tip:</span> No seras
                      redirigido inmediatamente a la encuesta una vez iniciada
                      la sesión, ya que primero debes aceptar los{" "}
                      <span className="font-semibold">
                        términos y condiciones de uso de datos
                      </span>{" "}
                      y luego presionar el botón de
                      <span className="font-semibold"> Ir a votar</span> para
                      iniciar el proceso de consulta.
                    </div>
                  </div>
                </div>
              </div>

              {/* Teléfono - Preguntas */}
              <div className="flex justify-center">
                <SurveyParticipationTutorialView>
                  {/* Pantalla 4: Tercera pregunta mejorada */}
                  <div className="app-screen active">
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
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>
          {/* View 5 - Confirmación */}
          <section className="flex min-h-[105svh] w-full">
            <div className="container mx-auto grid max-w-[80rem] grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
              {/* Panel descriptivo - Confirmación */}
              <div className="">
                <h2 className="text-2xl font-semibold text-[#0e4194]">
                  Confirmación
                </h2>
                <p className="mt-2 max-w-xl text-gray-700">
                  Pantalla final de agradecimiento. Refuerza el cierre del
                  proceso y permite volver al inicio.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li> Mensaje de éxito y estado "Completado".</li>
                  <li> Opción para regresar al inicio.</li>
                  <li> Animaciones suaves para dar feedback.</li>
                </ul>
              </div>

              {/* Teléfono - Preguntas */}
              <div className="flex justify-center">
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
                </SurveyParticipationTutorialView>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
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
