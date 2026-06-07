import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
type authPayload = {
  id:string,
  role:"USER"|"ADMIN"
}
export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as authPayload;

  return decoded;
}