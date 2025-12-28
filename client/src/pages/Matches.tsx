import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Matches() {
  const { data, isLoading } = trpc.matches.getCurrentMatches.useQuery({});

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/"><a><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" /></a></Link>
          <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
        </div>
      </header>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Live & Upcoming Matches</h1>
        {isLoading && <p>Loading matches...</p>}
        {data?.matches && data.matches.length === 0 && <p className="text-muted-foreground">No matches available</p>}
        <div className="grid gap-4">
          {data?.matches?.map((match: any) => (
            <Card key={match.id}>
              <CardHeader>
                <CardTitle>{match.teamA} vs {match.teamB}</CardTitle>
                <p className="text-sm text-muted-foreground">{match.venue} • {new Date(match.matchDate).toLocaleDateString()}</p>
              </CardHeader>
              <CardContent>
                <Link href={`/match/${match.id}`}><Button>View Details</Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
