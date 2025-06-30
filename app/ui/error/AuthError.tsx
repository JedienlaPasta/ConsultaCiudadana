import { Suspense } from "react";

export default function AuthError() {
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
