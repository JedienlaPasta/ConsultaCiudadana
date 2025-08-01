"use client";
import Image from "next/image";
import Link from "next/link";
import elquiscoImg from "@/public/elquisco.svg";
import punteroImg from "@/public/puntero.svg";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#1F2937]">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-[80rem] px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Column 1: Logo and Info */}
          <div className="flex flex-col space-y-5">
            <div className="mt-1.5 flex items-center gap-2">
              <Image
                width={20}
                loading="lazy"
                alt="El Quisco logo"
                src={elquiscoImg}
                className="object-contain"
              />
              <div className="flex flex-col text-sm leading-tight font-black text-slate-200">
                <p className="text-blue-500">MUNICIPALIDAD</p>
                <p className="-mt-1">EL QUISCO</p>
              </div>
            </div>
            <Link
              href={"https://elquisco.cerofilas.gob.cl/"}
              target="_blank"
              className="flex w-30 cursor-pointer flex-col items-center text-slate-200 hover:text-slate-50"
            >
              <p className="text-sm font-medium tracking-wider">CONTÁCTANOS</p>
              <div className="-mt-1 flex gap-1">
                <Image
                  width={26}
                  height={26}
                  loading="lazy"
                  alt="Logo OIRS"
                  src={punteroImg}
                  className="object-contain"
                />
                <span className="relative flex flex-col text-sm font-black tracking-wide">
                  <p className="mt-">OIRS</p>
                  <p className="-mt-2">ONLINE</p>
                </span>
              </div>
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Enlaces Rápidos
            </h3>
            <ul className="!ml-0 !list-none space-y-1.5 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-blue-400"
                >
                  Participa
                </Link>
              </li>
              <li>
                <Link
                  href="/piimep"
                  className="transition-colors hover:text-blue-400"
                >
                  Consultas
                </Link>
              </li>
              <li>
                <Link
                  href="/preguntas"
                  className="transition-colors hover:text-blue-400"
                >
                  Resultados
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="transition-colors hover:text-blue-400"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Consultas */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Contacto</h3>
            <div className="space-y-1.5 text-sm text-gray-400">
              <p className="text-sm text-gray-400">
                Av. Francia 011, El Quisco
                <br />
                Región de Valparaíso, Chile
              </p>
              <p className="text-sm text-gray-400">
                Teléfono: +56 35 2 456 100
              </p>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Síguenos</h3>
            <div className="flex items-center space-x-4">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/MuniDeElQuisco"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-blue-500"
              >
                <svg
                  className="h-6 w-6"
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
                className="text-gray-400 transition-colors hover:text-slate-50"
              >
                <svg
                  className="size-5.5"
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
                className="text-gray-400 transition-colors hover:text-pink-500"
              >
                <svg
                  className="size-6"
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
      <div className="border-t border-gray-700 bg-[#1a232e]">
        <div className="container mx-auto max-w-[80rem] px-4 py-4 md:px-8">
          <div className="flex flex-col items-center justify-center md:flex-row">
            <p className="text-sm text-gray-400">
              © 2025 Municipalidad de El Quisco. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
