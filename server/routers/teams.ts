import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../_core/trpc";
import { fullComplianceMiddleware } from "../middleware/compliance";
import { getDb } from "../db";
import { userTeams, userTeamPlayers, players } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";

/**
 * Teams Router
 * 
 * Handles fantasy team operations:
 * - Creating fantasy teams
 * - Selecting players
 * - Setting captain/vice-captain
 * - Viewing user's teams
 */

// Create compliance-verified procedure
const complianceProcedure = protectedProcedure.use(fullComplianceMiddleware);

export const teamsRouter = router({
  /**
   * Get user's fantasy teams
   */
  getMyTeams: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database connection unavailable",
      });
    }

    try {
      const teams = await db
        .select()
        .from(userTeams)
        .where(eq(userTeams.userId, ctx.user.id));

      return {
        success: true,
        teams,
      };
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message || "Failed to fetch your teams",
      });
    }
  }),

  /**
   * Get team details with players
   */
  getTeamDetails: protectedProcedure
    .input(
      z.object({
        teamId: z.number(),
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
        // Get team
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

        // Get team players
        const teamPlayers = await db
          .select()
          .from(userTeamPlayers)
          .where(eq(userTeamPlayers.userTeamId, input.teamId));

        return {
          success: true,
          team: team[0],
          players: teamPlayers,
        };
      } catch (error: any) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to fetch team details",
        });
      }
    }),

  /**
   * Create a new fantasy team (requires compliance verification)
   */
  createTeam: complianceProcedure
    .input(
      z.object({
        matchId: z.number(),
        teamName: z.string().min(3).max(50),
        players: z.array(
          z.object({
            playerId: z.number(),
            role: z.enum(["batsman", "bowler", "allrounder", "wicketkeeper"]),
          })
        ).min(11).max(11), // Exactly 11 players
        captainId: z.number(),
        viceCaptainId: z.number(),
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
        // Validate captain and vice-captain are in the team
        const playerIds = input.players.map(p => p.playerId);
        
        if (!playerIds.includes(input.captainId)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Captain must be one of the selected players",
          });
        }

        if (!playerIds.includes(input.viceCaptainId)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Vice-captain must be one of the selected players",
          });
        }

        if (input.captainId === input.viceCaptainId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Captain and vice-captain must be different players",
          });
        }

        // Create team
        const result = await db.insert(userTeams).values({
          userId: ctx.user.id,
          contestId: 0, // Will be set when joining a contest
          matchId: input.matchId,
          teamName: input.teamName,
          captainId: input.captainId,
          viceCaptainId: input.viceCaptainId,
          totalPlayers: input.players.length,
          totalCredits: "100", // Default credit budget
        });

        const teamId = result[0].insertId;

        // Add players to team
        for (const player of input.players) {
          await db.insert(userTeamPlayers).values({
            userTeamId: teamId,
            playerId: player.playerId,
            isCaptain: player.playerId === input.captainId,
            isViceCaptain: player.playerId === input.viceCaptainId,
          });
        }

        return {
          success: true,
          teamId,
          message: "Fantasy team created successfully",
        };
      } catch (error: any) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to create team",
        });
      }
    }),

  /**
   * Update team name
   */
  updateTeamName: protectedProcedure
    .input(
      z.object({
        teamId: z.number(),
        teamName: z.string().min(3).max(50),
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

        // Update team name
        await db
          .update(userTeams)
          .set({
            teamName: input.teamName,
            updatedAt: new Date(),
          })
          .where(eq(userTeams.id, input.teamId));

        return {
          success: true,
          message: "Team name updated successfully",
        };
      } catch (error: any) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to update team name",
        });
      }
    }),

  /**
   * Delete a team
   */
  deleteTeam: protectedProcedure
    .input(
      z.object({
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

        // Check if team is in a contest
        if (team[0].contestId !== null) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot delete a team that is in a contest",
          });
        }

        // Delete team players first
        await db
          .delete(userTeamPlayers)
          .where(eq(userTeamPlayers.userTeamId, input.teamId));

        // Delete team
        await db
          .delete(userTeams)
          .where(eq(userTeams.id, input.teamId));

        return {
          success: true,
          message: "Team deleted successfully",
        };
      } catch (error: any) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to delete team",
        });
      }
    }),
});
