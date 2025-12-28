-- Password Reset Tokens
CREATE TABLE IF NOT EXISTS passwordResetTokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expiresAt TIMESTAMP NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX userId_idx (userId),
  INDEX token_idx (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cricket Matches
CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  apiMatchId VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  matchType VARCHAR(50) NOT NULL,
  venue VARCHAR(300),
  city VARCHAR(100),
  team1Id INT NOT NULL,
  team2Id INT NOT NULL,
  team1Name VARCHAR(200) NOT NULL,
  team2Name VARCHAR(200) NOT NULL,
  matchDate TIMESTAMP NOT NULL,
  startTime TIMESTAMP,
  endTime TIMESTAMP,
  status ENUM('upcoming', 'live', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  winnerId INT,
  winnerName VARCHAR(200),
  winMargin VARCHAR(200),
  tossWinner VARCHAR(200),
  tossDecision VARCHAR(50),
  team1Score VARCHAR(100),
  team2Score VARCHAR(100),
  series VARCHAR(300),
  season VARCHAR(100),
  lastSyncedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX apiMatchId_idx (apiMatchId),
  INDEX status_idx (status),
  INDEX matchDate_idx (matchDate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cricket Teams
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  apiTeamId VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  shortName VARCHAR(50),
  country VARCHAR(100),
  logoUrl TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX apiTeamId_idx (apiTeamId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cricket Players
CREATE TABLE IF NOT EXISTS players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  apiPlayerId VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  teamId INT NOT NULL,
  teamName VARCHAR(200),
  role ENUM('batsman', 'bowler', 'allrounder', 'wicketkeeper') NOT NULL,
  battingStyle VARCHAR(100),
  bowlingStyle VARCHAR(100),
  credits DECIMAL(4,1) NOT NULL DEFAULT 8.5,
  imageUrl TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX apiPlayerId_idx (apiPlayerId),
  INDEX teamId_idx (teamId),
  INDEX role_idx (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Match Squads
CREATE TABLE IF NOT EXISTS matchSquads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  matchId INT NOT NULL,
  playerId INT NOT NULL,
  teamId INT NOT NULL,
  isPlaying BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY match_player_unique (matchId, playerId),
  INDEX matchId_idx (matchId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Fantasy Contests
CREATE TABLE IF NOT EXISTS contests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  matchId INT NOT NULL,
  name VARCHAR(300) NOT NULL,
  description TEXT,
  contestType ENUM('public', 'private') NOT NULL DEFAULT 'public',
  maxUsers INT NOT NULL DEFAULT 10000,
  currentUsers INT NOT NULL DEFAULT 0,
  status ENUM('upcoming', 'live', 'completed', 'cancelled') NOT NULL DEFAULT 'upcoming',
  prizePool INT NOT NULL DEFAULT 0,
  firstPrize INT NOT NULL DEFAULT 0,
  startTime TIMESTAMP NOT NULL,
  endTime TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX matchId_idx (matchId),
  INDEX status_idx (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Fantasy Teams
CREATE TABLE IF NOT EXISTS userTeams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  contestId INT NOT NULL,
  matchId INT NOT NULL,
  teamName VARCHAR(200) NOT NULL,
  captainId INT NOT NULL,
  viceCaptainId INT NOT NULL,
  totalPlayers INT NOT NULL DEFAULT 11,
  totalCredits DECIMAL(5,1) NOT NULL,
  isSubmitted BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX user_contest_idx (userId, contestId),
  INDEX contestId_idx (contestId),
  INDEX matchId_idx (matchId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Team Players
CREATE TABLE IF NOT EXISTS userTeamPlayers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userTeamId INT NOT NULL,
  playerId INT NOT NULL,
  isCaptain BOOLEAN NOT NULL DEFAULT FALSE,
  isViceCaptain BOOLEAN NOT NULL DEFAULT FALSE,
  points DECIMAL(6,2) NOT NULL DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY team_player_unique (userTeamId, playerId),
  INDEX userTeamId_idx (userTeamId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Player Performances
CREATE TABLE IF NOT EXISTS playerPerformances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  matchId INT NOT NULL,
  playerId INT NOT NULL,
  runs INT NOT NULL DEFAULT 0,
  ballsFaced INT NOT NULL DEFAULT 0,
  fours INT NOT NULL DEFAULT 0,
  sixes INT NOT NULL DEFAULT 0,
  strikeRate DECIMAL(6,2) NOT NULL DEFAULT 0,
  wickets INT NOT NULL DEFAULT 0,
  oversBowled DECIMAL(4,1) NOT NULL DEFAULT 0,
  runsConceded INT NOT NULL DEFAULT 0,
  maidens INT NOT NULL DEFAULT 0,
  economy DECIMAL(5,2) NOT NULL DEFAULT 0,
  catches INT NOT NULL DEFAULT 0,
  stumpings INT NOT NULL DEFAULT 0,
  runOuts INT NOT NULL DEFAULT 0,
  fantasyPoints DECIMAL(6,2) NOT NULL DEFAULT 0,
  lastUpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY match_player_perf_unique (matchId, playerId),
  INDEX matchId_idx (matchId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Leaderboards
CREATE TABLE IF NOT EXISTS leaderboards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contestId INT NOT NULL,
  userId INT NOT NULL,
  userTeamId INT NOT NULL,
  rank INT NOT NULL,
  totalPoints DECIMAL(8,2) NOT NULL DEFAULT 0,
  prizeWon INT NOT NULL DEFAULT 0,
  lastUpdatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY contest_user_unique (contestId, userId),
  INDEX contestId_idx (contestId),
  INDEX rank_idx (rank)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Compliance Logs
CREATE TABLE IF NOT EXISTS complianceLogs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  action VARCHAR(200) NOT NULL,
  result ENUM('allowed', 'blocked') NOT NULL,
  reason TEXT,
  ipAddress VARCHAR(45),
  state VARCHAR(100),
  country VARCHAR(100),
  userAgent TEXT,
  metadata TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX userId_idx (userId),
  INDEX action_idx (action),
  INDEX createdAt_idx (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
