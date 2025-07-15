import React, { useState } from 'react';
import type { PriceRangeFilterProps } from '../../types/hotel';
// import { getBinLabel, getBinRange } from '../../utils/histogram';

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
    rooms,
    histogram,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax
}) => {
    const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Price Range</h3>
                <p className="text-sm text-gray-500">Filter hotels by nightly rate</p>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Min Price</label>
                    <div className="relative">
                        <span className="pr-1 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                            type="number"
                            min={histogram.min}
                            max={histogram.max}
                            value={Math.floor(priceMin)}
                            onChange={e => {
                                const val = parseFloat(e.target.value) || histogram.min;
                                if (val <= priceMax && val >= histogram.min) setPriceMin(val);
                            }}
                            className="w-full pl-6 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="0"
                        />
                    </div>
                </div>
                
                <div className="flex items-center justify-center pt-5">
                    <div className="w-6 h-px bg-gray-300"></div>
                </div>
                
                <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Max Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                            type="number"
                            min={histogram.min}
                            max={histogram.max}
                            value={Math.ceil(priceMax)}
                            onChange={e => {
                                const val = parseFloat(e.target.value) || histogram.max;
                                if (val >= priceMin && val <= histogram.max) setPriceMax(val);
                            }}
                            className="w-full pl-6 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="1000"
                        />
                    </div>
                </div>
            </div>


            {/* don't need as of now*/}
            {/* <div className="mb-4 w-full"> */}
                {/* <div className="flex items-end h-32 gap-1 mb-3 p-3 bg-gradient-to-t from-gray-50 to-white rounded-lg border border-gray-100 w-full overflow-auto"> */}
                    {/* {histogram.bins.map((count, i) => {
                        // Use the new adaptive algorithm - no need for bin grouping
                        const maxCount = Math.max(...histogram.bins);
                        
                        // Improved height calculation for better visual balance
                        const normalizedHeight = maxCount > 0 ? Math.sqrt(count) / Math.sqrt(maxCount) : 0;
                        const height = count > 0 
                            ? Math.max(8, Math.min(80, normalizedHeight * 80))
                            : 0;
                        
                        const binRange = getBinRange(i, histogram.binBoundaries);
                        const binLabel = getBinLabel(i, histogram.binBoundaries);
                        
                        const isInRange = binRange.end > priceMin && binRange.start < priceMax;
                        
                        return (
                            <div
                                key={i}
                                className={`flex-1 max-w-[5px] min-w-[5px] rounded-t-lg transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                                    isInRange 
                                        ? 'bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 shadow-sm' 
                                        : 'bg-gradient-to-t from-gray-400 via-gray-300 to-gray-200 hover:from-gray-500 hover:via-gray-400 hover:to-gray-300'
                                }`}
                                style={{ height: `${height}%` }}
                                title={`${binLabel}: ${count} hotels`}
                                onClick={() => {
                                    // Allow clicking on bins to set range
                                    setPriceMin(binRange.start);
                                    setPriceMax(binRange.end);
                                }}
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200 ${
                                    isInRange ? 'bg-white' : 'bg-gray-600'
                                }`}></div>
                                
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg">
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-200">{binLabel}</div>
                                        <div className="text-gray-300 text-xs mt-1">
                                            {count} hotel{count !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div> */}
                                
                                {/* {count > 0 && height > 25 && (
                                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[9px] font-normal text-white opacity-80 leading-none">
                                        {count}
                                    </div>
                                )} */}
                            {/* </div>
                        );
                    })}
                </div> */}
                
                {/* <div className="flex justify-between items-center text-xs text-gray-600 px-1">
                    <div className="flex flex-col items-start">
                        <span className="font-medium">${Math.floor(histogram.min)}</span>
                        <span className="text-gray-400">Min</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-medium">${Math.floor((histogram.min + histogram.max) / 2)}</span>
                        <span className="text-gray-400">Avg</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="font-medium">${Math.ceil(histogram.max)}</span>
                        <span className="text-gray-400">Max</span>
                    </div>
                </div> */}
            {/* </div> */}

            {/* Dual Price Range Slider */}
            <div className="relative mb-2 px-3">
                <div 
                    className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
                    onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        const value = histogram.min + percent * (histogram.max - histogram.min);
                        
                        const minDistance = Math.abs(value - priceMin);
                        const maxDistance = Math.abs(value - priceMax);
                        
                        if (minDistance < maxDistance) {
                            if (value <= priceMax) setPriceMin(value);
                        } else {
                            if (value >= priceMin) setPriceMax(value);
                        }
                    }}
                >
                    <div 
                        className="absolute top-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-75"
                        style={{
                            left: `${((priceMin - histogram.min) / (histogram.max - histogram.min)) * 100}%`,
                            right: `${100 - ((priceMax - histogram.min) / (histogram.max - histogram.min)) * 100}%`
                        }}
                    ></div>
                    
                    {/* Min thumb */}
                    <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-lg cursor-pointer transition-all duration-75 ${
                            isDragging === 'min' ? 'scale-125 shadow-xl ring-4 ring-blue-200' : 'hover:scale-110'
                        }`}
                        style={{
                            left: `calc(${((priceMin - histogram.min) / (histogram.max - histogram.min)) * 100}% - 10px)`,
                            zIndex: isDragging === 'min' ? 3 : 2
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsDragging('min');
                            
                            const startX = e.clientX;
                            const startValue = priceMin;
                            const sliderRect = e.currentTarget.parentElement!.getBoundingClientRect();
                            const sliderWidth = sliderRect.width;
                            const valueRange = histogram.max - histogram.min;
                            
                            const handleMouseMove = (e: MouseEvent) => {
                                e.preventDefault();
                                const deltaX = e.clientX - startX;
                                const deltaPercent = deltaX / sliderWidth;
                                const deltaValue = deltaPercent * valueRange;
                                const newValue = Math.max(
                                    histogram.min,
                                    Math.min(priceMax, startValue + deltaValue)
                                );
                                setPriceMin(newValue);
                            };
                            
                            const handleMouseUp = (e: MouseEvent) => {
                                e.preventDefault();
                                setIsDragging(null);
                                document.removeEventListener('mousemove', handleMouseMove);
                                document.removeEventListener('mouseup', handleMouseUp);
                                document.body.style.userSelect = '';
                            };
                            
                            document.body.style.userSelect = 'none';
                            document.addEventListener('mousemove', handleMouseMove, { passive: false });
                            document.addEventListener('mouseup', handleMouseUp, { passive: false });
                        }}
                        
                        onTouchStart={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsDragging('min');
                            
                            const touch = e.touches[0];
                            const startX = touch.clientX;
                            const startValue = priceMin;
                            const sliderRect = e.currentTarget.parentElement!.getBoundingClientRect();
                            const sliderWidth = sliderRect.width;
                            const valueRange = histogram.max - histogram.min;
                            
                            const handleTouchMove = (e: TouchEvent) => {
                                e.preventDefault();
                                const touch = e.touches[0];
                                const deltaX = touch.clientX - startX;
                                const deltaPercent = deltaX / sliderWidth;
                                const deltaValue = deltaPercent * valueRange;
                                const newValue = Math.max(
                                    histogram.min,
                                    Math.min(priceMax, startValue + deltaValue)
                                );
                                setPriceMin(newValue);
                            };
                            
                            const handleTouchEnd = () => {
                                setIsDragging(null);
                                document.removeEventListener('touchmove', handleTouchMove);
                                document.removeEventListener('touchend', handleTouchEnd);
                            };
                            
                            document.addEventListener('touchmove', handleTouchMove, { passive: false });
                            document.addEventListener('touchend', handleTouchEnd);
                        }}
                    />
                    
                    {/* Max thumb */}
                    <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-lg cursor-pointer transition-all duration-75 ${
                            isDragging === 'max' ? 'scale-125 shadow-xl ring-4 ring-blue-200' : 'hover:scale-110'
                        }`}
                        style={{
                            left: `calc(${((priceMax - histogram.min) / (histogram.max - histogram.min)) * 100}% - 10px)`,
                            zIndex: isDragging === 'max' ? 3 : 2
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsDragging('max');
                            
                            const startX = e.clientX;
                            const startValue = priceMax;
                            const sliderRect = e.currentTarget.parentElement!.getBoundingClientRect();
                            const sliderWidth = sliderRect.width;
                            const valueRange = histogram.max - histogram.min;
                            
                            const handleMouseMove = (e: MouseEvent) => {
                                e.preventDefault();
                                const deltaX = e.clientX - startX;
                                const deltaPercent = deltaX / sliderWidth;
                                const deltaValue = deltaPercent * valueRange;
                                const newValue = Math.min(
                                    histogram.max,
                                    Math.max(priceMin, startValue + deltaValue)
                                );
                                setPriceMax(newValue);
                            };
                            
                            const handleMouseUp = (e: MouseEvent) => {
                                e.preventDefault();
                                setIsDragging(null);
                                document.removeEventListener('mousemove', handleMouseMove);
                                document.removeEventListener('mouseup', handleMouseUp);
                                document.body.style.userSelect = '';
                            };
                            
                            document.body.style.userSelect = 'none';
                            document.addEventListener('mousemove', handleMouseMove, { passive: false });
                            document.addEventListener('mouseup', handleMouseUp, { passive: false });
                        }}
                        
                        onTouchStart={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsDragging('max');
                            
                            const touch = e.touches[0];
                            const startX = touch.clientX;
                            const startValue = priceMax;
                            const sliderRect = e.currentTarget.parentElement!.getBoundingClientRect();
                            const sliderWidth = sliderRect.width;
                            const valueRange = histogram.max - histogram.min;
                            
                            const handleTouchMove = (e: TouchEvent) => {
                                e.preventDefault();
                                const touch = e.touches[0];
                                const deltaX = touch.clientX - startX;
                                const deltaPercent = deltaX / sliderWidth;
                                const deltaValue = deltaPercent * valueRange;
                                const newValue = Math.min(
                                    histogram.max,
                                    Math.max(priceMin, startValue + deltaValue)
                                );
                                setPriceMax(newValue);
                            };
                            
                            const handleTouchEnd = () => {
                                setIsDragging(null);
                                document.removeEventListener('touchmove', handleTouchMove);
                                document.removeEventListener('touchend', handleTouchEnd);
                            };
                            
                            document.addEventListener('touchmove', handleTouchMove, { passive: false });
                            document.addEventListener('touchend', handleTouchEnd);
                        }}
                    />
                </div>
                
                {isDragging && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap z-20 shadow-lg">
                        ${Math.floor(priceMin)} - ${Math.ceil(priceMax)}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 justify-center items-center">
                    <p className="text-sm font-medium text-blue-800 text-center">
                        ${Math.floor(priceMin)} — ${Math.ceil(priceMax)}
                    </p>
                    <p className="text-sm font-normal text-blue-500 text-center">
                        
                        {rooms > 1 ? rooms + " rooms" : "per room"} per night
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PriceRangeFilter; 