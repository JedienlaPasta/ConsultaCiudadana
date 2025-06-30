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
    if (authError === "no_session" && message) {
      if (currentToastId.current) {
        toast.dismiss(currentToastId.current);
      }

      currentToastId.current = toast.error(message);

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("authError");
      newUrl.searchParams.delete("message");
      router.replace(newUrl.pathname + newUrl.search, { scroll: false });
    }
  }, [authError, message, router]);

  return null;
}
