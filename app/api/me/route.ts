import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database/index";

export async function GET() {
  try {
    await connectToDatabase();

    const token =
      (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      userId: string;
    };

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    return NextResponse.json({
  user,
});
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}