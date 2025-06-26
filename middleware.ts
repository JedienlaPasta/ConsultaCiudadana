import { NextResponse } from "next/server"; // Missing import!
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Use jose instead of jsonwebtoken for Edge Runtime
import { toast } from "sonner";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get JWT secret - make sure it's available in Edge Runtime
  const jwtSecret = process.env.NEXTAUTH_SECRET;

  if (!jwtSecret) {
    console.error("NEXTAUTH_SECRET not available in middleware");
    const loginUrl = new URL("/consultas/piimep", request.url);
    loginUrl.searchParams.set("error", "config_error");
    return NextResponse.redirect(loginUrl);
  }

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
    console.log("No session cookie found");
    const loginUrl = new URL("/consultas/piimep", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.");
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verificar JWT usando jose (compatible with Edge Runtime)
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(session, secret);

    console.log("Session verified successfully:", payload);
    return NextResponse.next();
  } catch (error) {
    console.error("Session verification failed:", error);
    const loginUrl = new URL("/consultas/piimep", request.url);
    loginUrl.searchParams.set("error", "session_expired");
    loginUrl.searchParams.set(
      "details",
      error instanceof Error ? error.message : "unknown",
    );
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
