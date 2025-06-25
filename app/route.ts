import { authenticateWithClaveUnica } from "@/app/lib/actions/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }

  const result = await authenticateWithClaveUnica(code);

  if (result.success) {
    return NextResponse.redirect(new URL("/consultas/piimep", request.url));
  } else {
    return NextResponse.redirect(new URL("/auth/error", request.url));
  }
}
