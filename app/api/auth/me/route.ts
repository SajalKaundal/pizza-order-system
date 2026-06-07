import { connectDB } from "@/db/db";
import User from "@/db/models/user";
import { verifyAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const token = await verifyAuth();
    // console.log(token);
    const user = await User.findById(token.id);
    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
}
