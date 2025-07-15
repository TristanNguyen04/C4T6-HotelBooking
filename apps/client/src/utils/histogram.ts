// Might not be used as of now

import type { Hotel } from "../types/hotel";

export interface Histogram {
  bins: number[];
  min: number;
  max: number;
  binBoundaries: number[]; 
}

export function getPriceHistogram(hotels: Hotel[], targetBinCount = 12) {
    const prices = hotels.map(h => Number(h.price)).filter(p => !isNaN(p) && p > 0);
    
    if (prices.length === 0) {
        return {
            bins: [],
            min: 0,
            max: 0,
            binBoundaries: []
        };
    }

    // Sort prices for percentile calculation
    const sortedPrices = [...prices].sort((a, b) => a - b);
    const min = sortedPrices[0];
    const max = sortedPrices[sortedPrices.length - 1];
    
    // If all prices are the same, create a single bin
    if (min === max) {
        return {
            bins: [prices.length],
            min,
            max,
            binBoundaries: [min, max]
        };
    }

    // Create adaptive bins based on data distribution
    const binBoundaries = createAdaptiveBins(sortedPrices, targetBinCount);
    const bins = new Array(binBoundaries.length - 1).fill(0);

    // Count hotels in each bin
    prices.forEach(price => {
        // Find the appropriate bin using binary search for efficiency
        const binIndex = findBinIndex(price, binBoundaries);
        if (binIndex >= 0 && binIndex < bins.length) {
            bins[binIndex]++;
        }
    });

    return { 
        bins, 
        min, 
        max, 
        binBoundaries 
    };
}

function createAdaptiveBins(sortedPrices: number[], targetBinCount: number): number[] {
    const boundaries = [sortedPrices[0]];
    
    // Use a hybrid approach: combine percentile-based and logarithmic spacing
    const totalHotels = sortedPrices.length;
    
    if (totalHotels <= targetBinCount) {
        // If we have few hotels, use price-based boundaries
        const uniquePrices = [...new Set(sortedPrices)];
        return [...uniquePrices, uniquePrices[uniquePrices.length - 1] + 1];
    }

    // Calculate optimal bin boundaries for balanced distribution
    for (let i = 1; i < targetBinCount; i++) {
        const percentile = i / targetBinCount;
        
        // Use a smooth curve that gives more bins to lower prices but doesn't ignore higher prices
        // This creates more granularity where there's more data, but ensures all ranges are represented
        const adjustedPercentile = Math.pow(percentile, 0.7); // Slightly favor lower prices
        
        const index = Math.floor(adjustedPercentile * (totalHotels - 1));
        const boundaryPrice = sortedPrices[Math.min(index, totalHotels - 1)];
        
        // Avoid duplicate boundaries
        if (boundaryPrice > boundaries[boundaries.length - 1]) {
            boundaries.push(boundaryPrice);
        }
    }
    
    // Ensure the last boundary covers the maximum price
    const lastPrice = sortedPrices[sortedPrices.length - 1];
    if (boundaries[boundaries.length - 1] < lastPrice) {
        boundaries.push(lastPrice);
    }
    
    // Add a small buffer to the last boundary to ensure max price is included
    boundaries[boundaries.length - 1] = lastPrice + 1;
    
    return boundaries;
}

function findBinIndex(price: number, binBoundaries: number[]): number {
    // Binary search to find the correct bin
    let left = 0;
    let right = binBoundaries.length - 2; // -2 because we're looking for pairs
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (price >= binBoundaries[mid] && price < binBoundaries[mid + 1]) {
            return mid;
        } else if (price < binBoundaries[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    // Handle edge case for maximum price (should go in the last bin)
    if (price >= binBoundaries[binBoundaries.length - 2]) {
        return binBoundaries.length - 2;
    }
    
    return -1; // Should not happen with valid data
}

// Helper function to get display labels for bins
export function getBinLabel(binIndex: number, binBoundaries: number[]): string {
    if (binIndex < 0 || binIndex >= binBoundaries.length - 1) {
        return '';
    }
    
    const start = Math.floor(binBoundaries[binIndex]);
    const end = Math.floor(binBoundaries[binIndex + 1] - 1);
    
    return `$${start} - $${end}`;
}

// Helper function to get bin range for a specific index
export function getBinRange(binIndex: number, binBoundaries: number[]): { start: number; end: number } {
    if (binIndex < 0 || binIndex >= binBoundaries.length - 1) {
        return { start: 0, end: 0 };
    }
    
    return {
        start: binBoundaries[binIndex],
        end: binBoundaries[binIndex + 1]
    };
}