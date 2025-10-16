"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserRole } from "../data/usuarios";

// Login ============================================================
export async function signInWithClaveUnica(
  returnTo: string,
  isNavbarBtn: boolean,
) {
  const state = crypto.randomBytes(16).toString("hex");
  const cookieStore = await cookies();

  const returnToValues = {
    returnTo,
    isNavbarBtn,
  };

  cookieStore.set("claveunica_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 3600, // 60 minutos
    sameSite: "lax",
  });

  cookieStore.set("claveunica_return_to", JSON.stringify(returnToValues), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 3600, // 60 minutos
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

// Logout ===========================================================
export async function signOutClaveUnica() {
  const cookieStore = await cookies();

  cookieStore.delete("app_session");
  cookieStore.delete("claveunica_state");

  const logoutUrl = new URL(process.env.CLAVEUNICA_LOGOUT_URL!);
  logoutUrl.searchParams.set(
    "redirect",
    process.env.CLAVEUNICA_LOGOUT_REDIRECT_URI!,
  );

  redirect(logoutUrl.toString());
}

// Get login data ===================================================
export async function exchangeCodeForTokens(code: string) {
  const clientId = process.env.CLAVEUNICA_CLIENT_ID;
  const clientSecret = process.env.CLAVEUNICA_CLIENT_SECRET;
  const redirectUri = process.env.CLAVEUNICA_REDIRECT_URI;
  const tokenUrl = process.env.CLAVEUNICA_TOKEN_URL;
  const userinfoUrl = process.env.CLAVEUNICA_USERINFO_URL;
  const jwtSecret = process.env.NEXTAUTH_SECRET;

  if (
    !clientId ||
    !clientSecret ||
    !redirectUri ||
    !tokenUrl ||
    !userinfoUrl ||
    !jwtSecret
  ) {
    throw new Error("Configuración de ClaveÚnica incompleta");
  }

  try {
    // Intercambiar código por tokens de acceso
    const tokenParams = new URLSearchParams();
    tokenParams.append("grant_type", "authorization_code");
    tokenParams.append("client_id", clientId);
    tokenParams.append("client_secret", clientSecret);
    tokenParams.append("redirect_uri", redirectUri);
    tokenParams.append("code", code);

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams.toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Error en token response:", errorData);
      throw new Error(
        `Error al obtener tokens: ${errorData.error || "Error desconocido"}`,
      );
    }

    const tokens = await tokenResponse.json();
    const { access_token } = tokens;

    // Obtener información del usuario
    const userInfoResponse = await fetch(userinfoUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!userInfoResponse.ok) {
      const errorData = await userInfoResponse.json();
      console.error("Error en userinfo response:", errorData);
      throw new Error(
        `Error al obtener información de usuario: ${errorData.error || "Error desconocido"}`,
      );
    }

    const userInfo = await userInfoResponse.json();

    // Datos de usuario para verificar en la DB
    const userData = {
      sub: userInfo.sub,
      // rut: userInfo.RolUnico.numero,
      dv: userInfo.RolUnico.DV,
      name: `${userInfo.name.nombres.join(" ")} ${userInfo.name.apellidos.join(" ")}`,
    };

    const userRoleResult = await getUserRole(userData.sub, userData.dv);
    let userRole = "votante"; // Rol por defecto si no se encuentra en BD
    if (userRoleResult.success && userRoleResult.role) {
      userRole = userRoleResult.role;
    }

    // Crear sesión JWT
    const sessionPayload = {
      sub: userInfo.sub,
      dv: userInfo.RolUnico.DV,
      // rut: `${userInfo.RolUnico.numero}-${userInfo.RolUnico.DV}`,
      name: `${userInfo.name.nombres.join(" ")} ${userInfo.name.apellidos.join(" ")}`,
      role: userRole,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const sessionToken = jwt.sign(sessionPayload, jwtSecret, {
      algorithm: "HS256",
    });

    // Establecer cookie de sesión
    const cookieStore = await cookies();
    cookieStore.set("app_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hora
      sameSite: "lax",
    });

    return { success: true, userData };
  } catch (error) {
    console.error("Error en exchangeCodeForTokens:", error);
    throw error;
  }
}

// Get session data =================================================
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
