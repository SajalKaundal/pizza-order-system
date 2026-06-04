// app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  if (email === "admin@test.com") {
    const token = signToken({
      id: 1,
      role: "ADMIN",
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;
  }

  const token = signToken({
    id: 2,
    role: "USER",
  });

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}