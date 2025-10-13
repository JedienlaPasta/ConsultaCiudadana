"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import ClaveUnicaBtn from "./ClaveUnicaBtn";
import Image from "next/image";
import { JwtPayload } from "jsonwebtoken";

type NavbarProps = {
  session: JwtPayload | null;
};

export default function Navbar({ session }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isLoggedIn = session !== null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleContactBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("contact-info");
    if (element) {
      // Agregar clase de destacado antes del scroll
      element.classList.add("contact-highlight");

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Remover la clase después de la animación (3 segundos)
      setTimeout(() => {
        element.classList.remove("contact-highlight");
      }, 3000);
    }
  };

  return (
    <div
      className={`fixed top-0 left-[50%] z-1050 mx-auto w-[calc(100%+1px)] -translate-x-[50%] transition-all duration-300 ${hasScrolled ? "bg-[#0e4194] shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto max-w-[80rem]">
        <nav className="flex items-center justify-between px-4 py-3 md:px-8">
          <Link
            className="flex items-center gap-2.5 text-xl font-bold text-white outline-4 outline-[#0f69c4] transition-colors outline-none focus-visible:outline-solid"
            href="/"
          >
            <Image
              src="/logos/2.png"
              alt="logo"
              width={50}
              height={50}
              className="size-10"
            />
            <span>
              Participa
              <p className="-mt-0.5 text-xs font-light">El Quisco</p>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="block rounded p-2 text-white hover:bg-[#06315c] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <ul className="!ml-0 hidden !list-none items-center space-x-2 md:flex lg:space-x-5">
            <li>
              <Link
                href="/"
                className="flex min-h-11 items-center rounded-sm px-4 text-white transition-colors hover:bg-[#0f69c4]"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/consultas"
                className="flex min-h-11 items-center rounded-sm px-4 text-white transition-colors hover:bg-[#0f69c4]"
              >
                Consultas
              </Link>
            </li>
            <li>
              <button
                onClick={handleContactBtn}
                className="flex min-h-11 cursor-pointer items-center rounded-sm px-4 text-white transition-colors hover:bg-[#0f69c4]"
              >
                Contacto
              </button>
            </li>
            <li className="max-[950px]:hidden">
              <Link
                href="/como-participar"
                id="gestion-link"
                className="flex min-h-11 items-center rounded-sm px-4 text-white transition-colors hover:bg-[#0f69c4]"
              >
                Cómo Participar
              </Link>
            </li>
            <li className="max-[850px]:hidden">
              {["administrador", "encuestador"].includes(session?.role ?? "") && (
                <Link
                  href="/dashboard"
                  className="block w-full text-white transition-colors hover:bg-[#0540a6]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center px-6 py-4">
                    <span className="text-sm font-medium">Dashboard</span>
                  </div>
                </Link>
              )}
            </li>
            <li>
              <ClaveUnicaBtn isLoggedIn={isLoggedIn} />
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile menu - moved outside container for better positioning */}
      <div
        className={`absolute top-full left-0 w-full overflow-hidden bg-[#05223f] shadow-lg transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? "h-fit" : "max-h-0"}`}
      >
        <ul className="!ml-0 flex !list-none flex-col divide-y divide-[#0A4581]/30">
          <li>
            <Link
              href="/dashboard"
              className="block w-full text-white transition-colors hover:bg-[#0540a6]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/como-participar"
              className="block w-full text-white transition-colors hover:bg-[#0540a6]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">Cómo Participar</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/consultas"
              className="block w-full text-white transition-colors hover:bg-[#0540a6]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">Consultas</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/#"
              className="block w-full text-white transition-colors hover:bg-[#0540a6]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">Resultados</span>
              </div>
            </Link>
          </li>
          <li>
            <button
              onClick={(e) => {
                handleContactBtn(e);
                setIsMenuOpen(false);
              }}
              className="block w-full cursor-pointer text-white transition-colors hover:bg-[#0540a6]"
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">Contacto</span>
              </div>
            </button>
          </li>
          <li className="p-4">
            <ClaveUnicaBtn isLoggedIn={isLoggedIn} />
          </li>
        </ul>
      </div>
    </div>
  );
}
