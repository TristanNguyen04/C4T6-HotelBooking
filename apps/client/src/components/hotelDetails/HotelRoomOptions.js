import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import RoomTypeCard from '../roomDetails/RoomTypeCard';
import { calculateNights } from '../../utils/date';
const HotelRoomOptions = ({ hotel, onBookRoom, searchContext }) => {
    const [showTotalStay, setShowTotalStay] = useState(false);
    // Calculate number of nights
    const nights = searchContext ? calculateNights(searchContext.checkin, searchContext.checkout) : 1;
    if (!hotel.rooms || hotel.rooms.length === 0) {
        return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("div", { className: "flex items-center justify-between mb-6", children: _jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Available Rooms" }) }), _jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx("svg", { className: "w-8 h-8 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }) }) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No Rooms Available" }), _jsx("p", { className: "text-gray-600 mb-6 max-w-md mx-auto", children: "Unfortunately, there are no available rooms at this hotel for your selected dates. Please try different dates or check back later." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [_jsx("button", { onClick: () => window.history.back(), className: "px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors", children: "Go Back" }), _jsx("button", { onClick: () => window.location.reload(), className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors", children: "Refresh" })] })] })] }));
    }
    // Group rooms by roomNormalizedDescription
    const groupedRooms = hotel.rooms.reduce((groups, room) => {
        const key = room.roomNormalizedDescription;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(room);
        return groups;
    }, {});
    // Convert to RoomType objects
    const roomTypes = Object.entries(groupedRooms).map(([normalizedDescription, rooms]) => {
        const lowestPrice = Math.min(...rooms.map(room => room.converted_price));
        const hasFreeCancellation = rooms.some(room => room.free_cancellation);
        const images = rooms[0]?.images || [];
        const amenities = rooms[0]?.amenities || [];
        const hasBreakfast = rooms.some(room => room.roomAdditionalInfo.breakfastInfo.includes('breakfast_included'));
        return {
            roomNormalizedDescription: normalizedDescription,
            rooms,
            lowestPrice,
            hasFreeCancellation,
            images,
            amenities,
            hasBreakfast
        };
    });
    // Sort by lowest price
    roomTypes.sort((a, b) => a.lowestPrice - b.lowestPrice);
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Available Rooms" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-sm text-gray-600 underline underline-offset-1", children: [roomTypes.length, " room type", roomTypes.length !== 1 ? 's' : '', " available"] }), searchContext && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Show prices:" }), _jsxs("div", { className: "flex items-center bg-gray-100 rounded-lg p-1", children: [_jsx("button", { onClick: () => setShowTotalStay(false), className: `px-3 py-1 text-xs font-medium rounded-md transition-colors ${!showTotalStay
                                                    ? 'bg-white text-gray-900 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900'}`, children: "Per Night" }), _jsxs("button", { onClick: () => setShowTotalStay(true), className: `px-3 py-1 text-xs font-medium rounded-md transition-colors ${showTotalStay
                                                    ? 'bg-white text-gray-900 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900'}`, children: ["Total Stay (", nights, " night", nights !== 1 ? 's' : '', ")"] })] })] }))] })] }), _jsx("div", { className: "space-y-6", children: roomTypes.map((roomType) => (_jsx(RoomTypeCard, { roomType: roomType, onBookRoom: onBookRoom, showTotalStay: showTotalStay, nights: nights }, roomType.roomNormalizedDescription))) }), _jsx("div", { className: "mt-6 p-4 bg-blue-50 rounded-lg", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", children: _jsx("svg", { className: "w-3 h-3 text-blue-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" }) }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-1", children: "Booking Information" }), _jsx("p", { className: "text-sm text-gray-700", children: "All prices include taxes and fees. Room availability and prices are subject to change. Free cancellation policies may vary by room type and rate." })] })] }) })] }));
};
export default HotelRoomOptions;
