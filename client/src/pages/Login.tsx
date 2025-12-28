import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      setLocation("/dashboard");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/"><a className="inline-block mb-4"><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-10 mx-auto" /></a></Link>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Login to your PENTRIX account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
            </div>
            <div className="text-right">
              <Link href="/forgot-password"><a className="text-sm text-primary hover:underline">Forgot password?</a></Link>
            </div>
            <Button type="submit" className="w-full" disabled={loginMutation.isPending}>{loginMutation.isPending ? "Logging in..." : "Login"}</Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">Don't have an account? <Link href="/register"><a className="text-primary hover:underline font-medium">Sign up</a></Link></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
