import React from 'react';
import { assets } from "../../assets/assets";

interface StarRatingProps {
    rating: number;
    hotelCount: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, hotelCount }) => {
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

export default StarRating; 