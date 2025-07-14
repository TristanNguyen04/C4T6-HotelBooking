import React from 'react';
import { assets } from "../assets/assets";

interface Histogram {
    bins: number[];
    min: number;
    max: number;
}

interface FilterBarProps {
    histogram: Histogram | null;
    priceMin: number;
    setPriceMin: (val: number) => void;
    priceMax: number;
    setPriceMax: (val: number) => void;
    selectedStarRatings: number[];
    setSelectedStarRatings: (ratings: number[]) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
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
    );
};

const FilterBar: React.FC<FilterBarProps> = ({
    histogram,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    selectedStarRatings,
    setSelectedStarRatings
}) => {
    if (!histogram) return null;

    const handleStarRatingChange = (rating: number, checked: boolean) => {
        if (checked) {
            setSelectedStarRatings([...selectedStarRatings, rating]);
        } else {
            setSelectedStarRatings(selectedStarRatings.filter(r => r !== rating));
        }
    };

    return (
        <div className="w-full space-y-6">
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
                        Star Rating
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
                                <StarRating rating={rating} />
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;