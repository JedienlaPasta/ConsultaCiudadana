"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function signInWithClaveUnica() {
  const state = crypto.randomBytes(16).toString("hex");
  const cookieStore = await cookies();

  console.log(process.env.NODE_ENV);
  console.log(process.env.CLAVEUNICA_CLIENT_ID);
  console.log(process.env.CLAVEUNICA_AUTHORIZE_URL);

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

  const authUrl = `${authorizeUrl}?client_id=${clientId}&response_type=code&scope=openid%20run%20name&redirect_uri=${redirectUri}&state=${state}`;

  // Redirigir al usuario al login de ClaveÚnica
  redirect(authUrl);
}

export async function signOutClaveUnica() {
  const cookieStore = await cookies();

  cookieStore.delete("app_session");
  cookieStore.delete("claveunica_state");

  const postLogoutRedirectUri = encodeURIComponent(
    "https://test-participacion.munielquisco.gob.cl",
  );
  const logoutUrl = `${process.env.CLAVEUNICA_LOGOUT_URL}?post_logout_redirect_uri=${postLogoutRedirectUri}`;

  redirect(logoutUrl);
}

export async function exchangeCodeForTokens(code: string) {
  const clientId = process.env.CLAVEUNICA_CLIENT_ID;
  const clientSecret = process.env.CLAVEUNICA_CLIENT_SECRET;
  const redirectUri = process.env.CLAVEUNICA_REDIRECT_URI;
  const tokenUrl = process.env.CLAVEUNICA_TOKEN_URL;
  const userinfoUrl = process.env.CLAVEUNICA_USERINFO_URL;
  const jwtSecret = process.env.NEXTAUTH_SECRET;

  console.log("Iniciando intercambio de tokens <============================");

  if (
    !clientId ||
    !clientSecret ||
    !redirectUri ||
    !tokenUrl ||
    !userinfoUrl ||
    !jwtSecret
  ) {
    throw new Error("Missing ClaveÚnica or JWT secret environment variables.");
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
    console.error("Error al intercambiar código por tokens: __", errorData);
    throw new Error(
      `Failed to exchange code: ${errorData.error_description || errorData.error || "Unknown error"}`,
    );
  }

  console.log(
    "Segundo verificador intercambio de tokens <==============================",
  );

  const tokens = await tokenResponse.json();
  const { access_token } = tokens;
  //   const { access_token, id_token } = tokens;

  // Paso 6: Obtener informacion de ciudadano por medio del access_token
  const userInfoResponse = await fetch(userinfoUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!userInfoResponse.ok) {
    const errorData = await userInfoResponse.json();
    console.error("Error al obtener información de usuario:", errorData);
    throw new Error(
      `Failed to fetch user info: ${errorData.error_description || errorData.error || "Unknown error"}`,
    );
  }

  const userInfo = await userInfoResponse.json();
  console.log("Información del usuario de ClaveÚnica:", userInfo);

  const sessionPayload = {
    sub: userInfo.sub,
    run: userInfo.run,
    name: userInfo.name,
  };

  const sessionToken = jwt.sign(sessionPayload, jwtSecret, {
    expiresIn: "1h",
  });

  const cookieStore = await cookies();

  cookieStore.set("app_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hora
    sameSite: "lax", // Proteccion CSRF
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("app_session")?.value;
  const jwtSecret = process.env.NEXTAUTH_SECRET;

  if (!sessionToken || !jwtSecret) {
    return null;
  }

  try {
    const decoded = jwt.verify(sessionToken, jwtSecret) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Error al verificar el token de sesión:", error);
    return null;
  }
}
