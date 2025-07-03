"use client";
import Image from "next/image";
import React, { useState } from "react";
import { roboto } from "./fonts";
import { signInWithClaveUnica, signOutClaveUnica } from "../lib/actions/auth";
import { toast } from "sonner";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ClaveUnicaBtn({ isLoggedIn }: { isLoggedIn: boolean }) {
  // const router = useRouter();
  const pathname = usePathname();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(isLoggedIn);

  const logout = async () => {
    const toastId = toast.loading("Cerrando sesión...");
    try {
      await signOutClaveUnica();
      setTimeout(() => {
        setIsUserLoggedIn(false);
        toast.success("Sesión cerrada con éxito", { id: toastId });
        // router.refresh();
      }, 500);
    } catch (error) {
      toast.error("Error al cerrar sesión", { id: toastId });
      console.log(error);
    }
  };

  if (isUserLoggedIn) {
    return (
      <form action={logout} className="flex w-full">
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
    <form action={() => signInWithClaveUnica(pathname)} className="flex w-full">
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
