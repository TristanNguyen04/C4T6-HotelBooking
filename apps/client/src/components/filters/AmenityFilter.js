import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { getAllAmenities, getHotelCountForAmenity } from '../../hooks/useHotelFilter';
import { formatAmenityName } from '../../utils/amenity';
const AmenityFilter = ({ hotels, selectedAmenities, setSelectedAmenities }) => {
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const INITIAL_AMENITIES_COUNT = 6;
    const handleAmenityChange = (amenity, checked) => {
        if (checked) {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
        else {
            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
        }
    };
    const allAmenities = getAllAmenities(hotels);
    const displayedAmenities = showAllAmenities
        ? allAmenities
        : allAmenities.slice(0, INITIAL_AMENITIES_COUNT);
    return (_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 mb-2", children: "Room Facilities" }), _jsxs("div", { className: "space-y-2", children: [displayedAmenities.map((amenity) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", "data-cy": `amenity-${amenity}`, children: [_jsx("input", { type: "checkbox", checked: selectedAmenities.includes(amenity), onChange: (e) => handleAmenityChange(amenity, e.target.checked), className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" }), _jsxs("div", { className: "flex items-center justify-between flex-1", children: [_jsx("span", { className: "text-sm text-gray-700", "data-cy": `name-${amenity}`, children: formatAmenityName(amenity) }), _jsxs("span", { className: "text-xs text-gray-500 ml-2", "data-cy": `count-${amenity}`, children: ["(", getHotelCountForAmenity(hotels, amenity), ")"] })] })] }, amenity))), allAmenities.length > INITIAL_AMENITIES_COUNT && (_jsx("button", { "data-cy": 'show-all-button', onClick: () => setShowAllAmenities(!showAllAmenities), className: "w-full mt-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1", children: showAllAmenities
                            ? `Show Less`
                            : `Show More (${allAmenities.length - INITIAL_AMENITIES_COUNT} more)` }))] })] }));
};
export default AmenityFilter;
