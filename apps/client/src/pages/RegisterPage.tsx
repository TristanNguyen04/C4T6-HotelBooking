import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import luggageImg from "../assets/luggage.png";
import { register } from "../api/auth";

export default function RegisterPage() {
    const navigate = useNavigate();

    // State variables for form handling
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await register({ email, name, password });
            setSuccess("Check your email to verify your account.");
            setSubmitted(true);
        } catch (err: any) {
            setError(err?.response?.data?.error || "Registration failed!");
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
                <h2 className="text-2xl font-semibold mb-4">Registration Complete</h2>
                <p className="text-gray-700 mb-2">{success}</p>
                <p className="text-sm text-gray-500 mb-4">You can log in after verifying your email.</p>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500 transition"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 flex justify-center py-12">
            <main className="flex flex-1 justify-center mt-35 px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-6xl overflow-hidden items-stretch">
                    {/* Left side: Form */}
                    <form onSubmit={handleSubmit} className="w-full md:w-1/2 px-12 py-14 flex flex-col justify-center gap-8">
                        <div>
                            <h2 className="text-2xl font-semibold">Create your account</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Join Ascenda to unlock exclusive deals and manage your bookings with ease.
                            </p>
                        </div>

                        {/* Steps (1, 2 and 3) */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-400 text-white text-sm">1</div>
                            <div className="h-1 bg-gray-300 flex-1"></div>
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm">2</div>
                            <div className="h-1 bg-gray-300 flex-1"></div>
                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-sm">3</div>
                        </div>
                        <p className="text-xs text-gray-500">Step 1: Email Address</p>

                        {/* Error */}
                        {error && <p className="text-sm text-red-500">{error}</p>}

                        {/* Name Input */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="yourname@example.com"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                            />
                            <p className="text-xs text-gray-400 mt-1">We’ll send a verification code to this email</p>
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                            />
                        </div>

                        {/* Checkbox */}
                        <label className="flex items-start gap-2 text-sm text-gray-700">
                            <input
                                id="deals"
                                type="checkbox"
                                className="mt-1 h-4 w-4 text-red-500 border-gray-300 rounded"
                            />
                            I’d like to receive exclusive deals, travel inspiration and updates from Ascenda
                        </label>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-red-400 text-white py-3 rounded-md font-medium text-sm hover:bg-red-500 transition">
                            Continue →
                        </button>

                        {/* Sign in Link */}
                        <p className="text-sm text-center text-gray-600">
                            Already have an account?{" "}
                            <span className="text-red-500 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
                                Sign in
                            </span>
                        </p>

                        {/* Terms and Condition*/}
                        <p className="text-xs text-center text-gray-400 mt-4">
                            By creating an account, you agree to our{" "}
                            <a href="#" className="text-pink-400 underline">Privacy Policy</a> and{" "}
                            <a href="#" className="text-pink-400 underline">Terms of Service</a>.
                        </p>
                    </form>

                    {/* Right side */}
                    <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-300 to-pink-400 px-10 py-12 flex flex-col justify-center items-center text-center gap-4">
                        <img src={luggageImg} alt="Luggage" className="w-50 h-auto" />
                        <h2 className="text-white text-xl font-semibold">Your journey begins here</h2>
                        <p className="text-white text-sm max-w-sm">
                            Join thousands of travelers who book their perfect stays with StayEase. Unlock exclusive member rates and collect rewards with every booking.
                        </p>
                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <button className="bg-white text-orange-500 py-2 rounded font-semibold">Member-only deals</button>
                            <button className="bg-white text-orange-500 py-2 rounded font-semibold">Reward points</button>
                            <button className="bg-white text-orange-500 py-2 rounded font-semibold">Save favorites</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
