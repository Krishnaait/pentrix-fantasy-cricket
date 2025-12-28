import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, Users, Trophy, Shield, FileText } from 'lucide-react';
import Footer from '@/components/Footer';

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'Getting Started',
      icon: HelpCircle,
      color: 'text-blue-600',
      faqs: [
        {
          question: 'What is PENTRIX?',
          answer: 'PENTRIX is India\'s premier free-to-play fantasy cricket platform where you can create virtual teams of real cricket players and compete with other users based on actual match performances. Unlike traditional fantasy platforms, PENTRIX is 100% free with no entry fees or monetary prizes, focusing purely on entertainment and skill development.'
        },
        {
          question: 'How do I create an account?',
          answer: 'Creating an account on PENTRIX is simple and free:\n\n1. Click "Get Started" or "Sign Up" button on the homepage\n2. Choose to sign up with email or social login (Google/Facebook)\n3. Fill in your basic details: name, email, password\n4. Verify your email address through the confirmation link sent to your inbox\n5. Complete your profile with additional information\n6. You must be 18 years or older to create an account\n\nOnce registered, you can immediately start creating teams and joining contests!'
        },
        {
          question: 'Is PENTRIX really free to play?',
          answer: 'Yes, absolutely! PENTRIX is 100% free-to-play with:\n\n• No entry fees for any contests\n• No subscription charges or premium memberships\n• No hidden costs or in-app purchases\n• No monetary prizes (we focus on entertainment and skill)\n\nYou can create unlimited teams, join unlimited contests, and compete with millions of players without spending a single rupee. Our mission is to make fantasy cricket accessible to everyone!'
        },
        {
          question: 'Do I need to know cricket to play?',
          answer: 'While basic cricket knowledge helps, you don\'t need to be an expert! PENTRIX is designed for all skill levels:\n\n• Beginners: Start with our "How to Play" guide and learn as you go\n• Intermediate: Use player statistics and match insights to improve\n• Advanced: Analyze pitch conditions, head-to-head records, and form\n\nMany successful players started with minimal cricket knowledge and learned through experience. The platform provides player ratings, recent form, and expert tips to help you make informed decisions.'
        },
        {
          question: 'Which devices can I use to play?',
          answer: 'PENTRIX is accessible on all modern devices:\n\n• Desktop/Laptop: Full-featured experience on Chrome, Firefox, Safari, Edge\n• Mobile Browsers: Optimized mobile web experience on iOS and Android\n• Tablets: Responsive design works perfectly on iPad and Android tablets\n\nNo app download required! Simply visit pentrix.com from any browser and start playing. Your account syncs across all devices, so you can create teams on desktop and track scores on mobile.'
        }
      ]
    },
    {
      category: 'Creating Teams',
      icon: Users,
      color: 'text-green-600',
      faqs: [
        {
          question: 'How do I create a fantasy team?',
          answer: 'Creating a fantasy team is easy:\n\n1. Select a Match: Browse upcoming matches and click "Create Team"\n2. Pick 11 Players: Select players from both teams within 100 credits\n3. Follow Rules: Choose 1-4 WK, 3-6 BAT, 3-6 AR, 3-6 BOWL\n4. Maximum 7 players from one team\n5. Choose Captain (C): Earns 2x points\n6. Choose Vice-Captain (VC): Earns 1.5x points\n7. Save Team: Give it a name and join contests\n\nYou can create multiple teams (up to 11) for the same match with different player combinations to maximize your chances!'
        },
        {
          question: 'What is the credit system?',
          answer: 'Every player is assigned a credit value based on their skill, form, and popularity:\n\n• You have 100 credits to build your 11-player team\n• Star players cost more (9.5-11 credits)\n• Budget players cost less (7.0-8.5 credits)\n• Player credits are updated before each match based on recent performances\n\nStrategy Tips:\n• Balance star players with budget picks\n• Don\'t spend all credits on batsmen\n• Look for undervalued players in good form\n• All-rounders often provide best value\n\nThe credit system ensures fair competition and rewards strategic thinking over simply picking the most expensive players.'
        },
        {
          question: 'Can I edit my team after creating it?',
          answer: 'Yes, but with time restrictions:\n\nBefore Match Starts:\n• Edit your team unlimited times until the match deadline\n• Change players, captain, vice-captain freely\n• Deadline is typically 5-10 minutes before match start\n• You\'ll see a countdown timer showing time remaining\n\nAfter Match Starts:\n• Teams are locked and cannot be edited\n• This ensures fair play for all participants\n• Focus shifts to tracking live scores and rankings\n\nPro Tip: Always check the final playing XI announcement (usually 30 minutes before match) and make last-minute changes if needed. Players not in the XI score zero points!'
        },
        {
          question: 'How many teams can I create for one match?',
          answer: 'You can create up to 11 different teams for a single match. This allows you to:\n\n• Test different player combinations\n• Try various captaincy choices\n• Balance risky and safe strategies\n• Maximize your chances of winning\n\nWhy Multiple Teams?\nFantasy cricket involves uncertainty - pitch conditions, toss, player form can all impact performance. Creating multiple teams with different strategies helps hedge your bets and increases your chances of having at least one high-scoring team.\n\nBest Practice:\nStart with 2-3 teams as a beginner, focusing on different captaincy choices. As you gain experience, experiment with more variations.'
        },
        {
          question: 'What happens if a player doesn\'t play?',
          answer: 'If a player in your team is not in the final playing XI:\n\n• That player scores 0 points\n• Your team continues with remaining 10 players\n• No substitutions are allowed\n• This is why checking playing XI before deadline is crucial\n\nHow to Avoid This:\n1. Check team news and injury updates\n2. Wait for official playing XI announcement (usually 30 minutes before match)\n3. Edit your team after playing XI is confirmed\n4. Follow PENTRIX notifications for last-minute changes\n5. Avoid players with uncertain availability\n\nMany experienced players wait until the last 10 minutes before deadline to make final team adjustments based on confirmed playing XI.'
        },
        {
          question: 'Should I always pick the most expensive players?',
          answer: 'No! This is a common beginner mistake. Here\'s why:\n\nWhy Expensive ≠ Always Better:\n• Form matters more than reputation\n• Match conditions favor different player types\n• Budget players often outperform stars\n• You need credits for a balanced team\n\nSmart Selection Strategy:\n• Premium (9.5-11cr): 2-3 in-form match-winners\n• Mid-range (8.5-9.5cr): 4-5 consistent performers\n• Budget (7-8.5cr): 3-4 value picks in good form\n\nExample:\nA budget bowler (8.0cr) taking 3 wickets scores more than an expensive batsman (10.5cr) scoring 20 runs. Analyze match conditions, pitch reports, and recent form rather than just picking big names.\n\nGolden Rule: Balance is key - a well-researched budget team often beats a star-studded expensive team!'
        }
      ]
    },
    {
      category: 'Contests & Scoring',
      icon: Trophy,
      color: 'text-yellow-600',
      faqs: [
        {
          question: 'How does the points system work?',
          answer: 'Players earn points based on their real-match performance:\n\nBATTING:\n• Run: +1 point\n• Boundary (4): +1 bonus\n• Six (6): +2 bonus\n• 50 runs: +8 bonus\n• 100 runs: +16 bonus\n• Duck (out for 0): -2 points\n\nBOWLING:\n• Wicket: +25 points\n• 3 wickets: +4 bonus\n• 4 wickets: +8 bonus\n• 5 wickets: +16 bonus\n• Maiden over: +12 points\n\nFIELDING:\n• Catch: +8 points\n• 3 catches: +4 bonus\n• Stumping: +12 points\n• Run out: +6 points\n\nMULTIPLIERS:\n• Captain (C): 2x all points\n• Vice-Captain (VC): 1.5x all points\n\nExample: Your captain scores 65 runs (65 + 8 for fifty) = 73 points × 2 = 146 points!\n\nPoints update in real-time during the match, so you can track your team\'s performance live.'
        },
        {
          question: 'What types of contests are available?',
          answer: 'PENTRIX offers various contest formats:\n\n1. Public Contests\n• Open to all users\n• Large participant pools (100s to 1000s)\n• Compete with the entire PENTRIX community\n• Multiple prize ranks\n\n2. Private Contests\n• Create custom leagues with friends/colleagues\n• Set your own rules and size\n• Share invite code to join\n• Perfect for office leagues or friend groups\n\n3. Head-to-Head (H2H)\n• Compete against just one opponent\n• Winner takes all\n• Great for settling friendly rivalries\n\n4. Small Leagues\n• 5-50 participants\n• Better winning odds\n• More intimate competition\n\n5. Mega Contests\n• Thousands of participants\n• Top ranks win\n• Test your skills against the best\n\nAll contests are free to join! Choose based on your preference - play safe with small leagues or go big in mega contests.'
        },
        {
          question: 'How are contest winners determined?',
          answer: 'Winners are determined by total fantasy points scored:\n\nRanking System:\n1. Teams are ranked by total points (highest to lowest)\n2. Top ranks as per contest structure win\n3. In case of tie, prize is split equally\n4. Results are declared after match completion and verification\n\nPoints Calculation:\n• All 11 players\' points are added\n• Captain points multiplied by 2x\n• Vice-captain points multiplied by 1.5x\n• Final total determines your rank\n\nExample Contest (100 participants):\n• Rank 1-5: Top tier\n• Rank 6-20: Second tier\n• Rank 21-50: Third tier\n\nVerification Process:\n• Match results verified with official sources\n• Points audited for accuracy\n• Rankings finalized within 2 hours of match end\n• Results visible in "My Contests" section\n\nTie-Breaker:\nIf multiple teams have identical points, the prize for those ranks is divided equally among tied participants.'
        },
        {
          question: 'Can I join multiple contests with the same team?',
          answer: 'Yes! You can use the same team across multiple contests:\n\nHow It Works:\n1. Create your best team\n2. Join multiple contests with it\n3. Compete in different contest formats simultaneously\n4. Your team\'s points count in all contests\n\nBenefits:\n• Save time - no need to create separate teams\n• Test one strategy across different contest sizes\n• Maximize your team\'s potential\n• Join both public and private contests\n\nStrategy:\nMany players create 2-3 different teams and enter each in multiple contests:\n• Team 1: Safe, balanced picks → Small leagues\n• Team 2: Risky, differential picks → Mega contests\n• Team 3: Unique captain choice → H2H battles\n\nThis approach diversifies your strategy while maximizing contest participation!'
        },
        {
          question: 'When are contest results declared?',
          answer: 'Contest results follow this timeline:\n\nDuring Match:\n• Live points update in real-time\n• Leaderboard refreshes every few minutes\n• Track your rank as match progresses\n\nMatch Completion:\n• Preliminary results within 30 minutes\n• Points verification begins immediately\n• Initial rankings displayed\n\nFinal Results:\n• Verified results within 2 hours of match end\n• All points double-checked against official sources\n• Final leaderboard published\n• Winners notified via email/notification\n\nDelays:\nIn rare cases (disputed decisions, match interruptions), results may take up to 24 hours for complete verification.\n\nWhere to Check:\n• "My Contests" section in your profile\n• Match-specific leaderboard page\n• Email notification for final results\n• Results page for historical performance'
        }
      ]
    },
    {
      category: 'Account & Safety',
      icon: Shield,
      color: 'text-red-600',
      faqs: [
        {
          question: 'Is my personal information safe?',
          answer: 'Absolutely! PENTRIX takes data security very seriously:\n\nSecurity Measures:\n• 256-bit SSL encryption for all data transmission\n• Secure servers with regular security audits\n• Compliance with Indian data protection laws\n• No sharing of personal data with third parties\n• Regular backups and disaster recovery systems\n\nWhat We Collect:\n• Basic info: Name, email, phone (for account)\n• Profile data: Age, location (for eligibility)\n• Usage data: Teams created, contests joined (for experience)\n\nWhat We DON\'T Collect:\n• Financial information (we\'re free-to-play!)\n• Sensitive personal data\n• Social security or government IDs\n\nYour Rights:\n• View your data anytime in profile settings\n• Request data deletion (account closure)\n• Opt-out of marketing communications\n• Download your data in portable format\n\nRead our detailed Privacy Policy for complete information on data handling practices.'
        },
        {
          question: 'Can I have multiple accounts?',
          answer: 'No, multiple accounts are strictly prohibited:\n\nOne Account Per User Rule:\n• Each person can have only ONE PENTRIX account\n• Creating multiple accounts violates our Terms of Service\n• Detected violations result in permanent ban\n• All associated accounts will be suspended\n\nWhy This Rule Exists:\n• Ensures fair play for all users\n• Prevents contest manipulation\n• Maintains platform integrity\n• Protects community trust\n\nDetection Methods:\n• Email/phone verification\n• Device fingerprinting\n• IP address monitoring\n• Behavioral pattern analysis\n• User reports\n\nIf You Forgot Your Account:\n• Use "Forgot Password" to recover\n• Contact support for account recovery\n• Don\'t create a new account\n\nConsequences:\n• First offense: Warning and account merge\n• Repeat offense: Permanent ban from platform\n• No appeals for proven violations'
        },
        {
          question: 'How do I change my password?',
          answer: 'Changing your password is simple:\n\nFrom Profile Settings:\n1. Log in to your PENTRIX account\n2. Click on your profile icon (top right)\n3. Go to "Settings" → "Security"\n4. Click "Change Password"\n5. Enter current password\n6. Enter new password (min 8 characters)\n7. Confirm new password\n8. Click "Update Password"\n\nPassword Requirements:\n• Minimum 8 characters\n• At least one uppercase letter\n• At least one lowercase letter\n• At least one number\n• At least one special character (@, #, $, etc.)\n\nForgot Password?\n1. Click "Forgot Password" on login page\n2. Enter registered email address\n3. Check email for reset link\n4. Click link and create new password\n5. Link expires in 1 hour for security\n\nSecurity Tips:\n• Use unique password (not used elsewhere)\n• Change password every 3-6 months\n• Never share password with anyone\n• Enable two-factor authentication if available\n• Log out from shared devices'
        },
        {
          question: 'What if I suspect fraudulent activity on my account?',
          answer: 'If you notice suspicious activity, act immediately:\n\nImmediate Actions:\n1. Change Password - Secure your account first\n2. Log Out All Devices - Use "Log out everywhere" option\n3. Review Activity - Check recent teams and contest entries\n4. Contact Support - Report the incident immediately\n\nSigns of Compromise:\n• Teams you didn\'t create\n• Contest entries you didn\'t make\n• Profile changes you didn\'t authorize\n• Login notifications from unknown locations\n• Password reset emails you didn\'t request\n\nHow to Report:\n• Email: security@pentrix.com\n• Subject: "Account Security Issue - [Your Username]"\n• Include: Account details, suspicious activity description, timestamps\n• Response time: Within 24 hours\n\nOur Response:\n• Immediate account security review\n• Temporary account freeze if needed\n• Investigation of unauthorized access\n• Reversal of fraudulent actions\n• Security recommendations\n\nPrevention:\n• Use strong, unique passwords\n• Never share login credentials\n• Log out from public/shared devices\n• Be cautious of phishing emails\n• Enable email notifications for account activity'
        },
        {
          question: 'How do I delete my account?',
          answer: 'You can request account deletion at any time:\n\nDeletion Process:\n1. Email support@pentrix.com with subject "Account Deletion Request"\n2. Include your registered email and username\n3. Confirm your identity (security question or OTP)\n4. Receive confirmation email\n5. Account deactivated within 48 hours\n6. Complete data deletion within 30 days\n\nWhat Happens:\n• Profile and personal information deleted\n• All teams and contest entries removed\n• Account history archived for 90 days (legal compliance)\n• Email unsubscribed from all communications\n• Cannot be reversed after 30 days\n\nBefore Deletion:\n• Download your data if needed\n• Complete any ongoing contests\n• Note: No refunds (but we\'re free anyway!)\n\nData Retention:\n• Personal data: Deleted within 30 days\n• Transaction logs: 90 days (legal requirement)\n• Anonymized analytics: May be retained\n\nAlternative:\nIf you just need a break, consider "Deactivating" instead of deleting. Deactivation is reversible - you can reactivate anytime by logging in.'
        }
      ]
    },
    {
      category: 'Rules & Policies',
      icon: FileText,
      color: 'text-purple-600',
      faqs: [
        {
          question: 'What are the eligibility criteria to play?',
          answer: 'To play on PENTRIX, you must meet these requirements:\n\nAge Requirement:\n• Must be 18 years or older\n• Age verification required during registration\n• Accounts of underage users will be terminated\n\nGeographic Restrictions:\nPENTRIX is NOT available in these states due to local regulations:\n• Assam\n• Nagaland\n• Sikkim\n• Telangana\n• Andhra Pradesh\n• Odisha\n• Tamil Nadu\n\nUsers from these states cannot register or participate.\n\nOther Requirements:\n• Valid email address or phone number\n• Acceptance of Terms of Service\n• Acceptance of Privacy Policy\n• Compliance with Fair Play Policy\n• Indian residency (currently India-only platform)\n\nVerification:\n• Email/phone verification mandatory\n• Additional ID proof may be requested\n• Location verification through IP/GPS\n• False information leads to account suspension\n\nWhy These Rules?\nThese eligibility criteria ensure legal compliance and protect both users and the platform according to Indian fantasy sports regulations.'
        },
        {
          question: 'What is the Fair Play Policy?',
          answer: 'PENTRIX is committed to fair play and ethical gaming:\n\nProhibited Activities:\n• Creating multiple accounts\n• Using bots or automated tools\n• Sharing accounts with others\n• Colluding with other users\n• Exploiting platform bugs/glitches\n• Providing false information\n• Harassment or abusive behavior\n• Attempting to manipulate contests\n\nFair Play Principles:\n• One account per person\n• Manual team creation only\n• Respect for other players\n• Honest gameplay\n• Reporting violations\n• Accepting decisions gracefully\n\nViolation Consequences:\n• First Warning: Account warning + education\n• Second Offense: Temporary suspension (7-30 days)\n• Third Offense: Permanent ban from platform\n• Severe Violations: Immediate permanent ban\n\nReporting Violations:\nIf you suspect unfair play:\n• Email: fairplay@pentrix.com\n• Include evidence (screenshots, details)\n• All reports investigated confidentially\n• False reports may result in penalties\n\nOur Commitment:\n• Regular monitoring and audits\n• Advanced fraud detection systems\n• Swift action against violations\n• Transparent communication\n• Continuous policy improvements\n\nRead our complete Fair Play Policy for detailed guidelines.'
        },
        {
          question: 'Can I play from outside India?',
          answer: 'Currently, PENTRIX is available only for users in India:\n\nGeographic Restrictions:\n• Platform accessible only from Indian IP addresses\n• Registration requires Indian phone number/address\n• International users cannot create accounts\n• VPN usage to bypass restrictions is prohibited\n\nWhy India Only?\n• Legal compliance with Indian fantasy sports laws\n• Focus on Indian cricket and tournaments\n• Localized content and support\n• Regulatory requirements\n\nFuture Expansion:\nWe\'re working on expanding to other countries! Stay tuned for:\n• International version announcements\n• Country-specific platforms\n• Global tournaments\n\nFor NRIs (Non-Resident Indians):\n• Cannot access from abroad\n• Can play when visiting India\n• Must use Indian phone number\n• Account may be suspended if consistent foreign access detected\n\nWorkarounds:\nUsing VPNs or proxy servers to access PENTRIX from outside India violates our Terms of Service and will result in permanent account ban.\n\nStay Updated:\nSubscribe to our newsletter for announcements about international expansion!'
        },
        {
          question: 'What happens if a match is cancelled or abandoned?',
          answer: 'Match cancellations and abandonments are handled as follows:\n\nBefore Match Starts (Cancelled/Postponed):\n• All contests automatically cancelled\n• Team entries removed\n• No points awarded\n• Users can create teams for other matches\n• Email notification sent to all participants\n\nAfter Match Starts (Abandoned):\n\nScenario 1: Minimum Overs Played\n• If minimum overs completed (T20: 10 overs, ODI: 20 overs)\n• Contest continues with points scored until abandonment\n• Winners determined based on points accumulated\n• Follows official cricket rules\n\nScenario 2: Insufficient Overs\n• If minimum overs NOT completed\n• Contest cancelled\n• No winners declared\n• All entries void\n\nRescheduled Matches:\n• If match rescheduled within 48 hours: Teams remain valid\n• If rescheduled beyond 48 hours: Contest cancelled, create new teams\n• Users notified of rescheduling and options\n\nRain-Affected Matches:\n• DLS method results accepted\n• Points calculated based on revised targets\n• Official match result is final\n\nCommunication:\n• Real-time updates on match status\n• Email/push notifications for cancellations\n• Refund policy (N/A for free contests)\n• Support available for queries\n\nOfficial Sources:\nAll decisions based on official cricket board announcements and match referee reports.'
        },
        {
          question: 'How does PENTRIX make money if it\'s free?',
          answer: 'Great question! PENTRIX operates on a sustainable business model:\n\nCurrent Revenue (Minimal):\n• Advertising partnerships (non-intrusive)\n• Sponsorships from cricket brands\n• Data analytics (anonymized, aggregated)\n• Premium features (planned for future)\n\nWhat We DON\'T Do:\n• No entry fees or paid contests\n• No selling user data to third parties\n• No aggressive advertising\n• No pay-to-win mechanics\n\nOur Philosophy:\n• Build large, engaged user base first\n• Focus on user experience over profits\n• Sustainable growth through community\n• Future monetization through optional features\n\nPlanned Features (Optional):\n• Advanced statistics and analytics\n• Expert tips and predictions\n• Custom leagues with premium features\n• Merchandise and cricket gear\n• All core features remain FREE forever\n\nWhy Free-to-Play?\n• Make fantasy cricket accessible to everyone\n• Remove financial barriers to entry\n• Focus on skill and entertainment\n• Build India\'s largest fantasy community\n• Comply with regulations in all states\n\nOur Commitment:\nThe core PENTRIX experience - creating teams, joining contests, competing with others - will ALWAYS be 100% free. We believe fantasy cricket should be about skill and passion, not money.'
        }
      ]
    },
    {
      category: 'Technical Support',
      icon: HelpCircle,
      color: 'text-orange-600',
      faqs: [
        {
          question: 'The website is loading slowly. What should I do?',
          answer: 'If you\'re experiencing slow loading times, try these solutions:\n\nQuick Fixes:\n1. Refresh the page (Ctrl+R or Cmd+R)\n2. Clear browser cache:\n   - Chrome: Settings → Privacy → Clear browsing data\n   - Firefox: Options → Privacy → Clear Data\n   - Safari: Preferences → Privacy → Manage Website Data\n3. Check internet connection (run speed test)\n4. Close unnecessary tabs (free up memory)\n5. Restart browser\n\nBrowser Optimization:\n• Update to latest browser version\n• Disable unnecessary extensions\n• Use incognito/private mode to test\n• Try different browser (Chrome recommended)\n\nNetwork Issues:\n• Switch between WiFi and mobile data\n• Restart router/modem\n• Check if other websites load normally\n• Contact ISP if persistent issues\n\nDevice Performance:\n• Close background applications\n• Restart device\n• Free up storage space\n• Update operating system\n\nPeak Hours:\nSlight slowdowns may occur during:\n• Major match start times\n• Team deadline periods\n• High traffic events\n\nWe continuously optimize performance. If issues persist after trying these solutions, contact support@pentrix.com with:\n• Browser and version\n• Device type\n• Internet speed\n• Screenshot of error (if any)'
        },
        {
          question: 'I\'m not receiving emails from PENTRIX. Why?',
          answer: 'If you\'re missing emails from PENTRIX, check these:\n\n1. Spam/Junk Folder:\n• Check spam, junk, or promotions folder\n• Mark PENTRIX emails as "Not Spam"\n• Add support@pentrix.com to contacts\n• Add noreply@pentrix.com to safe senders\n\n2. Email Filters:\n• Check email filters/rules\n• Ensure PENTRIX domain not blocked\n• Look for automatic folder sorting\n• Disable aggressive spam filters temporarily\n\n3. Correct Email Address:\n• Verify email in profile settings\n• Check for typos in registered email\n• Update if email changed\n• Confirm email verification completed\n\n4. Email Service Issues:\n• Some providers block bulk emails\n• Corporate emails may have strict filters\n• Try alternative email (Gmail recommended)\n• Check email quota/storage\n\n5. Notification Settings:\n• Go to Settings → Notifications\n• Ensure email notifications enabled\n• Select which emails you want to receive\n• Save changes\n\nTypes of Emails:\n• Account verification\n• Password reset\n• Contest reminders\n• Match updates\n• Results notifications\n• Promotional updates (optional)\n\nStill Not Receiving?\nContact support@pentrix.com with:\n• Registered email address\n• Username\n• Which emails you\'re missing\n• When the issue started\n\nWe\'ll investigate and resolve within 24-48 hours.'
        },
        {
          question: 'My team is not saving. What should I do?',
          answer: 'If your team isn\'t saving, try these troubleshooting steps:\n\nCommon Causes & Solutions:\n\n1. Team Validation Errors:\n• Check if you have exactly 11 players\n• Verify player role requirements (WK: 1-4, BAT: 3-6, AR: 3-6, BOWL: 3-6)\n• Ensure maximum 7 players from one team\n• Confirm total credits ≤ 100\n• Select both Captain and Vice-Captain\n• Look for error messages (usually in red)\n\n2. Internet Connection:\n• Check if you\'re online\n• Try refreshing the page\n• Switch between WiFi and mobile data\n• Test with other websites\n\n3. Browser Issues:\n• Clear browser cache and cookies\n• Disable browser extensions\n• Try incognito/private mode\n• Use different browser\n• Update browser to latest version\n\n4. Session Timeout:\n• You may have been logged out\n• Refresh page and log in again\n• Your team draft might be saved\n• Check "My Teams" section\n\n5. Deadline Passed:\n• Check if match deadline has passed\n• Teams lock 5-10 minutes before match\n• Cannot save after deadline\n• Create team for different match\n\n6. Server Issues:\n• Rare platform maintenance\n• High traffic during popular matches\n• Try again after few minutes\n• Check PENTRIX social media for updates\n\nBest Practices:\n• Save team well before deadline\n• Don\'t wait until last minute\n• Keep backup of player selections\n• Use "Save Draft" feature regularly\n\nStill Having Issues?\nContact support with:\n• Screenshot of error\n• Match details\n• Browser and device info\n• Time when issue occurred'
        },
        {
          question: 'How do I report a bug or technical issue?',
          answer: 'We appreciate bug reports! Here\'s how to report effectively:\n\nReporting Channels:\n\n1. Email Support:\n• Email: support@pentrix.com\n• Subject: "Bug Report - [Brief Description]"\n• Response time: 24-48 hours\n\n2. In-App Feedback:\n• Click "Help" icon (bottom right)\n• Select "Report Issue"\n• Fill in bug details\n• Submit with screenshots\n\nInformation to Include:\n\nEssential Details:\n• What happened: Describe the bug clearly\n• Expected behavior: What should have happened\n• Steps to reproduce: How to recreate the bug\n• Frequency: Does it happen every time?\n• Impact: How severely does it affect you?\n\nTechnical Information:\n• Device: Desktop/Mobile/Tablet\n• Operating System: Windows/Mac/iOS/Android + version\n• Browser: Chrome/Firefox/Safari/Edge + version\n• Screen size/resolution\n• Internet connection type\n\nSupporting Evidence:\n• Screenshots (highly recommended)\n• Screen recording (for complex issues)\n• Console errors (if you\'re tech-savvy)\n• Network logs (for connection issues)\n\nOur Response:\n• Acknowledgment within 24 hours\n• Investigation and priority assignment\n• Updates on fix progress\n• Notification when bug is resolved\n• Credit/appreciation for helpful reports\n\nBug Bounty:\nFor critical security bugs, we offer recognition and rewards. Email security@pentrix.com for sensitive issues.'
        },
        {
          question: 'Who do I contact for help?',
          answer: 'PENTRIX offers multiple support channels:\n\nEmail Support (Primary):\n• General queries: support@pentrix.com\n• Technical issues: support@pentrix.com\n• Account security: security@pentrix.com\n• Fair play violations: fairplay@pentrix.com\n• Legal matters: legal@pentrix.com\n• Response time: 24-48 hours (business days)\n\nIn-App Help Center:\n• Click "Help" icon (bottom right corner)\n• Browse FAQs and guides\n• Submit support ticket\n• Live chat (during business hours)\n\nSocial Media:\n• Twitter: @pentrix (quick responses)\n• Facebook: /pentrix (community support)\n• Instagram: @pentrix (updates and tips)\n• Response time: 2-4 hours during business hours\n\nCommunity Forum:\n• Ask questions to experienced players\n• Share strategies and tips\n• Report issues\n• Get peer support\n\nSupport Hours:\n• Monday-Friday: 9:00 AM - 6:00 PM IST\n• Saturday-Sunday: 10:00 AM - 4:00 PM IST\n• Emergency issues: 24/7 monitoring\n\nBefore Contacting Support:\n1. Check this FAQ page\n2. Search Help Center\n3. Try basic troubleshooting\n4. Gather relevant information\n\nWhat to Include:\n• Your username/email\n• Detailed description of issue\n• Screenshots if applicable\n• Steps you\'ve already tried\n• Device and browser information\n\nResponse Priority:\n• Critical (account security): Immediate\n• High (cannot play): Within 4 hours\n• Medium (feature issues): Within 24 hours\n• Low (general queries): Within 48 hours\n\nEscalation:\nIf not satisfied with initial response:\n• Reply to support email requesting escalation\n• Mention ticket number\n• Explain why issue needs escalation\n• Senior support team will review\n\nWe\'re committed to helping you have the best PENTRIX experience!'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-lg opacity-90">
            Find answers to common questions about PENTRIX
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2">
                  Found {filteredCategories.reduce((acc, cat) => acc + cat.faqs.length, 0)} results
                </p>
              )}
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${category.color}`} />
                      {category.category}
                      <Badge variant="secondary" className="ml-auto">
                        {category.faqs.length} {category.faqs.length === 1 ? 'question' : 'questions'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIdx) => (
                        <AccordionItem key={faqIdx} value={`item-${idx}-${faqIdx}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-muted-foreground whitespace-pre-line">
                              {faq.answer}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try different keywords or browse all categories above
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary hover:underline"
                >
                  Clear search
                </button>
              </CardContent>
            </Card>
          )}

          {/* Still Need Help */}
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle>Still need help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Our support team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Contact Support
                </a>
                <a
                  href="/how-to-play"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  How to Play Guide
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  
      <Footer />
    </>
  );
}
