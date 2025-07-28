"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import ClaveUnicaBtn from "./ClaveUnicaBtn";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
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

  return (
    <div
      className={`fixed top-0 left-[50%] z-1050 mx-auto w-[calc(100%+1px)] -translate-x-[50%] transition-all duration-300 ${hasScrolled ? "bg-[#0A4581] shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto max-w-[80rem]">
        <nav className="flex items-center justify-between px-4 py-3 md:px-8">
          <Link
            className="text-xl font-bold text-white outline-4 outline-[#0f69c4] transition-colors outline-none focus-visible:outline-solid"
            href="/"
          >
            Participa
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
          <ul className="hidden items-center space-x-2 md:flex lg:space-x-5">
            <li className="max-[850px]:hidden">
              <Link
                href="/dashboard"
                id="gestion-link"
                className="flex min-h-11 items-center rounded-sm px-4 text-white outline-4 outline-[#0f69c4] transition-colors outline-none hover:bg-[#0B4E91] focus:outline-solid"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/consultas"
                className="flex min-h-11 items-center rounded-sm px-4 text-white outline-4 outline-[#0f69c4] transition-colors outline-none hover:bg-[#0B4E91] focus:outline-solid"
              >
                Consultas
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex min-h-11 items-center rounded-sm px-4 text-white outline-4 outline-[#0f69c4] transition-colors outline-none hover:bg-[#0B4E91] focus:outline-solid"
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex min-h-11 items-center rounded-sm px-4 text-white outline-4 outline-[#0f69c4] transition-colors outline-none hover:bg-[#0B4E91] focus:outline-solid"
              >
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <ClaveUnicaBtn isLoggedIn={isLoggedIn} />
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile menu - moved outside container for better positioning */}
      <div
        className={`absolute top-full left-0 w-full overflow-hidden bg-[#06315c] shadow-lg transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? "max-h-[300px]" : "max-h-0"}`}
      >
        <ul className="flex flex-col divide-y divide-[#0A4581]/30">
          <li>
            <Link
              href="/dashboard"
              className="block w-full text-white transition-colors hover:bg-[#0A4581]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/consultas"
              className="block w-full text-white transition-colors hover:bg-[#0A4581]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">Consultas</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/contacto"
              className="block w-full text-white transition-colors hover:bg-[#0A4581]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">Contacto</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/preguntas"
              className="block w-full text-white transition-colors hover:bg-[#0A4581]"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4">
                <span className="text-sm font-medium">
                  Preguntas frecuentes
                </span>
              </div>
            </Link>
          </li>
          <li className="p-4">
            <ClaveUnicaBtn isLoggedIn={isLoggedIn} />
          </li>
        </ul>
      </div>
    </div>
  );
}
