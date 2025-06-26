import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
// import { toast } from "sonner";

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
    const loginUrl = new URL("/consultas/piimep", request.url);
    loginUrl.searchParams.set("redirect", pathname); // Guardar ruta original para redirigir después del login
    // toast.error("Acceso no autorizado. Inicia sesión para continuar.");
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verificar JWT
    verify(session, jwtSecret!);
    return NextResponse.next();
  } catch (error) {
    console.error("Sesión inválida:", error);
    const loginUrl = new URL("/consultas/piimep", request.url);
    loginUrl.searchParams.set("error", "session_expired");
    return NextResponse.redirect(loginUrl);
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
    "/consultas/piimep/votacion/:path*",
  ],
};
