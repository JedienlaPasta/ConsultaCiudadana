"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { getClaveUnicaToken, getClaveUnicaUserInfo } from "../auth/claveunica";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function authenticateWithClaveUnica(code: string) {
  try {
    // 1. Obtener token de acceso
    const tokenData = await getClaveUnicaToken(code);

    // 2. Obtener información del usuario
    const userInfo = await getClaveUnicaUserInfo(tokenData.access_token);

    // 3. Crear JWT con la información del usuario
    const jwt = await new SignJWT({
      run: `${userInfo.RolUnico.numero}-${userInfo.RolUnico.DV}`,
      name:
        userInfo.name.nombres.join(" ") +
        " " +
        userInfo.name.apellidos.join(" "),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    // 4. Guardar JWT en cookies
    const cookieStore = await cookies();
    cookieStore.set("session", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error en autenticación con ClaveÚnica:", error);
    return { success: false, error: "Error en autenticación" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return { success: true };
}
