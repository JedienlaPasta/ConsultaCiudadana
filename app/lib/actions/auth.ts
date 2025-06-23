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

export async function exchangeCodeForTokens(code: string) {
  const clientId = process.env.CLAVEUNICA_CLIENT_ID;
  const clientSecret = process.env.CLAVEUNICA_CLIENT_SECRET;
  const redirectUri = process.env.CLAVEUNICA_REDIRECT_URI;
  const tokenUrl = process.env.CLAVEUNICA_TOKEN_URL;
  const userinfoUrl = process.env.CLAVEUNICA_USERINFO_URL;

  if (!clientId || !clientSecret || !redirectUri || !tokenUrl || !userinfoUrl) {
    throw new Error(
      "Missing ClaveÚnica environment variables for token exchange.",
    );
  }

  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code,
    }).toString(),
  });

  if (!tokenResponse.ok) {
    const errorData = await tokenResponse.json();
    console.error("Error al intercambiar código por tokens:", errorData);
    throw new Error(
      `Failed to exchange code: ${errorData.error_description || errorData.error}`,
    );
  }

  const tokens = await tokenResponse.json();
  const { access_token, id_token } = tokens;

  // Paso 5: Autenticar Usuario, obtener userinfo

  // Paso 6: Obtener informacion de ciudadano por medio del access_token
  const userInfoRespose = await fetch(userinfoUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!userInfoRespose.ok) {
    const errorData = await userInfoRespose.json();
    console.error("Error al obtener información de usuario: ", errorData);
    throw new Error(
      `Failed to fetch user info: ${errorData.error_description || errorData.error}`,
    );
  }

  const userInfo = await userInfoRespose.json();
  console.log("Informacion del usuario de ClaveÚnica:", userInfo);
}
