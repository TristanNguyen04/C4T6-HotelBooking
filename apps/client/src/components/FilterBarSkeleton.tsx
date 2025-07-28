export default function FilterBarSkeleton() {
    return (
        <div className="w-full h-full space-y-6 overflow-y-auto p-4 pt-1 animate-pulse">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-200 rounded shimmer"></div>
                        <div className="w-16 h-6 bg-gray-200 rounded shimmer"></div>
                    </div>
                    <div className="w-20 h-8 bg-gray-200 rounded-lg shimmer"></div>
                </div>
                
                <div className="w-3/4 h-4 bg-gray-200 rounded shimmer"></div>
            </div>

            {/* Price Range Filter Skeleton */}
            <div className="space-y-4">
                <div className="w-24 h-5 bg-gray-200 rounded shimmer"></div>
                <div className="space-y-3">
                    <div className="w-full h-6 bg-gray-200 rounded shimmer"></div>
                    <div className="flex justify-between">
                        <div className="w-16 h-4 bg-gray-200 rounded shimmer"></div>
                        <div className="w-16 h-4 bg-gray-200 rounded shimmer"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-20 h-8 bg-gray-200 rounded shimmer"></div>
                        <div className="w-20 h-8 bg-gray-200 rounded shimmer"></div>
                    </div>
                </div>
            </div>

            {/* Star Rating Filter Skeleton */}
            <div className="space-y-4">
                <div className="w-28 h-5 bg-gray-200 rounded shimmer"></div>
                <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-200 rounded shimmer"></div>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, j) => (
                                    <div key={j} className="w-4 h-4 bg-gray-200 rounded shimmer"></div>
                                ))}
                            </div>
                            <div className="w-8 h-4 bg-gray-200 rounded shimmer"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Guest Rating Filter Skeleton */}
            <div className="space-y-4">
                <div className="w-32 h-5 bg-gray-200 rounded shimmer"></div>
                <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-200 rounded shimmer"></div>
                            <div className="w-16 h-6 bg-gray-200 rounded-full shimmer"></div>
                            <div className="w-8 h-4 bg-gray-200 rounded shimmer"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Amenities Filter Skeleton */}
            <div className="space-y-4">
                <div className="w-24 h-5 bg-gray-200 rounded shimmer"></div>
                <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-200 rounded shimmer"></div>
                            <div className="w-28 h-4 bg-gray-200 rounded shimmer"></div>
                            <div className="w-6 h-4 bg-gray-200 rounded shimmer"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 