import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { PriceRangeFilter, StarRatingFilter, GuestRatingFilter, AmenityFilter, } from './filters';
import {} from '../types/hotel';
const FilterBar = ({ hotels, priceMin, setPriceMin, priceMax, setPriceMax, selectedStarRatings, setSelectedStarRatings, selectedGuestRatings, setSelectedGuestRatings, selectedAmenities, setSelectedAmenities, showTotalPrice }) => {
    // Remove the early return that was causing the FilterBar to disappear
    // if (!hotels || hotels.length === 0) return null;
    // Get the appropriate price based on the toggle
    const getPrice = (hotel) => {
        if (showTotalPrice) {
            return hotel.totalPrice || hotel.price || 0;
        }
        return hotel.price || 0;
    };
    // Handle empty hotels case gracefully
    const prices = hotels ? hotels.map(h => getPrice(h)).filter(p => p > 0) : [];
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;
    const handleClearAll = () => {
        setSelectedStarRatings([]);
        setSelectedGuestRatings([]);
        setSelectedAmenities([]);
        setPriceMin(minPrice);
        setPriceMax(maxPrice);
    };
    const activeFiltersCount = selectedStarRatings.length +
        selectedGuestRatings.length +
        selectedAmenities.length +
        (priceMin !== minPrice || priceMax !== maxPrice ? 1 : 0);
    return (_jsxs("div", { className: "w-full h-full space-y-6 overflow-y-auto p-4 pt-1", children: [_jsxs("div", { className: "sticky top-0 bg-white z-10 pb-4 border-b border-gray-100", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("svg", { className: "w-5 h-5 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" }) }), _jsx("h1", { className: "text-xl font-semibold text-gray-800", children: "Filters" })] }), _jsxs("button", { onClick: handleClearAll, className: "flex items-center gap-1 py-1.5 px-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }), "Clear All"] })] }), activeFiltersCount > 0 ? (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsxs("span", { className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: [activeFiltersCount, " active filter", activeFiltersCount !== 1 ? 's' : ''] }), _jsx("span", { className: "text-gray-500", children: "\u2022" }), _jsx("span", { className: "text-gray-500", children: "Showing filtered results" })] })) : (_jsx("p", { className: "text-sm text-gray-500", children: hotels && hotels.length > 0
                            ? "Refine your search with the options below"
                            : "No hotels found for this search" }))] }), _jsx(PriceRangeFilter, { hotels: hotels || [], priceMin: priceMin, setPriceMin: setPriceMin, priceMax: priceMax, setPriceMax: setPriceMax, showTotalPrice: showTotalPrice }), _jsxs("div", { className: "flex flex-col space-y-6", children: [_jsx(StarRatingFilter, { hotels: hotels || [], selectedStarRatings: selectedStarRatings, setSelectedStarRatings: setSelectedStarRatings }), _jsx(GuestRatingFilter, { hotels: hotels || [], selectedGuestRatings: selectedGuestRatings, setSelectedGuestRatings: setSelectedGuestRatings }), _jsx(AmenityFilter, { hotels: hotels || [], selectedAmenities: selectedAmenities, setSelectedAmenities: setSelectedAmenities })] })] }));
};
export default FilterBar;
