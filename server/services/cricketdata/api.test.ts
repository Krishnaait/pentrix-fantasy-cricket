import { describe, expect, it } from "vitest";
import { cricketDataAPI } from "./api";

/**
 * Test suite for CricketData API integration
 * Validates API key and basic connectivity
 */

describe("CricketData API", () => {
  it("should successfully fetch current matches with valid API key", async () => {
    // This is a lightweight test that validates the API key
    // by fetching the current matches list
    const response = await cricketDataAPI.getCurrentMatches(0);
    
    // Verify response structure
    expect(response).toBeDefined();
    expect(response.status).toBe("success");
    expect(response.data).toBeInstanceOf(Array);
    
    // Log success
    console.log(`✅ CricketData API key validated successfully`);
    console.log(`   Found ${response.data.length} current matches`);
    
    if (response.info) {
      console.log(`   API Credits: ${response.info.credits}`);
      console.log(`   Hits Today: ${response.info.hitsToday}/${response.info.hitsLimit}`);
    }
  }, 30000); // 30 second timeout for API call

  it("should fetch fantasy-enabled matches", async () => {
    const response = await cricketDataAPI.getFantasyEnabledMatches();
    
    expect(response).toBeDefined();
    expect(response.data).toBeInstanceOf(Array);
    
    // All returned matches should have fantasyEnabled = true
    response.data.forEach(match => {
      expect(match.fantasyEnabled).toBe(true);
      expect(match.hasSquad).toBe(true);
    });
    
    console.log(`✅ Found ${response.data.length} fantasy-enabled matches`);
  }, 30000);

  it("should fetch country list", async () => {
    const response = await cricketDataAPI.getCountryList();
    
    expect(response).toBeDefined();
    expect(response.status).toBe("success");
    expect(response.data).toBeInstanceOf(Array);
    expect(response.data.length).toBeGreaterThan(0);
    
    console.log(`✅ Found ${response.data.length} cricket-playing countries`);
  }, 30000);
});
