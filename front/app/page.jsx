"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../public/logo.png";

const LoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Email validation regex
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateForm = () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return false;
        }
        if (!emailRegex.test(email)) {
            setError("Please provide a valid email address");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch(
                "https://noclient.onrender.com/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // If login successful:
            // 1. Store the token if your API returns one
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            if (data.refreshToken) {
                localStorage.setItem("refreshToken", data.refreshToken);
            }

            // 2. Redirect to dashboard
            router.push("/Dashboard");
        } catch (err) {
            setError(err.message || "An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#292E30] flex flex-col items-center justify-center p-4">
            <Image src={logo} alt="Initiativ" width={200} height={200} />

            <div className="w-full max-w-md border-2 border-[#4682B6] rounded-lg p-8">
                <h2 className="text-2xl text-white text-center mb-8">
                    Welcome Back!
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-gray-200">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email..."
                            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-gray-200"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-400 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right">
                        <a
                            href="#"
                            className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
