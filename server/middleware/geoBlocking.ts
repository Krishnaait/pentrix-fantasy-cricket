import { TRPCError } from "@trpc/server";
import axios from "axios";

/**
 * Geo-Blocking Middleware
 * 
 * Blocks access from 7 Indian states where fantasy sports are restricted:
 * 1. Assam
 * 2. Telangana
 * 3. Tamil Nadu
 * 4. Odisha
 * 5. Andhra Pradesh
 * 6. Nagaland
 * 7. Sikkim
 * 
 * Uses IP geolocation to determine user's state and blocks accordingly.
 */

// List of restricted Indian states
export const RESTRICTED_STATES = [
  "Assam",
  "Telangana",
  "Tamil Nadu",
  "Odisha",
  "Andhra Pradesh",
  "Nagaland",
  "Sikkim",
];

// State code mappings for various geolocation APIs
const STATE_CODE_MAPPINGS: Record<string, string> = {
  "AS": "Assam",
  "TG": "Telangana",
  "TS": "Telangana", // Alternative code
  "TN": "Tamil Nadu",
  "OD": "Odisha",
  "OR": "Odisha", // Alternative code
  "AP": "Andhra Pradesh",
  "NL": "Nagaland",
  "SK": "Sikkim",
};

interface GeolocationResult {
  country?: string;
  countryCode?: string;
  state?: string;
  stateCode?: string;
  city?: string;
  isRestricted: boolean;
  ipAddress: string;
}

/**
 * Get geolocation from IP address using ip-api.com (free, no API key required)
 */
async function getGeolocationFromIP(ipAddress: string): Promise<GeolocationResult> {
  try {
    // Skip geolocation for localhost/development IPs
    if (
      ipAddress === "127.0.0.1" ||
      ipAddress === "::1" ||
      ipAddress === "localhost" ||
      ipAddress.startsWith("192.168.") ||
      ipAddress.startsWith("10.") ||
      ipAddress.startsWith("172.")
    ) {
      console.log(`[GeoBlocking] Skipping geolocation for local IP: ${ipAddress}`);
      return {
        country: "India",
        countryCode: "IN",
        state: "Unknown",
        isRestricted: false,
        ipAddress,
      };
    }

    // Use ip-api.com for geolocation (free, 45 requests/minute)
    const response = await axios.get(`http://ip-api.com/json/${ipAddress}`, {
      params: {
        fields: "status,message,country,countryCode,region,regionName,city",
      },
      timeout: 5000,
    });

    const data = response.data;

    if (data.status === "fail") {
      console.warn(`[GeoBlocking] Geolocation failed for ${ipAddress}:`, data.message);
      return {
        isRestricted: false,
        ipAddress,
      };
    }

    // Extract state information
    const stateName = data.regionName || data.region;
    const stateCode = data.region;

    // Map state code to full name if needed
    const mappedState = STATE_CODE_MAPPINGS[stateCode] || stateName;

    // Check if state is restricted
    const isRestricted =
      data.countryCode === "IN" &&
      RESTRICTED_STATES.some(
        (restrictedState) =>
          mappedState?.toLowerCase().includes(restrictedState.toLowerCase()) ||
          restrictedState.toLowerCase().includes(mappedState?.toLowerCase() || "")
      );

    console.log(
      `[GeoBlocking] IP ${ipAddress} -> ${data.country}, ${mappedState} (Restricted: ${isRestricted})`
    );

    return {
      country: data.country,
      countryCode: data.countryCode,
      state: mappedState,
      stateCode: stateCode,
      city: data.city,
      isRestricted,
      ipAddress,
    };
  } catch (error) {
    console.error("[GeoBlocking] Error fetching geolocation:", error);
    
    // In case of geolocation service failure, allow access by default
    // (better to allow than to falsely block legitimate users)
    return {
      isRestricted: false,
      ipAddress,
    };
  }
}

/**
 * Verify if user's location is allowed
 */
export async function verifyGeolocation(ipAddress: string): Promise<{
  isAllowed: boolean;
  location?: GeolocationResult;
  reason?: string;
}> {
  try {
    const location = await getGeolocationFromIP(ipAddress);

    if (location.isRestricted) {
      return {
        isAllowed: false,
        location,
        reason: `Access to fantasy cricket is restricted in ${location.state}. This service is not available in your region due to local regulations.`,
      };
    }

    return {
      isAllowed: true,
      location,
    };
  } catch (error) {
    console.error("[GeoBlocking] Error verifying geolocation:", error);
    
    // In case of error, allow access (fail-open approach)
    return {
      isAllowed: true,
      reason: "Geolocation verification unavailable",
    };
  }
}

/**
 * Geo-blocking middleware for tRPC procedures
 * 
 * Usage:
 * ```ts
 * const geoVerifiedProcedure = publicProcedure.use(geoBlockingMiddleware);
 * ```
 */
export const geoBlockingMiddleware = async ({ ctx, next }: any) => {
  // Extract IP address from request
  const ipAddress =
    ctx.req.ip ||
    ctx.req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    ctx.req.headers["x-real-ip"] ||
    ctx.req.connection?.remoteAddress ||
    "unknown";

  console.log(`[GeoBlocking] Checking IP: ${ipAddress}`);

  const verification = await verifyGeolocation(ipAddress);

  if (!verification.isAllowed) {
    // Log blocked access attempt
    if (ctx.user) {
      await logComplianceEvent({
        userId: ctx.user.id,
        action: "GEO_BLOCKING_TRIGGERED",
        details: {
          reason: verification.reason,
          location: verification.location,
        },
        ipAddress,
        userAgent: ctx.req.headers["user-agent"] || "unknown",
      });
    }

    throw new TRPCError({
      code: "FORBIDDEN",
      message: verification.reason || "Access denied from your location",
    });
  }

  // Log successful verification
  if (ctx.user) {
    await logComplianceEvent({
      userId: ctx.user.id,
      action: "GEO_VERIFICATION_PASSED",
      details: {
        location: verification.location,
      },
      ipAddress,
      userAgent: ctx.req.headers["user-agent"] || "unknown",
    });
  }

  return next({
    ctx: {
      ...ctx,
      userLocation: verification.location,
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
  try {
    const { getDb } = await import("../db");
    const db = await getDb();
    
    if (!db) {
      console.warn("[Compliance] Cannot log event: database unavailable");
      return;
    }

    const state = event.details?.location?.state || null;

    await db.execute(`
      INSERT INTO complianceLogs 
      (userId, action, details, ipAddress, userAgent, timestamp, state)
      VALUES (${event.userId}, '${event.action}', '${JSON.stringify(event.details).replace(/'/g, "''")}', '${event.ipAddress}', '${event.userAgent}', NOW(), ${state ? `'${state}'` : 'NULL'})
    `);

    console.log(`[Compliance] Logged: ${event.action} for user ${event.userId}`);
  } catch (error) {
    console.error("[Compliance] Failed to log event:", error);
    // Don't throw - logging failure shouldn't block the request
  }
}

/**
 * Check if a state name is restricted
 */
export function isStateRestricted(stateName: string): boolean {
  return RESTRICTED_STATES.some(
    (restrictedState) =>
      stateName.toLowerCase().includes(restrictedState.toLowerCase()) ||
      restrictedState.toLowerCase().includes(stateName.toLowerCase())
  );
}

/**
 * Get list of restricted states (for display purposes)
 */
export function getRestrictedStates(): string[] {
  return [...RESTRICTED_STATES];
}
