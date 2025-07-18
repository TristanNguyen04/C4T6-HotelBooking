import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { Hotel, PriceRangeFilterProps } from '../../types/hotel';

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
    hotels,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    showTotalPrice
}) => {
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
    const [minInputValue, setMinInputValue] = useState(Math.floor(priceMin).toString());
    const [maxInputValue, setMaxInputValue] = useState(Math.floor(priceMax).toString());
    const sliderRef = useRef<HTMLDivElement>(null);
    const minInputTimeoutRef = useRef<NodeJS.Timeout>(null);
    const maxInputTimeoutRef = useRef<NodeJS.Timeout>(null);

    // Get the appropriate price based on the toggle
    const getPrice = useCallback((hotel: Hotel) => {
        if (showTotalPrice) {
            return hotel.totalPrice || hotel.price || 0;
        }
        return hotel.price || 0;
    }, [showTotalPrice]);

    const prices = hotels.map(h => getPrice(h)).filter(p => p > 0);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;
    
    const actualMinPrice = minPrice;
    const actualMaxPrice = maxPrice === minPrice ? minPrice + 100 : maxPrice;
    const priceRange = actualMaxPrice - actualMinPrice;

    const minPercent = priceRange > 0 ? ((priceMin - actualMinPrice) / priceRange) * 100 : 0;
    const maxPercent = priceRange > 0 ? ((priceMax - actualMinPrice) / priceRange) * 100 : 100;

    // Update input values when price bounds change or toggle changes
    useEffect(() => {
        if (!isDragging) {
            setMinInputValue(Math.floor(priceMin).toString());
            setMaxInputValue(Math.floor(priceMax).toString());
        }
    }, [priceMin, priceMax, isDragging]);

    // Reset price range when toggle changes
    useEffect(() => {
        setPriceMin(actualMinPrice);
        setPriceMax(actualMaxPrice);
    }, [showTotalPrice, actualMinPrice, actualMaxPrice, setPriceMin, setPriceMax]);


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


    const validateMinInput = useCallback((value: string) => {
        const numValue = parseFloat(value);
        
        if (isNaN(numValue) || value.trim() === '') {
            setPriceMin(actualMinPrice);
            setMinInputValue(Math.floor(actualMinPrice).toString());
            return;
        }

        const constrainedValue = Math.max(actualMinPrice, Math.min(numValue, priceMax - 1));
        setPriceMin(constrainedValue);
        
        if (constrainedValue !== numValue) {
            setMinInputValue(Math.floor(constrainedValue).toString());
        }
    }, [actualMinPrice, priceMax, setPriceMin]);

    const validateMaxInput = useCallback((value: string) => {
        const numValue = parseFloat(value);
        
        if (isNaN(numValue) || value.trim() === '') {
            setPriceMax(actualMaxPrice);
            setMaxInputValue(Math.floor(actualMaxPrice).toString());
            return;
        }

        const constrainedValue = Math.min(actualMaxPrice, Math.max(numValue, priceMin + 1));
        setPriceMax(constrainedValue);
        
        if (constrainedValue !== numValue) {
            setMaxInputValue(Math.floor(constrainedValue).toString());
        }
    }, [actualMaxPrice, priceMin, setPriceMax]);

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinInputValue(value);

        if (minInputTimeoutRef.current) {
            clearTimeout(minInputTimeoutRef.current);
        }

        minInputTimeoutRef.current = setTimeout(() => {
            validateMinInput(value);
        }, 1200);
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxInputValue(value);

        if (maxInputTimeoutRef.current) {
            clearTimeout(maxInputTimeoutRef.current);
        }

        maxInputTimeoutRef.current = setTimeout(() => {
            validateMaxInput(value);
        }, 1200);
    };

    const handleMinInputBlur = () => {
        if (minInputTimeoutRef.current) {
            clearTimeout(minInputTimeoutRef.current);
        }
        validateMinInput(minInputValue);
    };

    const handleMaxInputBlur = () => {
        if (maxInputTimeoutRef.current) {
            clearTimeout(maxInputTimeoutRef.current);
        }
        validateMaxInput(maxInputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    useEffect(() => {
        return () => {
            if (minInputTimeoutRef.current) {
                clearTimeout(minInputTimeoutRef.current);
            }
            if (maxInputTimeoutRef.current) {
                clearTimeout(maxInputTimeoutRef.current);
            }
        };
    }, []);

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
        <div className="w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Price Range</h3>
                <p className="text-sm text-gray-500">
                    Filter hotels by {showTotalPrice ? 'total stay' : 'nightly'} rate
                </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Min Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                            type="text"
                            value={minInputValue}
                            onChange={handleMinInputChange}
                            onBlur={handleMinInputBlur}
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="w-full pl-6 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Min price"
                        />
                    </div>
                </div>
                
                <div className="flex items-center justify-center pt-5">
                    <div className="w-6 h-px bg-gray-300"></div>
                </div>
                
                <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Max Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                            type="text"
                            value={maxInputValue}
                            onChange={handleMaxInputChange}
                            onBlur={handleMaxInputBlur}
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="w-full pl-6 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Max price"
                        />
                    </div>
                </div>
            </div>

            {/* Price Range Slider */}
            <div className="mb-1">
                <div className="relative h-7">
                    {/* Price labels */}
                    <div className="absolute -top-2 left-0 flex justify-between w-full text-xs text-gray-500">
                        <span className="font-medium">${Math.floor(actualMinPrice)}</span>
                        <span className="font-medium">${Math.floor((actualMinPrice + actualMaxPrice) / 2)}</span>
                        <span className="font-medium">${Math.ceil(actualMaxPrice)}</span>
                    </div>
                    
                    {/* Track background */}
                    <div 
                        ref={sliderRef}
                        className="absolute top-5 left-0 right-0 h-2 bg-gray-200 rounded-full cursor-pointer"
                        onClick={handleTrackClick}
                    ></div>
                    
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
        </div>
    );
};

export default PriceRangeFilter; 