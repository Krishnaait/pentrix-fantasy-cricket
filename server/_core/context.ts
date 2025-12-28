import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { createAuthContext, type AuthContext } from "../auth/context";

/**
 * Custom tRPC context for PENTRIX
 * Uses JWT-based authentication instead of Manus OAuth
 */
export type TrpcContext = AuthContext;

/**
 * Create context for each tRPC request
 * Authenticates user via JWT token from cookies
 */
export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  return createAuthContext(opts.req, opts.res);
}
