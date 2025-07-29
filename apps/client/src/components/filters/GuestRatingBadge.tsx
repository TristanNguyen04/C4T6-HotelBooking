import React from 'react';

interface GuestRatingBadgeProps {
    ratingRange: string;
    hotelCount: number;
}

const GuestRatingBadge: React.FC<GuestRatingBadgeProps> = ({ ratingRange, hotelCount }) => {
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

export default GuestRatingBadge; 