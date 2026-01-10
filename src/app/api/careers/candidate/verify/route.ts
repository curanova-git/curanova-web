import { NextRequest, NextResponse } from "next/server";
import { getCandidateFromToken } from "@/lib/candidate-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("candidate_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await getCandidateFromToken(token);

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
