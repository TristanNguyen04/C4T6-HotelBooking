import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import Spinner from '../Spinner';
export default function PasswordChangeForm({ onChangePassword }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        if (!currentPassword || !newPassword) {
            setError('All fields are required');
            setLoading(false);
            return;
        }
        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long');
            setLoading(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            setLoading(false);
            return;
        }
        try {
            await onChangePassword(currentPassword, newPassword);
            setSuccess('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        catch (err) {
            const errorMessage = err && typeof err === 'object' && 'response' in err &&
                err.response && typeof err.response === 'object' && 'data' in err.response &&
                err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
                ? String(err.response.data.error)
                : 'Failed to change password. Please try again.';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800 mb-4", children: "Change Password" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "currentPassword", className: "block text-sm font-medium text-gray-700 mb-1", children: "Current Password" }), _jsx("input", { type: "password", id: "currentPassword", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent", placeholder: "Enter your current password", disabled: loading })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "newPassword", className: "block text-sm font-medium text-gray-700 mb-1", children: "New Password" }), _jsx("input", { type: "password", id: "newPassword", value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent", placeholder: "Enter your new password", disabled: loading }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Must be at least 6 characters long" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirm New Password" }), _jsx("input", { type: "password", id: "confirmPassword", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent", placeholder: "Confirm your new password", disabled: loading })] }), error && (_jsx("div", { className: "text-red-600 text-sm bg-red-50 p-3 rounded-lg", children: error })), success && (_jsx("div", { className: "text-green-600 text-sm bg-green-50 p-3 rounded-lg", children: success })), _jsxs("button", { type: "submit", disabled: loading, className: "bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#ff5a5a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2", children: [loading && _jsx(Spinner, {}), _jsx("span", { children: loading ? 'Changing...' : 'Change Password' })] })] })] }));
}
