import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyHRToken } from "@/lib/hr-auth";

// GET - List all jobs (public for published, all for HR admin)
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("hr_token")?.value;
    const isHRAdmin = token ? verifyHRToken(token) !== null : false;

    const jobs = await prisma.job.findMany({
      where: isHRAdmin ? {} : { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST - Create new job (HR admin only)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("hr_token")?.value;
    if (!token || !verifyHRToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const {
      title,
      department,
      location,
      type,
      description,
      requirements,
      benefits,
      minSalary,
      maxSalary,
      status,
      closingDate,
    } = data;

    if (!title || !department || !location || !type || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        department,
        location,
        type,
        description,
        requirements: requirements ? JSON.stringify(requirements) : null,
        benefits: benefits ? JSON.stringify(benefits) : null,
        minSalary: minSalary ? parseInt(minSalary) : null,
        maxSalary: maxSalary ? parseInt(maxSalary) : null,
        status: status || "DRAFT",
        closingDate: closingDate ? new Date(closingDate) : null,
      },
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
