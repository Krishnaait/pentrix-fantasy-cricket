import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    state: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => setLocation("/login"), 2000);
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;

    if (age < 18) {
      setError("You must be at least 18 years old to register");
      return;
    }

    registerMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dateOfBirth,
      state: formData.state || undefined,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/"><a className="inline-block mb-4"><img src="/logos/pentrix-logo-dark.png" alt="PENTRIX" className="h-10 mx-auto" /></a></Link>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Join PENTRIX and start playing fantasy cricket</CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <Alert className="mb-4 border-green-500 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">Account created successfully! Redirecting...</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label htmlFor="name">Full Name</Label><Input id="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" /></div>
            <div><Label htmlFor="email">Email Address</Label><Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" /></div>
            <div><Label htmlFor="dateOfBirth">Date of Birth (18+ Only)</Label><Input id="dateOfBirth" type="date" required value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]} /><p className="text-xs text-muted-foreground mt-1">You must be 18 or older</p></div>
            <div><Label htmlFor="state">State (Optional)</Label><Input id="state" type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} placeholder="Your state" /><p className="text-xs text-muted-foreground mt-1">Not available in restricted states</p></div>
            <div><Label htmlFor="password">Password</Label><Input id="password" type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Minimum 8 characters" /></div>
            <div><Label htmlFor="confirmPassword">Confirm Password</Label><Input id="confirmPassword" type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Re-enter password" /></div>
            <Button type="submit" className="w-full" disabled={registerMutation.isPending}>{registerMutation.isPending ? "Creating Account..." : "Create Account"}</Button>
          </form>
          <div className="mt-6 text-center text-sm"><p className="text-muted-foreground">Already have an account? <Link href="/login"><a className="text-primary hover:underline font-medium">Login here</a></Link></p></div>
        </CardContent>
      </Card>
    </div>
  );
}
