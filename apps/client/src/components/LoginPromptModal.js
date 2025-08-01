import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
const LoginPromptModal = ({ isOpen, onClose, onLogin, }) => {
    // Handle backdrop click to close modal
    const handleBackdropClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);
    // Handle keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen)
            return;
        if (e.key === 'Escape') {
            onClose();
        }
    }, [isOpen, onClose]);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [handleKeyDown, isOpen]);
    if (!isOpen)
        return null;
    const modalContent = (_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[1200] flex items-center justify-center p-4", onClick: handleBackdropClick, style: { isolation: 'isolate' }, children: _jsxs("div", { className: "relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Login Required" }), _jsx("button", { onClick: onClose, className: "text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors", "aria-label": "Close", children: "\u00D7" })] }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: "mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4", children: _jsx("svg", { className: "w-6 h-6 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Sign in to book this room" }), _jsx("p", { className: "text-gray-600", children: "You need to be logged in to proceed with your booking. Sign in to continue or browse more rooms." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsx("button", { onClick: onLogin, className: "flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors", children: "Sign In" }), _jsx("button", { onClick: onClose, className: "flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors", children: "Continue Browsing" })] })] })] }) }));
    return createPortal(modalContent, document.getElementById('portal-root') || document.body);
};
export default LoginPromptModal;
