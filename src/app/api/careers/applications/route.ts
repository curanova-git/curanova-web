import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyHRToken } from "@/lib/hr-auth";
import { getCandidateFromToken } from "@/lib/candidate-auth";

// GET - List applications (HR admin gets all, candidates get their own)
export async function GET(request: NextRequest) {
  try {
    const hrToken = request.cookies.get("hr_token")?.value;
    const isHRAdmin = hrToken ? verifyHRToken(hrToken) !== null : false;

    if (isHRAdmin) {
      // HR Admin sees all applications
      const applications = await prisma.application.findMany({
        orderBy: { appliedAt: "desc" },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          job: {
            select: { id: true, title: true, department: true },
          },
        },
      });
      return NextResponse.json({ applications });
    }

    // Candidate sees their own applications
    const candidateToken = request.cookies.get("candidate_token")?.value;
    const user = candidateToken ? await getCandidateFromToken(candidateToken) : null;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await prisma.application.findMany({
      where: { userId: user.id },
      orderBy: { appliedAt: "desc" },
      include: {
        job: {
          select: { id: true, title: true, department: true, location: true },
        },
      },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST - Create new application (candidates only)
export async function POST(request: NextRequest) {
  try {
    const candidateToken = request.cookies.get("candidate_token")?.value;
    const user = candidateToken ? await getCandidateFromToken(candidateToken) : null;

    if (!user) {
      return NextResponse.json({ error: "Please sign in to apply" }, { status: 401 });
    }

    const data = await request.json();
    const { jobId, coverLetter, resumePath, referralCode } = data;

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    // Check if job exists and is published
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job || job.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Check if already applied
    const existing = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId,
          userId: user.id,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      );
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        jobId,
        userId: user.id,
        coverLetter: coverLetter || null,
        referralCode: referralCode || null,
        resumePath: resumePath || null,
      },
      include: {
        job: { select: { title: true } },
      },
    });

    // Update referral if code provided
    if (referralCode) {
      await prisma.referral.updateMany({
        where: {
          code: referralCode,
          status: "PENDING",
        },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });
    }

    // TODO: Send email notification to hr@curanova.ai

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
