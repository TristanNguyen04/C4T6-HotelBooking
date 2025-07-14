import { useMemo } from "react";
import type { Hotel } from "../types/hotel";

interface UseHotelFilterProps {
  hotels: Hotel[];
  priceMin: number;
  priceMax: number;
  selectedStarRatings: number[];
}

export function useHotelFilter({ hotels, priceMin, priceMax, selectedStarRatings }: UseHotelFilterProps) {
  return useMemo(() => {
    return (hotels ?? []).filter((hotel) => {
      const price = hotel.price ?? Infinity;
      const rating = hotel.rating ?? 0;

      const withinMin = priceMin === 0 || price >= priceMin;
      const withinMax = priceMax === Infinity || price <= priceMax;
      
      // If no star ratings are selected, show all hotels
      // Otherwise, only show hotels that match one of the selected star ratings
      const meetsStars = selectedStarRatings.length === 0 || 
                        selectedStarRatings.some(starRating => {
                          // Check if hotel rating falls within the star rating range
                          // For example, a 4.3 rated hotel should appear when 4-star is selected
                          return rating >= starRating && rating < starRating + 1;
                        });

      return withinMin && withinMax && meetsStars;
    });
  }, [hotels, priceMin, priceMax, selectedStarRatings]);
}