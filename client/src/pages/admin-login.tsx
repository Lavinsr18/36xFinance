import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiRequest("POST", "/api/auth/login", credentials);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
      setLocation("/admin-dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen animated-bg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full floating"></div>
      <div className="absolute top-40 right-32 w-16 h-16 bg-white/10 rounded-full floating" style={{animationDelay: "-2s"}}></div>
      <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-white/10 rounded-full floating" style={{animationDelay: "-4s"}}></div>
      
      <Card className="bg-background/95 backdrop-blur-md shadow-2xl w-full max-w-md mx-4 slide-in">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient" data-testid="text-admin-portal">
              Admin Portal
            </h2>
            <p className="text-muted-foreground mt-2">Access your dashboard</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Username
              </Label>
              <Input 
                id="username"
                type="text" 
                placeholder="36xfinance" 
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full"
                required
                data-testid="input-username"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </Label>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full"
                required
                data-testid="input-password"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full btn-gradient font-medium"
              disabled={isLoading}
              data-testid="button-signin"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
