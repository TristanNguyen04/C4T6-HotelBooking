import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const RoomOptionsList = ({ rooms, onBookRoom, showAllRooms, onToggleShowAll, showTotalStay = false, nights = 1 }) => {
    const displayedRooms = showAllRooms ? rooms : rooms.slice(0, 3);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };
    const getBreakfastInfo = (breakfastInfo) => {
        if (breakfastInfo.includes('breakfast_included')) {
            return { text: 'Breakfast included', color: 'text-green-600' };
        }
        return { text: 'Room only', color: 'text-gray-600' };
    };
    return (_jsxs("div", { className: "space-y-3", children: [displayedRooms.map((room) => {
                const breakfast = getBreakfastInfo(room.roomAdditionalInfo.breakfastInfo);
                const displayPrice = showTotalStay ? room.converted_price * nights : room.converted_price;
                const priceLabel = showTotalStay ? `total stay (${nights} night${nights !== 1 ? 's' : ''})` : 'per night';
                return (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: `text-sm font-medium ${breakfast.color}`, children: breakfast.text }), room.free_cancellation && (_jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded", children: "Free cancellation" }))] }), _jsx("p", { className: "text-xs text-gray-500", children: "Includes taxes and fees" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-lg font-bold text-gray-900", children: formatPrice(displayPrice) }), _jsx("div", { className: "text-sm text-gray-500", children: priceLabel })] }), _jsx("button", { onClick: () => onBookRoom(room.key), className: "ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium", children: "Book" })] }, room.key));
            }), rooms.length > 3 && (_jsx("button", { onClick: onToggleShowAll, className: "mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm", children: showAllRooms ? 'Show less' : `Show ${rooms.length - 3} more options` }))] }));
};
export default RoomOptionsList;
