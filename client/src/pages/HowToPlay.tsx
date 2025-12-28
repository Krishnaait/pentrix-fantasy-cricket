import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Star, Target, Zap, Award, TrendingUp, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function HowToPlay() {
  const steps = [
    {
      number: 1,
      icon: Users,
      title: 'Create Your Account',
      description: 'Sign up for free on PENTRIX. Provide your basic information, verify your age (18+), and confirm your state of residence. No payment required - PENTRIX is 100% free forever!'
    },
    {
      number: 2,
      icon: Target,
      title: 'Choose a Match',
      description: 'Browse upcoming cricket matches from international and domestic tournaments. Select a match you want to create a fantasy team for. Check match details, venue, and participating teams.'
    },
    {
      number: 3,
      icon: Users,
      title: 'Select Your 11 Players',
      description: 'Build your dream team by selecting 11 players from both teams. You have a budget of 100 credits. Choose wisely - balance star players with value picks. Follow team composition rules (WK, BAT, AR, BOWL).'
    },
    {
      number: 4,
      icon: Star,
      title: 'Pick Captain & Vice-Captain',
      description: 'Choose a Captain (earns 2x points) and Vice-Captain (earns 1.5x points). This is crucial - your captain choice can make or break your ranking. Consider form, pitch conditions, and match-ups.'
    },
    {
      number: 5,
      icon: Trophy,
      title: 'Join a Contest',
      description: 'Select a contest to join. All contests on PENTRIX are free! Choose from different contest sizes and formats. You can create up to 11 teams per match and join multiple contests.'
    },
    {
      number: 6,
      icon: Zap,
      title: 'Track Live Scores',
      description: 'Watch the match live and track your fantasy points in real-time. See how your players perform and watch your rank change as the match progresses. Points update automatically.'
    },
    {
      number: 7,
      icon: Award,
      title: 'Check Results',
      description: 'After the match, view final rankings and your total points. Analyze your team performance, see which players scored well, and learn for next time. Climb the leaderboard!'
    }
  ];

  const teamComposition = [
    { role: 'Wicket-Keepers (WK)', min: 1, max: 4, description: 'Players who keep wickets. Usually score batting points plus bonus for catches/stumpings.' },
    { role: 'Batsmen (BAT)', min: 1, max: 6, description: 'Specialist batsmen. Score points primarily through runs, boundaries, and strike rate.' },
    { role: 'All-Rounders (AR)', min: 1, max: 4, description: 'Players who bat and bowl. Can score points from both disciplines - great value picks!' },
    { role: 'Bowlers (BOWL)', min: 1, max: 6, description: 'Specialist bowlers. Score points through wickets, maidens, and economy rate.' }
  ];

  const pointsSystem = [
    {
      category: 'Batting Points',
      actions: [
        { action: 'Run scored', points: '+1 point per run' },
        { action: 'Boundary (4s)', points: '+1 bonus point' },
        { action: 'Six (6s)', points: '+2 bonus points' },
        { action: 'Half-century (50 runs)', points: '+8 bonus points' },
        { action: 'Century (100 runs)', points: '+16 bonus points' },
        { action: 'Dismissal for duck (0 runs)', points: '-2 points' }
      ]
    },
    {
      category: 'Bowling Points',
      actions: [
        { action: 'Wicket taken', points: '+25 points' },
        { action: 'Bonus (LBW/Bowled)', points: '+8 bonus points' },
        { action: '3 wickets', points: '+4 bonus points' },
        { action: '4 wickets', points: '+8 bonus points' },
        { action: '5 wickets', points: '+16 bonus points' },
        { action: 'Maiden over', points: '+12 points' }
      ]
    },
    {
      category: 'Fielding Points',
      actions: [
        { action: 'Catch', points: '+8 points' },
        { action: 'Stumping (WK)', points: '+12 points' },
        { action: 'Run out (direct hit)', points: '+12 points' },
        { action: 'Run out (thrower/catcher)', points: '+6 points each' }
      ]
    },
    {
      category: 'Strike Rate & Economy',
      actions: [
        { action: 'Strike rate > 170 (min 10 balls)', points: '+6 points' },
        { action: 'Strike rate 150-170', points: '+4 points' },
        { action: 'Strike rate 130-150', points: '+2 points' },
        { action: 'Strike rate < 60', points: '-2 points' },
        { action: 'Economy < 5 (min 2 overs)', points: '+6 points' },
        { action: 'Economy 5-6', points: '+4 points' },
        { action: 'Economy 6-7', points: '+2 points' },
        { action: 'Economy > 10', points: '-2 points' }
      ]
    }
  ];

  const tips = [
    {
      icon: TrendingUp,
      title: 'Study Recent Form',
      description: 'Check player statistics from recent matches. Players in good form are more likely to perform well. Look at last 5 matches, not just career averages.'
    },
    {
      icon: Target,
      title: 'Consider Match Conditions',
      description: 'Pitch type, weather, and venue matter. Batting-friendly pitches favor batsmen and all-rounders. Bowling-friendly pitches favor bowlers. Check historical data for the venue.'
    },
    {
      icon: Users,
      title: 'Balance Your Team',
      description: 'Do not overload on expensive players. Mix premium picks with value players. Ensure you have players from both teams to cover all scenarios.'
    },
    {
      icon: Star,
      title: 'Captain Choice is Critical',
      description: 'Your captain earns 2x points - choose wisely! Pick a player likely to have high impact (top-order batsman, strike bowler, or in-form all-rounder). Avoid risky picks for captain.'
    },
    {
      icon: Shield,
      title: 'Avoid Injury-Prone Players',
      description: 'Check team news before finalizing your team. Injured or rested players score zero points. Follow official team announcements and toss updates.'
    },
    {
      icon: Zap,
      title: 'Create Multiple Teams',
      description: 'You can create up to 11 teams per match. Try different combinations and captain choices. This increases your chances of having a high-scoring team.'
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">How to Play Fantasy Cricket</h1>
          <p className="text-lg opacity-90">
            Complete guide to creating winning fantasy cricket teams on PENTRIX
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          <Card className="border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Trophy className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-2">Welcome to PENTRIX Fantasy Cricket!</p>
                  <p className="text-sm text-muted-foreground">
                    Fantasy cricket is a skill-based game where you create virtual teams of real cricket players. 
                    Your team earns points based on how those players perform in actual matches. The better your 
                    players perform, the more points you score. Compete with thousands of cricket fans and prove 
                    your cricket knowledge!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-center">7 Simple Steps to Get Started</h2>
            <div className="space-y-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.number} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex-shrink-0">
                          {step.number}
                        </div>
                        <div className="flex items-center gap-3 flex-1">
                          <Icon className="w-6 h-6 text-primary" />
                          <CardTitle>{step.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground ml-16">{step.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="bg-muted/30 py-8 px-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Team Composition Rules</h2>
            <p className="text-muted-foreground mb-6">
              Your 11-player team must follow these composition rules:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {teamComposition.map((rule, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-lg">{rule.role}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Minimum: {rule.min} | Maximum: {rule.max}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-4 border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
              <CardContent className="pt-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">Important Rules</p>
                    <ul className="text-yellow-800 dark:text-yellow-200 space-y-1">
                      <li>• Total team cost must not exceed 100 credits</li>
                      <li>• Maximum 7 players from one real cricket team</li>
                      <li>• You must select exactly 11 players</li>
                      <li>• You must choose 1 Captain and 1 Vice-Captain</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Points System</h2>
            <p className="text-muted-foreground mb-6">
              Understanding how points are awarded is key to building winning teams:
            </p>
            <div className="space-y-4">
              {pointsSystem.map((category, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {category.actions.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded">
                          <span className="text-sm">{item.action}</span>
                          <span className="text-sm font-semibold text-primary">{item.points}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-4 border-primary/50">
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Remember:</strong> Captain earns 2x points and Vice-Captain earns 1.5x points on all actions. 
                  Choose your captain wisely - this decision can significantly impact your final score!
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="bg-muted/30 py-8 px-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Pro Tips for Winning Teams</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip, idx) => {
                const Icon = tip.icon;
                return (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="w-5 h-5 text-primary" />
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I edit my team after creating it?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can edit your team until the match starts. Once the match begins, your team is locked 
                    and cannot be changed. Make sure to check team news and toss updates before the match.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How many teams can I create per match?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    You can create up to 11 different teams for each match. This allows you to try different strategies, 
                    captain choices, and player combinations to maximize your chances of success.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">When are points finalized?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Points are calculated in real-time during the match and are typically finalized within 2 hours 
                    after the match ends. This allows time for verification of official match statistics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens if a player does not play?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    If a player in your team does not play in the match (not in playing XI), they score 0 points. 
                    Always check team announcements and toss updates before the match to avoid selecting benched players.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Ready to Play?</h3>
                <p className="mb-6 opacity-90">
                  Join thousands of cricket fans on PENTRIX and start creating your winning fantasy teams today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/register"
                    className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-sm font-medium text-primary shadow transition-colors hover:bg-background/90"
                  >
                    Create Free Account
                  </a>
                  <a
                    href="/matches"
                    className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-primary-foreground/20"
                  >
                    Browse Matches
                  </a>
                </div>
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
