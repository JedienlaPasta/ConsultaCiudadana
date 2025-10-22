import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const jwtSecret = process.env.NEXTAUTH_SECRET;

  // Permitir que las peticiones de Server Actions pasen sin bloqueo
  // const isServerActionRequest = request.headers.get("Next-Action");
  // if (isServerActionRequest) {
  //   return NextResponse.next();
  // }

  // Validar que existe la variable de entorno
  // if (!jwtSecret) {
  //   console.error("NEXTAUTH_SECRET no está configurado");
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // Verificar si la ruta actual necesita protección
  // const isVoteRoute = /^\/consultas\/[^/]+\/voto/.test(pathname);
  // const isDashboardRoute = pathname.startsWith("/dashboard");

  // const isProtected = isVoteRoute || isDashboardRoute;
  // const isProtected = isVoteRoute;
  // if (!isProtected) {
  //   return NextResponse.next();
  // }

  // Para rutas protegidas, verificar sesión
  // const session = request.cookies.get("app_session")?.value;

  // if (!session) {
  //   const redirectUrl = new URL("/", request.url);
  //   redirectUrl.searchParams.set("authError", "no_session");
  //   redirectUrl.searchParams.set(
  //     "message",
  //     "Debes iniciar sesión para acceder a esta página",
  //   );
  //   return NextResponse.redirect(redirectUrl);
  // }

  try {
    // Verificar JWT y extraer payload
    // const secret = new TextEncoder().encode(jwtSecret);
    // const { payload } = await jose.jwtVerify(session, secret);
    // Para rutas de dashboard, verificar roles específicos
    // if (isDashboardRoute) {
    //   const userRole = payload.role as string;
    //   const allowedRoles = ["admin", "encuestador"];
    //   if (!userRole || !allowedRoles.includes(userRole.toLowerCase())) {
    //     console.log(
    //       `Acceso denegado para rol: ${userRole} en ruta: ${pathname}`,
    //     );
    //     const redirectUrl = new URL("/", request.url);
    //     redirectUrl.searchParams.set("authError", "access_denied");
    //     return NextResponse.redirect(redirectUrl);
    //   }
    // }
    return NextResponse.next();
  } catch (error) {
    console.error("Sesión inválida:", error);
    // const redirectUrl = new URL("/", request.url);
    // redirectUrl.searchParams.set("authError", "session_expired");
    // return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  // matcher: ["/consultas/:id/voto/:path*"],
  // matcher: ["/consultas/:id/voto/:path*", "/dashboard/:path*"],
};
