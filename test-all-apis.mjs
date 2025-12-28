/**
 * Test all 16 CricketData APIs
 * Run with: node test-all-apis.mjs
 */

const API_KEY = '1a822521-d7e0-46ff-98d3-3e51020863f3';
const BASE_URL = 'https://api.cricapi.com/v1';

const tests = [
  {
    name: 'API 1: Current Matches',
    endpoint: '/currentMatches',
    params: { apikey: API_KEY, offset: 0 },
  },
  {
    name: 'API 2: eCricScore',
    endpoint: '/cricScore',
    params: { apikey: API_KEY },
  },
  {
    name: 'API 3: Series Search',
    endpoint: '/series',
    params: { apikey: API_KEY, search: 'IPL', offset: 0 },
  },
  {
    name: 'API 4: Series List',
    endpoint: '/series',
    params: { apikey: API_KEY, offset: 0 },
  },
  {
    name: 'API 5: Matches List',
    endpoint: '/matches',
    params: { apikey: API_KEY, offset: 0 },
  },
  {
    name: 'API 6: Players List',
    endpoint: '/players',
    params: { apikey: API_KEY, offset: 0 },
  },
  {
    name: 'API 7: Players Search',
    endpoint: '/players',
    params: { apikey: API_KEY, search: 'Kohli', offset: 0 },
  },
];

// For these APIs, we need IDs from previous API calls
const testsWithIds = [
  {
    name: 'API 8: Series Info',
    endpoint: '/series_info',
    getParams: async () => {
      const seriesRes = await fetch(`${BASE_URL}/series?apikey=${API_KEY}&offset=0`);
      const seriesData = await seriesRes.json();
      const seriesId = seriesData.data[0]?.id;
      return { apikey: API_KEY, id: seriesId };
    },
  },
  {
    name: 'API 9: Match Info',
    endpoint: '/match_info',
    getParams: async () => {
      const matchesRes = await fetch(`${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`);
      const matchesData = await matchesRes.json();
      const matchId = matchesData.data[0]?.id;
      return { apikey: API_KEY, id: matchId };
    },
  },
  {
    name: 'API 10: Player Info',
    endpoint: '/players_info',
    getParams: async () => {
      const playersRes = await fetch(`${BASE_URL}/players?apikey=${API_KEY}&search=Kohli&offset=0`);
      const playersData = await playersRes.json();
      const playerId = playersData.data[0]?.id;
      return { apikey: API_KEY, id: playerId };
    },
  },
  {
    name: 'API 11: Fantasy Squad (Match Squad)',
    endpoint: '/match_squad',
    getParams: async () => {
      const matchesRes = await fetch(`${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`);
      const matchesData = await matchesRes.json();
      const match = matchesData.data.find(m => m.fantasyEnabled && m.hasSquad);
      return { apikey: API_KEY, id: match?.id || matchesData.data[0]?.id };
    },
  },
  {
    name: 'API 12: Series Squads',
    endpoint: '/series_squad',
    getParams: async () => {
      const seriesRes = await fetch(`${BASE_URL}/series?apikey=${API_KEY}&offset=0`);
      const seriesData = await seriesRes.json();
      const seriesId = seriesData.data[0]?.id;
      return { apikey: API_KEY, id: seriesId };
    },
  },
  {
    name: 'API 13: Fantasy Scorecard',
    endpoint: '/match_scorecard',
    getParams: async () => {
      const matchesRes = await fetch(`${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`);
      const matchesData = await matchesRes.json();
      const match = matchesData.data.find(m => m.matchEnded);
      return { apikey: API_KEY, id: match?.id || matchesData.data[0]?.id };
    },
  },
  {
    name: 'API 14: Fantasy Match Points',
    endpoint: '/fantasy_match_points',
    getParams: async () => {
      const matchesRes = await fetch(`${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`);
      const matchesData = await matchesRes.json();
      const match = matchesData.data.find(m => m.fantasyEnabled);
      return { apikey: API_KEY, id: match?.id || matchesData.data[0]?.id };
    },
  },
  {
    name: 'API 15: Series Points',
    endpoint: '/series_points',
    getParams: async () => {
      const seriesRes = await fetch(`${BASE_URL}/series?apikey=${API_KEY}&offset=0`);
      const seriesData = await seriesRes.json();
      const seriesId = seriesData.data[0]?.id;
      return { apikey: API_KEY, id: seriesId };
    },
  },
];

const simpleTests = [
  {
    name: 'API 16: Country List',
    endpoint: '/countries',
    params: { apikey: API_KEY },
  },
];

async function testAPI(name, endpoint, params) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}?${queryString}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'success' || data.data) {
      console.log(`✅ ${name} - PASS`);
      console.log(`   Data count: ${data.data?.length || 'N/A'}`);
      return true;
    } else {
      console.log(`❌ ${name} - FAIL`);
      console.log(`   Error: ${JSON.stringify(data)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name} - ERROR`);
    console.log(`   ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('Testing All 16 CricketData APIs');
  console.log('='.repeat(60));
  console.log('');

  let passed = 0;
  let failed = 0;

  // Test simple APIs
  console.log('--- Simple APIs (no ID required) ---');
  for (const test of [...tests, ...simpleTests]) {
    const result = await testAPI(test.name, test.endpoint, test.params);
    if (result) passed++;
    else failed++;
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
  }

  console.log('');
  console.log('--- APIs requiring IDs ---');
  for (const test of testsWithIds) {
    try {
      const params = await test.getParams();
      if (!params.id) {
        console.log(`⚠️  ${test.name} - SKIP (no ID available)`);
        continue;
      }
      const result = await testAPI(test.name, test.endpoint, params);
      if (result) passed++;
      else failed++;
    } catch (error) {
      console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      failed++;
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
  }

  console.log('');
  console.log('='.repeat(60));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(60));
}

runTests();
