import React from 'react';
import type { Hotel } from '../../types/hotel';
import { renderStars } from '../../utils/stars';
import { getGuestRatingDisplay } from '../../utils/guestRating';

interface HotelDetailsHeaderProps {
    hotel: Hotel;
}

const HotelDetailsHeader: React.FC<HotelDetailsHeaderProps> = ({ hotel }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
            <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Hotel Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            {hotel.rating && renderStars(hotel.rating)}
                            <span className="text-sm text-gray-600">({hotel.rating} stars)</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                        <div className="flex items-center text-gray-600 mb-4">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{hotel.address}</span>
                        </div>
                        {hotel.distance && (
                            <p className="text-sm text-gray-500 mb-4">
                                {(hotel.distance / 1000).toFixed(1)} km from city center
                            </p>
                        )}
                        
                        {/* Guest Rating */}
                        {hotel.categories.overall?.score && hotel.categories.overall.score >= 60 && (() => {
                            const ratingDisplay = getGuestRatingDisplay(hotel.categories.overall.score);
                            return ratingDisplay ? (
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${ratingDisplay.bgColor} ${ratingDisplay.textColor} ${ratingDisplay.borderColor} border`}>
                                        {ratingDisplay.text}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {hotel.categories.overall.score}/100 guest rating
                                    </span>
                                </div>
                            ) : null;
                        })()}
                    </div>

                    {/* Price Info */}
                    <div className="lg:text-right">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p className="text-sm text-blue-600 font-medium mb-1">Price per night</p>
                            <p className="text-3xl font-bold text-blue-900">
                                {hotel.currency} {hotel.price || 'N/A'}
                            </p>
                            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetailsHeader; 