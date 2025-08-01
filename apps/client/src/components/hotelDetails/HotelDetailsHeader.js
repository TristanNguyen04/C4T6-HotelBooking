import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { renderStars } from '../../utils/stars';
import { getGuestRatingDisplay } from '../../utils/guestRating';
import { getLowestRoomPrice } from '../../utils/room';
const HotelDetailsHeader = ({ hotel, onBookNow }) => {
    // Get the lowest price among all rooms, fallback to hotel.price if no rooms
    const lowestPrice = getLowestRoomPrice(hotel.rooms || []) || hotel.price;
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };
    return (_jsx("div", { className: "bg-white rounded-lg shadow-sm mb-8 overflow-hidden", children: _jsx("div", { className: "p-6", children: _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [hotel.rating && renderStars(hotel.rating), _jsxs("span", { className: "text-sm text-gray-600", children: ["(", hotel.rating, " stars)"] })] }), _jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: hotel.name }), _jsxs("div", { className: "flex items-center text-gray-600 mb-4", children: [_jsx("svg", { className: "w-5 h-5 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z", clipRule: "evenodd" }) }), _jsx("span", { children: hotel.address })] }), hotel.distance && (_jsxs("p", { className: "text-sm text-gray-500 mb-4", children: [(hotel.distance / 1000).toFixed(1), " km from city center"] })), hotel.categories.overall?.score && hotel.categories.overall.score >= 60 && (() => {
                                const ratingDisplay = getGuestRatingDisplay(hotel.categories.overall.score);
                                return ratingDisplay ? (_jsxs("div", { className: "inline-flex items-center gap-2 mb-4", children: [_jsx("span", { className: `px-4 py-2 rounded-full text-sm font-semibold ${ratingDisplay.bgColor} ${ratingDisplay.textColor} ${ratingDisplay.borderColor} border`, children: ratingDisplay.text }), _jsxs("span", { className: "text-sm text-gray-600", children: [hotel.categories.overall.score, "/100 guest rating"] })] })) : null;
                            })()] }), _jsx("div", { className: "lg:text-right", children: _jsxs("div", { className: "bg-blue-50 rounded-lg p-4 border border-blue-200", children: [_jsx("p", { className: "text-sm text-blue-600 font-medium mb-1", children: "From per night" }), _jsxs("p", { className: "text-3xl font-bold text-blue-900", children: [hotel.currency, " ", lowestPrice ? formatPrice(lowestPrice) : 'Unavailable'] }), _jsx("button", { onClick: onBookNow, className: "mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors", children: "Book Now" })] }) })] }) }) }));
};
export default HotelDetailsHeader;
