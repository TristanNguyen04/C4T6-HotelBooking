import React from 'react';

export default function HotelCardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 animate-pulse">
            <div className="flex flex-col sm:flex-row">

                <div className="w-full h-48 sm:w-64 sm:h-72 bg-gray-200 flex-shrink-0 shimmer">
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-2">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-4 h-4 bg-gray-200 rounded shimmer"></div>
                                        ))}
                                    </div>
                                    <div className="w-8 h-4 bg-gray-200 rounded ml-1 shimmer"></div>
                                </div>
                                
                                <div className="w-3/4 h-6 bg-gray-200 rounded mb-1 shimmer"></div>
                                
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-gray-200 rounded mr-1 shimmer"></div>
                                    <div className="w-1/2 h-4 bg-gray-200 rounded shimmer"></div>
                                </div>
                            </div>
                            
                            <div className="flex-shrink-0">
                                <div className="w-24 h-6 bg-gray-200 rounded-full shimmer"></div>
                            </div>
                        </div>

                        <div className="w-32 h-4 bg-gray-200 rounded shimmer"></div>

                        <div className="flex flex-wrap gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-16 h-6 bg-gray-200 rounded-full shimmer"></div>
                            ))}
                            <div className="w-12 h-6 bg-gray-200 rounded-full shimmer"></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <div className="text-right">
                            <div className="w-24 h-8 bg-gray-200 rounded shimmer"></div>
                            <div className="w-16 h-4 bg-gray-200 rounded mt-1 shimmer"></div>
                        </div>
                        <div className="w-28 h-10 bg-gray-200 rounded-lg shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
} 