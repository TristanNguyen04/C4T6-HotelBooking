import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const RoomPricingSummary = ({ lowestPrice, roomCount, showTotalStay = false, nights = 1 }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };
    const displayPrice = showTotalStay ? lowestPrice * nights : lowestPrice;
    const priceLabel = showTotalStay ? `total stay (${nights} night${nights !== 1 ? 's' : ''})` : 'per night';
    return (_jsx("div", { className: "mt-4 pt-4 border-t border-gray-200", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm text-gray-600", children: "Starting from" }), _jsx("div", { className: "text-xl font-bold text-gray-900", children: formatPrice(displayPrice) }), _jsx("div", { className: "text-sm text-gray-500", children: priceLabel })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "text-sm text-gray-600", children: [roomCount, " option", roomCount !== 1 ? 's' : '', " available"] }) })] }) }));
};
export default RoomPricingSummary;
