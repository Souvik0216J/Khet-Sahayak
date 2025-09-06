'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, AlertCircle, Eye, EyeOff, User, Mail, LogIn, ArrowRight, Car, Warehouse, FileLock2, FileLock, } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"
import axios from "axios"

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        roverId: "",
        farmName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.roverId.trim()) newErrors.roverId = "Rover ID is required";
        if (!formData.farmName.trim()) newErrors.farmName = "Farm Name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const router = useRouter()

    const handleSignUp = async () => {
        if (!validateForm()) {
            toast.error("Please fix the errors below");
            return;
        }

        setIsLoading(true);
        try {
            await axios.post("/api/users/register", formData);

            toast.success("Account created successfully!");

            setTimeout(() => { router.push("/signin") }, 500);

            setFormData({
                name: "",
                roverId: "",
                farmName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setErrors({});
        } catch (err: any) {
            if (err.response?.data?.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSignUp();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    <pattern
                        id="eco-pattern"
                        patternUnits="userSpaceOnUse"
                        width="20"
                        height="20"
                    >
                        <path
                            d="M10 2C15 2 18 6 18 10C18 14 15 18 10 18C5 18 2 14 2 10C2 6 5 2 10 2Z"
                            fill="currentColor"
                            className="text-green-600 dark:text-green-400"
                        />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#eco-pattern)" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-lg mt-24">
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-green-200 dark:border-gray-600 shadow-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center justify-center gap-2">
                            <Leaf className="w-6 h-6 text-emerald-600" />
                            Sign Up
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Start your eco-friendly farming journey
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-5">
                        {/* Name */}
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="name"><User /> Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, name: e.target.value }))
                                }
                                onKeyPress={handleKeyPress}
                                className={`${errors.name ? "border-red-500" : ""}`}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-4 h-4" /> {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Rover ID */}
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="roverId"><Car /> Rover ID</Label>
                            <Input
                                id="roverId"
                                type="text"
                                placeholder="RVR1234"
                                value={formData.roverId}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, roverId: e.target.value }))
                                }
                                onKeyPress={handleKeyPress}
                                className={`${errors.roverId ? "border-red-500" : ""}`}
                            />
                            {errors.roverId && (
                                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-4 h-4" /> {errors.roverId}
                                </p>
                            )}
                        </div>

                        {/* Farm Name */}
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="farmName"><Warehouse /> Farm Name</Label>
                            <Input
                                id="farmName"
                                type="text"
                                placeholder="Green Valley Farm"
                                value={formData.farmName}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, farmName: e.target.value }))
                                }
                                onKeyPress={handleKeyPress}
                                className={`${errors.farmName ? "border-red-500" : ""}`}
                            />
                            {errors.farmName && (
                                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-4 h-4" /> {errors.farmName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="email"><Mail /> Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="farmer@greenvalley.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((p) => ({ ...p, email: e.target.value }))
                                }
                                onKeyPress={handleKeyPress}
                                className={`${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-4 h-4" /> {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="password"><FileLock2 /> Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((p) => ({ ...p, password: e.target.value }))
                                    }
                                    onKeyPress={handleKeyPress}
                                    className={`${errors.password ? "border-red-500" : ""}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-4 h-4" /> {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="confirmPassword"><FileLock /> Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData((p) => ({
                                            ...p,
                                            confirmPassword: e.target.value,
                                        }))
                                    }
                                    onKeyPress={handleKeyPress}
                                    className={`${errors.confirmPassword ? "border-red-500" : ""}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-4 h-4" /> {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            onClick={handleSignUp}
                            className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white shadow-lg h-12"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    🌿 Create Account
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>

                        <div className="text-center space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?
                            </p>
                            <Link
                                href="/signin"
                                className="inline-flex items-center text-emerald-700 dark:text-emerald-400 font-medium hover:underline text-sm"
                            >
                                <LogIn className="w-4 h-4 mr-1" />
                                Sign In
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

                <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
                    © 2024 4Bits Team 🌱 Powered by renewable energy
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
