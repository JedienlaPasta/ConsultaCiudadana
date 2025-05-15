"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { roboto } from "./fonts";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

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

  // <div className="bg-[#002F4C]s sticky top-0 z-50 bg-[#5877F2]"></div>

  return (
    <div
      className={`sticky top-5 z-50 container mx-auto rounded-xl transition-all duration-300 ${hasScrolled ? "bg-[#0A4581]/80 shadow-md backdrop-blur-2xl" : "bg-transparent"}`}
    >
      <div className="container mx-auto max-w-[80rem]">
        <nav className="flex items-center justify-between px-4 py-2 md:px-8">
          <Link
            className="text-xl font-bold text-white transition-colors hover:text-white"
            href="/"
          >
            Participa
          </Link>

          {/* Mobile menu button */}
          <button
            className="block rounded p-2 text-white hover:bg-slate-800 md:hidden"
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
          <ul className="hidden items-center space-x-5 md:flex">
            <li>
              <Link
                href="/consultas"
                className="flex min-h-11 items-center rounded-sm px-4 text-white transition-colors hover:bg-[#0B4E91]"
              >
                Consultas
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="flex min-h-11 items-center rounded-sm px-4 text-white transition-colors hover:bg-[#0B4E91]"
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href="/preguntas"
                className="flex min-h-11 items-center rounded-sm px-4 text-white transition-colors hover:bg-[#0B4E91]"
              >
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link
                className="flex min-h-11 w-fit items-center justify-center gap-0.5 rounded-sm bg-[#0F69C4] py-[8px] pr-5 pl-4 text-center text-[#fff] transition-all select-none hover:bg-[#2275C9] hover:underline"
                href="#"
                aria-label="Iniciar sesión con ClaveÚnica"
              >
                <Image
                  src="/cu-blanco.svg"
                  width={24}
                  height={24}
                  aria-hidden="true"
                  alt="Iniciar sesión con ClaveÚnica"
                />
                <span className={`${roboto.className} `} aria-hidden="true">
                  Iniciar sesión
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile menu - moved outside container for better positioning */}
      {isMenuOpen && (
        <div className="absolute w-full border-t border-slate-700 bg-slate-900 md:hidden">
          <ul className="flex flex-col">
            <li>
              <Link
                href="/consultas"
                className="block text-white transition-colors hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="container mx-auto px-4 py-4">Consultas</p>
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="block text-white transition-colors hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="container mx-auto px-4 py-4">Contacto</p>
              </Link>
            </li>
            <li>
              <Link
                href="/preguntas"
                className="block text-white transition-colors hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="container mx-auto px-4 py-4">
                  Preguntas frecuentes
                </p>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
