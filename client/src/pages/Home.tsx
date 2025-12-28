import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { 
  Trophy, Users, TrendingUp, Shield, Clock, Target, 
  CheckCircle2, AlertCircle, Info, ChevronRight, Play,
  Calendar, MapPin, Award, BarChart3, Mail, Phone, ExternalLink
} from "lucide-react";

export default function Home() {
  // Fetch current matches for live/completed sections
  const { data: currentMatchesData, isLoading: isLoadingCurrent } = trpc.matches.getCurrentMatches.useQuery();
  
  // Fetch all matches for upcoming section
  const { data: allMatchesData, isLoading: isLoadingAll } = trpc.matches.getAllMatches.useQuery();

  const isLoading = isLoadingCurrent || isLoadingAll;

  // Separate matches by status
  const liveMatches = currentMatchesData?.matches?.filter((m: any) => m.matchStarted && !m.matchEnded) || [];
  const completedMatches = currentMatchesData?.matches?.filter((m: any) => m.matchEnded) || [];
  
  // Get upcoming matches from allMatches and sort by date
  const upcomingMatches = (allMatchesData?.matches?.filter((m: any) => 
    !m.matchStarted && !m.matchEnded
  ) || []).sort((a: any, b: any) => 
    new Date(a.dateTimeGMT).getTime() - new Date(b.dateTimeGMT).getTime()
  ).slice(0, 6); // Show only first 6 upcoming matches

  const formatMatchType = (type: string) => {
    return type.toUpperCase();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const MatchCard = ({ match, showLiveBadge = false, showCompletedBadge = false }: any) => (
    <Card key={match.id} className={showLiveBadge ? "border-red-500/50" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {showLiveBadge && (
              <Badge variant="destructive" className="animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mr-2" />
                LIVE
              </Badge>
            )}
            {showCompletedBadge && (
              <Badge variant="outline" className="border-green-500 text-green-600">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
            {!showLiveBadge && !showCompletedBadge && (
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                Upcoming
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="font-mono">
            {formatMatchType(match.matchType)}
          </Badge>
        </div>
        
        <CardTitle className="text-base font-semibold">{match.name}</CardTitle>
        
        <div className="space-y-3 mt-4">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={match.teamInfo?.[0]?.img} alt={match.teams[0]} />
                <AvatarFallback>{match.teamInfo?.[0]?.shortname || match.teams[0]?.substring(0, 3)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{match.teams[0]}</span>
            </div>
            {match.score?.[0] && (
              <div className="text-right">
                <span className="font-bold text-lg">{match.score[0].r}/{match.score[0].w}</span>
                <span className="text-xs text-muted-foreground ml-2">({match.score[0].o})</span>
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={match.teamInfo?.[1]?.img} alt={match.teams[1]} />
                <AvatarFallback>{match.teamInfo?.[1]?.shortname || match.teams[1]?.substring(0, 3)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{match.teams[1]}</span>
            </div>
            {match.score?.[1] && (
              <div className="text-right">
                <span className="font-bold text-lg">{match.score[1].r}/{match.score[1].w}</span>
                <span className="text-xs text-muted-foreground ml-2">({match.score[1].o})</span>
              </div>
            )}
          </div>
        </div>

        <CardDescription className="mt-3 space-y-1">
          <div className="flex items-center text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            {match.venue}
          </div>
          <div className="flex items-center text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(match.dateTimeGMT)}
          </div>
          {match.status && (
            <div className="text-xs font-medium text-primary mt-2">
              {match.status}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/match/${match.id}`}>
          <Button className="w-full" variant={showLiveBadge ? "default" : "outline"}>
            {showLiveBadge ? "View Live Match" : showCompletedBadge ? "View Scorecard" : "Create Team"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/matches" className="transition-colors hover:text-primary">Matches</Link>
            <Link href="/how-to-play" className="transition-colors hover:text-primary">How to Play</Link>
            <Link href="/faqs" className="transition-colors hover:text-primary">FAQs</Link>
            <Link href="/about" className="transition-colors hover:text-primary">About</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login"><Button variant="ghost">Login</Button></Link>
            <Link href="/register"><Button>Get Started</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Keeping existing implementation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">
                  <Play className="w-3 h-3 mr-1" />
                  Free to Play
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Play Fantasy Cricket, Win Big
                </h1>
                <p className="text-xl text-muted-foreground">
                  Join India's fastest-growing free-to-play fantasy cricket platform. Create your dream team, compete with millions, and prove your cricket knowledge.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Playing Free
                  </Button>
                </Link>
                <Link href="/matches">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Live Matches
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Players</div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Contests Daily</div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Live Matches</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/cricketer-batsman.png" 
                alt="Professional Cricketer" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Keeping existing */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PENTRIX?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the best fantasy cricket platform with real-time updates, fair play, and exciting contests
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Trophy className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Free to Play</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">100% free platform. No entry fees, no hidden charges. Just pure cricket fun.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Real-Time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Live scores, instant leaderboard updates, and real-time player performance tracking.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Fair Play Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Transparent scoring system, skill-based gameplay, and strict compliance with Indian laws.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Compete with Thousands</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Join contests with thousands of players and climb the leaderboard to prove your skills.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Matches Section - UPDATED */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Live Matches</h2>
              <p className="text-muted-foreground">Join contests for matches happening right now</p>
            </div>
            <Link href="/matches">
              <Button variant="outline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading live matches...</p>
            </div>
          )}
          {!isLoading && liveMatches.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No live matches at the moment. Check upcoming matches!</p>
              </CardContent>
            </Card>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.slice(0, 3).map((match: any) => (
              <MatchCard key={match.id} match={match} showLiveBadge={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches Section - UPDATED */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upcoming Matches</h2>
              <p className="text-muted-foreground">Create your team before the match starts</p>
            </div>
            <Link href="/matches">
              <Button variant="outline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          {!isLoading && upcomingMatches.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming matches scheduled. Check back soon!</p>
              </CardContent>
            </Card>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.slice(0, 6).map((match: any) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* Completed Matches Section - UPDATED */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Completed Matches</h2>
              <p className="text-muted-foreground">View results and leaderboards</p>
            </div>
            <Link href="/results">
              <Button variant="outline">
                View All Results <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          {!isLoading && completedMatches.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No completed matches yet.</p>
              </CardContent>
            </Card>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMatches.slice(0, 3).map((match: any) => (
              <MatchCard key={match.id} match={match} showCompletedBadge={true} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Keeping existing */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in 4 simple steps and start competing today
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((step) => {
              const titles = ["Select a Match", "Create Your Team", "Join Contest", "Track & Win"];
              const descriptions = [
                "Choose from live or upcoming cricket matches across all formats",
                "Pick 11 players within budget. Select captain and vice-captain for bonus points",
                "Enter free contests and compete with thousands of other players",
                "Watch live scores, track your rank on the leaderboard, and celebrate your wins"
              ];
              return (
                <div key={step} className="relative">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                      {step}
                    </div>
                    <h3 className="text-xl font-semibold">{titles[step - 1]}</h3>
                    <p className="text-muted-foreground">{descriptions[step - 1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link href="/how-to-play">
              <Button size="lg">
                Learn More About Scoring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs - Keeping existing */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about PENTRIX fantasy cricket
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Is PENTRIX really free to play?",
                a: "Yes! PENTRIX is 100% free. There are no entry fees, no hidden charges, and no payment required. We're a skill-based, educational platform for entertainment purposes only."
              },
              {
                q: "Who can play on PENTRIX?",
                a: "You must be 18 years or older to play. PENTRIX is available across India except in Assam, Telangana, Tamil Nadu, Odisha, Andhra Pradesh, Nagaland, and Sikkim due to local regulations."
              },
              {
                q: "How is the scoring calculated?",
                a: "Points are awarded based on real player performance: runs, wickets, catches, strike rate, economy rate, and more. Your captain gets 2x points and vice-captain gets 1.5x points."
              },
              {
                q: "Can I edit my team after joining a contest?",
                a: "You can edit your team until the match starts. Once the match begins, team changes are locked to ensure fair play for all participants."
              }
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faqs">
              <Button variant="outline">
                View All FAQs <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance - Keeping existing */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Legal Compliance & Fair Play</CardTitle>
              <CardDescription className="text-base">
                PENTRIX operates in full compliance with Indian fantasy sports regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-primary mx-auto" />
                  <h4 className="font-semibold">Age Restriction</h4>
                  <p className="text-sm text-muted-foreground">
                    Only users 18 years and above can participate. Age verification is mandatory at registration.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <MapPin className="w-8 h-8 text-primary mx-auto" />
                  <h4 className="font-semibold">Geo-Restrictions</h4>
                  <p className="text-sm text-muted-foreground">
                    Not available in Assam, Telangana, Tamil Nadu, Odisha, Andhra Pradesh, Nagaland, and Sikkim.
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-primary mx-auto" />
                  <h4 className="font-semibold">Skill-Based Gaming</h4>
                  <p className="text-sm text-muted-foreground">
                    PENTRIX is a game of skill, not chance. Success depends on your cricket knowledge and strategy.
                  </p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  <Info className="w-4 h-4 inline mr-1" />
                  PENTRIX ZONE PRIVATE LIMITED | CIN: U74999TN2018PTC124738 | GST: 33AAKCP1307J1ZL
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Responsible Play - Keeping existing */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-orange-500/20">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Target className="w-12 h-12 text-orange-500" />
                </div>
                <CardTitle className="text-2xl">Play Responsibly</CardTitle>
                <CardDescription className="text-base">
                  PENTRIX promotes responsible gaming and fair play
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      Do's
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                      <li>• Play for fun and entertainment</li>
                      <li>• Set time limits for yourself</li>
                      <li>• Learn and improve your cricket knowledge</li>
                      <li>• Take breaks between contests</li>
                      <li>• Read terms and conditions carefully</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                      Don'ts
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                      <li>• Don't play if you're under 18</li>
                      <li>• Don't share your account credentials</li>
                      <li>• Don't create multiple accounts</li>
                      <li>• Don't play from restricted states</li>
                      <li>• Don't engage in unfair practices</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-sm text-center">
                    <strong>Remember:</strong> PENTRIX is for entertainment and skill development only. Play responsibly and within your limits. If you feel you need help, please reach out to our support team.
                  </p>
                </div>
                <div className="text-center">
                  <Link href="/responsible-gaming">
                    <Button variant="outline">
                      Read Full Responsible Gaming Policy
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA - Keeping existing */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Start Your Fantasy Cricket Journey?
            </h2>
            <p className="text-lg opacity-90">
              Join thousands of cricket fans already playing on PENTRIX. Create your dream team and compete today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/matches">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Browse Matches
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - COMPLETELY UPDATED */}
      <footer className="bg-muted/50 py-12 border-t">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" />
              <p className="text-sm text-muted-foreground">
                India's premier free-to-play fantasy cricket platform. Skill-based gaming for entertainment only.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:support@pentrix.com" className="hover:text-foreground">support@pentrix.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 1800-XXX-XXXX</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/matches" className="hover:text-foreground transition-colors text-muted-foreground">Matches</Link></li>
                <li><Link href="/contests" className="hover:text-foreground transition-colors text-muted-foreground">Contests</Link></li>
                <li><Link href="/my-teams" className="hover:text-foreground transition-colors text-muted-foreground">My Teams</Link></li>
                <li><Link href="/leaderboard/1" className="hover:text-foreground transition-colors text-muted-foreground">Leaderboard</Link></li>
                <li><Link href="/results" className="hover:text-foreground transition-colors text-muted-foreground">Results</Link></li>
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-to-play" className="hover:text-foreground transition-colors text-muted-foreground">How to Play</Link></li>
                <li><Link href="/faqs" className="hover:text-foreground transition-colors text-muted-foreground">FAQs</Link></li>
                <li><Link href="/about" className="hover:text-foreground transition-colors text-muted-foreground">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors text-muted-foreground">Contact Us</Link></li>
                <li><Link href="/fair-play" className="hover:text-foreground transition-colors text-muted-foreground">Fair Play Policy</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-foreground transition-colors text-muted-foreground">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors text-muted-foreground">Privacy Policy</Link></li>
                <li><Link href="/responsible-gaming" className="hover:text-foreground transition-colors text-muted-foreground">Responsible Gaming</Link></li>
                <li><Link href="/legality" className="hover:text-foreground transition-colors text-muted-foreground">Legality</Link></li>
                <li><Link href="/refund-policy" className="hover:text-foreground transition-colors text-muted-foreground">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Bottom Footer */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <div className="text-center md:text-left">
                <p className="font-semibold">© 2025 PENTRIX ZONE PRIVATE LIMITED. All rights reserved.</p>
                <p className="text-xs mt-1">CIN: U74999TN2018PTC124738 | GST: 33AAKCP1307J1ZL</p>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://twitter.com/pentrix" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a href="https://facebook.com/pentrix" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a href="https://instagram.com/pentrix" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Registered Office */}
            <div className="text-xs text-center text-muted-foreground bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold mb-1">Registered Office Address:</p>
              <p>No. 47/49, Abdul Azeez Street, 301 Skanda Flats, T. Nagar, Chennai, Tamil Nadu – 600017, India</p>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-center text-muted-foreground">
              <p>
                <Info className="w-3 h-3 inline mr-1" />
                This game involves an element of financial risk and may be addictive. Please play responsibly and at your own risk.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
