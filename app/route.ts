import { exchangeCodeForTokens } from "@/app/lib/actions/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");
  console.log("code: ", code);
  console.log("state: ", state);
  console.log("error: ", error);
  console.log("error_description: ", error_description);

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
    redirect("/auth/error?message=No_Code_Received");
  }

  try {
    await exchangeCodeForTokens(code);
    console.log("Intercambio de tokens y sesión establecida con éxito.");
  } catch (e: unknown) {
    console.error("Error durante el intercambio de tokens:", e);
    const errorMessage =
      e instanceof Error ? e.message : "Authentication Failed";
    redirect(`/auth/error?message=${encodeURIComponent(errorMessage)}`);
  }
  redirect("/consultas/piimep");
}
