import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trophy, Users, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              <img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" />
            </a>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/matches">
              <a className="text-sm font-medium hover:text-primary transition-colors">Matches</a>
            </Link>
            <Link href="/how-to-play">
              <a className="text-sm font-medium hover:text-primary transition-colors">How to Play</a>
            </Link>
            <Link href="/faqs">
              <a className="text-sm font-medium hover:text-primary transition-colors">FAQs</a>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "url(/banners/hero-cricket-stadium.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Play Fantasy Cricket,
                <span className="text-primary"> Win Big</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Join India's fastest-growing free-to-play fantasy cricket platform. 
                Create your dream team, compete with millions, and prove your cricket knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto">Start Playing Free</Button>
                </Link>
                <Link href="/matches">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">View Live Matches</Button>
                </Link>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-foreground">100% Free</div>
                  <div className="text-muted-foreground">No Entry Fees</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">Live Scores</div>
                  <div className="text-muted-foreground">Real-Time Updates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">18+</div>
                  <div className="text-muted-foreground">Age Verified</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img 
                src="/images/cricketer-batsman.png" 
                alt="Cricket Player" 
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PENTRIX?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the best fantasy cricket platform with real-time data, fair play policies, and exciting contests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Trophy className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Free Contests</CardTitle>
                <CardDescription>Join unlimited free contests and compete for virtual prizes</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Live Scoring</CardTitle>
                <CardDescription>Real-time score updates from CricketData.org API</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Fair Play</CardTitle>
                <CardDescription>Strict compliance with Indian fantasy sports regulations</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Community</CardTitle>
                <CardDescription>Compete with thousands of cricket fans across India</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-muted-foreground">Sign up with your email and verify your age (18+)</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Build Your Team</h3>
              <p className="text-muted-foreground">Select 11 players from upcoming matches and pick your captain</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Win Prizes</h3>
              <p className="text-muted-foreground">Watch live scores and climb the leaderboard to win</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <Button size="lg">Start Playing Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8 mb-4" />
              <p className="text-sm text-muted-foreground">India's premier free-to-play fantasy cricket platform</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/matches"><a className="hover:text-foreground transition-colors">Matches</a></Link></li>
                <li><Link href="/contests"><a className="hover:text-foreground transition-colors">Contests</a></Link></li>
                <li><Link href="/my-teams"><a className="hover:text-foreground transition-colors">My Teams</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/how-to-play"><a className="hover:text-foreground transition-colors">How to Play</a></Link></li>
                <li><Link href="/faqs"><a className="hover:text-foreground transition-colors">FAQs</a></Link></li>
                <li><Link href="/about"><a className="hover:text-foreground transition-colors">About Us</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms"><a className="hover:text-foreground transition-colors">Terms of Service</a></Link></li>
                <li><Link href="/privacy"><a className="hover:text-foreground transition-colors">Privacy Policy</a></Link></li>
                <li><Link href="/responsible-gaming"><a className="hover:text-foreground transition-colors">Responsible Gaming</a></Link></li>
                <li><Link href="/fair-play"><a className="hover:text-foreground transition-colors">Fair Play Policy</a></Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 PENTRIX. All rights reserved. | 18+ Only | Play Responsibly</p>
            <p className="mt-2">Not available in Assam, Telangana, Tamil Nadu, Odisha, Andhra Pradesh, Nagaland, and Sikkim</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
