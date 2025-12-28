# CricketData.org API Structure

## Base URL
```
https://api.cricapi.com/v1/
```

## Authentication
All requests require `apikey` query parameter:
```
?apikey=afb22ee0-add7-48b4-af1d-bdf319c03c9d
```

---

## 1. Current Matches API

**Endpoint:** `/currentMatches`

**Method:** GET

**Parameters:**
- `apikey` (required): API key
- `offset` (optional): Pagination offset (default: 0)

**Request Example:**
```
https://api.cricapi.com/v1/currentMatches?apikey={API_KEY}&offset=0
```

**Response Structure:**
```json
{
  "apikey": "string",
  "data": [
    {
      "id": "string",
      "name": "string",
      "matchType": "string",
      "status": "string",
      "venue": "string",
      "date": "string",
      "dateTimeGMT": "string",
      "teams": ["string", "string"],
      "teamInfo": [
        {
          "name": "string",
          "shortname": "string",
          "img": "string"
        }
      ],
      "score": [
        {
          "r": number,
          "w": number,
          "o": number,
          "inning": "string"
        }
      ],
      "series_id": "string",
      "fantasyEnabled": boolean,
      "bbbEnabled": boolean,
      "hasSquad": boolean,
      "matchStarted": boolean,
      "matchEnded": boolean
    }
  ]
}
```

**Key Fields:**
- `id`: Unique match identifier
- `name`: Match name (e.g., "MI Emirates vs Dubai Capitals, 29th Match")
- `matchType`: Type of match (T20, ODI, Test)
- `status`: Current match status
- `venue`: Stadium/ground name
- `date`: Match date
- `dateTimeGMT`: ISO timestamp
- `teams`: Array of team names
- `teamInfo`: Detailed team information with logos
- `score`: Current scores for each inning
- `series_id`: Series identifier
- `fantasyEnabled`: Whether fantasy is available for this match
- `hasSquad`: Whether squad data is available
- `matchStarted`: Boolean indicating if match has started
- `matchEnded`: Boolean indicating if match has ended

---

## Usage Notes

1. **Match Status Values:**
   - "Match not started yet"
   - "Match in progress"
   - "Match won by X"
   - "Match cancelled"

2. **Match Types:**
   - T20
   - ODI
   - Test
   - T10

3. **Fantasy Flags:**
   - `fantasyEnabled`: Check before allowing users to create fantasy teams
   - `bbbEnabled`: Ball-by-ball data available
   - `hasSquad`: Squad data available for fantasy team creation

4. **Pagination:**
   - Use `offset` parameter to paginate through results
   - Increment by page size (typically 25-50)

---

## Next APIs to Document

2. eCricScore - Live scoring
3. Series List - List all series
4. Matches List - Matches in a series
5. Players List - All players
6. Match Info - Detailed match information
7. Fantasy Squad - Squad for fantasy team creation
8. Fantasy Scorecard - Fantasy points
9. Fantasy Match Points - Match-wise fantasy points
10. Series Point Table - Points table

---

## Implementation Priority

**Phase 1 (Core):**
1. Current Matches - Homepage listing
2. Match Info - Match details page
3. Fantasy Squad - Team creation
4. Fantasy Scorecard - Live scoring

**Phase 2 (Enhanced):**
5. Series List - Series browsing
6. Matches List - Series matches
7. Players List - Player database
8. Fantasy Match Points - Points calculation

**Phase 3 (Advanced):**
9. eCricScore - Real-time updates
10. Series Point Table - Tournament standings
