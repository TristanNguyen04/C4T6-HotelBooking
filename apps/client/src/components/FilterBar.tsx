import React, { useState } from 'react';
import { assets } from "../assets/assets";
import type { Hotel } from "../types/hotel";
import { getHotelCountForStarRating, getHotelCountForGuestRating, getHotelCountForAmenity, getAllAmenities } from '../hooks/useHotelFilter';
import { formatAmenityName } from '../utils/amenity';

interface Histogram {
    bins: number[];
    min: number;
    max: number;
}

interface FilterBarProps {
    hotels: Hotel[];
    histogram: Histogram | null;
    priceMin: number;
    setPriceMin: (val: number) => void;
    priceMax: number;
    setPriceMax: (val: number) => void;
    selectedStarRatings: number[];
    setSelectedStarRatings: (ratings: number[]) => void;
    selectedGuestRatings: string[];
    setSelectedGuestRatings: (ratings: string[]) => void;
    selectedAmenities: string[];
    setSelectedAmenities: (amenities: string[]) => void;
}

const StarRating: React.FC<{ rating: number; hotelCount: number }> = ({ rating, hotelCount }) => {
    return (
        <div className="flex items-center justify-between flex-1">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <img
                        key={star}
                        src={star <= rating ? assets.starIconFilled : assets.starIconOutlined}
                        alt={star <= rating ? "filled star" : "outlined star"}
                        className="w-4 h-4"
                    />
                ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({hotelCount})</span>
        </div>
    );
};

const GuestRatingBadge: React.FC<{ ratingRange: string; hotelCount: number }> = ({ ratingRange, hotelCount }) => {
    const getBadgeStyles = (range: string) => {
        switch (range) {
            case 'Outstanding':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Excellent':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Very Good':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'Good':
                return 'bg-gray-100 text-gray-700 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="flex items-center justify-between flex-1">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBadgeStyles(ratingRange)}`}>
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 5.42 3.42 4 5.5 4c1.74 0 3.41.81 4.5 2.09C11.59 4.81 13.26 4 15 4 17.58 4 19 5.42 19 7.5c0 3.78-3.4 6.86-6.55 9.18L10 18z" clipRule="evenodd" />
                </svg>
                {ratingRange}
            </span>
            <span className="text-xs text-gray-500 ml-2">({hotelCount})</span>
        </div>
    );
};

const FilterBar: React.FC<FilterBarProps> = ({
    hotels,
    histogram,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    selectedStarRatings,
    setSelectedStarRatings,
    selectedGuestRatings,
    setSelectedGuestRatings,
    selectedAmenities,
    setSelectedAmenities
}) => {
    if (!histogram) return null;

    const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
    const INITIAL_AMENITIES_COUNT = 6;

    const handleAmenityChange = (amenity: string, checked: boolean) => {
        if (checked) {
            setSelectedAmenities([...selectedAmenities, amenity]);
        } else {
            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
        }
    };
    const handleStarRatingChange = (rating: number, checked: boolean) => {
        if (checked) {
            setSelectedStarRatings([...selectedStarRatings, rating]);
        } else {
            setSelectedStarRatings(selectedStarRatings.filter(r => r !== rating));
        }
    };

    const handleGuestRatingChange = (rating: string, checked: boolean) => {
        if (checked) {
            setSelectedGuestRatings([...selectedGuestRatings, rating]);
        } else {
            setSelectedGuestRatings(selectedGuestRatings.filter(r => r !== rating));
        }
    };

    const guestRatingOptions = ['Outstanding', 'Excellent', 'Very Good', 'Good'];

    return (
        <div className="w-full h-full space-y-6 overflow-y-auto pb-4 px-3">
            {/* Price Histogram */}
            <div className="w-full">
                <div className="flex items-end h-20 gap-1 mb-2">
                    {histogram.bins.map((count, i) => {
                        const maxCount = Math.max(...histogram.bins);
                        const height = (count / maxCount) * 100;
                        return (
                            <div
                                key={i}
                                className="flex-1 bg-blue-500 rounded-sm"
                                style={{ height: `${height}%` }}
                                title={`${count} hotels`}
                            />
                        );
                    })}
                </div>
                
                {/* Price Range Sliders */}
                <div className="flex gap-4 mb-2">
                    <input
                        type="range"
                        min={histogram.min}
                        max={histogram.max}
                        step={1}
                        value={priceMin}
                        onChange={e => {
                            const val = parseFloat(e.target.value);
                            if (val <= priceMax) setPriceMin(val);
                        }}
                        className="flex-1"
                    />
                    <input
                        type="range"
                        min={histogram.min}
                        max={histogram.max}
                        step={1}
                        value={priceMax}
                        onChange={e => {
                            const val = parseFloat(e.target.value);
                            if (val >= priceMin) setPriceMax(val);
                        }}
                        className="flex-1"
                    />
                </div>
                
                {/* Price Range Labels */}
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${Math.floor(histogram.min)}</span>
                    <span>${Math.ceil(histogram.max)}</span>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col space-y-6">
                {/* Price Min Input */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                        Price Min
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={priceMin}
                        onChange={e => setPriceMin(e.target.value ? parseFloat(e.target.value) : 0)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Min price"
                    />
                </div>

                {/* Price Max Input */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                        Price Max
                    </label>
                    <input
                        type="number"
                        min={0}
                        value={priceMax}
                        onChange={e => setPriceMax(e.target.value ? parseFloat(e.target.value) : Infinity)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Max price"
                    />
                </div>

                {/* Star Rating Checkboxes */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                        Hotel Star Rating
                    </label>
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedStarRatings.includes(rating)}
                                    onChange={(e) => handleStarRatingChange(rating, e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <StarRating 
                                    rating={rating} 
                                    hotelCount={getHotelCountForStarRating(hotels, rating)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Guest Rating Checkboxes */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                        Guest Rating
                    </label>
                    <div className="space-y-2">
                        {guestRatingOptions.map((rating) => (
                            <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedGuestRatings.includes(rating)}
                                    onChange={(e) => handleGuestRatingChange(rating, e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <GuestRatingBadge 
                                    ratingRange={rating} 
                                    hotelCount={getHotelCountForGuestRating(hotels, rating)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                                {/* Amenity Checkboxes */}
                                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-2">
                        Room Facilities
                    </label>
                    <div className="space-y-2">
                        {(() => {
                            const allAmenities = getAllAmenities(hotels);
                            const displayedAmenities = showAllAmenities 
                                ? allAmenities 
                                : allAmenities.slice(0, INITIAL_AMENITIES_COUNT);
                            
                            return (
                                <>
                                    {displayedAmenities.map((amenity: string) => (
                                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedAmenities.includes(amenity)}
                                                onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <div className="flex items-center justify-between flex-1">
                                                <span className="text-sm text-gray-700">
                                                    {formatAmenityName(amenity)}
                                                </span>
                                                <span className="text-xs text-gray-500 ml-2">
                                                    ({getHotelCountForAmenity(hotels, amenity)})
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                    
                                    {allAmenities.length > INITIAL_AMENITIES_COUNT && (
                                        <button
                                            onClick={() => setShowAllAmenities(!showAllAmenities)}
                                            className="w-full mt-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                        >
                                            {showAllAmenities 
                                                ? `Show Less` 
                                                : `Show More (${allAmenities.length - INITIAL_AMENITIES_COUNT} more)`
                                            }
                                        </button>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;