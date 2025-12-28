import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Trophy, Users, Calendar } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/"><a><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" /></a></Link>
          <nav className="flex gap-4">
            <Link href="/matches"><Button variant="ghost">Matches</Button></Link>
            <Link href="/my-teams"><Button variant="ghost">My Teams</Button></Link>
            <Link href="/profile"><Button variant="ghost">Profile</Button></Link>
          </nav>
        </div>
      </header>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Trophy className="h-8 w-8 text-primary mb-2" />
              <CardTitle>My Contests</CardTitle>
            </CardHeader>
            <CardContent><Link href="/contests"><Button className="w-full">View Contests</Button></Link></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>My Teams</CardTitle>
            </CardHeader>
            <CardContent><Link href="/my-teams"><Button className="w-full">View Teams</Button></Link></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Upcoming Matches</CardTitle>
            </CardHeader>
            <CardContent><Link href="/matches"><Button className="w-full">View Matches</Button></Link></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
