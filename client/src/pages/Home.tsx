import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { 
  Trophy, Users, TrendingUp, Shield, Clock, Target, 
  CheckCircle2, AlertCircle, Info, ChevronRight, Play,
  Calendar, MapPin, Award, BarChart3
} from "lucide-react";

export default function Home() {
  const { data: matchesData, isLoading } = trpc.matches.getCurrentMatches.useQuery({});

  const liveMatches = matchesData?.matches?.filter((m: any) => m.status === 'live') || [];
  const upcomingMatches = matchesData?.matches?.filter((m: any) => m.status === 'upcoming') || [];
  const completedMatches = matchesData?.matches?.filter((m: any) => m.status === 'completed') || [];

  return (
    <div className="min-h-screen bg-background">
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm"><Play className="w-3 h-3 mr-1" />Free to Play</Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Play Fantasy Cricket, Win Big</h1>
                <p className="text-xl text-muted-foreground">Join India's fastest-growing free-to-play fantasy cricket platform.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register"><Button size="lg">Start Playing Free</Button></Link>
                <Link href="/matches"><Button size="lg" variant="outline">View Live Matches</Button></Link>
              </div>
            </div>
            <div className="relative"><img src="/images/cricketer-batsman.png" alt="Professional Cricketer" className="w-full h-auto object-contain" /></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PENTRIX?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card><CardHeader><Trophy className="w-10 h-10 text-primary mb-2" /><CardTitle>Free to Play</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">100% free platform. No entry fees.</p></CardContent></Card>
            <Card><CardHeader><TrendingUp className="w-10 h-10 text-primary mb-2" /><CardTitle>Real-Time Updates</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Live scores and instant updates.</p></CardContent></Card>
            <Card><CardHeader><Shield className="w-10 h-10 text-primary mb-2" /><CardTitle>Fair Play</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Transparent scoring system.</p></CardContent></Card>
            <Card><CardHeader><Users className="w-10 h-10 text-primary mb-2" /><CardTitle>Compete</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Join thousands of players.</p></CardContent></Card>
          </div>
        </div>
      </section>

      {/* Live Matches */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div><h2 className="text-3xl font-bold mb-2">Live Matches</h2></div>
            <Link href="/matches"><Button variant="outline">View All <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          {isLoading && <div className="text-center py-12"><p className="text-muted-foreground">Loading...</p></div>}
          {!isLoading && liveMatches.length === 0 && <Card><CardContent className="py-12 text-center"><Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No live matches</p></CardContent></Card>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.slice(0, 3).map((match: any) => (
              <Card key={match.id} className="border-primary/50">
                <CardHeader>
                  <Badge variant="destructive" className="animate-pulse"><div className="w-2 h-2 bg-white rounded-full mr-2" />LIVE</Badge>
                  <CardTitle className="text-lg">{match.teamA} vs {match.teamB}</CardTitle>
                </CardHeader>
                <CardContent><Link href={`/match/${match.id}`}><Button className="w-full">View Details</Button></Link></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div><h2 className="text-3xl font-bold mb-2">Upcoming Matches</h2></div>
            <Link href="/matches"><Button variant="outline">View All <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          {!isLoading && upcomingMatches.length === 0 && <Card><CardContent className="py-12 text-center"><Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No upcoming matches</p></CardContent></Card>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.slice(0, 6).map((match: any) => (
              <Card key={match.id}>
                <CardHeader>
                  <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Upcoming</Badge>
                  <CardTitle className="text-lg">{match.teamA} vs {match.teamB}</CardTitle>
                </CardHeader>
                <CardContent><Link href={`/match/${match.id}`}><Button variant="outline" className="w-full">Create Team</Button></Link></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Completed Matches */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div><h2 className="text-3xl font-bold mb-2">Completed Matches</h2></div>
            <Link href="/results"><Button variant="outline">View All Results <ChevronRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
          {!isLoading && completedMatches.length === 0 && <Card><CardContent className="py-12 text-center"><BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No completed matches yet.</p></CardContent></Card>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMatches.slice(0, 3).map((match: any) => (
              <Card key={match.id}>
                <CardHeader>
                  <Badge variant="outline"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
                  <CardTitle className="text-lg">{match.teamA} vs {match.teamB}</CardTitle>
                </CardHeader>
                <CardContent><Link href={`/match/${match.id}`}><Button variant="outline" className="w-full">View Scorecard</Button></Link></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold">Select a Match</h3>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold">Create Your Team</h3>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold">Join Contest</h3>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">4</div>
              <h3 className="text-xl font-semibold">Track & Win</h3>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2></div>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card><CardHeader><CardTitle className="text-lg">Is PENTRIX really free to play?</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Yes! 100% free platform.</p></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">Who can play on PENTRIX?</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">18+ only. Not available in 7 restricted states.</p></CardContent></Card>
          </div>
          <div className="text-center mt-8"><Link href="/faqs"><Button variant="outline">View All FAQs <ChevronRight className="w-4 h-4 ml-1" /></Button></Link></div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Legal Compliance & Fair Play</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2"><AlertCircle className="w-8 h-8 text-primary mx-auto" /><h4 className="font-semibold">Age Restriction</h4><p className="text-sm text-muted-foreground">18+ only</p></div>
                <div className="text-center space-y-2"><MapPin className="w-8 h-8 text-primary mx-auto" /><h4 className="font-semibold">Geo-Restrictions</h4><p className="text-sm text-muted-foreground">Not available in 7 states</p></div>
                <div className="text-center space-y-2"><CheckCircle2 className="w-8 h-8 text-primary mx-auto" /><h4 className="font-semibold">Skill-Based</h4><p className="text-sm text-muted-foreground">Game of skill</p></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Responsible Play */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-orange-500/20">
              <CardHeader className="text-center">
                <Target className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Play Responsibly</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div><h4 className="font-semibold flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />Do's</h4><ul className="text-sm text-muted-foreground space-y-1 ml-7"><li>• Play for fun</li><li>• Set time limits</li></ul></div>
                  <div><h4 className="font-semibold flex items-center"><AlertCircle className="w-5 h-5 text-red-500 mr-2" />Don'ts</h4><ul className="text-sm text-muted-foreground space-y-1 ml-7"><li>• Don't play if under 18</li><li>• Don't share credentials</li></ul></div>
                </div>
                <div className="text-center"><Link href="/responsible-gaming"><Button variant="outline">Read Full Policy</Button></Link></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Start Your Fantasy Cricket Journey?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register"><Button size="lg" variant="secondary">Create Free Account</Button></Link>
              <Link href="/matches"><Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">Browse Matches</Button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 border-t">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8 mb-4" /><p className="text-sm text-muted-foreground">India's premier free-to-play fantasy cricket platform.</p></div>
            <div><h4 className="font-semibold mb-4">Quick Links</h4><ul className="space-y-2 text-sm"><li><Link href="/matches" className="hover:text-foreground transition-colors text-muted-foreground">Matches</Link></li></ul></div>
            <div><h4 className="font-semibold mb-4">Learn</h4><ul className="space-y-2 text-sm"><li><Link href="/how-to-play" className="hover:text-foreground transition-colors text-muted-foreground">How to Play</Link></li></ul></div>
            <div><h4 className="font-semibold mb-4">Legal</h4><ul className="space-y-2 text-sm"><li><Link href="/terms" className="hover:text-foreground transition-colors text-muted-foreground">Terms</Link></li></ul></div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground"><p>© 2025 PENTRIX ZONE PRIVATE LIMITED. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}
