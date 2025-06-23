import { exchangeCodeForTokens } from "@/app/lib/actions/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClaveUnicaCallbackPage({
  searchParams,
}: {
  searchParams: {
    code?: string;
    state: string;
    error: string;
    error_description: string;
  };
}) {
  const { code, state, error, error_description } = searchParams;
  const cookieStore = await cookies();
  const storedState = cookieStore.get("claveunica_state")?.value;

  if (error) {
    console.error("Error de ClaveÚnica: ", error, error_description);
    redirect("/auth/error?message=ClaveUnica_Error"); // Mostrar error en vez de redirigir?
  }

  if (!state || state !== storedState) {
    console.error("Invalid state parameter. CSRF detected or state mismatch.");
    redirect("/auth/error?message=Invalid_State"); // Mostrar error en vez de redirigir?
  }

  // Limpiar cookie de state luego de la validacion
  cookieStore.delete("claveunica_state");

  if (!code) {
    redirect("/auth/error=message=No_Code_Received");
  }

  try {
    await exchangeCodeForTokens(code);

    redirect("/"); // Debe ser una pagina protegida?
  } catch (e: any) {
    console.error("Error durante el intercambio de tokens:", e);
    redirect(
      `/auth/error?message=${encodeURIComponent(e.message || "Authentication Failed")}`,
    );
  }
}
