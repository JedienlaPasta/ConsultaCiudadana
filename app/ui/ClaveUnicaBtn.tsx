"use client";
// import Image from "next/image";
// import { roboto } from "./fonts";
// import { useRouter } from "next/navigation";

export default function ClaveUnicaBtn() {
  // const router = useRouter();
  const handleLogin = () => {
    const state = Math.random().toString(36).substring(2);
    sessionStorage.setItem("claveunica_state", state);

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_CLAVEUNICA_CLIENT_ID!,
      response_type: "code",
      scope: "openid run name",
      redirect_uri: process.env.NEXT_PUBLIC_CLAVEUNICA_REDIRECT_URI!,
      state: state,
    });

    const authUrl = `${process.env.NEXT_PUBLIC_CLAVEUNICA_AUTH_URL}?${params.toString()}`;
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
        />
      </svg>
      Ingresar con ClaveÚnica
    </button>
  );

  // return (
  //   <button
  //     onClick={handleLogin}
  //     className={`${roboto.className} flex min-h-11 grow cursor-pointer items-center justify-center gap-0.5 rounded-sm bg-[#0F69C4] py-[8px] pr-5 pl-4 text-center text-[#fff] transition-all select-none hover:bg-[#2275C9] hover:underline`}
  //   >
  //     <Image
  //       src="/cu-blanco.svg"
  //       width={24}
  //       height={24}
  //       aria-hidden="true"
  //       alt="Iniciar sesión con ClaveÚnica"
  //     />
  //     Iniciar sesión
  //   </button>
  // );
}
