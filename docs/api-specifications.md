# CricketData.org API Specifications

## API 1: Current Matches (Top Used)

**Endpoint:** `https://api.cricapi.com/v1/currentMatches`

**Parameters:**
- `apikey` (required): API authentication key
- `offset` (optional): Pagination offset (default: 0)

**Response Structure:**
```json
{
  "apikey": "string",
  "data": [
    {
      "id": "string",
      "name": "string",
      "matchType": "t20|odi|test",
      "status": "string",
      "venue": "string",
      "date": "YYYY-MM-DD",
      "dateTimeGMT": "YYYY-MM-DDTHH:mm:ss",
      "teams": ["team1", "team2"],
      "teamInfo": [
        {
          "name": "string",
          "shortname": "string",
          "img": "url"
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
- `matchType`: Format of the match (t20, odi, test)
- `status`: Current match status description
- `fantasyEnabled`: Whether fantasy cricket is available for this match
- `matchStarted`: Boolean indicating if match has begun
- `matchEnded`: Boolean indicating if match is completed
- `score`: Array of innings scores with runs (r), wickets (w), overs (o)
- `teamInfo`: Detailed team information including logos



## API 2: eCricScore (Top Used)

**Endpoint:** `https://api.cricapi.com/v1/cricScore`

**Parameters:**
- `apikey` (required): API authentication key

**Response Structure:**
```json
{
  "apikey": "string",
  "data": [
    {
      "id": "string",
      "dateTimeGMT": "YYYY-MM-DDTHH:mm:ss",
      "matchType": "t20|odi|test",
      "status": "string",
      "ms": "fixture|result|live",
      "t1": "Team 1 Name",
      "t2": "Team 2 Name",
      "t1s": "score",
      "t2s": "score",
      "t1img": "url",
      "t2img": "url",
      "series": "Series Name"
    }
  ]
}
```

**Purpose:** Returns all current live cricket scores across all matches

---

## API 3: Series Search

**Endpoint:** `https://api.cricapi.com/v1/series`

**Parameters:**
- `apikey` (required)
- `search` (optional): Search term for series name
- `offset` (optional): Pagination offset

**Response:** List of series matching search criteria

---

## API 4: Series List

**Endpoint:** `https://api.cricapi.com/v1/series`

**Parameters:**
- `apikey` (required)
- `offset` (optional): Pagination offset

**Response:** List of all cricket series

---

## API 5: Matches List

**Endpoint:** `https://api.cricapi.com/v1/matches`

**Parameters:**
- `apikey` (required)
- `offset` (optional): Pagination offset

**Response:** List of all matches (historical + current + upcoming)

---

## API 6: Players List

**Endpoint:** `https://api.cricapi.com/v1/players`

**Parameters:**
- `apikey` (required)
- `offset` (optional): Pagination offset

**Response:** List of all cricket players

---

## API 7: Players Search

**Endpoint:** `https://api.cricapi.com/v1/players`

**Parameters:**
- `apikey` (required)
- `search` (required): Player name search term
- `offset` (optional): Pagination offset

**Response:** List of players matching search criteria

---

## API 8: Series Info

**Endpoint:** `https://api.cricapi.com/v1/series_info`

**Parameters:**
- `apikey` (required)
- `id` (required): Series ID

**Response:** Detailed information about a specific series including matches

---

## API 9: Match Info

**Endpoint:** `https://api.cricapi.com/v1/match_info`

**Parameters:**
- `apikey` (required)
- `id` (required): Match ID

**Response:** Detailed information about a specific match

---

## API 10: Player Info

**Endpoint:** `https://api.cricapi.com/v1/players_info`

**Parameters:**
- `apikey` (required)
- `id` (required): Player ID

**Response:** Detailed information about a specific player

---

## API 11: Fantasy Squad

**Endpoint:** `https://api.cricapi.com/v1/match_squad`

**Parameters:**
- `apikey` (required)
- `id` (required): Match ID

**Response:** Playing XI squad for fantasy cricket

---

## API 12: Series Squads

**Endpoint:** `https://api.cricapi.com/v1/series_squad`

**Parameters:**
- `apikey` (required)
- `id` (required): Series ID

**Response:** All squads for a series

---

## API 13: Fantasy Scorecard

**Endpoint:** `https://api.cricapi.com/v1/match_scorecard`

**Parameters:**
- `apikey` (required)
- `id` (required): Match ID

**Response:** Detailed scorecard with player performances

---

## API 14: Fantasy Match Points

**Endpoint:** `https://api.cricapi.com/v1/fantasy_match_points`

**Parameters:**
- `apikey` (required)
- `id` (required): Match ID

**Response:** Fantasy points for each player in the match

---

## API 15: Series Point Table

**Endpoint:** `https://api.cricapi.com/v1/series_points`

**Parameters:**
- `apikey` (required)
- `id` (required): Series ID

**Response:** Points table for the series

---

## API 16: Country List

**Endpoint:** `https://api.cricapi.com/v1/countries`

**Parameters:**
- `apikey` (required)

**Response:** List of all cricket-playing countries

---

## Base URL
All APIs use: `https://api.cricapi.com/v1/`

## Authentication
All APIs require `apikey` parameter with value: `1a822521-d7e0-46ff-98d3-3e51020863f3`

