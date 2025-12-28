import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useRoute } from "wouter";

export default function MatchDetails() {
  const [, params] = useRoute("/match/:id");
  
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/"><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" /></Link>
          <Link href="/matches"><Button variant="ghost">Back to Matches</Button></Link>
        </div>
      </header>
      <div className="container py-8">
        <Card>
          <CardHeader><CardTitle>Match Details</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Match ID: {params?.id}</p>
            <Link href={`/create-team/${params?.id}`}><Button>Create Team for this Match</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
