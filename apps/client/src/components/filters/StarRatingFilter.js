import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { getHotelCountForStarRating } from '../../hooks/useHotelFilter';
import StarRating from './StarRating';
const StarRatingFilter = ({ hotels, selectedStarRatings, setSelectedStarRatings }) => {
    const handleStarRatingChange = (rating, checked) => {
        if (checked) {
            setSelectedStarRatings([...selectedStarRatings, rating]);
        }
        else {
            setSelectedStarRatings(selectedStarRatings.filter(r => r !== rating));
        }
    };
    return (_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 mb-2", children: "Hotel Star Rating" }), _jsx("div", { className: "space-y-2", children: [5, 4, 3, 2, 1].map((rating) => (_jsxs("label", { "data-cy": `starsCount-${rating}`, className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: selectedStarRatings.includes(rating), onChange: (e) => handleStarRatingChange(rating, e.target.checked), className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" }), _jsx(StarRating, { rating: rating, hotelCount: getHotelCountForStarRating(hotels, rating) })] }, rating))) })] }));
};
export default StarRatingFilter;
