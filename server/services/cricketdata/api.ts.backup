import { cricketDataClient } from "./client";
import type {
  CurrentMatchesResponse,
  MatchInfoResponse,
  PlayersListResponse,
  FantasySquadResponse,
  FantasyScorecardResponse,
  FantasyMatchPointsResponse,
  SeriesListResponse,
  SeriesInfoResponse,
  MatchesListResponse,
  SeriesPointTableResponse,
  CountryListResponse,
} from "./types";

/**
 * CricketData.org API Service
 * 
 * Provides methods for all 18 CricketData APIs:
 * - Core Match APIs (Current Matches, Match Info, etc.)
 * - Fantasy APIs (Squad, Scorecard, Points)
 * - Series APIs (List, Info, Matches)
 * - Player APIs (List, Search, Info)
 * - Misc APIs (Country List, Point Table)
 */

export class CricketDataAPI {
  /**
   * 1. Current Matches - Get all ongoing and upcoming matches
   * Top Used API
   */
  async getCurrentMatches(offset: number = 0): Promise<CurrentMatchesResponse> {
    return cricketDataClient.get<CurrentMatchesResponse>("/currentMatches", { offset });
  }

  /**
   * 2. eCricScore - Get live cricket scores
   * Top Used API - for real-time score updates
   */
  async getECricScore(matchId: string): Promise<any> {
    return cricketDataClient.get("/cric_score", { id: matchId });
  }

  /**
   * 3. Series Search - Search for cricket series
   * New changes
   */
  async searchSeries(search: string, offset: number = 0): Promise<SeriesListResponse> {
    return cricketDataClient.get<SeriesListResponse>("/series", { search, offset });
  }

  /**
   * 4. Series List - Get list of all series
   */
  async getSeriesList(offset: number = 0): Promise<SeriesListResponse> {
    return cricketDataClient.get<SeriesListResponse>("/series", { offset });
  }

  /**
   * 5. Matches List - Get all matches in a series
   */
  async getMatchesList(seriesId: string, offset: number = 0): Promise<MatchesListResponse> {
    return cricketDataClient.get<MatchesListResponse>("/series_info", { 
      id: seriesId,
      offset 
    });
  }

  /**
   * 5b. Get ALL Matches - Get all matches (past, present, future)
   * Note: This endpoint returns mostly historical matches
   */
  async getAllMatches(offset: number = 0): Promise<MatchesListResponse> {
    return cricketDataClient.get<MatchesListResponse>("/matches", { offset });
  }

  /**
   * 5c. Get Upcoming Matches - Fetch from active series
   * This is the proper way to get truly upcoming matches
   */
  async getUpcomingMatches(): Promise<any> {
    try {
      // First, get list of active series
      const seriesResponse = await this.getSeriesList(0);
      const upcomingMatches: any[] = [];
      
      // Get matches from first 10 series (to avoid too many API calls)
      const seriesToCheck = seriesResponse.data.slice(0, 10);
      
      for (const series of seriesToCheck) {
        try {
          // Get series info which includes matches
          const seriesInfo = await this.getSeriesInfo(series.id);
          
          if (seriesInfo.data && seriesInfo.data.matchList) {
            // Filter for future matches
            const futureMatches = seriesInfo.data.matchList.filter((match: any) => {
              const matchDate = new Date(match.dateTimeGMT);
              return matchDate > new Date();
            });
            
            upcomingMatches.push(...futureMatches);
          }
        } catch (error) {
          console.error(`Failed to fetch series ${series.id}:`, error);
        }
      }
      
      // Sort by date and return
      return {
        data: upcomingMatches.sort((a, b) => 
          new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime()
        )
      };
    } catch (error) {
      console.error('Failed to fetch upcoming matches:', error);
      return { data: [] };
    }
  }

  /**
   * 6. Players List - Get list of all players
   */
  async getPlayersList(offset: number = 0): Promise<PlayersListResponse> {
    return cricketDataClient.get<PlayersListResponse>("/players", { offset });
  }

  /**
   * 7. Players Search - Search for specific players
   */
  async searchPlayers(search: string, offset: number = 0): Promise<PlayersListResponse> {
    return cricketDataClient.get<PlayersListResponse>("/players", { search, offset });
  }

  /**
   * 8. Series Info - Get detailed series information
   */
  async getSeriesInfo(seriesId: string): Promise<SeriesInfoResponse> {
    return cricketDataClient.get<SeriesInfoResponse>("/series_info", { id: seriesId });
  }

  /**
   * 9. Match Info - Get detailed match information
   */
  async getMatchInfo(matchId: string): Promise<MatchInfoResponse> {
    return cricketDataClient.get<MatchInfoResponse>("/match_info", { id: matchId });
  }

  /**
   * 10. Player Info - Get detailed player information
   * New changes
   */
  async getPlayerInfo(playerId: string): Promise<any> {
    return cricketDataClient.get("/players_info", { id: playerId });
  }

  /**
   * 11. Fantasy Squad - Get fantasy squad for a match
   * New changes - Critical for fantasy team creation
   */
  async getFantasySquad(matchId: string): Promise<FantasySquadResponse> {
    return cricketDataClient.get<FantasySquadResponse>("/fantasy_squad", { id: matchId });
  }

  /**
   * 12. Series Squads - Get squads for all matches in a series
   */
  async getSeriesSquads(seriesId: string): Promise<any> {
    return cricketDataClient.get("/series_squads", { id: seriesId });
  }

  /**
   * 13. Fantasy Scorecard - Get fantasy points scorecard
   * Critical for live leaderboard updates
   */
  async getFantasyScorecard(matchId: string): Promise<FantasyScorecardResponse> {
    return cricketDataClient.get<FantasyScorecardResponse>("/fantasy_scorecard", { 
      id: matchId 
    });
  }

  /**
   * 14. Fantasy Match Points - Get fantasy points for a match
   * Critical for points calculation
   */
  async getFantasyMatchPoints(matchId: string): Promise<FantasyMatchPointsResponse> {
    return cricketDataClient.get<FantasyMatchPointsResponse>("/fantasy_match_points", { 
      id: matchId 
    });
  }

  /**
   * 15. Series Point Table - Get points table for a series
   */
  async getSeriesPointTable(seriesId: string): Promise<SeriesPointTableResponse> {
    return cricketDataClient.get<SeriesPointTableResponse>("/series_point_table", { 
      id: seriesId 
    });
  }

  /**
   * 16. Fantasy XI - DO NOT USE (deprecated/not recommended)
   */
  // async getFantasyXI(matchId: string): Promise<any> {
  //   // Deprecated - do not use
  //   throw new Error("Fantasy XI API is deprecated. Use Fantasy Squad instead.");
  // }

  /**
   * 17. Fantasy Ball-by-Ball - Get ball by ball fantasy points
   * In testing phase - use with caution
   */
  async getFantasyBallByBall(matchId: string): Promise<any> {
    console.warn("[CricketData] Fantasy Ball-by-Ball API is in testing phase");
    return cricketDataClient.get("/fantasy_ball_by_ball", { id: matchId });
  }

  /**
   * 18. Country List - Get list of cricket playing countries
   */
  async getCountryList(): Promise<CountryListResponse> {
    return cricketDataClient.get<CountryListResponse>("/countries");
  }

  /**
   * Helper: Get matches by status
   */
  async getMatchesByStatus(status: "live" | "upcoming" | "completed"): Promise<CurrentMatchesResponse> {
    const response = await this.getCurrentMatches();
    
    if (status === "live") {
      response.data = response.data.filter(m => m.matchStarted && !m.matchEnded);
    } else if (status === "upcoming") {
      response.data = response.data.filter(m => !m.matchStarted);
    } else if (status === "completed") {
      response.data = response.data.filter(m => m.matchEnded);
    }
    
    return response;
  }

  /**
   * Helper: Get fantasy-enabled matches only
   */
  async getFantasyEnabledMatches(): Promise<CurrentMatchesResponse> {
    const response = await this.getCurrentMatches();
    response.data = response.data.filter(m => m.fantasyEnabled && m.hasSquad);
    return response;
  }

  /**
   * Helper: Check if match is eligible for fantasy
   */
  async isMatchFantasyEligible(matchId: string): Promise<boolean> {
    try {
      const matchInfo = await this.getMatchInfo(matchId);
      return matchInfo.data.fantasyEnabled && matchInfo.data.hasSquad && !matchInfo.data.matchStarted;
    } catch (error) {
      console.error(`[CricketData] Error checking fantasy eligibility for match ${matchId}:`, error);
      return false;
    }
  }
}

// Singleton instance
export const cricketDataAPI = new CricketDataAPI();
