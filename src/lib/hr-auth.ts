import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "hr-admin-secret-key-change-in-production";

export interface HRUser {
  id: string;
  email: string;
  name: string | null;
}

export async function validateHRCredentials(
  email: string,
  password: string
): Promise<HRUser | null> {
  try {
    const hrAdmin = await prisma.hRAdmin.findUnique({
      where: { email },
    });

    if (!hrAdmin) {
      return null;
    }

    const isValid = await bcrypt.compare(password, hrAdmin.passwordHash);
    if (!isValid) {
      return null;
    }

    return {
      id: hrAdmin.id,
      email: hrAdmin.email,
      name: hrAdmin.name,
    };
  } catch (error) {
    console.error("HR auth error:", error);
    return null;
  }
}

export function generateHRToken(user: HRUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      type: "hr_admin",
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
}

export function verifyHRToken(token: string): HRUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      name: string | null;
      type: string;
    };

    if (decoded.type !== "hr_admin") {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
