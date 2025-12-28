import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Age Verification Middleware
 * 
 * Enforces 18+ age restriction for fantasy cricket participation
 * as per Indian fantasy sports regulations.
 * 
 * Checks:
 * 1. User must be logged in
 * 2. Date of birth must be provided
 * 3. User must be at least 18 years old
 * 4. Logs all verification attempts for compliance audit
 */

const MINIMUM_AGE = 18;

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  
  // Adjust age if birthday hasn't occurred this year yet
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Verify if user meets minimum age requirement
 */
export async function verifyAge(userId: number): Promise<{
  isEligible: boolean;
  age?: number;
  reason?: string;
}> {
  const db = await getDb();
  if (!db) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Database connection unavailable",
    });
  }

  try {
    // Fetch user data
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (result.length === 0) {
      return {
        isEligible: false,
        reason: "User not found",
      };
    }

    const user = result[0];

    // Check if date of birth is provided
    if (!user.dateOfBirth) {
      return {
        isEligible: false,
        reason: "Date of birth not provided. Please complete your profile.",
      };
    }

    // Calculate age
    const age = calculateAge(new Date(user.dateOfBirth));

    // Check minimum age requirement
    if (age < MINIMUM_AGE) {
      return {
        isEligible: false,
        age,
        reason: `You must be at least ${MINIMUM_AGE} years old to participate in fantasy cricket. Current age: ${age}`,
      };
    }

    // User is eligible
    return {
      isEligible: true,
      age,
    };
  } catch (error) {
    console.error("[Age Verification] Error:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to verify age eligibility",
    });
  }
}

/**
 * Age verification middleware for tRPC procedures
 * 
 * Usage:
 * ```ts
 * const ageVerifiedProcedure = protectedProcedure.use(ageVerificationMiddleware);
 * ```
 */
export const ageVerificationMiddleware = async ({ ctx, next }: any) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this feature",
    });
  }

  const verification = await verifyAge(ctx.user.id);

  if (!verification.isEligible) {
    // Log failed verification attempt
    await logComplianceEvent({
      userId: ctx.user.id,
      action: "AGE_VERIFICATION_FAILED",
      details: {
        reason: verification.reason,
        age: verification.age,
      },
      ipAddress: ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown",
      userAgent: ctx.req.headers["user-agent"] || "unknown",
    });

    throw new TRPCError({
      code: "FORBIDDEN",
      message: verification.reason || "Age verification failed",
    });
  }

  // Log successful verification
  await logComplianceEvent({
    userId: ctx.user.id,
    action: "AGE_VERIFICATION_PASSED",
    details: {
      age: verification.age,
    },
    ipAddress: ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown",
    userAgent: ctx.req.headers["user-agent"] || "unknown",
  });

  return next({
    ctx: {
      ...ctx,
      userAge: verification.age,
    },
  });
};

/**
 * Log compliance events for audit trail
 */
async function logComplianceEvent(event: {
  userId: number;
  action: string;
  details: any;
  ipAddress: string;
  userAgent: string;
}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Compliance] Cannot log event: database unavailable");
    return;
  }

  try {
    await db.execute(`
      INSERT INTO complianceLogs 
      (userId, action, details, ipAddress, userAgent, timestamp, state)
      VALUES (${event.userId}, '${event.action}', '${JSON.stringify(event.details).replace(/'/g, "''")}', '${event.ipAddress}', '${event.userAgent}', NOW(), NULL)
    `);

    console.log(`[Compliance] Logged: ${event.action} for user ${event.userId}`);
  } catch (error) {
    console.error("[Compliance] Failed to log event:", error);
    // Don't throw - logging failure shouldn't block the request
  }
}

/**
 * Validate date of birth format and range
 */
export function validateDateOfBirth(dob: string): {
  isValid: boolean;
  error?: string;
  date?: Date;
} {
  try {
    const date = new Date(dob);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return {
        isValid: false,
        error: "Invalid date format. Please use YYYY-MM-DD format.",
      };
    }

    // Check if date is in the future
    if (date > new Date()) {
      return {
        isValid: false,
        error: "Date of birth cannot be in the future.",
      };
    }

    // Check if date is too far in the past (e.g., more than 120 years ago)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    
    if (date < minDate) {
      return {
        isValid: false,
        error: "Invalid date of birth. Please check the year.",
      };
    }

    // Calculate age
    const age = calculateAge(date);
    
    if (age < MINIMUM_AGE) {
      return {
        isValid: false,
        error: `You must be at least ${MINIMUM_AGE} years old to register.`,
      };
    }

    return {
      isValid: true,
      date,
    };
  } catch (error) {
    return {
      isValid: false,
      error: "Failed to validate date of birth.",
    };
  }
}
