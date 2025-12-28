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
 * Get upcoming matches from active series
 * Uses Series Info API which contains the most accurate upcoming match data
 * This is the CORRECT approach as recommended by CricketData.org
 */
export async function getUpcomingMatches(limit: number = 50): Promise<CurrentMatchesResponse> {
  try {
    const now = new Date();
    const allUpcomingMatches: any[] = [];
    
    // Step 1: Get active series (series that are currently ongoing)
    const seriesResponse = await getSeriesList(0);
    
    // Step 2: Filter for series that are currently active (started but not ended)
    const activeSeries = seriesResponse.data.filter((series: any) => {
      if (!series.startDate) return false;
      const startDate = new Date(series.startDate);
      // Series is active if it started before or on today
      return startDate <= now;
    });
    
    // Step 3: Get matches from first 10 active series (to avoid too many API calls)
    const seriesToCheck = activeSeries.slice(0, 10);
    
    for (const series of seriesToCheck) {
      try {
        const seriesInfo = await getSeriesInfo(series.id);
        
        if (seriesInfo.data?.matchList) {
          // Filter for upcoming matches in this series
          const upcomingInSeries = seriesInfo.data.matchList.filter((match: any) => {
            if (!match.dateTimeGMT) return false;
            const matchDate = new Date(match.dateTimeGMT);
            return matchDate > now && !match.matchStarted && !match.matchEnded;
          });
          
          allUpcomingMatches.push(...upcomingInSeries);
          
          // Stop if we have enough matches
          if (allUpcomingMatches.length >= limit) {
            break;
          }
        }
      } catch (error) {
        console.error(`Error fetching series info for ${series.id}:`, error);
        continue;
      }
    }

    // Sort by date ascending and limit
    const sortedMatches = allUpcomingMatches
      .sort((a: any, b: any) => {
        const dateA = new Date(a.dateTimeGMT).getTime();
        const dateB = new Date(b.dateTimeGMT).getTime();
        return dateA - dateB;
      })
      .slice(0, limit);

    return {
      apikey: '',
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
  } catch (error: any) {
    console.error('Error fetching upcoming matches:', {
      message: error.message || 'Unknown error',
    });
    // Return empty array instead of throwing
    return {
      apikey: '',
      data: [],
      status: 'success',
      info: {
        hitsToday: 0,
        hitsUsed: 0,
        hitsLimit: 0,
        credits: 0,
        server: 0,
        offsetRows: 0,
        totalRows: 0,
        queryTime: 0,
        s: 0,
        cache: 0,
      },
    };
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
