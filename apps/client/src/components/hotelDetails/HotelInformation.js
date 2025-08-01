import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const HotelInformation = ({ searchContext }) => {
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Hotel Information" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Check-in:" }), _jsx("span", { className: "font-medium", children: searchContext?.checkin || 'N/A' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Check-out:" }), _jsx("span", { className: "font-medium", children: searchContext?.checkout || 'N/A' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Guests:" }), _jsx("span", { className: "font-medium", children: searchContext ? (() => {
                                    const { adults, children, childrenAges } = searchContext;
                                    const adultsText = adults === 1 ? '1 adult' : `${adults} adults`;
                                    if (children === 0) {
                                        return adultsText;
                                    }
                                    const childrenText = children === 1 ? '1 child' : `${children} children`;
                                    const agesText = childrenAges.length > 0
                                        ? ` (${childrenAges.map(age => `${age} years old`).join(', ')})`
                                        : '';
                                    return `${adultsText}, ${childrenText}${agesText}`;
                                })() : 'N/A' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Rooms:" }), _jsx("span", { className: "font-medium", children: searchContext?.rooms || 'N/A' })] })] })] }));
};
export default HotelInformation;
