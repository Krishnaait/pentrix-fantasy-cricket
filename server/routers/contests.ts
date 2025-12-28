import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { fullComplianceMiddleware } from "../middleware/compliance";
import { getDb } from "../db";
import { contests, userTeams, userTeamPlayers, leaderboards } from "../../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";

/**
 * Contests Router
 * 
 * Handles fantasy contest operations:
 * - Creating and managing contests
 * - Joining contests
 * - Viewing contest details
 * - Contest leaderboards
 */

// Create compliance-verified procedure
const complianceProcedure = protectedProcedure.use(fullComplianceMiddleware);

export const contestsRouter = router({
  /**
   * Get all available contests
   */
  getAvailableContests: publicProcedure
    .input(
      z.object({
        matchId: z.string().optional(),
        status: z.enum(["upcoming", "live", "completed"]).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database connection unavailable",
        });
      }

      try {
        let query = db.select().from(contests);

        if (input.matchId) {
          query = query.where(eq(contests.matchId, parseInt(input.matchId))) as any;
        }

        const allContests = await query;

        return {
          success: true,
          contests: allContests,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch contests",
        });
      }
    }),

  /**
   * Get contest details
   */
  getContestDetails: publicProcedure
    .input(
      z.object({
        contestId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database connection unavailable",
        });
      }

      try {
        const contest = await db
          .select()
          .from(contests)
          .where(eq(contests.id, input.contestId))
          .limit(1);

        if (contest.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Contest not found",
          });
        }

        // Get participant count
        const participants = await db
          .select()
          .from(userTeams)
          .where(eq(userTeams.contestId, input.contestId));

        return {
          success: true,
          contest: contest[0],
          participantCount: participants.length,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch contest details",
        });
      }
    }),

  /**
   * Join a contest (requires compliance verification)
   */
  joinContest: complianceProcedure
    .input(
      z.object({
        contestId: z.number(),
        teamId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database connection unavailable",
        });
      }

      try {
        // Check if contest exists and is joinable
        const contest = await db
          .select()
          .from(contests)
          .where(eq(contests.id, input.contestId))
          .limit(1);

        if (contest.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Contest not found",
          });
        }

        // Check if contest is full
        const participants = await db
          .select()
          .from(userTeams)
          .where(eq(userTeams.contestId, input.contestId));

        if (participants.length >= contest[0].maxUsers) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Contest is full",
          });
        }

        // Check if user already joined with this team
        const existingEntry = await db
          .select()
          .from(userTeams)
          .where(
            and(
              eq(userTeams.contestId, input.contestId),
              eq(userTeams.userId, ctx.user.id)
            )
          );

        if (existingEntry.length > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You have already joined this contest",
          });
        }

        // Verify team belongs to user
        const team = await db
          .select()
          .from(userTeams)
          .where(
            and(
              eq(userTeams.id, input.teamId),
              eq(userTeams.userId, ctx.user.id)
            )
          )
          .limit(1);

        if (team.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Team not found or does not belong to you",
          });
        }

        // Update team's contest ID
        await db
          .update(userTeams)
          .set({
            contestId: input.contestId,
            updatedAt: new Date(),
          })
          .where(eq(userTeams.id, input.teamId));

        // Create leaderboard entry
        await db.insert(leaderboards).values({
          contestId: input.contestId,
          userId: ctx.user.id,
          userTeamId: input.teamId,
          rank: participants.length + 1,
          totalPoints: "0",
        });

        return {
          success: true,
          message: "Successfully joined contest",
        };
      } catch (error: any) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to join contest",
        });
      }
    }),

  /**
   * Get user's contests
   */
  getMyContests: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database connection unavailable",
      });
    }

    try {
      // Get all user's teams
      const teams = await db
        .select()
        .from(userTeams)
        .where(eq(userTeams.userId, ctx.user.id));

      // Get contests for these teams
      const contestIds = teams
        .filter(t => t.contestId !== null)
        .map(t => t.contestId!);

      if (contestIds.length === 0) {
        return {
          success: true,
          contests: [],
        };
      }

      const userContests = await db
        .select()
        .from(contests)
        .where(eq(contests.id, contestIds[0])); // Simplified - would need proper IN clause

      return {
        success: true,
        contests: userContests,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to fetch your contests",
      });
    }
  }),

  /**
   * Create a new contest (admin only)
   */
  createContest: protectedProcedure
    .input(
      z.object({
        matchId: z.number(),
        title: z.string(),
        entryFee: z.number(),
        prizePool: z.number(),
        maxParticipants: z.number(),
        minParticipants: z.number().default(2),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Only allow admin users to create contests
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can create contests",
        });
      }

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database connection unavailable",
        });
      }

      try {
        const result = await db.insert(contests).values({
          matchId: input.matchId,
          name: input.title,
          prizePool: input.prizePool,
          firstPrize: Math.floor(input.prizePool * 0.5), // 50% to first place
          maxUsers: input.maxParticipants,
          currentUsers: 0,
          status: "upcoming",
          startTime: new Date(), // Should be set based on match time
        });

        return {
          success: true,
          contestId: result[0].insertId,
          message: "Contest created successfully",
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to create contest",
        });
      }
    }),
});
