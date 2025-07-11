import React from "react";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import signInImage from "../assets/signin.png";

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Left: Form section */}
                <div className="w-full md:w-1/2 p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back!</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Sign in to continue your journey and discover amazing stays
                    </p>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-sm text-[#FF6B6B] hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="keepSignedIn"
                                type="checkbox"
                                className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                            />
                            <label htmlFor="keepSignedIn" className="ml-2 block text-sm text-gray-700">
                                Keep me signed in
                            </label>
                        </div>

                        <button className="w-full bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white py-2 rounded-md transition-colors">
                            Sign In →
                        </button>
                    </form>

                    <div className="my-5 text-sm text-gray-500 text-center">or continue with</div>

                    <div className="flex gap-3 justify-center mb-6">
                        <button className="border p-2 rounded-md hover:bg-gray-100">
                            <FaGoogle />
                        </button>
                        <button className="border p-2 rounded-md hover:bg-gray-100">
                            <FaFacebookF />
                        </button>
                        <button className="border p-2 rounded-md hover:bg-gray-100">
                            <FaApple />
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 text-center">
                        Don’t have an account?{" "}
                        <a href="#" className="text-[#FF6B6B] hover:underline">
                            Create Account
                        </a>
                    </p>

                    <div className="bg-[#FFF6F2] text-orange-800 mt-8 p-4 rounded-lg text-sm flex items-start gap-2">
                        <span className="text-xl">🧳</span>
                        <div>
                            <strong>Ready for your next adventure?</strong>
                            <p>
                                Sign in to see your saved destinations and get personalized recommendations
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Image section */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src={signInImage}
                        alt="Hotel scenery"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

