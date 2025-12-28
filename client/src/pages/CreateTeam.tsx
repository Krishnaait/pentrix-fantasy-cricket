import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useRoute } from "wouter";

export default function CreateTeam() {
  const [, params] = useRoute("/create-team/:matchId");
  
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/"><a><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" /></a></Link>
          <Link href="/matches"><Button variant="ghost">Back to Matches</Button></Link>
        </div>
      </header>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Create Your Team</h1>
        <Card>
          <CardHeader><CardTitle>Select 11 Players</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Match ID: {params?.matchId}</p>
            <p className="text-muted-foreground">Team creation interface coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
