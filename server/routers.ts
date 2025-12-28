import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { authRouter } from "./routers/auth";
import { matchesRouter } from "./routers/matches";
import { contestsRouter } from "./routers/contests";
import { teamsRouter } from "./routers/teams";
import { leaderboardRouter } from "./routers/leaderboard";

export const appRouter = router({
  system: systemRouter,
  
  // Custom authentication (no Manus OAuth)
  auth: authRouter,
  
  // Cricket match operations
  matches: matchesRouter,
  
  // Fantasy contest operations
  contests: contestsRouter,
  
  // Fantasy team management
  teams: teamsRouter,
  
  // Leaderboard and rankings
  leaderboard: leaderboardRouter,
});

export type AppRouter = typeof appRouter;
