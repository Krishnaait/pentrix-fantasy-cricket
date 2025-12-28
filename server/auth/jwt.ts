import { SignJWT, jwtVerify } from "jose";
import { ENV } from "../_core/env";

const JWT_SECRET = new TextEncoder().encode(ENV.cookieSecret);
const JWT_ALGORITHM = "HS256";

export interface JWTPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for a user
 * @param userId User ID
 * @param email User email
 * @param expiresIn Token expiration time (default: 7 days)
 * @returns JWT token string
 */
export async function generateToken(
  userId: number,
  email: string,
  expiresIn: string = "7d"
): Promise<string> {
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify and decode a JWT token
 * @param token JWT token string
 * @returns Decoded payload or null if invalid
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
    });

    return {
      userId: payload.userId as number,
      email: payload.email as string,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    console.error("[JWT] Token verification failed:", error);
    return null;
  }
}

/**
 * Generate a refresh token (longer expiration)
 * @param userId User ID
 * @param email User email
 * @returns Refresh token string
 */
export async function generateRefreshToken(
  userId: number,
  email: string
): Promise<string> {
  return generateToken(userId, email, "30d");
}
