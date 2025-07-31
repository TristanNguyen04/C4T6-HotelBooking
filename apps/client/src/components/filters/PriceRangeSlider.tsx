import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface PriceRangeSliderProps {
    priceMin: number;
    priceMax: number;
    actualMinPrice: number;
    actualMaxPrice: number;
    setPriceMin: (value: number) => void;
    setPriceMax: (value: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
    priceMin,
    priceMax,
    actualMinPrice,
    actualMaxPrice,
    setPriceMin,
    setPriceMax
}) => {
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    
    const priceRange = actualMaxPrice - actualMinPrice;
    const minPercent = priceRange > 0 ? ((priceMin - actualMinPrice) / priceRange) * 100 : 0;
    const maxPercent = priceRange > 0 ? ((priceMax - actualMinPrice) / priceRange) * 100 : 100;

    const handleMouseDown = useCallback((type: 'min' | 'max') => {
        setIsDragging(type);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDragging || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        const newValue = actualMinPrice + (percent / 100) * priceRange;

        if (isDragging === 'min') {
            const constrainedValue = Math.max(actualMinPrice, Math.min(newValue, priceMax - 1));
            setPriceMin(constrainedValue);
        } else {
            const constrainedValue = Math.min(actualMaxPrice, Math.max(newValue, priceMin + 1));
            setPriceMax(constrainedValue);
        }
    }, [isDragging, actualMinPrice, actualMaxPrice, priceRange, priceMin, priceMax, setPriceMin, setPriceMax]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(null);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleMouseMove);
            document.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        const newValue = actualMinPrice + (percent / 100) * priceRange;

        const distanceToMin = Math.abs(newValue - priceMin);
        const distanceToMax = Math.abs(newValue - priceMax);

        if (distanceToMin < distanceToMax) {
            const constrainedValue = Math.max(actualMinPrice, Math.min(newValue, priceMax - 1));
            setPriceMin(constrainedValue);
        } else {
            const constrainedValue = Math.min(actualMaxPrice, Math.max(newValue, priceMin + 1));
            setPriceMax(constrainedValue);
        }
    };

    return (
        <div className="mb-1">
            <div className="relative h-7">
                {/* Price labels */}
                <div data-cy={'price-slider-info'}  
                className="absolute -top-2 left-0 flex justify-between w-full text-xs text-gray-500">
                    <span data-cy={'minPrice'} className="font-medium">${Math.floor(actualMinPrice)}</span>
                    <span className="font-medium">${Math.floor((actualMinPrice + actualMaxPrice) / 2)}</span>
                    <span data-cy={'maxPrice'} className="font-medium">${Math.ceil(actualMaxPrice)}</span>
                </div>
                
                {/* Track background */}
                <div 
                    ref={sliderRef}
                    className="absolute top-5 left-0 right-0 h-2 bg-gray-200 rounded-full cursor-pointer"
                    onClick={handleTrackClick}
                />
                
                {/* Selected range */}
                <div 
                    className="absolute top-5 h-2 bg-blue-500 rounded-full pointer-events-none"
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`
                    }}
                />
                
                {/* Min price handle */}
                <div
                    className={`absolute top-3.5 w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-200 ${
                        isDragging === 'min' ? 'scale-110' : ''
                    }`}
                    style={{
                        left: `calc(${minPercent}% - 12px)`,
                        zIndex: isDragging === 'min' ? 10 : 1
                    }}
                    onMouseDown={() => handleMouseDown('min')}
                    onTouchStart={() => handleMouseDown('min')}
                    role="slider"
                    aria-valuemin={actualMinPrice}
                    aria-valuemax={actualMaxPrice}
                    aria-valuenow={priceMin}
                    aria-label="Minimum price"
                    tabIndex={0}
                />
                
                {/* Max price handle */}
                <div
                    className={`absolute top-3.5 w-5 h-5 bg-white border-2 border-blue-500 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-200 ${
                        isDragging === 'max' ? 'scale-110' : ''
                    }`}
                    style={{
                        left: `calc(${maxPercent}% - 12px)`,
                        zIndex: isDragging === 'max' ? 10 : 1
                    }}
                    onMouseDown={() => handleMouseDown('max')}
                    onTouchStart={() => handleMouseDown('max')}
                    role="slider"
                    aria-valuemin={actualMinPrice}
                    aria-valuemax={actualMaxPrice}
                    aria-valuenow={priceMax}
                    aria-label="Maximum price"
                    tabIndex={0}
                />
            </div>
        </div>
    );
};

export default PriceRangeSlider; 