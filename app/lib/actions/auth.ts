"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

export async function signInWithClaveUnica() {
  const state = crypto.randomBytes(16).toString("hex");
  const cookieStore = await cookies();

  cookieStore.set("claveunica_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 1800, // 30 minutos
    sameSite: "lax",
  });

  const clientId = process.env.CLAVEUNICA_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    process.env.CLAVEUNICA_REDIRECT_URI || "",
  );
  const authorizeUrl = process.env.CLAVEUNICA_AUTHORIZE_URL;

  if (!clientId || !redirectUri || !authorizeUrl) {
    throw new Error("Missing ClaveÚnica environment variables.");
  }

  const authUrl = `<span class="math-inline">\{authorizeUrl\}?client\_id\=</span>{clientId}&response_type=code&scope=openid%20run%20name&redirect_uri=<span class="math-inline">\{redirectUri\}&state\=</span>{state}`;

  // Redirigir al usuario al login de ClaveÚnica
  redirect(authUrl);
}
