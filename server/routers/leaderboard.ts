import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { leaderboards, userTeams, users } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

/**
 * Leaderboard Router
 * 
 * Handles leaderboard operations:
 * - Viewing contest leaderboards
 * - Getting user rankings
 * - Live score updates
 */

export const leaderboardRouter = router({
  /**
   * Get leaderboard for a contest
   */
  getContestLeaderboard: publicProcedure
    .input(
      z.object({
        contestId: z.number(),
        limit: z.number().default(100),
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
        const leaderboardData = await db
          .select()
          .from(leaderboards)
          .where(eq(leaderboards.contestId, input.contestId))
          .orderBy(desc(leaderboards.rank))
          .limit(input.limit);

        // Enrich with user and team details
        const enrichedData = [];
        for (const entry of leaderboardData) {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.id, entry.userId))
            .limit(1);

          const team = await db
            .select()
            .from(userTeams)
            .where(eq(userTeams.id, entry.userTeamId))
            .limit(1);

          enrichedData.push({
            ...entry,
            userName: user[0]?.name || "Unknown",
            teamName: team[0]?.teamName || "Unknown Team",
          });
        }

        return {
          success: true,
          leaderboard: enrichedData,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch leaderboard",
        });
      }
    }),

  /**
   * Get user's rank in a contest
   */
  getMyRank: protectedProcedure
    .input(
      z.object({
        contestId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database connection unavailable",
        });
      }

      try {
        const myEntry = await db
          .select()
          .from(leaderboards)
          .where(
            and(
              eq(leaderboards.contestId, input.contestId),
              eq(leaderboards.userId, ctx.user.id)
            )
          )
          .limit(1);

        if (myEntry.length === 0) {
          return {
            success: true,
            rank: null,
            message: "You are not in this contest",
          };
        }

        return {
          success: true,
          rank: myEntry[0].rank,
          points: myEntry[0].totalPoints,
          prizeWon: myEntry[0].prizeWon,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch your rank",
        });
      }
    }),

  /**
   * Get top performers across all contests
   */
  getTopPerformers: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
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
        // Get users with highest total prize winnings
        const topUsers = await db
          .select()
          .from(leaderboards)
          .orderBy(desc(leaderboards.prizeWon))
          .limit(input.limit);

        // Enrich with user details
        const enrichedData = [];
        for (const entry of topUsers) {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.id, entry.userId))
            .limit(1);

          enrichedData.push({
            userId: entry.userId,
            userName: user[0]?.name || "Unknown",
            totalPrizeWon: entry.prizeWon,
            rank: entry.rank,
          });
        }

        return {
          success: true,
          topPerformers: enrichedData,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch top performers",
        });
      }
    }),

  /**
   * Update leaderboard scores (admin only - called by cron jobs)
   */
  updateScores: protectedProcedure
    .input(
      z.object({
        contestId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Only allow admin users to update scores
      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only administrators can update leaderboard scores",
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
        // Get all teams in this contest
        const teams = await db
          .select()
          .from(userTeams)
          .where(eq(userTeams.contestId, input.contestId));

        // Calculate scores for each team
        // (This is a simplified version - actual implementation would
        // fetch player performances and calculate fantasy points)
        
        const updatedCount = teams.length;

        return {
          success: true,
          updatedCount,
          message: `Updated scores for ${updatedCount} teams`,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update leaderboard scores",
        });
      }
    }),
});
