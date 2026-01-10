import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "candidate-secret-key-change-in-production";

export interface CandidateUser {
  id: string;
  email: string;
  name: string | null;
}

export async function registerCandidate(
  email: string,
  password: string,
  name?: string
): Promise<{ user: CandidateUser } | { error: string }> {
  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "Email already registered" };
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to register" };
  }
}

export async function validateCandidateCredentials(
  email: string,
  password: string
): Promise<CandidateUser | null> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}

export function generateCandidateToken(user: CandidateUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      type: "candidate",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyCandidateToken(token: string): CandidateUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name: string | null;
      type: string;
    };

    if (decoded.type !== "candidate") return null;

    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };
  } catch (error) {
    return null;
  }
}

export async function getCandidateFromToken(token: string) {
  const user = verifyCandidateToken(token);
  if (!user) return null;

  // Get full user data from database
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
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

  return fullUser;
}
