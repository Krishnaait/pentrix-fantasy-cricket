import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import * as cricketDataAPI from "../services/cricketdata/api";
import { getDb } from "../db";
import { matches, teams, players, matchSquads } from "../../drizzle/schema";
import { eq, and, gte, lte, desc } from "drizzle-orm";

/**
 * Matches Router
 * 
 * Handles all cricket match-related operations:
 * - Fetching current/upcoming/completed matches
 * - Getting match details
 * - Syncing match data from CricketData API
 * - Managing match squads
 */

export const matchesRouter = router({
  /**
   * Get upcoming matches from active series
   * This is the proper way to fetch truly upcoming matches
   */
  getUpcomingMatches: publicProcedure.query(async () => {
    try {
      const response = await cricketDataAPI.getUpcomingMatches();
      return {
        success: true,
        matches: response.data,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to fetch upcoming matches",
      });
    }
  }),

  /**
   * Get ALL matches (past, present, future)
   * Note: This endpoint returns mostly historical matches
   */
  getAllMatches: publicProcedure
    .input(
      z.object({
        offset: z.number().optional().default(0),
      }).optional().default({ offset: 0 })
    )
    .query(async ({ input }) => {
      try {
        const response = await cricketDataAPI.getAllMatches(input.offset);
        return {
          success: true,
          matches: response.data,
          info: response.info,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch all matches",
        });
      }
    }),

  /**
   * Get all current matches (live + upcoming)
   */
  getCurrentMatches: publicProcedure
    .input(
      z.object({
        offset: z.number().optional().default(0),
      }).optional().default({ offset: 0 })
    )
    .query(async ({ input }) => {
      try {
        const response = await cricketDataAPI.getCurrentMatches(input.offset);
        return {
          success: true,
          matches: response.data,
          info: response.info,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch current matches",
        });
      }
    }),

  /**
   * Get fantasy-enabled matches only
   */
  getFantasyMatches: publicProcedure.query(async () => {
    try {
      const response = await cricketDataAPI.getFantasyEnabledMatches();
      return {
        success: true,
        matches: response.data,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to fetch fantasy matches",
      });
    }
  }),

  /**
   * Get matches by status (live, upcoming, completed)
   */
  getMatchesByStatus: publicProcedure
    .input(
      z.object({
        status: z.enum(["live", "upcoming", "completed"]),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await cricketDataAPI.getMatchesByStatus(input.status);
        return {
          success: true,
          matches: response.data,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch matches",
        });
      }
    }),

  /**
   * Get detailed match information
   */
  getMatchInfo: publicProcedure
    .input(
      z.object({
        matchId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await cricketDataAPI.getMatchInfo(input.matchId);
        return {
          success: true,
          match: response.data,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch match info",
        });
      }
    }),

  /**
   * Get fantasy squad for a match
   */
  getFantasySquad: publicProcedure
    .input(
      z.object({
        matchId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await cricketDataAPI.getFantasySquad(input.matchId);
        return {
          success: true,
          squad: response.data,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch fantasy squad",
        });
      }
    }),

  /**
   * Get live scores for a match
   */
  getLiveScore: publicProcedure
    .input(
      z.object({
        matchId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await cricketDataAPI.getCricScore();
        return {
          success: true,
          score: response,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch live score",
        });
      }
    }),

  /**
   * Get fantasy scorecard (player performances)
   */
  getFantasyScorecard: publicProcedure
    .input(
      z.object({
        matchId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await cricketDataAPI.getFantasyScorecard(input.matchId);
        return {
          success: true,
          scorecard: response.data,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch fantasy scorecard",
        });
      }
    }),

  /**
   * Get fantasy match points
   */
  getFantasyMatchPoints: publicProcedure
    .input(
      z.object({
        matchId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await cricketDataAPI.getFantasyMatchPoints(input.matchId);
        return {
          success: true,
          points: response.data,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch fantasy match points",
        });
      }
    }),

  /**
   * Check if match is eligible for fantasy
   */
  checkFantasyEligibility: publicProcedure
    .input(
      z.object({
        matchId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const isEligible = await cricketDataAPI.isMatchFantasyEligible(input.matchId);
        return {
          success: true,
          isEligible,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to check fantasy eligibility",
        });
      }
    }),

  /**
   * Sync match data from CricketData API to database
   * (Admin only - called by cron jobs)
   */
  syncMatches: protectedProcedure.mutation(async ({ ctx }) => {
    // Only allow admin users to sync
    if (ctx.user.role !== "admin") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Only administrators can sync match data",
      });
    }

    try {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Database connection unavailable",
        });
      }

      // Fetch current matches from API
      const response = await cricketDataAPI.getCurrentMatches();
      let syncedCount = 0;

      // Sync each match to database
      for (const match of response.data) {
        try {
          // Check if match already exists
          const existing = await db
            .select()
            .from(matches)
            .where(eq(matches.apiMatchId, match.id))
            .limit(1);

          // Map match status to enum values
          let matchStatus: "upcoming" | "live" | "completed" | "cancelled" = "upcoming";
          if (match.matchEnded) {
            matchStatus = "completed";
          } else if (match.matchStarted) {
            matchStatus = "live";
          } else if (match.status.toLowerCase().includes("cancel")) {
            matchStatus = "cancelled";
          }

          if (existing.length > 0) {
            // Update existing match
            await db
              .update(matches)
              .set({
                title: match.name,
                matchType: match.matchType,
                status: matchStatus,
                venue: match.venue,
                matchDate: new Date(match.dateTimeGMT),
                team1Name: match.teams[0] || "",
                team2Name: match.teams[1] || "",
                series: match.series_id,
                team1Score: match.score[0] ? `${match.score[0].r}/${match.score[0].w} (${match.score[0].o})` : null,
                team2Score: match.score[1] ? `${match.score[1].r}/${match.score[1].w} (${match.score[1].o})` : null,
                lastSyncedAt: new Date(),
                updatedAt: new Date(),
              })
              .where(eq(matches.apiMatchId, match.id));
          } else {
            // Insert new match - need to create/find teams first
            // For now, use placeholder team IDs (1 and 2)
            await db.insert(matches).values({
              apiMatchId: match.id,
              title: match.name,
              matchType: match.matchType,
              status: matchStatus,
              venue: match.venue,
              matchDate: new Date(match.dateTimeGMT),
              team1Id: 1, // Placeholder - should be resolved from teams table
              team2Id: 2, // Placeholder - should be resolved from teams table
              team1Name: match.teams[0] || "",
              team2Name: match.teams[1] || "",
              series: match.series_id,
              team1Score: match.score[0] ? `${match.score[0].r}/${match.score[0].w} (${match.score[0].o})` : null,
              team2Score: match.score[1] ? `${match.score[1].r}/${match.score[1].w} (${match.score[1].o})` : null,
            });
          }

          syncedCount++;
        } catch (error) {
          console.error(`Failed to sync match ${match.id}:`, error);
        }
      }

      return {
        success: true,
        syncedCount,
        totalMatches: response.data.length,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to sync matches",
      });
    }
  }),
});
