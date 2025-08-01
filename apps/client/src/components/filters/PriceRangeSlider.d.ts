import React from 'react';
export interface PriceRangeSliderProps {
    priceMin: number;
    priceMax: number;
    actualMinPrice: number;
    actualMaxPrice: number;
    setPriceMin: (value: number) => void;
    setPriceMax: (value: number) => void;
}
declare const PriceRangeSlider: React.FC<PriceRangeSliderProps>;
export default PriceRangeSlider;
