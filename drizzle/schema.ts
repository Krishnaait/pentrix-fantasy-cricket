import { 
  int, 
  mysqlEnum, 
  mysqlTable, 
  text, 
  timestamp, 
  varchar, 
  boolean,
  decimal,
  index,
  unique
} from "drizzle-orm/mysql-core";

/**
 * PENTRIX Database Schema
 * 
 * Core tables for fantasy cricket platform:
 * - Users (with age verification and geo-location)
 * - Cricket Matches (from CricketData API)
 * - Cricket Teams (real teams)
 * - Cricket Players (real players)
 * - Fantasy Contests
 * - User Fantasy Teams
 * - Leaderboards
 * - Compliance Logs
 */

// ==================== USERS & AUTHENTICATION ====================

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  
  // Basic info
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  name: text("name").notNull(),
  
  // Compliance fields
  dateOfBirth: timestamp("dateOfBirth").notNull(), // For age verification (18+)
  age: int("age").notNull(), // Calculated from dateOfBirth
  state: varchar("state", { length: 100 }), // Indian state for geo-blocking
  isAgeVerified: boolean("isAgeVerified").default(false).notNull(),
  isGeoVerified: boolean("isGeoVerified").default(false).notNull(),
  
  // Account status
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("email_idx").on(table.email),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ==================== PASSWORD RESET TOKENS ====================

export const passwordResetTokens = mysqlTable("passwordResetTokens", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  used: boolean("used").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  tokenIdx: index("token_idx").on(table.token),
  userIdIdx: index("userId_idx").on(table.userId),
}));

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type InsertPasswordResetToken = typeof passwordResetTokens.$inferInsert;

// ==================== CRICKET MATCHES ====================

export const matches = mysqlTable("matches", {
  id: int("id").autoincrement().primaryKey(),
  
  // Match identification (from CricketData API)
  apiMatchId: varchar("apiMatchId", { length: 100 }).notNull().unique(),
  
  // Match details
  title: varchar("title", { length: 500 }).notNull(),
  matchType: varchar("matchType", { length: 50 }).notNull(), // T20, ODI, Test
  venue: varchar("venue", { length: 300 }),
  city: varchar("city", { length: 100 }),
  
  // Teams
  team1Id: int("team1Id").notNull(),
  team2Id: int("team2Id").notNull(),
  team1Name: varchar("team1Name", { length: 200 }).notNull(),
  team2Name: varchar("team2Name", { length: 200 }).notNull(),
  
  // Match timing
  matchDate: timestamp("matchDate").notNull(),
  startTime: timestamp("startTime"),
  endTime: timestamp("endTime"),
  
  // Match status
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  
  // Match result
  winnerId: int("winnerId"),
  winnerName: varchar("winnerName", { length: 200 }),
  winMargin: varchar("winMargin", { length: 200 }),
  
  // Toss details
  tossWinner: varchar("tossWinner", { length: 200 }),
  tossDecision: varchar("tossDecision", { length: 50 }),
  
  // Scores
  team1Score: varchar("team1Score", { length: 100 }),
  team2Score: varchar("team2Score", { length: 100 }),
  
  // Metadata
  series: varchar("series", { length: 300 }),
  season: varchar("season", { length: 100 }),
  
  // Sync tracking
  lastSyncedAt: timestamp("lastSyncedAt").defaultNow().notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  apiMatchIdIdx: index("apiMatchId_idx").on(table.apiMatchId),
  statusIdx: index("status_idx").on(table.status),
  matchDateIdx: index("matchDate_idx").on(table.matchDate),
}));

export type Match = typeof matches.$inferSelect;
export type InsertMatch = typeof matches.$inferInsert;

// ==================== CRICKET TEAMS ====================

export const teams = mysqlTable("teams", {
  id: int("id").autoincrement().primaryKey(),
  
  // Team identification (from CricketData API)
  apiTeamId: varchar("apiTeamId", { length: 100 }).notNull().unique(),
  
  // Team details
  name: varchar("name", { length: 200 }).notNull(),
  shortName: varchar("shortName", { length: 50 }),
  country: varchar("country", { length: 100 }),
  logoUrl: text("logoUrl"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  apiTeamIdIdx: index("apiTeamId_idx").on(table.apiTeamId),
}));

export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;

// ==================== CRICKET PLAYERS ====================

export const players = mysqlTable("players", {
  id: int("id").autoincrement().primaryKey(),
  
  // Player identification (from CricketData API)
  apiPlayerId: varchar("apiPlayerId", { length: 100 }).notNull().unique(),
  
  // Player details
  name: varchar("name", { length: 200 }).notNull(),
  teamId: int("teamId").notNull(),
  teamName: varchar("teamName", { length: 200 }),
  
  // Player role
  role: mysqlEnum("role", ["batsman", "bowler", "allrounder", "wicketkeeper"]).notNull(),
  
  // Player stats (for fantasy points calculation)
  battingStyle: varchar("battingStyle", { length: 100 }),
  bowlingStyle: varchar("bowlingStyle", { length: 100 }),
  
  // Fantasy credits (for team budget)
  credits: decimal("credits", { precision: 4, scale: 1 }).default("8.5").notNull(),
  
  // Player image
  imageUrl: text("imageUrl"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  apiPlayerIdIdx: index("apiPlayerId_idx").on(table.apiPlayerId),
  teamIdIdx: index("teamId_idx").on(table.teamId),
  roleIdx: index("role_idx").on(table.role),
}));

export type Player = typeof players.$inferSelect;
export type InsertPlayer = typeof players.$inferInsert;

// ==================== MATCH SQUADS ====================

export const matchSquads = mysqlTable("matchSquads", {
  id: int("id").autoincrement().primaryKey(),
  matchId: int("matchId").notNull(),
  playerId: int("playerId").notNull(),
  teamId: int("teamId").notNull(),
  isPlaying: boolean("isPlaying").default(false).notNull(), // Playing XI
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  matchPlayerIdx: unique("match_player_unique").on(table.matchId, table.playerId),
  matchIdIdx: index("matchId_idx").on(table.matchId),
}));

export type MatchSquad = typeof matchSquads.$inferSelect;
export type InsertMatchSquad = typeof matchSquads.$inferInsert;

// ==================== FANTASY CONTESTS ====================

export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  
  // Contest details
  matchId: int("matchId").notNull(),
  name: varchar("name", { length: 300 }).notNull(),
  description: text("description"),
  
  // Contest type (all free-to-play)
  contestType: mysqlEnum("contestType", ["public", "private"]).default("public").notNull(),
  
  // Entry constraints
  maxUsers: int("maxUsers").default(10000).notNull(),
  currentUsers: int("currentUsers").default(0).notNull(),
  
  // Contest status
  status: mysqlEnum("status", ["upcoming", "live", "completed", "cancelled"]).default("upcoming").notNull(),
  
  // Prizes (virtual/points only - free to play)
  prizePool: int("prizePool").default(0).notNull(), // Virtual points
  firstPrize: int("firstPrize").default(0).notNull(),
  
  // Contest timing
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  matchIdIdx: index("matchId_idx").on(table.matchId),
  statusIdx: index("status_idx").on(table.status),
}));

export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;

// ==================== USER FANTASY TEAMS ====================

export const userTeams = mysqlTable("userTeams", {
  id: int("id").autoincrement().primaryKey(),
  
  // Ownership
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  matchId: int("matchId").notNull(),
  
  // Team details
  teamName: varchar("teamName", { length: 200 }).notNull(),
  
  // Captain and vice-captain (2x and 1.5x points)
  captainId: int("captainId").notNull(),
  viceCaptainId: int("viceCaptainId").notNull(),
  
  // Team composition validation
  totalPlayers: int("totalPlayers").default(11).notNull(),
  totalCredits: decimal("totalCredits", { precision: 5, scale: 1 }).notNull(),
  
  // Team status
  isSubmitted: boolean("isSubmitted").default(false).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userContestIdx: index("user_contest_idx").on(table.userId, table.contestId),
  contestIdIdx: index("contestId_idx").on(table.contestId),
  matchIdIdx: index("matchId_idx").on(table.matchId),
}));

export type UserTeam = typeof userTeams.$inferSelect;
export type InsertUserTeam = typeof userTeams.$inferInsert;

// ==================== USER TEAM PLAYERS (Junction Table) ====================

export const userTeamPlayers = mysqlTable("userTeamPlayers", {
  id: int("id").autoincrement().primaryKey(),
  userTeamId: int("userTeamId").notNull(),
  playerId: int("playerId").notNull(),
  
  // Player role in user's team
  isCaptain: boolean("isCaptain").default(false).notNull(),
  isViceCaptain: boolean("isViceCaptain").default(false).notNull(),
  
  // Points tracking
  points: decimal("points", { precision: 6, scale: 2 }).default("0").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  teamPlayerIdx: unique("team_player_unique").on(table.userTeamId, table.playerId),
  userTeamIdIdx: index("userTeamId_idx").on(table.userTeamId),
}));

export type UserTeamPlayer = typeof userTeamPlayers.$inferSelect;
export type InsertUserTeamPlayer = typeof userTeamPlayers.$inferInsert;

// ==================== PLAYER PERFORMANCE (Live Scoring) ====================

export const playerPerformances = mysqlTable("playerPerformances", {
  id: int("id").autoincrement().primaryKey(),
  
  matchId: int("matchId").notNull(),
  playerId: int("playerId").notNull(),
  
  // Batting stats
  runs: int("runs").default(0).notNull(),
  ballsFaced: int("ballsFaced").default(0).notNull(),
  fours: int("fours").default(0).notNull(),
  sixes: int("sixes").default(0).notNull(),
  strikeRate: decimal("strikeRate", { precision: 6, scale: 2 }).default("0").notNull(),
  
  // Bowling stats
  wickets: int("wickets").default(0).notNull(),
  oversBowled: decimal("oversBowled", { precision: 4, scale: 1 }).default("0").notNull(),
  runsConceded: int("runsConceded").default(0).notNull(),
  maidens: int("maidens").default(0).notNull(),
  economy: decimal("economy", { precision: 5, scale: 2 }).default("0").notNull(),
  
  // Fielding stats
  catches: int("catches").default(0).notNull(),
  stumpings: int("stumpings").default(0).notNull(),
  runOuts: int("runOuts").default(0).notNull(),
  
  // Fantasy points
  fantasyPoints: decimal("fantasyPoints", { precision: 6, scale: 2 }).default("0").notNull(),
  
  // Sync tracking
  lastUpdatedAt: timestamp("lastUpdatedAt").defaultNow().onUpdateNow().notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  matchPlayerIdx: unique("match_player_perf_unique").on(table.matchId, table.playerId),
  matchIdIdx: index("matchId_idx").on(table.matchId),
}));

export type PlayerPerformance = typeof playerPerformances.$inferSelect;
export type InsertPlayerPerformance = typeof playerPerformances.$inferInsert;

// ==================== LEADERBOARD ====================

export const leaderboards = mysqlTable("leaderboards", {
  id: int("id").autoincrement().primaryKey(),
  
  contestId: int("contestId").notNull(),
  userId: int("userId").notNull(),
  userTeamId: int("userTeamId").notNull(),
  
  // Ranking
  rank: int("rank").notNull(),
  totalPoints: decimal("totalPoints", { precision: 8, scale: 2 }).default("0").notNull(),
  
  // Prize (virtual points only)
  prizeWon: int("prizeWon").default(0).notNull(),
  
  // Tracking
  lastUpdatedAt: timestamp("lastUpdatedAt").defaultNow().onUpdateNow().notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  contestUserIdx: unique("contest_user_unique").on(table.contestId, table.userId),
  contestIdIdx: index("contestId_idx").on(table.contestId),
  rankIdx: index("rank_idx").on(table.rank),
}));

export type Leaderboard = typeof leaderboards.$inferSelect;
export type InsertLeaderboard = typeof leaderboards.$inferInsert;

// ==================== COMPLIANCE LOGS ====================

export const complianceLogs = mysqlTable("complianceLogs", {
  id: int("id").autoincrement().primaryKey(),
  
  userId: int("userId"),
  
  // Action details
  action: varchar("action", { length: 200 }).notNull(), // "registration", "login", "contest_join", "age_check", "geo_check"
  result: mysqlEnum("result", ["allowed", "blocked"]).notNull(),
  reason: text("reason"),
  
  // Location data
  ipAddress: varchar("ipAddress", { length: 45 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }),
  
  // User agent
  userAgent: text("userAgent"),
  
  // Metadata
  metadata: text("metadata"), // JSON string for additional data
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("userId_idx").on(table.userId),
  actionIdx: index("action_idx").on(table.action),
  createdAtIdx: index("createdAt_idx").on(table.createdAt),
}));

export type ComplianceLog = typeof complianceLogs.$inferSelect;
export type InsertComplianceLog = typeof complianceLogs.$inferInsert;
