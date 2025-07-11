import { useMemo } from "react";
import type { Hotel } from "../types/hotel";

interface UseHotelFilterProps {
  hotels: Hotel[];
  priceMin: number;
  priceMax: number;
  minStars: number | '';
}

export function useHotelFilter({ hotels, priceMin, priceMax, minStars }: UseHotelFilterProps) {
  return useMemo(() => {
    return (hotels ?? []).filter((hotel) => {
      const price = hotel.price ?? Infinity;
      const rating = hotel.rating ?? 0;

      const withinMin = priceMin === 0 || price >= priceMin;
      const withinMax = priceMax === Infinity || price <= priceMax;
      const meetsStars = minStars === '' || rating >= minStars;

      return withinMin && withinMax && meetsStars;
    });
  }, [hotels, priceMin, priceMax, minStars]);
}