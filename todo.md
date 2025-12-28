# PENTRIX Project TODO

## Phase 1: Foundation & Setup
- [x] Design system and color palette setup
- [x] Brand assets integration (logos, banners, cricketer image)
- [x] Global styles and typography configuration

## Phase 2: Database Schema
- [x] Extend users table with age, state, dateOfBirth fields
- [x] Create matches table (matchId, teams, venue, date, status, type)
- [x] Create teams table (real cricket teams from API)
- [x] Create players table (playerId, name, role, team, stats)
- [x] Create contests table (contestId, matchId, entryFee, prizePool, maxUsers)
- [x] Create userTeams table (teamId, userId, contestId, matchId, captain, viceCaptain)
- [x] Create userTeamPlayers table (junction table for team-player relationships)
- [x] Create leaderboard table (userId, contestId, rank, points, lastUpdated)
- [x] Create complianceLogs table (userId, action, timestamp, ipAddress, state)

## Phase 3: Custom Authentication System
- [x] Remove Manus OAuth dependencies
- [x] Implement bcrypt password hashing utility
- [x] Create JWT token generation and verification utilities
- [x] Build custom registration endpoint with age verification
- [x] Build custom login endpoint with JWT token issuance
- [ ] Build password reset flow (forgot password, reset token)
- [ ] Create refresh token mechanism
- [ ] Add rate limiting to auth endpoints
- [x] Update auth.me procedure for custom auth
- [x] Create session management utilities

## Phase 4: CricketData API Integration
- [x] Create cricketdata service folder structure
- [x] Build HTTP client with authentication
- [x] Implement 18 API endpoint wrappers
- [ ] Create response mapper for normalization
- [ ] Build caching layer for API responses
- [ ] Create syncMatches cron job (every 15-30 minutes)
- [ ] Create syncLiveScores cron job (every 10-30 seconds)
- [ ] Create syncSquads cron job
- [ ] Create syncResults cron job
- [x] Add error handling and retry logic
- [x] Store API credentials in environment variables

## Phase 5: Compliance & Geo-Blocking
- [x] Create age verification middleware (18+ check)
- [x] Create geo-blocking middleware for 7 states
- [x] Build IP-to-location service integration
- [x] Add compliance logging for all restricted actions
- [x] Enforce age check at registration
- [x] Enforce age check at login
- [ ] Enforce age check at contest participation
- [ ] Enforce geo-blocking at registration
- [ ] Enforce geo-blocking at login
- [ ] Enforce geo-blocking at API endpoints
- [ ] Create compliance message UI components

## Phase 6: Backend Routers & Controllers
- [ ] Create matches router (list, details, live, upcoming, completed)
- [ ] Create contests router (list, create, join, details)
- [ ] Create teams router (create, update, delete, list user teams)
- [ ] Create players router (list by match, player details, stats)
- [ ] Create leaderboard router (contest leaderboard, user rank)
- [ ] Create fantasy scoring engine
- [ ] Add protected procedures for authenticated routes
- [ ] Add admin procedures for management features

## Phase 7: Frontend Design System
- [ ] Configure Tailwind color palette (navy blue, electric blue)
- [ ] Set up typography with Google Fonts
- [ ] Create reusable UI components library
- [ ] Design responsive navigation system
- [ ] Create footer component with company info
- [ ] Set up theme provider (light theme default)

## Phase 8: Public Pages
- [ ] Home page with hero section (logo, banner, cricketer)
- [ ] Live matches section on homepage
- [ ] Upcoming matches section on homepage
- [ ] Completed matches section on homepage
- [ ] Features section on homepage
- [ ] How It Works section on homepage
- [ ] FAQs section on homepage
- [ ] Call-to-action sections
- [ ] About page (company story, mission, vision)
- [ ] How to Play page (detailed instructions)
- [ ] Fantasy Cricket page (game explanation)
- [ ] Fair Play page
- [ ] FAQs page (comprehensive Q&A)
- [ ] Contact Us page

## Phase 9: Legal & Compliance Pages
- [ ] Terms & Conditions page
- [ ] Privacy Policy page
- [ ] Disclaimer & Compliance page
- [ ] Responsible Gaming page (very detailed)
- [ ] Age restriction notice components
- [ ] Geo-blocking notice components

## Phase 10: Authentication Pages
- [ ] Registration page with age verification
- [ ] Login page
- [ ] Forgot Password page
- [ ] Reset Password page
- [ ] Email verification flow (if needed)
- [ ] Auth error handling and validation

## Phase 11: Dashboard & Profile
- [ ] User dashboard with stats overview
- [ ] My Teams section
- [ ] My Contests section
- [ ] Match history
- [ ] User profile page
- [ ] Profile edit functionality
- [ ] Account settings

## Phase 12: Fantasy Flow - Contest Selection
- [ ] Match listing page (live, upcoming, completed filters)
- [ ] Match details page
- [ ] Contest listing for selected match
- [ ] Contest details modal/page
- [ ] Contest join functionality

## Phase 13: Fantasy Flow - Team Creation
- [ ] Team creation page
- [ ] Player selection interface
- [ ] Player cards with stats and role
- [ ] Captain and vice-captain selection
- [ ] Team budget/credit system
- [ ] Team composition validation (batsmen, bowlers, all-rounders)
- [ ] Team summary page
- [ ] Team confirmation and submission
- [ ] Edit team functionality

## Phase 14: Live Leaderboard & Results
- [ ] Live leaderboard page with real-time updates
- [ ] User rank display
- [ ] Points breakdown by player
- [ ] Contest results page
- [ ] Winner announcement
- [ ] Match scorecard display
- [ ] Player performance stats

## Phase 15: Testing & Quality Assurance
- [ ] Write vitest tests for authentication system
- [ ] Write vitest tests for compliance middleware
- [ ] Write vitest tests for CricketData API integration
- [ ] Write vitest tests for fantasy scoring engine
- [ ] Write vitest tests for team creation logic
- [ ] Write vitest tests for leaderboard calculations
- [ ] Test age verification enforcement
- [ ] Test geo-blocking enforcement
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

## Phase 16: Deployment & Final Delivery
- [ ] Configure Railway MySQL database
- [ ] Set up environment variables in Railway
- [ ] Deploy to Railway
- [ ] Configure GitHub repository
- [ ] Set up CI/CD pipeline
- [ ] Create robots.txt
- [ ] Create sitemap.xml
- [ ] Google Search Console setup
- [ ] Final security audit
- [ ] Performance optimization
- [ ] Create deployment documentation
- [ ] Create API documentation
- [ ] Final checkpoint and delivery


## Bug Fixes (2025-12-28)
- [x] Fix password validation - remove special character requirement
- [x] Fix nested anchor tag errors in navigation components
- [x] Test all fixes and verify no regressions
