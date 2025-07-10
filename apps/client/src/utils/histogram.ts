import type { Hotel } from "../types/hotel";

export function getPriceHistogram(hotels: Hotel[], binCount = 100){
    const prices = hotels.map(h => Number(h.price)).filter(p => !isNaN(p));
    if(prices.length === 0){
        return {
            bins: [],
            min: 0,
            max: 0
        }
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const step = (max - min) / binCount || 1;

    const bins = Array(binCount).fill(0);

    prices.forEach(p => {
        let index = Math.floor((p - min) / step);
        if(index >= binCount){
            index = binCount - 1;
        }

        bins[index]++;
    });

    return { bins, min, max };
}