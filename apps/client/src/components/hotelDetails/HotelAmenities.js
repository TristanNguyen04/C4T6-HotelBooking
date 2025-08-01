import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { formatAmenityName } from '../../utils/amenity';
const HotelAmenities = ({ hotel }) => {
    const [showAll, setShowAll] = useState(false);
    if (!hotel.amenities || Object.keys(hotel.amenities).length === 0) {
        return null;
    }
    const filteredAmenities = Object.entries(hotel.amenities)
        .filter(([, value]) => value === true);
    const displayedAmenities = showAll ? filteredAmenities : filteredAmenities.slice(0, 10);
    const hasMoreAmenities = filteredAmenities.length > 10;
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Amenities" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: displayedAmenities.map(([key]) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center", children: _jsx("svg", { className: "w-4 h-4 text-blue-600", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }), _jsx("span", { className: "text-gray-700 font-medium", children: formatAmenityName(key) })] }, key))) }), hasMoreAmenities && (_jsx("div", { className: "mt-4 text-center", children: _jsx("button", { onClick: () => setShowAll(!showAll), className: "px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium", children: showAll ? 'Show Less' : `Show More (${filteredAmenities.length - 10} more)` }) }))] }));
};
export default HotelAmenities;
