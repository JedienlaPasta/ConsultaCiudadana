"use client";
import Image from "next/image";
import Link from "next/link";
import elquiscoImg from "@/public/elquisco.svg";
import punteroImg from "@/public/puntero.svg";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t-36 border-slate-900 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      {/* Floating orbs for visual interest */}
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-blue-500/10 blur-xl"></div>
      <div className="absolute right-20 bottom-20 h-24 w-24 rounded-full bg-indigo-500/10 blur-xl"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto max-w-[80rem] px-4 pt-7 pb-12 md:px-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:grid-cols-4">
          {/* Column 1: Logo and Info */}
          <div className="flex flex-col space-y-4 p-1">
            <Link
              href={"https://www.elquisco.cl/"}
              target="_blank"
              className="group flex items-center justify-center gap-3 rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-gray-800/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/15"
            >
              <div className="hfit flex w-fit flex-shrink-0 items-center justify-center shadow-lg">
                <Image
                  width={24}
                  loading="lazy"
                  alt="El Quisco logo"
                  src={elquiscoImg}
                  className="brightness-0s inverts object-contain filter"
                />
              </div>
              <div className="flex flex-col text-sm leading-tight font-black">
                <p className="tracking-wide text-blue-500">MUNICIPALIDAD</p>
                <p className="-mt-1 text-slate-200">EL QUISCO</p>
              </div>
            </Link>

            <Link
              href={"https://elquisco.cerofilas.gob.cl/"}
              target="_blank"
              className="group flex cursor-pointer flex-col items-center rounded-xl border border-slate-700/40 bg-gradient-to-br from-slate-800/40 to-gray-800/20 p-4 pb-5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <p className="mb-1 text-sm font-bold tracking-wider text-slate-300 transition-colors group-hover:text-blue-400">
                CONTÁCTANOS
              </p>
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 to-slate-800 shadow-sm">
                  <Image
                    width={26}
                    height={26}
                    loading="lazy"
                    alt="Logo OIRS"
                    src={punteroImg}
                    className="object-contain filter"
                  />
                </div>
                <span className="flex flex-col text-sm font-black tracking-wide text-slate-200 transition-colors group-hover:text-slate-50">
                  <p>OIRS</p>
                  <p className="-mt-1">ONLINE</p>
                </span>
              </div>
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 p-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-500"></div>
              <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-lg font-bold text-transparent">
                Enlaces Rápidos
              </h2>
            </div>
            <ul className="!ml-0 !list-none space-y-3 text-sm">
              <li>
                <Link
                  href="/privacidad"
                  className="group flex items-center gap-2 rounded-lg p-2 pl-3 transition-all duration-200 hover:translate-x-1 hover:bg-slate-800/50"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <span className="text-gray-400 transition-colors group-hover:text-blue-400">
                    Privacidad
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/consultas"
                  className="group flex items-center gap-2 rounded-lg p-2 pl-3 transition-all duration-200 hover:translate-x-1 hover:bg-slate-800/50"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <span className="text-gray-400 transition-colors group-hover:text-blue-400">
                    Consultas
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://claveunica.gob.cl/"
                  target="_blank"
                  className="group flex items-center gap-2 rounded-lg p-2 pl-3 transition-all duration-200 hover:translate-x-1 hover:bg-slate-800/50"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <span className="text-gray-400 transition-colors group-hover:text-blue-400">
                    ClaveÚnica
                  </span>
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/preguntas"
                  className="group flex items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:translate-x-1 hover:bg-slate-800/50"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <span className="text-gray-400 transition-colors group-hover:text-blue-400">
                    Preguntas Frecuentes
                  </span>
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div id="contact-info" className="space-y-4 rounded-lg p-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-500"></div>
              <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-lg font-bold text-transparent">
                Contacto
              </h2>
            </div>
            <div className="space-y-4">
              <Link
                href={"https://maps.app.goo.gl/D8pJ2jgAmzqFV8VZ8"}
                target="_blank"
                className="flex items-center gap-3 rounded-lg border border-slate-700/30 bg-slate-800/30 p-3"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-600/20">
                  <svg
                    className="h-4 w-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Av. Francia 011, El Quisco
                  </p>
                  <p className="text-xs text-slate-400">
                    Región de Valparaíso, Chile
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-3 rounded-lg border border-slate-700/30 bg-slate-800/30 p-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-600/20">
                  <svg
                    className="h-4 w-4 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-300">
                  +56 35 2 456 100
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-4 p-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-500"></div>
              <h2 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-lg font-bold text-transparent">
                Síguenos
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/MuniDeElQuisco"
                target="_blank"
                title="Síguenos en Facebook"
                className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-gray-800/30 transition-all duration-300 hover:scale-110 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <svg
                  className="h-5 w-5 text-gray-400 transition-colors group-hover:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              {/* Twitter/X */}
              <Link
                href="https://x.com/elquiscomuni"
                target="_blank"
                title="Síguenos en X"
                className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-gray-800/30 transition-all duration-300 hover:scale-110 hover:border-slate-400/50 hover:shadow-lg hover:shadow-slate-500/20"
              >
                <svg
                  className="h-4 w-4 text-gray-400 transition-colors group-hover:text-slate-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/munielquisco"
                target="_blank"
                title="Síguenos en Instagram"
                className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-gray-800/30 transition-all duration-300 hover:scale-110 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20"
              >
                <svg
                  className="h-5 w-5 text-gray-400 transition-colors group-hover:text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="relative border-t border-slate-700/50 bg-gradient-to-r from-slate-900/80 via-gray-900/80 to-slate-900/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5"></div>
        <div className="relative z-10 container mx-auto max-w-[80rem] px-4 py-6 md:px-8">
          <div className="flex flex-col items-center justify-center md:flex-row">
            <p className="text-sm font-medium text-slate-400">
              © 2025 Municipalidad de El Quisco. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
