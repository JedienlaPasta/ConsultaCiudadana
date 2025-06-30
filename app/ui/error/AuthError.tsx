"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "ClaveUnica_Error":
        return "Error en el proceso de autenticación con ClaveÚnica";
      case "Invalid_State":
        return "Error de seguridad: estado inválido detectado";
      case "No_Code_Received":
        return "No se recibió código de autorización";
      case "Authentication_Failed":
        return "Falló la autenticación";
      default:
        return "Error desconocido en la autenticación";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="bg-rose-500 p-3">
          <div className="flex justify-center">
            <svg
              className="size-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <div className="p-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Error de Autenticación
          </h1>
          <p className="mb-4 text-gray-600">{getErrorMessage(message)}</p>
          <Link
            href="/"
            className="inline-block rounded-md bg-gray-600 px-6 py-2 font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
