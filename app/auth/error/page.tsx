import AuthError from "@/app/ui/error/AuthError";
import { Suspense } from "react";

export default async function ErrorHandler() {
  return (
    <Suspense>
      <AuthError />
    </Suspense>
  );
}
