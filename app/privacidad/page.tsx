import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";

export default async function PrivacyPage() {
  const session = await getSession();

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar isLoggedIn={session !== null} />
      <Header />
      <div className="container mx-auto max-w-[80rem] flex-1 px-4 pt-8 pb-12 md:px-8 md:pt-12">
        <div className="prose prose-lg max-w-none">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <section className="mb-8">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-[#23396f]">
                1. Responsable del tratamiento
              </h2>
              <p className="mb-3 leading-relaxed text-gray-700">
                La Municipalidad de El Quisco es responsable de la recopilación
                y resguardo de los datos personales tratados en esta plataforma.
              </p>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="mb-2 text-gray-700">
                  <strong>Contacto:</strong> Av. Francia 011, El Quisco,
                  Valparaíso, Chile.
                </p>
                <p className="text-gray-700">
                  <strong>Teléfono:</strong> +56 35 2 456 100.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-[#23396f]">
                2. Datos personales que recopilamos
              </h2>
              <p className="leading-relaxed text-gray-700">
                RUT y Dígito Verificador obtenidos a través de la autenticación
                con ClaveÚnica.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-[#23396f]">
                3. Finalidad del tratamiento
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Los datos personales se utilizan únicamente para:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>
                  Verificar la identidad de las y los ciudadanos que participan
                  en consultas ciudadanas.
                </li>
                <li>
                  Garantizar que cada persona pueda emitir su opinión una sola
                  vez en cada consulta.
                </li>
                <li>
                  Resguardar la validez y transparencia del proceso de
                  participación.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-[#23396f]">
                4. Datos que no recopilamos
              </h2>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>
                  No se almacenan contraseñas ni credenciales de ClaveÚnica.
                </li>
                <li>No se guardan direcciones IP ni geolocalización.</li>
                <li>
                  Las respuestas a las consultas son anónimas y no se asocian
                  directamente al RUT del participante.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-[#23396f]">
                5. Base legal
              </h2>
              <p className="leading-relaxed text-gray-700">
                El tratamiento de datos se fundamenta en el interés público de
                promover la participación ciudadana y en las disposiciones de la
                Ley N° 18.695 (Orgánica Constitucional de Municipalidades), en
                conjunto con la Ley N° 19.628 sobre protección de la vida
                privada.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-[#23396f]">
                6. Conservación de los datos
              </h2>
              <p className="leading-relaxed text-gray-700">
                Los datos personales se almacenan solo por el tiempo
                estrictamente necesario para la validación de participación en
                las consultas, y luego se resguardan conforme a las políticas de
                archivo de la Municipalidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-[#23396f]">
                7. Derechos de las personas
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                De acuerdo con la Ley N° 19.628, las personas pueden solicitar:
              </p>
              <ul className="mb-4 ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>Acceso a sus datos personales.</li>
                <li>Rectificación de datos erróneos.</li>
                <li>Eliminación o cancelación de los datos, cuando proceda.</li>
                <li>
                  Oposición a su uso para fines distintos a los declarados.
                </li>
              </ul>
              <div className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="text-gray-700">
                  Para ejercer estos derechos, las solicitudes deben dirigirse a
                  la Municipalidad de El Quisco, mediante la Oficina de Partes o
                  el canal de contacto en el sitio web oficial:
                  <a
                    href="https://www.elquisco.cl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-blue-600 underline hover:text-blue-800"
                  >
                    https://www.elquisco.cl
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-semibold text-[#23396f]">
                8. Seguridad
              </h2>
              <p className="leading-relaxed text-gray-700">
                Se adoptan medidas técnicas y organizativas adecuadas para
                proteger los datos contra pérdida, mal uso, acceso no autorizado
                o divulgación.
              </p>
            </section>

            <div className="mt-12 border-t border-gray-200 pt-6">
              <p className="text-center text-sm text-gray-500">
                Última actualización: {new Date().toLocaleDateString("es-CL")}
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
    <div className="relative bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452] text-white">
      {/* Navbar placeholder */}
      <div className="bg-[#0e4194]s h-[72px]"></div>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-blue-800/30 via-[#0e4194]/30 to-[#0b1934]/40" />
      <div className="relative z-10 container mx-auto max-w-[80rem] px-4 pt-3 pb-6 md:px-8 md:pt-5 md:pb-10">
        <h1 className="text-2xl font-bold md:text-3xl">Aviso de Privacidad</h1>
        <div className="flex items-center text-sm">
          <span>Participa El Quisco — Consultas Ciudadanas</span>
        </div>
        {/* <p className="mt-3 max-w-3xl text-blue-100">
          La Municipalidad de El Quisco, en cumplimiento de la Ley N° 19.628
          sobre protección de la vida privada y normativa relacionada, informa a
          las y los usuarios de la plataforma Participa — Consultas Ciudadanas
          El Quisco lo siguiente:
        </p> */}
      </div>
    </div>
  );
}
