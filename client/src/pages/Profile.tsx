import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Profile() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/"><a><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-8" /></a></Link>
          <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
        </div>
      </header>
      <div className="container py-8">
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">Profile management coming soon</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
