import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { formatPrice } from '../../utils/pricing';
import { assets } from '../../assets/assets';
const BookingSummary = ({ bookingDetails }) => {
    const { priceBreakdown, hotelName, roomDescription, checkin, checkout, adults, children, childrenAges, roomImage } = bookingDetails;
    const handleImageError = (e) => {
        e.currentTarget.src = assets.hotelNotFound;
    };
    // Helper function to format guest information
    const formatGuestInfo = () => {
        const guestParts = [];
        if (adults > 0) {
            guestParts.push(`${adults} adult${adults > 1 ? 's' : ''}`);
        }
        if (children > 0) {
            if (childrenAges && childrenAges.length > 0) {
                const ageText = childrenAges.length === 1
                    ? `age ${childrenAges[0]}`
                    : `ages ${childrenAges.join(', ')}`;
                guestParts.push(`${children} child${children > 1 ? 'ren' : ''} (${ageText})`);
            }
            else {
                guestParts.push(`${children} child${children > 1 ? 'ren' : ''}`);
            }
        }
        return guestParts.join(', ') || 'No guests specified';
    };
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-bold text-gray-900 mb-6", children: "Booking Summary" }), _jsxs("div", { className: "flex gap-4 mb-6", children: [_jsx("div", { className: "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0", children: _jsx("img", { src: roomImage || assets.hotelNotFound, alt: roomDescription, className: "w-full h-full object-cover", onError: handleImageError }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-lg", children: hotelName }), _jsx("p", { className: "text-gray-600 mb-2", children: roomDescription }), _jsxs("div", { className: "space-y-1 text-sm text-gray-600", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Check-in:" }), " ", new Date(checkin).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Check-out:" }), " ", new Date(checkout).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Guests:" }), " ", formatGuestInfo()] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Stay Duration:" }), " ", priceBreakdown.nights, " night", priceBreakdown.nights > 1 ? 's' : ''] })] })] })] }), _jsx("hr", { className: "my-6" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-4", children: "Price Breakdown" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "text-gray-600", children: ["Base rate (", priceBreakdown.nights, " nights)"] }), _jsx("span", { className: "font-medium", children: formatPrice(priceBreakdown.base_rate_in_currency, priceBreakdown.currency) })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-600", children: "Taxes & fees (included)" }), _jsx("span", { className: "font-medium", children: formatPrice(priceBreakdown.included_taxes_and_fees_total_in_currency, priceBreakdown.currency) })] }), priceBreakdown.excluded_taxes_and_fees_total_in_currency > 0 && (_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-orange-600", children: "Additional fees (pay at hotel)" }), _jsx("span", { className: "font-medium text-orange-600", children: formatPrice(priceBreakdown.excluded_taxes_and_fees_total_in_currency, priceBreakdown.currency) })] })), _jsx("hr", { className: "my-3" }), _jsxs("div", { className: "flex justify-between text-lg font-bold", children: [_jsx("span", { children: "Total" }), _jsx("span", { children: formatPrice(priceBreakdown.total_price, priceBreakdown.currency) })] }), priceBreakdown.excluded_taxes_and_fees_total_in_currency > 0 && (_jsx("p", { className: "text-xs text-gray-500 mt-2", children: "*Additional fees are paid directly to the hotel during your stay" }))] })] }), _jsx("div", { className: "mt-6 p-4 bg-blue-50 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", children: _jsx("svg", { className: "w-3 h-3 text-blue-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" }) }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-1", children: "Booking Information" }), _jsxs("ul", { className: "text-sm text-gray-700 space-y-1", children: [_jsx("li", { children: "\u2022 Confirmation will be sent to your email" }), _jsx("li", { children: "\u2022 All prices include applicable taxes and fees" })] })] })] }) })] }));
};
export default BookingSummary;
