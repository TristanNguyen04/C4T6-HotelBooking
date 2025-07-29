import React from 'react';
import { getHotelCountForStarRating } from '../../hooks/useHotelFilter';
import StarRating from './StarRating';
import type { StarRatingFilterProps } from '../../types/hotel';

const StarRatingFilter: React.FC<StarRatingFilterProps> = ({
    hotels,
    selectedStarRatings,
    setSelectedStarRatings
}) => {
    const handleStarRatingChange = (rating: number, checked: boolean) => {
        if (checked) {
            setSelectedStarRatings([...selectedStarRatings, rating]);
        } else {
            setSelectedStarRatings(selectedStarRatings.filter(r => r !== rating));
        }
    };

    return (
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
    );
};

export default StarRatingFilter; 