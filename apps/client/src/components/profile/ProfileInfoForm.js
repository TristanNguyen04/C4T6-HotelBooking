import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
export default function ProfileInfoForm({ user, onUpdate }) {
    const [name, setName] = useState(user?.name || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    useEffect(() => {
        setName(user?.name || '');
    }, [user?.name]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        if (!name.trim()) {
            setError('Name is required');
            setLoading(false);
            return;
        }
        try {
            await onUpdate(name.trim());
            setSuccess('Profile updated successfully!');
        }
        catch (err) {
            const errorMessage = err && typeof err === 'object' && 'response' in err &&
                err.response && typeof err.response === 'object' && 'data' in err.response &&
                err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
                ? String(err.response.data.error)
                : 'Failed to update profile. Please try again.';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "border-b border-gray-200 pb-8", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Profile Information" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name" }), _jsx("input", { type: "text", id: "name", value: name, onChange: (e) => setName(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent", placeholder: "Enter your full name", disabled: loading })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email Address" }), _jsx("input", { type: "email", id: "email", value: user?.email || '', className: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed", disabled: true }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Email address cannot be changed" })] }), error && (_jsx("div", { className: "text-red-600 text-sm bg-red-50 p-3 rounded-lg", children: error })), success && (_jsx("div", { className: "text-green-600 text-sm bg-green-50 p-3 rounded-lg", children: success })), _jsxs("button", { type: "submit", disabled: loading, className: "bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#ff5a5a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2", children: [loading && _jsx(Spinner, {}), _jsx("span", { children: loading ? 'Updating...' : 'Update Profile' })] })] })] }));
}
