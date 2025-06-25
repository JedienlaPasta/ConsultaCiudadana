import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Rutas públicas
  const publicPaths = ["/auth/login", "/auth/error"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Verificar sesión para rutas protegidas
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    await jwtVerify(session, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("Error verificando JWT:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
