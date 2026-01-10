import { NextRequest, NextResponse } from "next/server";
import { verifyHRToken } from "@/lib/hr-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("hr_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = verifyHRToken(token);

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: user.email,
      name: user.name,
    },
  });
}
