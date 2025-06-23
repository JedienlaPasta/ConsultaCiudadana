"use client";
import Image from "next/image";
import React from "react";
import { roboto } from "./fonts";
import { signInWithClaveUnica } from "../lib/actions/auth";

export default function ClaveUnicaBtn() {
  return (
    <form
      action={signInWithClaveUnica}
      className="flex min-h-11 w-fit grow items-center justify-center gap-0.5 rounded-sm bg-[#0F69C4] py-[8px] pr-5 pl-4 text-center text-[#fff] transition-all select-none hover:bg-[#2275C9] hover:underline"
      aria-label="Iniciar sesión con ClaveÚnica"
    >
      <Image
        src="/cu-blanco.svg"
        width={24}
        height={24}
        aria-hidden="true"
        alt="Iniciar sesión con ClaveÚnica"
      />
      <button
        type="submit"
        className={`${roboto.className} `}
        aria-hidden="true"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
