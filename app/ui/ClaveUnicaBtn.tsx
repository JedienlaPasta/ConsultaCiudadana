"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { roboto } from "./fonts";

export default function ClaveUnicaBtn() {
  return (
    <Link
      className="flex min-h-11 w-fit grow items-center justify-center gap-0.5 rounded-sm bg-[#0F69C4] py-[8px] pr-5 pl-4 text-center text-[#fff] transition-all select-none hover:bg-[#2275C9] hover:underline"
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
  );
}
