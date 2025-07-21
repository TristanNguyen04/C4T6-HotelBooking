import React, { useState } from 'react';
import { getAllAmenities, getHotelCountForAmenity } from '../../hooks/useHotelFilter';
import { formatAmenityName } from '../../utils/amenity';
import type { AmenityFilterProps } from '../../types/hotel';

const AmenityFilter: React.FC<AmenityFilterProps> = ({
    hotels,
    selectedAmenities,
    setSelectedAmenities
}) => {
    const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
    const INITIAL_AMENITIES_COUNT = 6;

    const handleAmenityChange = (amenity: string, checked: boolean) => {
        if (checked) {
            setSelectedAmenities([...selectedAmenities, amenity]);
        } else {
            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
        }
    };

    const allAmenities = getAllAmenities(hotels);
    const displayedAmenities = showAllAmenities 
        ? allAmenities 
        : allAmenities.slice(0, INITIAL_AMENITIES_COUNT);

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
                Room Facilities
            </label>
            <div className="space-y-2">
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
                    data-cy={'show-all-button'}
                        onClick={() => setShowAllAmenities(!showAllAmenities)}
                        className="w-full mt-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        {showAllAmenities 
                            ? `Show Less` 
                            : `Show More (${allAmenities.length - INITIAL_AMENITIES_COUNT} more)`
                        }
                    </button>
                )}
            </div>
        </div>
    );
};

export default AmenityFilter; 