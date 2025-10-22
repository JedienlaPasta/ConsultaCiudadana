"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserManagementButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Link
      href="/dashboard/usuarios"
      aria-label="Gestión de Usuarios"
      className="group relative inline-flex flex-1 cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-r from-slate-700 to-slate-600 px-5 py-4 text-white shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-slate-800 hover:to-slate-700 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="flex items-center justify-center rounded-lg bg-white/15 p-3">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5V4H2v16h5m10-9a3 3 0 11-6 0 3 3 0 016 0zm-8 9a6 6 0 1112 0H9z"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <h3 className="font-semibold">Gestión de Usuarios</h3>
        <p className="text-xs text-white/85">Administrar roles y permisos</p>
      </div>
      <svg
        className="ml-auto h-5 w-5 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5" />
    </Link>
  );
}
