import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyHRToken } from "@/lib/hr-auth";

// GET - Get single job
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.cookies.get("hr_token")?.value;
    const isHRAdmin = token ? verifyHRToken(token) !== null : false;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Non-admin can only see published jobs
    if (!isHRAdmin && job.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

// PUT - Update job (HR admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const job = await prisma.job.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(department && { department }),
        ...(location && { location }),
        ...(type && { type }),
        ...(description && { description }),
        ...(requirements !== undefined && {
          requirements: requirements ? JSON.stringify(requirements) : null,
        }),
        ...(benefits !== undefined && {
          benefits: benefits ? JSON.stringify(benefits) : null,
        }),
        ...(minSalary !== undefined && {
          minSalary: minSalary ? parseInt(minSalary) : null,
        }),
        ...(maxSalary !== undefined && {
          maxSalary: maxSalary ? parseInt(maxSalary) : null,
        }),
        ...(status && { status }),
        ...(closingDate !== undefined && {
          closingDate: closingDate ? new Date(closingDate) : null,
        }),
      },
    });

    return NextResponse.json({ job });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE - Delete job (HR admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.cookies.get("hr_token")?.value;
    if (!token || !verifyHRToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
