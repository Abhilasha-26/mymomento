import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type TokenPayload = {
  userId: string;
  email: string;
  username: string;
};

export async function getCurrentUser() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    return decoded;
  } catch {
    return null;
  }
}