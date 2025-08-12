import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { loginSchema, type LoginCredentials } from "../../../shared/schema";

const backgroundVariants = {
  animate: {
    scale: [1, 1.1, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

export default function Login() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Login successful",
        description: "Welcome to 36x Finance Admin Dashboard",
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials",
      });
    }
  });

  const onSubmit = (data: LoginCredentials) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-[hsl(var(--royal-purple-900))] to-slate-900 p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-[hsl(var(--royal-purple-500))] rounded-full mix-blend-multiply filter blur-xl opacity-30"
          variants={backgroundVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[hsl(var(--royal-purple-600))] rounded-full mix-blend-multiply filter blur-xl opacity-20"
          variants={backgroundVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Login Card */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="glass-card p-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-royal-gradient rounded-2xl mb-4 glow-effect"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gradient mb-2">36x Finance</h1>
            <p className="text-slate-300">Admin Dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <div className={`relative ${form.watch("email") ? "input-has-value" : ""} ${form.formState.errors.email ? "input-error" : ""}`}>
                <Input
                  {...form.register("email")}
                  type="email"
                  className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:border-[hsl(var(--royal-purple-500))] focus:ring-2 focus:ring-[hsl(var(--royal-purple-500))]/50 transition-all duration-300 peer placeholder-transparent"
                  placeholder="Email Address"
                />
                <Label className="floating-label">Email Address</Label>
              </div>
              {form.formState.errors.email && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className={`relative ${form.watch("password") ? "input-has-value" : ""} ${form.formState.errors.password ? "input-error" : ""}`}>
                <Input
                  {...form.register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-4 pr-12 bg-white/5 border border-white/20 rounded-xl focus:border-[hsl(var(--royal-purple-500))] focus:ring-2 focus:ring-[hsl(var(--royal-purple-500))]/50 transition-all duration-300 peer placeholder-transparent"
                  placeholder="Password"
                />
                <Label className="floating-label">Password</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-red-400 text-sm mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-slate-300 cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Button variant="link" className="text-[hsl(var(--royal-purple-400))] hover:text-[hsl(var(--royal-purple-300))] p-0">
                Forgot password?
              </Button>
            </div>

            {/* Login Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-4 bg-royal-gradient hover:from-[hsl(var(--royal-purple-600))] hover:to-[hsl(var(--royal-purple-700))] rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-[hsl(var(--royal-purple-500))]/25"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{loginMutation.isPending ? "Signing In..." : "Sign In"}</span>
                  {!loginMutation.isPending && <ArrowRight className="w-4 h-4" />}
                </span>
              </Button>
            </motion.div>
          </form>

          {/* Additional Options */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
              Need help?{" "}
              <Button variant="link" className="text-[hsl(var(--royal-purple-400))] hover:text-[hsl(var(--royal-purple-300))] p-0">
                Contact Support
              </Button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
