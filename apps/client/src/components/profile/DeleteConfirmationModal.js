import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import Spinner from '../Spinner';
export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (!password) {
            setError('Password is required to delete your account');
            setLoading(false);
            return;
        }
        try {
            await onConfirm(password);
        }
        catch (err) {
            const errorMessage = err && typeof err === 'object' && 'response' in err &&
                err.response && typeof err.response === 'object' && 'data' in err.response &&
                err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data
                ? String(err.response.data.error)
                : 'Failed to delete account. Please try again.';
            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    };
    const handleClose = () => {
        setPassword('');
        setError('');
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-white/80 flex items-center justify-center z-[1100] p-4", children: _jsxs("div", { className: "bg-white rounded-xl shadow-2xl max-w-md w-full p-6", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-xl font-bold text-red-600 mb-2", children: "Delete Account" }), _jsx("p", { className: "text-gray-700 text-sm", children: "Are you absolutely sure you want to delete your account? This action cannot be undone and will:" }), _jsxs("ul", { className: "list-disc list-inside text-sm text-gray-600 mt-2 space-y-1", children: [_jsx("li", { children: "Permanently delete your account" }), _jsx("li", { children: "Remove all your booking history" }), _jsx("li", { children: "Delete all associated personal data" })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "deletePassword", className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirm your password to proceed" }), _jsx("input", { type: "password", id: "deletePassword", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent", placeholder: "Enter your password", disabled: loading })] }), error && (_jsx("div", { className: "text-red-600 text-sm bg-red-50 p-3 rounded-lg", children: error })), _jsxs("div", { className: "flex space-x-3 pt-2", children: [_jsx("button", { type: "button", onClick: handleClose, disabled: loading, className: "flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed", children: "Cancel" }), _jsxs("button", { type: "submit", disabled: loading, className: "flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2", children: [loading && _jsx(Spinner, {}), _jsx("span", { children: loading ? 'Deleting...' : 'Delete Account' })] })] })] })] }) }));
}
