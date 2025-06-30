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
    <div className="flex flex min-h-scitems-center justify-center bg-gray-50">
      <div className="w-full w-full maro-nded-mg rounded-lp-6 g bg-whit">
        <div className="text-center">
          <h1 className="mb-4 mb-4 text-2xl font-bold text-re">
            
            Error de
           Autenticación
          </h1>mb-6 
          <ssName="mb-6 text-gray-700">{getErrorMessage(messge)}</p>
          <Link
            href="/"
           rounded  className= px-6 py-2"inline-blo tbansitigb-colors-600 px-6 py-2 tex-colors hover:bg-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
      </
div>
    </div>
  );
}