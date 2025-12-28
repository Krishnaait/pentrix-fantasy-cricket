# PENTRIX Database Schema

This document describes the database schema for the PENTRIX fantasy cricket platform.

---

## Database Tables

The following 12 tables have been created in your Railway MySQL database:

### 1. **users**
Stores user account information and authentication details.

**Columns:**
- `id` - Primary key (auto-increment)
- `openId` - OAuth open ID
- `name` - User's full name
- `email` - User's email address (unique)
- `avatar` - Profile picture URL
- `role` - User role (admin/user)
- `passwordHash` - Hashed password for local authentication
- `dateOfBirth` - User's date of birth
- `age` - User's age
- `state` - User's state of residence (for geo-restrictions)
- `phoneNumber` - User's phone number
- `isVerified` - Email verification status
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

---

### 2. **passwordResetTokens**
Manages password reset tokens for user account recovery.

**Columns:**
- `id` - Primary key
- `userId` - Foreign key to users table
- `token` - Reset token (unique)
- `expiresAt` - Token expiration timestamp
- `createdAt` - Token creation timestamp

---

### 3. **matches**
Stores cricket match information from CricketData API.

**Columns:**
- `id` - Match ID from CricketData API (primary key)
- `name` - Match name (e.g., "India vs Australia")
- `matchType` - Match format (T20/ODI/Test)
- `status` - Match status (upcoming/live/completed)
- `venue` - Match venue
- `date` - Match date and time
- `dateTimeGMT` - Match time in GMT
- `teams` - Participating teams (JSON)
- `teamInfo` - Team information (JSON)
- `score` - Current/final score (JSON)
- `series_id` - Series ID
- `fantasyEnabled` - Whether fantasy is enabled for this match
- `hasSquad` - Whether squad is available
- `matchStarted` - Match started flag
- `matchEnded` - Match ended flag

---

### 4. **teams**
Stores fantasy teams created by users.

**Columns:**
- `id` - Primary key (auto-increment)
- `userId` - Foreign key to users table
- `matchId` - Foreign key to matches table
- `teamName` - User-defined team name
- `captainId` - Player ID of captain
- `viceCaptainId` - Player ID of vice-captain
- `totalCredits` - Total credits used (max 100)
- `createdAt` - Team creation timestamp
- `updatedAt` - Last update timestamp

---

### 5. **players**
Stores cricket player information.

**Columns:**
- `id` - Player ID from CricketData API (primary key)
- `name` - Player name
- `role` - Player role (WK/BAT/AR/BOWL)
- `teamId` - Cricket team ID
- `credits` - Fantasy credits value
- `imageUrl` - Player image URL
- `stats` - Player statistics (JSON)

---

### 6. **matchSquads**
Links players to specific matches (playing XI).

**Columns:**
- `id` - Primary key (auto-increment)
- `matchId` - Foreign key to matches table
- `playerId` - Foreign key to players table
- `teamId` - Cricket team ID
- `isPlaying` - Whether player is in playing XI
- `createdAt` - Record creation timestamp

---

### 7. **contests**
Stores contest information for matches.

**Columns:**
- `id` - Primary key (auto-increment)
- `matchId` - Foreign key to matches table
- `name` - Contest name
- `entryFee` - Entry fee (0 for free contests)
- `prizePool` - Total prize pool
- `totalSpots` - Total available spots
- `filledSpots` - Number of filled spots
- `maxTeamsPerUser` - Maximum teams per user (default 11)
- `contestType` - Contest type (public/private)
- `status` - Contest status (upcoming/live/completed)
- `createdAt` - Contest creation timestamp

---

### 8. **userTeams**
Links users' teams to specific contests.

**Columns:**
- `id` - Primary key (auto-increment)
- `userId` - Foreign key to users table
- `teamId` - Foreign key to teams table
- `contestId` - Foreign key to contests table
- `joinedAt` - Timestamp when user joined contest

---

### 9. **userTeamPlayers**
Stores the 11 players selected in each fantasy team.

**Columns:**
- `id` - Primary key (auto-increment)
- `teamId` - Foreign key to teams table
- `playerId` - Foreign key to players table
- `isCaptain` - Captain flag (2x points)
- `isViceCaptain` - Vice-captain flag (1.5x points)

---

### 10. **playerPerformances**
Stores player performance data for completed matches.

**Columns:**
- `id` - Primary key (auto-increment)
- `matchId` - Foreign key to matches table
- `playerId` - Foreign key to players table
- `runs` - Runs scored
- `wickets` - Wickets taken
- `catches` - Catches taken
- `stumpings` - Stumpings (for wicket-keepers)
- `runOuts` - Run outs
- `strikeRate` - Batting strike rate
- `economyRate` - Bowling economy rate
- `fantasyPoints` - Total fantasy points earned
- `createdAt` - Record creation timestamp

---

### 11. **leaderboards**
Stores contest leaderboard rankings.

**Columns:**
- `id` - Primary key (auto-increment)
- `contestId` - Foreign key to contests table
- `userId` - Foreign key to users table
- `teamId` - Foreign key to teams table
- `totalPoints` - Total fantasy points
- `rank` - User's rank in contest
- `prize` - Prize amount won (if any)
- `updatedAt` - Last update timestamp

---

### 12. **complianceLogs**
Logs compliance-related events (age verification, geo-restrictions, etc.).

**Columns:**
- `id` - Primary key (auto-increment)
- `userId` - Foreign key to users table
- `action` - Action type (registration/verification/restriction)
- `details` - Action details (JSON)
- `ipAddress` - User's IP address
- `createdAt` - Log creation timestamp

---

## Database Relationships

```
users (1) ──< (many) teams
users (1) ──< (many) userTeams
users (1) ──< (many) complianceLogs
users (1) ──< (many) passwordResetTokens

matches (1) ──< (many) teams
matches (1) ──< (many) contests
matches (1) ──< (many) matchSquads
matches (1) ──< (many) playerPerformances

teams (1) ──< (many) userTeamPlayers
teams (1) ──< (many) userTeams
teams (1) ──< (many) leaderboards

players (1) ──< (many) userTeamPlayers
players (1) ──< (many) matchSquads
players (1) ──< (many) playerPerformances

contests (1) ──< (many) userTeams
contests (1) ──< (many) leaderboards
```

---

## Indexes

The schema includes indexes on:
- `users.email` (unique)
- `users.openId` (unique)
- `passwordResetTokens.token` (unique)
- `teams.userId` (foreign key)
- `teams.matchId` (foreign key)
- `userTeams.contestId` (foreign key)
- `leaderboards.contestId` (foreign key)

---

## Verification

To verify the tables were created successfully, you can:

1. **Using Railway Dashboard:**
   - Go to your Railway project
   - Click on the MySQL service
   - Click "Data" tab
   - You should see all 12 tables listed

2. **Using MySQL Client:**
   ```bash
   mysql -h trolley.proxy.rlwy.net -P 27071 -u root -p railway
   # Password: VXjmqRWTIbEpOMaBLWYatVdVOzbCmqgo
   
   SHOW TABLES;
   ```

3. **Using Drizzle Studio:**
   ```bash
   DATABASE_URL="mysql://root:VXjmqRWTIbEpOMaBLWYatVdVOzbCmqgo@trolley.proxy.rlwy.net:27071/railway" pnpm drizzle-kit studio
   ```

---

## Next Steps

1. **Seed Initial Data** (optional):
   - Add sample matches
   - Create test contests
   - Add player data

2. **Test Database Operations**:
   - Create a test user account
   - Create a test fantasy team
   - Join a test contest

3. **Monitor Database**:
   - Check Railway dashboard for database metrics
   - Monitor query performance
   - Set up automated backups

---

## Schema Updates

When you need to update the schema:

1. Edit `drizzle/schema.ts`
2. Run `pnpm db:push` to apply changes
3. Update this documentation

**Note:** Always backup your database before making schema changes in production!
