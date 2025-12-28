/**
 * TypeScript interfaces for CricketData.org API responses
 */

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number; // runs
  w: number; // wickets
  o: number; // overs
  inning: string;
}

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score: Score[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

export interface CurrentMatchesResponse {
  apikey: string;
  data: Match[];
  status: string;
  info?: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
    credits: number;
    server: number;
    offsetRows: number;
    totalRows: number;
    queryTime: number;
    s: number;
    cache: number;
  };
}

export interface MatchInfoResponse {
  apikey: string;
  data: {
    id: string;
    name: string;
    matchType: string;
    status: string;
    venue: string;
    date: string;
    dateTimeGMT: string;
    teams: string[];
    teamInfo: TeamInfo[];
    score: Score[];
    series_id: string;
    fantasyEnabled: boolean;
    bbbEnabled: boolean;
    hasSquad: boolean;
    matchStarted: boolean;
    matchEnded: boolean;
    matchWinner?: string;
    tossWinner?: string;
    tossChoice?: string;
  };
  status: string;
  info?: any;
}

export interface Player {
  id: string;
  name: string;
  country?: string;
}

export interface PlayersListResponse {
  apikey: string;
  data: Player[];
  status: string;
  info?: any;
}

export interface FantasyPlayer {
  id: string;
  name: string;
  role: string; // "bat" | "bowl" | "all" | "wk"
  teamId: string;
  teamName: string;
  fantasyPlayerRating?: number;
  playingXI?: boolean;
}

export interface FantasySquadResponse {
  apikey: string;
  data: {
    matchId: string;
    team1: {
      name: string;
      shortname: string;
      players: FantasyPlayer[];
    };
    team2: {
      name: string;
      shortname: string;
      players: FantasyPlayer[];
    };
  };
  status: string;
  info?: any;
}

export interface PlayerPerformance {
  pid: string;
  name: string;
  role: string;
  runs?: number;
  wickets?: number;
  catches?: number;
  stumpings?: number;
  runOuts?: number;
  battingPoints?: number;
  bowlingPoints?: number;
  fieldingPoints?: number;
  totalPoints: number;
}

export interface FantasyScorecardResponse {
  apikey: string;
  data: {
    matchId: string;
    matchStatus: string;
    team1: {
      name: string;
      players: PlayerPerformance[];
    };
    team2: {
      name: string;
      players: PlayerPerformance[];
    };
  };
  status: string;
  info?: any;
}

export interface FantasyMatchPointsResponse {
  apikey: string;
  data: {
    matchId: string;
    points: {
      [playerId: string]: {
        name: string;
        points: number;
        role: string;
      };
    };
  };
  status: string;
  info?: any;
}

export interface Series {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
}

export interface SeriesListResponse {
  apikey: string;
  data: Series[];
  status: string;
  info?: any;
}

export interface SeriesInfoResponse {
  apikey: string;
  data: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    odi: number;
    t20: number;
    test: number;
    squads: number;
    matches: number;
    matchList: string[];
  };
  status: string;
  info?: any;
}

export interface MatchesListResponse {
  apikey: string;
  data: Match[];
  status: string;
  info?: any;
}

export interface PointTableTeam {
  name: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  nr: number;
  points: number;
  nrr: string;
}

export interface SeriesPointTableResponse {
  apikey: string;
  data: {
    seriesId: string;
    pointsTable: PointTableTeam[];
  };
  status: string;
  info?: any;
}

export interface Country {
  code: string;
  name: string;
}

export interface CountryListResponse {
  apikey: string;
  data: Country[];
  status: string;
  info?: any;
}

/**
 * Player roles for fantasy team selection
 */
export enum PlayerRole {
  BATSMAN = "bat",
  BOWLER = "bowl",
  ALL_ROUNDER = "all",
  WICKET_KEEPER = "wk",
}

/**
 * Match status enum
 */
export enum MatchStatus {
  NOT_STARTED = "Match not started",
  IN_PROGRESS = "Match in progress",
  COMPLETED = "Match completed",
  CANCELLED = "Match cancelled",
}

/**
 * Match type enum
 */
export enum MatchType {
  T20 = "t20",
  ODI = "odi",
  TEST = "test",
  T10 = "t10",
}
