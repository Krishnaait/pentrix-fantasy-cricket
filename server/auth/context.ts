import type { Request, Response } from "express";
import { verifyToken } from "./jwt";
import { getUserById } from "../db";
import type { User } from "../../drizzle/schema";

const AUTH_COOKIE_NAME = "pentrix_auth_token";

/**
 * Custom authentication context for PENTRIX
 * Replaces Manus OAuth with JWT-based authentication
 */
export interface AuthContext {
  user: User | null;
  req: Request;
  res: Response;
}

/**
 * Parse cookies from request header
 */
function parseCookies(cookieHeader?: string): Map<string, string> {
  const cookies = new Map<string, string>();
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.split("=");
    if (name && rest.length > 0) {
      cookies.set(name.trim(), rest.join("=").trim());
    }
  });

  return cookies;
}

/**
 * Create authentication context from request
 * Verifies JWT token and loads user from database
 */
export async function createAuthContext(
  req: Request,
  res: Response
): Promise<AuthContext> {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.get(AUTH_COOKIE_NAME);

  if (!token) {
    return { user: null, req, res };
  }

  try {
    const payload = await verifyToken(token);
    if (!payload) {
      return { user: null, req, res };
    }

    const user = await getUserById(payload.userId);
    if (!user) {
      return { user: null, req, res };
    }

    // Check if user is active
    if (!user.isActive) {
      return { user: null, req, res };
    }

    return { user, req, res };
  } catch (error) {
    console.error("[Auth Context] Error:", error);
    return { user: null, req, res };
  }
}

/**
 * Set authentication cookie
 */
export function setAuthCookie(res: Response, token: string, maxAge: number = 7 * 24 * 60 * 60 * 1000) {
  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge,
    path: "/",
  });
}

/**
 * Clear authentication cookie
 */
export function clearAuthCookie(res: Response) {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
}

export { AUTH_COOKIE_NAME };
