import React from 'react';
import type { Hotel } from '../../types/hotel';
import { formatAmenityName } from '../../utils/amenity';

interface HotelAmenitiesProps {
    hotel: Hotel;
}

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ hotel }) => {
    if (!hotel.amenities || Object.keys(hotel.amenities).length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(hotel.amenities)
                    .filter(([, value]) => value === true)
                    .map(([key]) => (
                        <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium">{formatAmenityName(key)}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HotelAmenities; 