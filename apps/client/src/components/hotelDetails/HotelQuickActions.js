import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
const HotelQuickActions = ({ onBookNow }) => {
    const [showCopyPopup, setShowCopyPopup] = useState(false);
    const handleShareHotel = async () => {
        try {
            // Copy current URL to clipboard
            await navigator.clipboard.writeText(window.location.href);
            // Show success popup
            setShowCopyPopup(true);
            // Hide popup after 3 seconds
            setTimeout(() => {
                setShowCopyPopup(false);
            }, 3000);
        }
        catch (error) {
            console.error('Failed to copy URL:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setShowCopyPopup(true);
            setTimeout(() => {
                setShowCopyPopup(false);
            }, 3000);
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6 relative", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Quick Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { onClick: onBookNow, className: "w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors", children: "Book Now" }), _jsx("button", { className: "w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors", children: "Save to Favorites" }), _jsx("button", { onClick: handleShareHotel, className: "w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors", children: "Share Hotel" })] }), showCopyPopup && (_jsx("div", { className: "absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-10 animate-fade-in", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }), _jsx("span", { className: "text-sm font-medium", children: "Copied URL successfully!" })] }) }))] }));
};
export default HotelQuickActions;
