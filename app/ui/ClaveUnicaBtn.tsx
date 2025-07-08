"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { roboto } from "./fonts";
import { signInWithClaveUnica, signOutClaveUnica } from "../lib/actions/auth";
import { toast } from "sonner";
import { usePathname, useSearchParams } from "next/navigation";

export default function ClaveUnicaBtn({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(isLoggedIn);
  const searchParams = useSearchParams();

  // Check for logout success on component mount
  useEffect(() => {
    const logoutSuccess = localStorage.getItem("logout_success");
    if (logoutSuccess === "true") {
      localStorage.removeItem("logout_success");
      toast.success("Sesión cerrada con éxito");
      setIsUserLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("login_success") === "true") {
      toast.success("¡Bienvenido! Has iniciado sesión correctamente.");
      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete("login_success");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  }, [searchParams]);

  const logout = async () => {
    const toastId = toast.loading("Cerrando sesión...");
    try {
      localStorage.setItem("logout_success", "true");
      await signOutClaveUnica();
    } catch (error) {
      toast.error("Error al cerrar sesión", { id: toastId });
      console.log(error);
      localStorage.removeItem("logout_success");
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
