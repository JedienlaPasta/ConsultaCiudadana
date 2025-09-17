import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";

export default async function PrivacyPage() {
  const session = await getSession();

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Navbar isLoggedIn={session !== null} />
      <Header />
      <div className="container mx-auto max-w-[85rem] px-4 py-8 md:px-8 md:py-16">
        <div className="space-y-8">
          {/* Introducción */}
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Protección de Datos Garantizada
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Política de Privacidad y Uso de Datos
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              La Municipalidad de El Quisco, en cumplimiento de la Ley N° 19.628
              sobre protección de la vida privada y normativa relacionada,
              informa a las y los usuarios de la plataforma Participa —
              Consultas Ciudadanas El Quisco lo siguiente:
            </p>
          </div>

          {/* Grid de secciones */}
          <div className="grid gap-8 md:gap-10">
            {/* Responsable del tratamiento */}
            <PrivacySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0H5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5"
                  />
                </svg>
              }
              title="Responsable del Tratamiento"
              number="01"
            >
              <p className="mb-4 text-gray-700">
                La Municipalidad de El Quisco es responsable de la recopilación
                y resguardo de los datos personales tratados en esta plataforma.
              </p>
              <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Dirección</p>
                      <p className="text-gray-700">
                        Av. Francia 011, El Quisco, Valparaíso, Chile
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Teléfono</p>
                      <p className="text-gray-700">+56 35 2 456 100</p>
                    </div>
                  </div>
                </div>
              </div>
            </PrivacySection>

            {/* Datos que recopilamos */}
            <PrivacySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              title="Datos Personales que Recopilamos"
              number="02"
            >
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Únicamente datos esenciales
                    </h4>
                    <p className="text-gray-700">
                      <strong className="text-gray-800">
                        RUT y Dígito Verificador:
                      </strong>{" "}
                      obtenidos a través de la autenticación con ClaveÚnica, son
                      necesarios para asegurar que cada persona pueda participar
                      una única vez en cada consulta.
                    </p>
                    <p className="text-gray-700">
                      <strong className="text-gray-800">
                        Registro de participación:
                      </strong>{" "}
                      si bien queda almacenada tu participación en cada
                      consulta, no se registra de forma que pueda vincularse a
                      tu voto, este sigue siendo totalmente anónimo.
                    </p>
                  </div>
                </div>
              </div>
            </PrivacySection>

            {/* Finalidad del tratamiento */}
            <PrivacySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              }
              title="Finalidad del Tratamiento"
              number="03"
            >
              <p className="mb-6 text-gray-700">
                Los datos personales se utilizan únicamente para:
              </p>
              <div className="space-y-4">
                {[
                  "Verificar la identidad de las y los ciudadanos que participan en consultas ciudadanas",
                  "Garantizar que cada persona pueda emitir su opinión una sola vez en cada consulta",
                  "Resguardar la validez y transparencia del proceso de participación",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-semibold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </PrivacySection>

            {/* Datos que NO recopilamos */}
            <PrivacySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              }
              title="Datos que NO Recopilamos"
              number="04"
              variant="negative"
            >
              <div className="space-y-4">
                {[
                  {
                    text: "No se almacenan contraseñas ni credenciales de ClaveÚnica",
                    icon: "🔐",
                  },
                  {
                    text: "No se guardan direcciones IP ni geolocalización",
                    icon: "📍",
                  },
                  {
                    text: "Las respuestas a las consultas son anónimas y no se asocian directamente al RUT del participante",
                    icon: "👤",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border border-red-200 bg-red-50 p-4"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                      <svg
                        className="h-4 w-4 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </PrivacySection>

            {/* Base legal */}
            <PrivacySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              }
              title="Base Legal"
              number="05"
            >
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                <p className="text-gray-700">
                  El tratamiento de datos se fundamenta en el{" "}
                  <strong>interés público</strong> de promover la participación
                  ciudadana y en las disposiciones de la{" "}
                  <strong>Ley N° 18.695</strong> (Orgánica Constitucional de
                  Municipalidades), en conjunto con la{" "}
                  <strong>Ley N° 19.628</strong> sobre protección de la vida
                  privada.
                </p>
              </div>
            </PrivacySection>

            {/* Conservación */}
            <PrivacySection
              icon={
                <svg
                  className="h-6 w-6"
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
              }
              title="Conservación de los Datos"
              number="06"
            >
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                    <svg
                      className="h-6 w-6 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">
                      Tiempo limitado y necesario
                    </h4>
                    <p className="text-gray-700">
                      Los datos personales se almacenan solo por el tiempo
                      estrictamente necesario para la validación de
                      participación en las consultas, y luego se resguardan
                      conforme a las políticas de archivo de la Municipalidad.
                    </p>
                  </div>
                </div>
              </div>
            </PrivacySection>

            {/* Derechos */}
            <PrivacySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
              title="Derechos de las Personas"
              number="07"
            >
              <p className="mb-6 text-gray-700">
                De acuerdo con la Ley N° 19.628, las personas pueden solicitar:
              </p>
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                {[
                  {
                    title: "Acceso",
                    desc: "a sus datos personales",
                    icon: "👁️",
                  },
                  {
                    title: "Rectificación",
                    desc: "de datos erróneos",
                    icon: "✏️",
                  },
                  {
                    title: "Eliminación",
                    desc: "o cancelación de los datos, cuando proceda",
                    icon: "🗑️",
                  },
                  {
                    title: "Oposición",
                    desc: "a su uso para fines distintos a los declarados",
                    icon: "🚫",
                  },
                ].map((right, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{right.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {right.title}
                        </h4>
                        <p className="text-sm text-gray-600">{right.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">
                      ¿Cómo ejercer estos derechos?
                    </h4>
                    <p className="mb-3 text-gray-700">
                      Para ejercer estos derechos, las solicitudes deben
                      dirigirse a la Municipalidad de El Quisco, mediante la
                      Oficina de Partes o el canal de contacto en el sitio web
                      oficial:
                    </p>
                    <a
                      href="https://www.elquisco.cl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-800"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a 1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      www.elquisco.cl
                    </a>
                  </div>
                </div>
              </div>
            </PrivacySection>

            {/* Seguridad */}
            <PrivacySection
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              title="Seguridad"
              number="08"
            >
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-900">
                      Protección garantizada
                    </h4>
                    <p className="text-gray-700">
                      Se adoptan medidas técnicas y organizativas adecuadas para
                      proteger los datos contra pérdida, mal uso, acceso no
                      autorizado o divulgación.
                    </p>
                  </div>
                </div>
              </div>
            </PrivacySection>
          </div>

          {/* Footer de la página */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 text-gray-500">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Última actualización: {new Date().toLocaleDateString("es-CL")}
              </div>
              <p className="mx-auto max-w-2xl text-sm text-gray-600">
                Esta política de privacidad puede ser actualizada
                periódicamente. Te recomendamos revisarla regularmente para
                mantenerte informado sobre cómo protegemos tu información.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452] text-white">
      {/* Navbar placeholder */}
      <div className="h-[72px]"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-blue-400/10 blur-xl"></div>
        <div className="absolute top-20 right-20 h-48 w-48 rounded-full bg-indigo-400/10 blur-2xl"></div>
        <div className="absolute bottom-10 left-1/3 h-24 w-24 rounded-full bg-blue-300/10 blur-lg"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-[#0e4194]/20 to-[#0b1934]/30" />

      <div className="relative z-10 container mx-auto max-w-[85rem] px-4 pt-8 pb-16 md:px-8 md:pt-12 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Ley N° 19.628 - Protección de Datos
          </div>
          <h1 className="mb-6 text-3xl leading-tight font-bold md:text-5xl">
            Aviso de Privacidad
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-blue-100 md:text-xl">
            Participa — Consultas Ciudadanas El Quisco
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Transparente
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Seguro
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                />
              </svg>
              Conforme a la ley
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PrivacySectionProps {
  icon: React.ReactNode;
  title: string;
  number: string;
  children: React.ReactNode;
  variant?: "default" | "negative";
}

function PrivacySection({
  icon,
  title,
  number,
  children,
  variant = "default",
}: PrivacySectionProps) {
  const borderColor =
    variant === "negative" ? "border-red-200" : "border-gray-200";
  const bgColor = variant === "negative" ? "bg-red-50/50" : "bg-white";

  return (
    <div
      className={`${bgColor} ${borderColor} group overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg`}
    >
      <div className="p-8 md:p-10">
        <div className="mb-6 flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transition-transform group-hover:scale-105">
              {icon}
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">
                {number}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              {title}
            </h2>
          </div>
        </div>
        <div className="prose prose-lg max-w-none">{children}</div>
      </div>
    </div>
  );
}
