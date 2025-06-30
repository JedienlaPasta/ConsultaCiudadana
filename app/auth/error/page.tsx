import AuthError from "@/app/ui/error/AuthError";
import { Suspense } from "react";

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <p className="mb-6 text-gray-600">Cargando mensaje de error...</p>
      }
    >
      <AuthError />
    </Suspense>
  );
}
