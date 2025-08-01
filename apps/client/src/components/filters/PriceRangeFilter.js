import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PriceRangeSlider from './PriceRangeSlider';
const PriceRangeFilter = ({ hotels, priceMin, setPriceMin, priceMax, setPriceMax, showTotalPrice }) => {
    const [minInputValue, setMinInputValue] = useState(Math.floor(priceMin).toString());
    const [maxInputValue, setMaxInputValue] = useState(Math.floor(priceMax).toString());
    const minInputTimeoutRef = useRef(null);
    const maxInputTimeoutRef = useRef(null);
    // Get the appropriate price based on the toggle
    const getPrice = useCallback((hotel) => {
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
    const validateMinInput = useCallback((value) => {
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
    const validateMaxInput = useCallback((value) => {
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
    const handleMinInputChange = (e) => {
        const value = e.target.value;
        setMinInputValue(value);
        if (minInputTimeoutRef.current) {
            clearTimeout(minInputTimeoutRef.current);
        }
        minInputTimeoutRef.current = setTimeout(() => {
            validateMinInput(value);
        }, 1200);
    };
    const handleMaxInputChange = (e) => {
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
    const handleKeyDown = (e) => {
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
    return (_jsxs("div", { className: "w-full bg-white rounded-lg border border-gray-200 p-4 shadow-sm", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800 mb-1", children: "Price Range" }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Filter hotels by ", showTotalPrice ? 'total stay' : 'nightly', " rate"] })] }), _jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Min Price" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm", children: "$" }), _jsx("input", { type: "text", autoComplete: "off", value: minInputValue, onChange: handleMinInputChange, onBlur: handleMinInputBlur, onKeyDown: (e) => handleKeyDown(e), className: "w-full pl-6 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200", placeholder: "Min price" })] })] }), _jsx("div", { className: "flex items-center justify-center pt-5", children: _jsx("div", { className: "w-6 h-px bg-gray-300" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", children: "Max Price" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm", children: "$" }), _jsx("input", { type: "text", autoComplete: "off", value: maxInputValue, onChange: handleMaxInputChange, onBlur: handleMaxInputBlur, onKeyDown: (e) => handleKeyDown(e), className: "w-full pl-6 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200", placeholder: "Max price" })] })] })] }), _jsx(PriceRangeSlider, { priceMin: priceMin, priceMax: priceMax, actualMinPrice: actualMinPrice, actualMaxPrice: actualMaxPrice, setPriceMin: setPriceMin, setPriceMax: setPriceMax })] }));
};
export default PriceRangeFilter;
