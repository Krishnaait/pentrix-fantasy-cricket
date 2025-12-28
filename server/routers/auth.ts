import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../_core/trpc";
import { createUser, getUserByEmail, updateLastSignedIn } from "../db";
import { hashPassword, comparePassword, validatePasswordStrength } from "../auth/password";
import { generateToken } from "../auth/jwt";
import { setAuthCookie, clearAuthCookie } from "../auth/context";
import { validateDateOfBirth } from "../middleware/ageVerification";
import { verifyGeolocation } from "../middleware/geoBlocking";

/**
 * Custom authentication router for PENTRIX
 * Handles registration, login, and logout without Manus OAuth
 */
export const authRouter = router({
  /**
   * Get current authenticated user
   */
  me: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  /**
   * Register a new user
   */
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        name: z.string().min(2, "Name must be at least 2 characters"),
        dateOfBirth: z.string(), // ISO date string
        state: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Validate password strength
      const passwordValidation = validatePasswordStrength(input.password);
      if (!passwordValidation.isValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: passwordValidation.error,
        });
      }

      // Check if user already exists
      const existingUser = await getUserByEmail(input.email);
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this email already exists",
        });
      }

      // Validate date of birth and age requirement (18+)
      const dobValidation = validateDateOfBirth(input.dateOfBirth);
      if (!dobValidation.isValid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: dobValidation.error || "Invalid date of birth",
        });
      }

      // Calculate age for storage
      const dob = dobValidation.date!;
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      // Verify geo-location (block restricted states)
      const ipAddress = (ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown") as string;
      const geoVerification = await verifyGeolocation(ipAddress);
      
      if (!geoVerification.isAllowed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: geoVerification.reason || "Registration not allowed from your location",
        });
      }

      // Store detected state if not provided
      const userState = input.state || geoVerification.location?.state || null;

      // Geo-blocking for manually entered restricted states (backup check)
      const restrictedStates = [
        "Assam",
        "Telangana",
        "Tamil Nadu",
        "Odisha",
        "Andhra Pradesh",
        "Nagaland",
        "Sikkim",
      ];

      if (input.state && restrictedStates.includes(input.state)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `Registration is not available in ${input.state} due to local regulations`,
        });
      }

      // Hash password
      const passwordHash = await hashPassword(input.password);

      // Create user
      const result = await createUser({
        email: input.email,
        passwordHash,
        name: input.name,
        dateOfBirth: dob,
        age,
        state: userState,
        isAgeVerified: true,
        isGeoVerified: !input.state || !restrictedStates.includes(input.state),
        isActive: true,
        role: "user",
      });

      // Get the created user
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }

      // Generate JWT token
      const token = await generateToken(user.id, user.email);

      // Set auth cookie
      setAuthCookie(ctx.res, token);

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }),

  /**
   * Login with email and password
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Invalid email address"),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Find user by email
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Check if user is active
      if (!user.isActive) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Your account has been deactivated",
        });
      }

      // Verify password
      const isPasswordValid = await comparePassword(input.password, user.passwordHash);
      if (!isPasswordValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      // Age verification check
      if (user.age < 18) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You must be at least 18 years old to access this platform",
        });
      }

      // Geo-blocking check
      const restrictedStates = [
        "Assam",
        "Telangana",
        "Tamil Nadu",
        "Odisha",
        "Andhra Pradesh",
        "Nagaland",
        "Sikkim",
      ];

      if (user.state && restrictedStates.includes(user.state)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `Access is not available in ${user.state} due to local regulations`,
        });
      }

      // Update last signed in timestamp
      await updateLastSignedIn(user.id);

      // Generate JWT token
      const token = await generateToken(user.id, user.email);

      // Set auth cookie
      setAuthCookie(ctx.res, token);

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }),

  /**
   * Logout current user
   */
  logout: publicProcedure.mutation(({ ctx }) => {
    clearAuthCookie(ctx.res);
    return { success: true };
  }),
});
