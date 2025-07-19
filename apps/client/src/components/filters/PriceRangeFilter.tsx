import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { Hotel, PriceRangeFilterProps } from '../../types/hotel';
import PriceRangeSlider from './PriceRangeSlider';

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
    hotels,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    showTotalPrice
}) => {
    const [minInputValue, setMinInputValue] = useState(Math.floor(priceMin).toString());
    const [maxInputValue, setMaxInputValue] = useState(Math.floor(priceMax).toString());
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

    // Update input values when price bounds change or toggle changes
    useEffect(() => {
        setMinInputValue(Math.floor(priceMin).toString());
        setMaxInputValue(Math.floor(priceMax).toString());
    }, [priceMin, priceMax]);

    // Reset price range when toggle changes
    useEffect(() => {
        setPriceMin(actualMinPrice);
        setPriceMax(actualMaxPrice);
    }, [showTotalPrice, actualMinPrice, actualMaxPrice, setPriceMin, setPriceMax]);

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
            <PriceRangeSlider
                priceMin={priceMin}
                priceMax={priceMax}
                actualMinPrice={actualMinPrice}
                actualMaxPrice={actualMaxPrice}
                setPriceMin={setPriceMin}
                setPriceMax={setPriceMax}
            />
        </div>
    );
};

export default PriceRangeFilter; 