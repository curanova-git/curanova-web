import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCandidateFromToken } from "@/lib/candidate-auth";
import crypto from "crypto";

// GET - Get user's referrals and their referral code
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("candidate_token")?.value;
    const user = token ? await getCandidateFromToken(token) : null;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's existing referral code (if any)
    const existingReferral = await prisma.referral.findFirst({
      where: { referrerId: user.id },
      select: { code: true },
    });

    // Get all referrals made by this user
    const referrals = await prisma.referral.findMany({
      where: { referrerId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        job: {
          select: { id: true, title: true },
        },
      },
    });

    return NextResponse.json({
      referralCode: existingReferral?.code || null,
      referrals,
    });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}

// POST - Generate a new referral code for the user
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("candidate_token")?.value;
    const user = token ? await getCandidateFromToken(token) : null;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already has a referral code
    const existingReferral = await prisma.referral.findFirst({
      where: { referrerId: user.id },
      select: { code: true },
    });

    if (existingReferral) {
      return NextResponse.json({ code: existingReferral.code });
    }

    // Generate a unique referral code
    const code = `REF-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

    // Create a placeholder referral entry to store the code
    await prisma.referral.create({
      data: {
        referrerId: user.id,
        code,
        status: "PENDING",
      },
    });

    return NextResponse.json({ code });
  } catch (error) {
    console.error("Error generating referral code:", error);
    return NextResponse.json(
      { error: "Failed to generate referral code" },
      { status: 500 }
    );
  }
}
