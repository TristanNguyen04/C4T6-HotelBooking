import React from 'react';
import type { Hotel } from '../../types/hotel';
import { parseHotelDescription } from '../../utils/description';

interface OverviewCardProps {
    hotel: Hotel;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ hotel }: OverviewCardProps) => {
    const parsedDescription = parseHotelDescription(hotel.description);

    console.log(parsedDescription);

    const renderSection = (section: string[] | string, title: string, icon: React.ReactNode, preferredAirport?: string) => {
        if (!section) return null;
        
        return (
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
                </div>
                <div className="pl-11">
                    {title === 'Attractions' && Array.isArray(section) ? (
                        <div className="space-y-1">
                            {section.map((attraction: string, index: number) => (
                                <div key={index} className="text-sm text-gray-700 flex justify-between">
                                    <span>{attraction.split(' - ')[0]}</span>
                                    <span className="text-gray-500">{attraction.split(' - ')[1]}</span>
                                </div>
                            ))}
                        </div>
                    ) : title === 'Nearby Airports' && Array.isArray(section) ? (
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">The nearest airports are:</p>
                                <div className="space-y-1">
                                    {section.map((airport: string, index: number) => (
                                        <div key={index} className="text-sm text-gray-700 flex justify-between">
                                            <span>{airport.split(' - ')[0]}</span>
                                            <span className="text-gray-500">{airport.split(' - ')[1]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {preferredAirport && (
                                <div className="pt-2 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        {preferredAirport}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {Array.isArray(section) ? section.join('\n') : section}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">

            {/* Amenities */}
            {parsedDescription.amenities && renderSection([parsedDescription.amenities], 'Amenities', 
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )}

            {/* Dining */}
            {parsedDescription.dining && renderSection([parsedDescription.dining], 'Dining', 
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7h8" />
                </svg>
            )}

            {/* Business Amenities */}
            {parsedDescription.businessAmenities && renderSection([parsedDescription.businessAmenities], 'Business Amenities', 
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )}

            {/* Rooms */}
            {parsedDescription.rooms && renderSection([parsedDescription.rooms], 'Rooms', 
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7h8" />
                </svg>
            )}

            {/* Attractions */}
            {parsedDescription.attractions && renderSection(parsedDescription.attractions, 'Attractions', 
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )}

            {/* Nearby Airports */}
            {parsedDescription.nearestAirports && renderSection(
                parsedDescription.nearestAirports, 
                'Nearby Airports', 
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>,
                parsedDescription.preferredAirport
            )}

            {/* Location */}
            {parsedDescription.location && renderSection([parsedDescription.location], 'Location',
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )}

            {/* Headline */}
            {parsedDescription.headline && renderSection([parsedDescription.headline], 'Headline', 
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m4 0v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4h16z" />
                </svg>
            )}

            {/* Hotel Categories */}
            {hotel.categories && Object.keys(hotel.categories).length > 1 && (
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">Hotel Categories</h4>
                    </div>
                    <div className="pl-11">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries(hotel.categories)
                                .filter(([key]) => key !== 'overall')
                                .map(([key, category]) => (
                                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm font-medium text-gray-700 capitalize">
                                            {category.name || key.replace(/_/g, ' ')}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-blue-600">
                                                {category.score}/100
                                            </span>
                                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500 transition-all duration-300"
                                                    style={{ width: `${category.score}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Key Features */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">Key Features</h4>
                </div>
                <div className="pl-11">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Prime Location</p>
                                <p className="text-xs text-gray-600">
                                    {hotel.distance ? `${(hotel.distance / 1000).toFixed(1)} km from center` : 'Great location'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Quality Assured</p>
                                <p className="text-xs text-gray-600">
                                    {hotel.rating ? `${hotel.rating}-star hotel` : 'Quality accommodation'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">24/7 Service</p>
                                <p className="text-xs text-gray-600">Round-the-clock assistance</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Guest Favorite</p>
                                <p className="text-xs text-gray-600">
                                    {hotel.categories?.overall?.score 
                                        ? `${hotel.categories.overall.score}/100 rating`
                                        : 'Highly rated'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewCard;