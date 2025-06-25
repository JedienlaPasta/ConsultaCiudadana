"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default async function AuthError() {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Error de Autenticación
          </h1>
          <p className="mb-6 text-gray-700">{getErrorMessage(message)}</p>
          <Link
            href="/consultas/piimep"
            className="inline-block rounded bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
