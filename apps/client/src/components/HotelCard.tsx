import { Tooltip } from 'react-tooltip';
import type { Hotel, SearchContext } from '../types/hotel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { assets } from '../assets/assets';
import { renderStars } from '../utils/stars';
import { formatAmenityName } from '../utils/amenity';
import { getGuestRatingDisplay } from '../utils/guestRating';

interface HotelCardProps {
    hotel: Hotel;
    searchContext: SearchContext;
}

export default function HotelCard({ 
    hotel,
    searchContext
}: HotelCardProps) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        const searchParams = new URLSearchParams({
            destination_id: searchContext.destination_id,
            checkin: searchContext.checkin,
            checkout: searchContext.checkout,
            guests: searchContext.guests,
            term: searchContext.term,
            rooms: searchContext.rooms.toString(),
            adults: searchContext.adults.toString(),
            children: searchContext.children.toString()
        });
        
        navigate(`/hotels/${hotel.id}/details?${searchParams.toString()}`);
    };

    const [imgSrc, setImgSrc] = useState(
        hotel.image_details
            ? `${hotel.image_details.prefix}${hotel.image_details.count}${hotel.image_details.suffix}`
            : assets.hotelNotFound
    );

    const handleImgError = () => {
        setImgSrc(assets.hotelNotFound);
    };

    const amenityKeys = Object.entries(hotel.amenities || {})
        .filter(([, value]) => value === true)
        .map(([key]) => key);


    const previewAmenities = amenityKeys.slice(0, 3);
    const extraAmenityCount = amenityKeys.length - previewAmenities.length;

    const tooltipContent = amenityKeys
        .map(formatAmenityName)
        .join(' • ');
        
    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200">
            <div className="flex flex-col sm:flex-row">
                <div className="w-full h-48 sm:w-64 sm:h-72 bg-gray-100 flex-shrink-0">
                    <img 
                        src={imgSrc} 
                        alt={hotel.name}
                        onError={handleImgError}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div className="flex-1">
                                {hotel.rating && (
                                    <div className="flex items-center gap-1 mb-2">
                                        {renderStars(hotel.rating)}
                                        <span className="text-sm text-gray-600 ml-1">({hotel.rating})</span>
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                                <p className="text-sm text-gray-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {hotel.address}
                                </p>
                            </div>
                            {hotel.categories.overall?.score && hotel.categories.overall.score >= 60 && (() => {
                                const ratingDisplay = getGuestRatingDisplay(hotel.categories.overall.score);
                                return ratingDisplay ? (
                                    <div className="flex-shrink-0">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${ratingDisplay.bgColor} ${ratingDisplay.textColor} ${ratingDisplay.borderColor} border`}>
                                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18l-1.45-1.32C5.4 14.36 2 11.28 2 7.5 2 5.42 3.42 4 5.5 4c1.74 0 3.41.81 4.5 2.09C11.59 4.81 13.26 4 15 4 17.58 4 19 5.42 19 7.5c0 3.78-3.4 6.86-6.55 9.18L10 18z" clipRule="evenodd" />
                                            </svg>
                                            {ratingDisplay.text}
                                            <span className="ml-1.5 text-xs opacity-75">
                                                {hotel.categories.overall.score}/100
                                            </span>
                                        </span>
                                    </div>
                                ) : null;
                            })()}
                        </div>

                        {hotel.distance && (
                            <p className="text-sm text-gray-500">
                                {(hotel.distance / 1000).toFixed(1)} km from center
                            </p>
                        )}

                        {amenityKeys.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {previewAmenities.map((key) => (
                                    <span 
                                        key={key}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                        {formatAmenityName(key)}
                                    </span>
                                ))}
                                {extraAmenityCount > 0 && (
                                    <span 
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 cursor-help"
                                        data-tooltip-id={`tooltip-${hotel.id}`}
                                        data-tooltip-content={tooltipContent}
                                    >
                                        +{extraAmenityCount} more
                                    </span>
                                )}
                                <Tooltip 
                                    id={`tooltip-${hotel.id}`} 
                                    place="bottom" 
                                    style={{
                                        backgroundColor: '#1f2937',
                                        color: '#ffffff',
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        maxWidth: '300px',
                                        textAlign: 'center',
                                        lineHeight: '1.4',
                                        wordWrap: 'break-word',
                                        zIndex: 1000,
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                    }}
                                    opacity={1}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                                {hotel.currency} {hotel.price}
                            </p>
                            <p className="text-sm text-gray-500">per night</p>
                        </div>
                        <button
                            onClick={handleViewDetails}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}