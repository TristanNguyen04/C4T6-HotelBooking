import React from 'react';
import type { SearchContext } from '../../types/hotel';

interface HotelInformationProps {
    searchContext: SearchContext | null;
}

const HotelInformation: React.FC<HotelInformationProps> = ({ searchContext }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Information</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium">{searchContext?.checkin || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium">{searchContext?.checkout || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">
                        {searchContext ? (() => {
                            const { adults, children, childrenAges } = searchContext;
                            const adultsText = adults === 1 ? '1 adult' : `${adults} adults`;
                            
                            if (children === 0) {
                                return adultsText;
                            }
                            
                            const childrenText = children === 1 ? '1 child' : `${children} children`;
                            const agesText = childrenAges.length > 0 
                                ? ` (${childrenAges.map(age => `${age} years old`).join(', ')})`
                                : '';
                                
                            return `${adultsText}, ${childrenText}${agesText}`;
                        })() : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Rooms:</span>
                    <span className="font-medium">{searchContext?.rooms || 'N/A'}</span>
                </div>
            </div>
        </div>
    );
};

export default HotelInformation; 