# Matches List API

## Endpoint
```
https://api.cricapi.com/v1/matches
```

## API Key to Use
**CricketData U (Paid):** `1a822521-d7e0-46ff-98d3-3e51020863f3`

## Parameters
- `apikey` (required): 1a822521-d7e0-46ff-98d3-3e51020863f3
- `offset` (optional): Pagination offset (default: 0)

## Response Structure
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

## Key Differences from currentMatches
- **Matches List** returns ALL matches (past, present, future) from all series
- **Current Matches** returns only currently live or recently completed matches
- For upcoming matches, use **Matches List** and filter by `matchStarted: false`

## Implementation
This API should be used for the "Upcoming Matches" section on the homepage.
