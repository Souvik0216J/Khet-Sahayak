'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useRouter } from "next/navigation";

import { Sprout, AlertCircle, Eye, EyeOff, ArrowRight, LogIn, FileLock2, Mail } from "lucide-react";
import axios from "axios";
import { toast } from "sonner"

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sign In State
  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateSignIn = () => {
    const newErrors: Record<string, string> = {};

    if (!signInData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(signInData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!signInData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const router = useRouter() 

  const handleSignIn = async () => {
    if (!validateSignIn()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("/api/users/login", {
        email: signInData.email,
        password: signInData.password,
      });

      if (res.data.success) {
        toast.success("🌿 Login successful! Welcome back to your eco-farm dashboard!");
        setTimeout(() => { router.push("/dashboard") }, 100);
        // Reset form
        setSignInData({
          email: "",
          password: "",
        });
        setErrors({});
      } else {
        toast.error(res.data.error || "Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <pattern id="eco-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M10 2C15 2 18 6 18 10C18 14 15 18 10 18C5 18 2 14 2 10C2 6 5 2 10 2Z" fill="currentColor" className="text-green-600 dark:text-green-400" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#eco-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md mt-24">
        {/* Header */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-200 dark:border-gray-600 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <Sprout className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Welcome Banner */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                <Mail /> Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@greenvalley.com"
                value={signInData.email}
                onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                onKeyPress={handleKeyPress}
                className={`border-green-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 dark:bg-gray-700 dark:text-white h-12 ${errors.email ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                <FileLock2 /> Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  className={`border-green-200 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 dark:bg-gray-700 dark:text-white h-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 dark:from-emerald-500 dark:to-green-600 dark:hover:from-emerald-600 dark:hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                <>
                  🌿 Login In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-medium hover:underline text-sm"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Create your account
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          © 2024 4Bits Team 🌱 Powered by 100% renewable energy
        </div>
      </div>
    </div>
  );
};

export default SignInPage;