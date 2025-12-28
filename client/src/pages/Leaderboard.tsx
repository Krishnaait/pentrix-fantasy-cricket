import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useRoute } from "wouter";

export default function Leaderboard() {
  const [, params] = useRoute("/leaderboard/:contestId");
  
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/"><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" /></Link>
          <Link href="/contests"><Button variant="ghost">Back to Contests</Button></Link>
        </div>
      </header>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
        <Card>
          <CardHeader><CardTitle>Contest Rankings</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Contest ID: {params?.contestId}</p>
            <p className="text-muted-foreground">Live leaderboard coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
