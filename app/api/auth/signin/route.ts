import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/db/models/user";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, role } = body;
  const hashedPassword = await bcrypt.hash(password, 40);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  if (user) {
    return NextResponse.json({
      success: true,
      message: "User Created Successfully",
    });
  }

  return NextResponse.json({
    success: false,
  });
}
