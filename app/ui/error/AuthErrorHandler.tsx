"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthErrorHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const authError = searchParams.get("authError");
  const message = searchParams.get("message");
  const currentToastId = useRef<string | number | null>(null);

  useEffect(() => {
    if (authError && message) {
      if (currentToastId.current) {
        toast.dismiss(currentToastId.current);
      }

      // Diferentes tipos de toast según el error
      switch (authError) {
        case "no_session":
          currentToastId.current = toast.error(message, {
            description: "Haz clic en 'Iniciar Sesión' para continuar",
            duration: 5000,
          });
          break;
        case "access_denied":
          currentToastId.current = toast.error(message, {
            description: "Contacta al administrador si necesitas acceso",
            duration: 5000,
          });
          break;
        case "session_expired":
          currentToastId.current = toast.warning(message, {
            description: "Por favor, inicia sesión nuevamente",
            duration: 5000,
          });
          break;
        default:
          currentToastId.current = toast.error(message);
      }

      // Limpiar URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("authError");
      newUrl.searchParams.delete("message");
      router.replace(newUrl.pathname + newUrl.search, { scroll: false });
    }
  }, [authError, message, router]);

  return null;
}
