import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const jwtSecret = process.env.NEXTAUTH_SECRET;

  // Definir rutas protegidas
  const protectedRoutes = ["/consultas/piimep/votacion"];

  // Verificar si la ruta actual necesita protección
  const isProtected = protectedRoutes.some(
    (route) =>
      pathname.startsWith(route) || pathname === route.replace(/\/$/, ""), // Maneja rutas con/sin slash final
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Para rutas protegidas, verificar sesión
  const session = request.cookies.get("app_session")?.value;

  if (!session) {
    const redirectUrl = new URL("/consultas/piimep", request.url);
    redirectUrl.searchParams.set("authError", "no_session");
    redirectUrl.searchParams.set(
      "message",
      "Debes iniciar sesión para acceder a esta página",
    );
    return NextResponse.redirect(redirectUrl);
  }

  try {
    // Verificar JWT
    const secret = new TextEncoder().encode(jwtSecret);
    await jose.jwtVerify(session, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("Sesión inválida:", error);
    const redirectUrl = new URL("/consultas/piimep", request.url);
    redirectUrl.searchParams.set("error", "session_expired");
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/ (rutas de autenticación)
     */
    // "/consultas/piimep/votacion/:path*",
  ],
};
