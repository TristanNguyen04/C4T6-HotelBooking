import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import signInImage from "../assets/signin.png";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../contexts/AuthContext";

export default function SignInPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login: doLogin } = useAuth();
    
    // Get return URL from location state (set by checkout page)
    const returnTo = location.state?.returnTo || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await login({ email, password });
            
            // If we reach this point, the user is verified (backend already checked)
            doLogin(res.data.user, res.data.token);
            navigate(returnTo);
        } catch (err: unknown) {
            const errorMessage = err && typeof err === 'object' && 'response' in err && 
                err.response && typeof err.response === 'object' && 'data' in err.response &&
                err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
                ? String(err.response.data.error)
                : 'Login failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className="bg-gray-50 flex justify-center py-14 mt-20">
                <div className="flex max-w-6xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Left: Form section */}
                <div className="w-full md:w-1/2 p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome Back!</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        {location.state?.returnTo 
                            ? 'Please sign in to complete your booking'
                            : 'Sign in to continue your journey and discover amazing stays'
                        }
                    </p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                data-cy={'login-email'}
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                            <div className="relative">
                                <input
                                    data-cy={'login-password'}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 mt-1 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
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

                        <button 
                            data-cy={'login-submit'}
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing In...' : 'Sign In →'}
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
                        Don't have an account?{" "}
                        <button 
                            className="text-[#FF6B6B] hover:underline" 
                            onClick={() => navigate("/register")}
                        >
                            Create Account
                        </button>
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

