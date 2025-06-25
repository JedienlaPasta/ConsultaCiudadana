"use client";
import Image from "next/image";
import React from "react";
import { roboto } from "./fonts";
import { signInWithClaveUnica, signOutClaveUnica } from "../lib/actions/auth";

export default function ClaveUnicaBtn({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    return (
      <form action={signOutClaveUnica} className="flex w-full">
        <button
          type="submit"
          className={`${roboto.className} flex min-h-11 grow cursor-pointer items-center justify-center gap-0.5 rounded-sm bg-[#0F69C4] py-[8px] pr-5 pl-4 text-center text-[#fff] transition-all select-none hover:bg-[#2275C9] hover:underline`}
        >
          <Image
            src="/cu-blanco.svg"
            width={24}
            height={24}
            aria-hidden="true"
            alt="Cerrar sesión de ClaveÚnica"
          />
          Cerrar sesión
        </button>
      </form>
    );
  }

  return (
    <form action={signInWithClaveUnica} className="flex w-full">
      <button
        type="submit"
        className={`${roboto.className} flex min-h-11 grow cursor-pointer items-center justify-center gap-0.5 rounded-sm bg-[#0F69C4] py-[8px] pr-5 pl-4 text-center text-[#fff] transition-all select-none hover:bg-[#2275C9] hover:underline`}
      >
        <Image
          src="/cu-blanco.svg"
          width={24}
          height={24}
          aria-hidden="true"
          alt="Iniciar sesión con ClaveÚnica"
        />
        Iniciar sesión
      </button>
    </form>
  );
}
