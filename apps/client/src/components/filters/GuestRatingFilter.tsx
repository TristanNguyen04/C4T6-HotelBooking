import React from 'react';
import { getHotelCountForGuestRating } from '../../hooks/useHotelFilter';
import GuestRatingBadge from './GuestRatingBadge';
import type { GuestRatingFilterProps } from '../../types/hotel';

const GuestRatingFilter: React.FC<GuestRatingFilterProps> = ({
    hotels,
    selectedGuestRatings,
    setSelectedGuestRatings
}) => {
    const guestRatingOptions = ['Outstanding', 'Excellent', 'Very Good', 'Good'];

    const handleGuestRatingChange = (rating: string, checked: boolean) => {
        if (checked) {
            setSelectedGuestRatings([...selectedGuestRatings, rating]);
        } else {
            setSelectedGuestRatings(selectedGuestRatings.filter(r => r !== rating));
        }
    };

    return (
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
    );
};

export default GuestRatingFilter; 