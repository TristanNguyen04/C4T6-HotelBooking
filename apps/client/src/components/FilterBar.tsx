import React from 'react';
import { 
    PriceRangeFilter, 
    StarRatingFilter, 
    GuestRatingFilter, 
    AmenityFilter,
} from './filters';
import type { FilterBarProps } from '../types/hotel';
import { type Hotel } from '../types/hotel';

const FilterBar: React.FC<FilterBarProps> = ({
    hotels,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    selectedStarRatings,
    setSelectedStarRatings,
    selectedGuestRatings,
    setSelectedGuestRatings,
    selectedAmenities,
    setSelectedAmenities,
    showTotalPrice
}) => {
    if (!hotels || hotels.length === 0) return null;

    // Get the appropriate price based on the toggle
    const getPrice = (hotel: Hotel) => {
        if (showTotalPrice) {
            return hotel.totalPrice || hotel.price || 0;
        }
        return hotel.price || 0;
    };

    const prices = hotels.map(h => getPrice(h)).filter(p => p > 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const handleClearAll = () => {
        setSelectedStarRatings([]);
        setSelectedGuestRatings([]);
        setSelectedAmenities([]);
        setPriceMin(minPrice);
        setPriceMax(maxPrice);
    };

    const activeFiltersCount = 
        selectedStarRatings.length + 
        selectedGuestRatings.length + 
        selectedAmenities.length + 
        (priceMin !== minPrice || priceMax !== maxPrice ? 1 : 0);

    return (
        <div className="w-full h-full space-y-6 overflow-y-auto p-4 pt-1">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                        </svg>
                        <h1 className="text-xl font-semibold text-gray-800">Filters</h1>
                    </div>
                    <button 
                        onClick={handleClearAll}
                        className="flex items-center gap-1 py-1.5 px-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear All
                    </button>
                </div>
                
                {activeFiltersCount > 0 ? (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">
                            Showing filtered results
                        </span>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        Refine your search with the options below
                    </p>
                )}
            </div>

            <PriceRangeFilter
                hotels={hotels}
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                showTotalPrice={showTotalPrice}
            />

            <div className="flex flex-col space-y-6">
                <StarRatingFilter
                    hotels={hotels}
                    selectedStarRatings={selectedStarRatings}
                    setSelectedStarRatings={setSelectedStarRatings}
                />

                <GuestRatingFilter
                    hotels={hotels}
                    selectedGuestRatings={selectedGuestRatings}
                    setSelectedGuestRatings={setSelectedGuestRatings}
                />

                <AmenityFilter
                    hotels={hotels}
                    selectedAmenities={selectedAmenities}
                    setSelectedAmenities={setSelectedAmenities}
                />
            </div>
        </div>
    );
};

export default FilterBar;