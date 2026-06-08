import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import User from "@/db/models/User";

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return ;
  }

  const decoded = await verifyToken(token);
  const user = await User.findById(decoded.id);
  if (user) {
    return {
      id: user._id,
      role: user.role,
    };
  }
}
