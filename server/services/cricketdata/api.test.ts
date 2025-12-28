/**
 * Quick test to verify all CricketData API endpoints are working
 * Run with: pnpm test server/services/cricketdata/api.quick-test.ts
 */

import { describe, it, expect } from 'vitest';
import * as api from './api';

describe('CricketData API - Quick Verification', () => {
  it('API 1: getCurrentMatches should return match data', async () => {
    const result = await api.getCurrentMatches(0);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    console.log(`✅ getCurrentMatches: ${result.data.length} matches`);
  }, 15000);

  it('API 2: getCricScore should return live scores', async () => {
    const result = await api.getCricScore();
    expect(result.data).toBeDefined();
    console.log(`✅ getCricScore: ${result.data?.length || 0} live scores`);
  }, 15000);

  it('API 4: getSeriesList should return series', async () => {
    const result = await api.getSeriesList(0);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    console.log(`✅ getSeriesList: ${result.data.length} series`);
  }, 15000);

  it('API 5: getAllMatches should return all matches', async () => {
    const result = await api.getAllMatches(0);
    expect(result.data).toBeDefined();
    console.log(`✅ getAllMatches: ${result.data?.length || 0} matches`);
  }, 15000);

  it('API 6: getPlayersList should return players', async () => {
    const result = await api.getPlayersList(0);
    expect(result.data).toBeDefined();
    console.log(`✅ getPlayersList: ${result.data?.length || 0} players`);
  }, 15000);

  it('API 7: searchPlayers should find players', async () => {
    const result = await api.searchPlayers('Kohli', 0);
    expect(result.data).toBeDefined();
    console.log(`✅ searchPlayers: ${result.data?.length || 0} results for "Kohli"`);
  }, 15000);

  it('API 16: getCountries should return countries', async () => {
    const result = await api.getCountries();
    expect(result.data).toBeDefined();
    console.log(`✅ getCountries: ${result.data?.length || 0} countries`);
  }, 15000);

  it('API 8: getSeriesInfo should return series details', async () => {
    const seriesList = await api.getSeriesList(0);
    const seriesId = seriesList.data[0]?.id;
    
    if (seriesId) {
      const result = await api.getSeriesInfo(seriesId);
      expect(result.data).toBeDefined();
      console.log(`✅ getSeriesInfo: ${result.data?.name || 'Series details'}`);
    }
  }, 15000);

  it('API 9: getMatchInfo should return match details', async () => {
    const matches = await api.getCurrentMatches(0);
    const matchId = matches.data[0]?.id;
    
    if (matchId) {
      const result = await api.getMatchInfo(matchId);
      expect(result.data).toBeDefined();
      console.log(`✅ getMatchInfo: ${result.data?.name || 'Match details'}`);
    }
  }, 15000);

  it('API 11: getFantasySquad should return squad for fantasy match', async () => {
    const matches = await api.getCurrentMatches(0);
    const fantasyMatch = matches.data.find(m => m.fantasyEnabled && m.hasSquad);
    
    if (fantasyMatch) {
      const result = await api.getFantasySquad(fantasyMatch.id);
      expect(result.data).toBeDefined();
      console.log(`✅ getFantasySquad: Squad for ${fantasyMatch.name}`);
    } else {
      console.log(`⚠️  getFantasySquad: No fantasy matches available to test`);
    }
  }, 15000);

  it('Helper: getUpcomingMatches should return future matches', async () => {
    const result = await api.getUpcomingMatches(10);
    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    console.log(`✅ getUpcomingMatches: ${result.data.length} upcoming matches`);
  }, 30000);
});
