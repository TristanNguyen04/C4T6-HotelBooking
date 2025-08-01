import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login({ email, password });
            // If we reach this point, the user is verified (backend already checked)
            doLogin(res.data.user, res.data.token);
            navigate(returnTo);
        }
        catch (err) {
            const errorMessage = err && typeof err === 'object' && 'response' in err &&
                err.response && typeof err.response === 'object' && 'data' in err.response &&
                err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
                ? String(err.response.data.error)
                : 'Login failed. Please try again.';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "bg-gray-50 flex justify-center py-14 mt-20", children: _jsxs("div", { className: "flex max-w-6xl w-full bg-white rounded-xl shadow-lg overflow-hidden", children: [_jsxs("div", { className: "w-full md:w-1/2 p-8 md:p-10", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-1", children: "Welcome Back!" }), _jsx("p", { className: "text-sm text-gray-500 mb-6", children: location.state?.returnTo
                                ? 'Please sign in to complete your booking'
                                : 'Sign in to continue your journey and discover amazing stays' }), error && (_jsx("div", { className: "mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm", children: error })), _jsxs("form", { className: "space-y-5", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Email" }), _jsx("input", { "data-cy": 'login-email', type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("a", { href: "#", className: "text-sm text-[#FF6B6B] hover:underline", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx("input", { "data-cy": 'login-password', type: showPassword ? "text" : "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full px-4 py-2 mt-1 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none", children: showPassword ? _jsx(FaEyeSlash, { size: 18 }) : _jsx(FaEye, { size: 18 }) })] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "keepSignedIn", type: "checkbox", className: "h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded" }), _jsx("label", { htmlFor: "keepSignedIn", className: "ml-2 block text-sm text-gray-700", children: "Keep me signed in" })] }), _jsx("button", { "data-cy": 'login-submit', type: "submit", disabled: loading, className: "w-full bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? 'Signing In...' : 'Sign In →' })] }), _jsx("div", { className: "my-5 text-sm text-gray-500 text-center", children: "or continue with" }), _jsxs("div", { className: "flex gap-3 justify-center mb-6", children: [_jsx("button", { className: "border p-2 rounded-md hover:bg-gray-100", children: _jsx(FaGoogle, {}) }), _jsx("button", { className: "border p-2 rounded-md hover:bg-gray-100", children: _jsx(FaFacebookF, {}) }), _jsx("button", { className: "border p-2 rounded-md hover:bg-gray-100", children: _jsx(FaApple, {}) })] }), _jsxs("p", { className: "text-sm text-gray-600 text-center", children: ["Don't have an account?", " ", _jsx("button", { className: "text-[#FF6B6B] hover:underline", onClick: () => navigate("/register"), children: "Create Account" })] }), _jsxs("div", { className: "bg-[#FFF6F2] text-orange-800 mt-8 p-4 rounded-lg text-sm flex items-start gap-2", children: [_jsx("span", { className: "text-xl", children: "\uD83E\uDDF3" }), _jsxs("div", { children: [_jsx("strong", { children: "Ready for your next adventure?" }), _jsx("p", { children: "Sign in to see your saved destinations and get personalized recommendations" })] })] })] }), _jsx("div", { className: "hidden md:block md:w-1/2", children: _jsx("img", { src: signInImage, alt: "Hotel scenery", className: "w-full h-full object-cover" }) })] }) }));
}
