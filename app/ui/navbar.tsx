"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-slate-900 shadow-md">
      <div className="container mx-auto max-w-[80rem]">
        <nav className="flex items-center justify-between px-4 py-3 md:px-8">
          <Link
            className="text-xl font-bold text-white transition-colors hover:text-slate-200"
            href="/"
          >
            Participa
          </Link>

          {/* Mobile menu button */}
          <button
            className="block rounded p-2 text-slate-200 hover:bg-slate-800 md:hidden"
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
          <ul className="hidden items-center space-x-8 md:flex">
            <li>
              <Link
                href="/consultas"
                className="rounded-md px-4 py-2 text-slate-200 transition-colors hover:bg-slate-950"
              >
                Consultas
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="rounded-md px-4 py-2 text-slate-200 transition-colors hover:bg-slate-950"
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                href="/preguntas"
                className="rounded-md px-4 py-2 text-slate-200 transition-colors hover:bg-slate-950"
              >
                Preguntas frecuentes
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
                className="block text-slate-200 transition-colors hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="container mx-auto px-4 py-4">Consultas</p>
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="block text-slate-200 transition-colors hover:bg-slate-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <p className="container mx-auto px-4 py-4">Contacto</p>
              </Link>
            </li>
            <li>
              <Link
                href="/preguntas"
                className="block text-slate-200 transition-colors hover:bg-slate-800"
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
