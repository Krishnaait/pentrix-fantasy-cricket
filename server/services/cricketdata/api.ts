import { cricketDataClient } from './client';
import type {
  CurrentMatchesResponse,
  MatchInfoResponse,
  SeriesInfoResponse,
  PlayersListResponse,
  FantasySquadResponse,
  FantasyScorecardResponse,
  FantasyMatchPointsResponse,
  SeriesListResponse,
  MatchesListResponse,
  SeriesPointTableResponse,
  CountryListResponse,
} from './types';

/**
 * CricketData.org API Service
 * Complete implementation of all 16 production APIs
 * Base URL: https://api.cricapi.com/v1/
 * 
 * All endpoint names match the official CricketData.org API documentation
 */

// ============================================================================
// LIST APIs (Top Used)
// ============================================================================

/**
 * API 1: Current Matches (Top Used)
 * Endpoint: /currentMatches
 * Returns list of current/recent matches with live scores
 */
export async function getCurrentMatches(offset: number = 0): Promise<CurrentMatchesResponse> {
  return cricketDataClient.get<CurrentMatchesResponse>('/currentMatches', { offset });
}

/**
 * API 2: eCricScore (Top Used)
 * Endpoint: /cricScore
 * Returns all live cricket scores across all matches
 * No parameters needed except API key
 */
export async function getCricScore(): Promise<any> {
  return cricketDataClient.get('/cricScore');
}

/**
 * API 3: Series Search
 * Endpoint: /series
 * Search for series by name
 */
export async function searchSeries(searchTerm: string, offset: number = 0): Promise<SeriesListResponse> {
  return cricketDataClient.get<SeriesListResponse>('/series', { search: searchTerm, offset });
}

/**
 * API 4: Series List
 * Endpoint: /series
 * Get list of all cricket series
 */
export async function getSeriesList(offset: number = 0): Promise<SeriesListResponse> {
  return cricketDataClient.get<SeriesListResponse>('/series', { offset });
}

/**
 * API 5: Matches List
 * Endpoint: /matches
 * Get list of all matches (historical + current + upcoming)
 */
export async function getAllMatches(offset: number = 0): Promise<MatchesListResponse> {
  return cricketDataClient.get<MatchesListResponse>('/matches', { offset });
}

/**
 * API 6: Players List
 * Endpoint: /players
 * Get list of all cricket players
 */
export async function getPlayersList(offset: number = 0): Promise<PlayersListResponse> {
  return cricketDataClient.get<PlayersListResponse>('/players', { offset });
}

/**
 * API 7: Players Search
 * Endpoint: /players
 * Search for players by name
 */
export async function searchPlayers(searchTerm: string, offset: number = 0): Promise<PlayersListResponse> {
  return cricketDataClient.get<PlayersListResponse>('/players', { search: searchTerm, offset });
}

// ============================================================================
// CRICKET INFO APIs
// ============================================================================

/**
 * API 8: Series Info
 * Endpoint: /series_info
 * Get detailed information about a specific series including matches
 */
export async function getSeriesInfo(seriesId: string): Promise<SeriesInfoResponse> {
  return cricketDataClient.get<SeriesInfoResponse>('/series_info', { id: seriesId });
}

/**
 * API 9: Match Info
 * Endpoint: /match_info
 * Get detailed information about a specific match
 */
export async function getMatchInfo(matchId: string): Promise<MatchInfoResponse> {
  return cricketDataClient.get<MatchInfoResponse>('/match_info', { id: matchId });
}

/**
 * API 10: Player Info
 * Endpoint: /players_info
 * Get detailed information about a specific player
 */
export async function getPlayerInfo(playerId: string): Promise<any> {
  return cricketDataClient.get('/players_info', { id: playerId });
}

// ============================================================================
// FANTASY APIs
// ============================================================================

/**
 * API 11: Fantasy Squad (Match Squad)
 * Endpoint: /match_squad
 * Get playing XI squad for fantasy cricket
 * CRITICAL: This is the correct endpoint name (not /fantasy_squad)
 */
export async function getFantasySquad(matchId: string): Promise<FantasySquadResponse> {
  return cricketDataClient.get<FantasySquadResponse>('/match_squad', { id: matchId });
}

/**
 * API 12: Series Squads
 * Endpoint: /series_squad
 * Get all squads for a series
 */
export async function getSeriesSquads(seriesId: string): Promise<any> {
  return cricketDataClient.get('/series_squad', { id: seriesId });
}

/**
 * API 13: Fantasy Scorecard
 * Endpoint: /match_scorecard
 * Get detailed scorecard with player performances
 */
export async function getFantasyScorecard(matchId: string): Promise<FantasyScorecardResponse> {
  return cricketDataClient.get<FantasyScorecardResponse>('/match_scorecard', { id: matchId });
}

/**
 * API 14: Fantasy Match Points
 * Endpoint: /fantasy_match_points
 * Get fantasy points for each player in the match
 */
export async function getFantasyMatchPoints(matchId: string): Promise<FantasyMatchPointsResponse> {
  return cricketDataClient.get<FantasyMatchPointsResponse>('/fantasy_match_points', { id: matchId });
}

/**
 * API 15: Series Point Table
 * Endpoint: /series_points
 * Get points table for the series
 * CRITICAL: Endpoint is /series_points (not /series_point_table)
 */
export async function getSeriesPoints(seriesId: string): Promise<SeriesPointTableResponse> {
  return cricketDataClient.get<SeriesPointTableResponse>('/series_points', { id: seriesId });
}

// ============================================================================
// MISC APIs
// ============================================================================

/**
 * API 16: Country List
 * Endpoint: /countries
 * Get list of all cricket-playing countries
 */
export async function getCountries(): Promise<CountryListResponse> {
  return cricketDataClient.get<CountryListResponse>('/countries');
}

// ============================================================================
// HELPER METHODS
// ============================================================================

/**
 * Get only fantasy-enabled matches from current matches
 */
export async function getFantasyEnabledMatches(offset: number = 0): Promise<CurrentMatchesResponse> {
  const response = await getCurrentMatches(offset);
  return {
    ...response,
    data: response.data.filter(match => match.fantasyEnabled && match.hasSquad),
  };
}

/**
 * Check if a match is eligible for fantasy cricket
 */
export async function isMatchFantasyEligible(matchId: string): Promise<boolean> {
  try {
    const matchInfo = await getMatchInfo(matchId);
    return matchInfo.data?.fantasyEnabled && matchInfo.data?.hasSquad && !matchInfo.data?.matchStarted;
  } catch (error) {
    console.error(`Error checking fantasy eligibility for match ${matchId}:`, error);
    return false;
  }
}

/**
 * Get upcoming matches from series
 * Fetches active series and filters for matches with future dates
 * This is the CORRECT way to get truly upcoming matches
 */
export async function getUpcomingMatches(limit: number = 50): Promise<CurrentMatchesResponse> {
  try {
    // Get active series
    const seriesResponse = await getSeriesList(0);
    const upcomingMatches: any[] = [];
    const now = new Date();

    // Fetch matches from first 10 series to avoid too many API calls
    for (const series of seriesResponse.data.slice(0, 10)) {
      try {
        const seriesInfo = await getSeriesInfo(series.id);
        
        if (seriesInfo.data?.matchList) {
          const futureMatches = seriesInfo.data.matchList
            .filter((match: any) => {
              const matchDate = new Date(match.dateTimeGMT);
              return matchDate > now;
            })
            .map((match: any) => ({
              ...match,
              series_id: series.id,
            }));
          
          upcomingMatches.push(...futureMatches);
        }

        // Stop if we have enough matches
        if (upcomingMatches.length >= limit) break;
      } catch (error) {
        console.error(`Error fetching series ${series.id}:`, error);
        continue;
      }
    }

    // Sort by date and limit
    const sortedMatches = upcomingMatches
      .sort((a, b) => new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime())
      .slice(0, limit);

    return {
      apikey: seriesResponse.apikey,
      data: sortedMatches,
      status: 'success',
      info: {
        hitsToday: 0,
        hitsUsed: 0,
        hitsLimit: 0,
        credits: 0,
        server: 0,
        offsetRows: 0,
        totalRows: sortedMatches.length,
        queryTime: 0,
        s: 0,
        cache: 0,
      },
    };
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw error;
  }
}

/**
 * Get live matches only
 */
export async function getLiveMatches(offset: number = 0): Promise<CurrentMatchesResponse> {
  const response = await getCurrentMatches(offset);
  return {
    ...response,
    data: response.data.filter(match => match.matchStarted && !match.matchEnded),
  };
}

/**
 * Get completed matches only
 */
export async function getCompletedMatches(offset: number = 0): Promise<CurrentMatchesResponse> {
  const response = await getCurrentMatches(offset);
  return {
    ...response,
    data: response.data.filter(match => match.matchEnded),
  };
}

/**
 * Get matches by status
 */
export async function getMatchesByStatus(
  status: 'live' | 'upcoming' | 'completed',
  offset: number = 0
): Promise<CurrentMatchesResponse> {
  if (status === 'upcoming') {
    return getUpcomingMatches();
  } else if (status === 'live') {
    return getLiveMatches(offset);
  } else {
    return getCompletedMatches(offset);
  }
}
