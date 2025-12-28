import { TRPCError } from "@trpc/server";
import { ageVerificationMiddleware } from "./ageVerification";
import { geoBlockingMiddleware } from "./geoBlocking";

/**
 * Combined Compliance Middleware
 * 
 * Enforces both age verification (18+) and geo-blocking (7 restricted states)
 * in a single middleware chain for fantasy cricket participation.
 * 
 * This middleware should be used for all fantasy-related operations:
 * - Creating fantasy teams
 * - Joining contests
 * - Viewing fantasy squads
 * - Accessing leaderboards
 */

/**
 * Full compliance middleware (age + geo-blocking)
 * 
 * Usage:
 * ```ts
 * const complianceProcedure = protectedProcedure.use(fullComplianceMiddleware);
 * ```
 */
export const fullComplianceMiddleware = async ({ ctx, next }: any) => {
  // First check authentication
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access fantasy cricket features",
    });
  }

  // Run geo-blocking check first (faster, doesn't require DB query)
  await geoBlockingMiddleware({ ctx, next: async () => {} });

  // Then run age verification (requires DB query)
  return ageVerificationMiddleware({ ctx, next });
};

/**
 * Export individual middlewares for granular control
 */
export { ageVerificationMiddleware, geoBlockingMiddleware };

/**
 * Export utility functions
 */
export {
  calculateAge,
  verifyAge,
  validateDateOfBirth,
} from "./ageVerification";

export {
  verifyGeolocation,
  isStateRestricted,
  getRestrictedStates,
  RESTRICTED_STATES,
} from "./geoBlocking";
