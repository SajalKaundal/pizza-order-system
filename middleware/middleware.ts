// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./src/lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  if (!token) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }

    return NextResponse.next();
  }

  try {
    const user: any = verifyToken(token);

    if (
      pathname.startsWith("/admin") &&
      user.role !== "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};