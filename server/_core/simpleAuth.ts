import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import type { Response } from "express";
import { COOKIE_NAME } from "../../shared/const";
import { getSessionCookieOptions } from "./cookies";

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-in-production";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: number, email: string, role: string): Promise<string> {
  const token = await new SignJWT({ userId, email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  
  return token;
}

export async function verifySession(token: string): Promise<{ userId: number; email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: number; email: string; role: string };
  } catch {
    return null;
  }
}

export function setSessionCookie(res: Response, token: string) {
  const cookieOptions = getSessionCookieOptions({ protocol: "https", headers: {} } as any);
  res.cookie(COOKIE_NAME, token, cookieOptions);
}
