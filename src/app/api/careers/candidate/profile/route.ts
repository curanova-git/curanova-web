import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCandidateFromToken } from "@/lib/candidate-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("candidate_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getCandidateFromToken(token);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("candidate_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getCandidateFromToken(token);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { name, phone, bio, linkedInUrl, portfolioUrl } = data;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name || null,
        phone: phone || null,
        bio: bio || null,
        linkedInUrl: linkedInUrl || null,
        portfolioUrl: portfolioUrl || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        bio: true,
        linkedInUrl: true,
        portfolioUrl: true,
        resumePath: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
