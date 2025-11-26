import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { verifySession } from "./simpleAuth";
import { COOKIE_NAME } from "../../shared/const";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    // Get session token from cookie
    const token = opts.req.cookies?.[COOKIE_NAME];
    if (token) {
      const payload = await verifySession(token);
      if (payload) {
        // Reconstruct user object from JWT payload
        user = {
          id: payload.userId,
          email: payload.email,
          name: null,
          phone: null,
          password: "", // Don't expose password
          role: payload.role as any,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        } as User;
      }
    }
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
