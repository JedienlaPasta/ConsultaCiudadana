"use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function LogoutPage() {
  // const router = useRouter();

  // useEffect(() => {
  //   const logoutUrl = new URL(process.env.NEXT_PUBLIC_CLAVEUNICA_LOGOUT_URL!);
  //   logoutUrl.searchParams.set("redirect", window.location.origin);

  //   // Redirigir a ClaveÚnica después de un breve delay
  //   setTimeout(() => {
  //     window.location.href = logoutUrl.toString();
  //   }, 1000);
  // }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Cerrando sesión...</h1>
        <p>Serás redirigido en un momento.</p>
      </div>
    </div>
  );
}
