# CricketData.org API Information

## API Key
```
afb22ee0-add7-48b4-af1d-bdf319c03c9d
```

## Available APIs (18 Total)

### Core Match APIs
1. **Current Matches** - Top Used
   - Get currently ongoing matches
   
2. **eCricScore** - Top Used  
   - Live cricket scores and match status

3. **Series Search** - New changes
   - Search for cricket series

4. **Series List**
   - List all cricket series

5. **Matches List**
   - List all matches in a series

6. **Players List**
   - List all players

7. **Players Search**
   - Search for specific players

8. **Series Info**
   - Detailed information about a series

9. **Match Info**
   - Detailed information about a match

10. **Player Info** - New changes
    - Detailed player information

### Fantasy APIs
11. **Fantasy Squad** - New changes
    - Get fantasy squad for a match

12. **Series Squads**
    - Get squads for all matches in a series

13. **Fantasy Scorecard**
    - Get fantasy points scorecard

14. **Fantasy Match Points**
    - Get fantasy points for a match

15. **Series Point Table**
    - Get points table for a series

16. **Fantasy XI** - Do not use
    - Deprecated/not recommended

17. **Fantasy Ball-by-Ball** - In testing
    - Ball by ball fantasy points (testing phase)

### Misc APIs
18. **Country List**
    - List of cricket playing countries

### Deprecated APIs (Not to use)
- New Matches API
- Old Matches API
- Cricket Score
- Match Calendar
- Player Statistics
- Fantasy API - Summary
- Fantasy API - Squad
- Player Finder

### Coming Soon
- Custom Banner

## API Base URL
```
https://api.cricketdata.org/
```

## Authentication
- API Key passed as query parameter: `?apikey={API_KEY}`

## Notes
- All API calls count toward quota limit
- Failed requests also count toward quota
- Subscription expires: 18 Jan '26 (auto-renews)
- Current plan has access to all Fantasy APIs
