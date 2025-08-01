import { useMemo } from 'react';
export function useHotelSort(hotels, sortOption) {
    return useMemo(() => {
        const getValue = (hotel) => {
            switch (sortOption) {
                case "Price (Low to High)":
                case "Price (High to Low)":
                    return hotel.price ?? Infinity;
                case "Distance (Close to Far)":
                case "Distance (Far to Close)":
                    return hotel.distance ?? Infinity;
                case "Star Rating (Low to High)":
                case "Star Rating (High to Low)":
                    return hotel.rating ?? 0;
                case "Guest Rating (Low to High)":
                case "Guest Rating (High to Low)":
                    return hotel.categories.overall?.score ?? 0;
                case "Relevance (Default)":
                default:
                    return hotel.searchRank ?? Infinity;
            }
        };
        const isAscending = sortOption === "Price (Low to High)" ||
            sortOption === "Distance (Close to Far)" ||
            sortOption === "Star Rating (Low to High)" ||
            sortOption === "Guest Rating (Low to High)";
        // const isDescending =
        //   sortOption === "Price (High to Low)" ||
        //   sortOption === "Distance (Far to Close)" ||
        //   sortOption === "Star Rating (High to Low)" ||
        //   sortOption === "Guest Rating (High to Low)" ||
        //   sortOption === "Relevance (Default)";
        return [...hotels].sort((a, b) => {
            const aVal = getValue(a);
            const bVal = getValue(b);
            return isAscending ? aVal - bVal : bVal - aVal;
        });
    }, [hotels, sortOption]);
}
