import { exchangeCodeForTokens } from "@/app/lib/actions/auth";
import { checkVotanteRecord } from "@/app/lib/actions/votantes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  // const error_description = searchParams.get("error_description");
  // console.log("code: ", code);
  // console.log("state: ", state);
  // console.log("error: ", error);
  // console.log("error_description: ", error_description);

  const cookieStore = await cookies();
  const storedState = cookieStore.get("claveunica_state")?.value;
  let returnTo = "/";

  if (!storedState || !state || storedState !== state) {
    console.error("Invalid state - possible CSRF attack");
    return new Response("Invalid state", { status: 403 });
  }

  // Limpiar cookie después de usar
  cookieStore.delete("claveunica_state");

  if (error) {
    console.error("Error from ClaveÚnica:", error);
    return redirect("/auth/error?error=" + encodeURIComponent(error));
  }

  if (!code) {
    console.error("No code received");
    return redirect("/auth/error?error=no_code");
  }

  try {
    const response = await exchangeCodeForTokens(code);
    console.log("Intercambio de tokens y sesión establecida con éxito.");

    // Verificar si esta registrado en la DB y sino se registra
    if (response.success && response.userData) {
      await checkVotanteRecord(
        response.userData.rut,
        response.userData.dv,
        response.userData.name,
      );
    }

    returnTo = cookieStore.get("claveunica_return_to")?.value || "/";
    console.log("Return To:", returnTo);
    cookieStore.delete("claveunica_return_to");
  } catch (error: unknown) {
    console.error("Authentication failed:", error);
    return redirect("/auth/error?error=auth_failed");
  }
  redirect(returnTo);
}
