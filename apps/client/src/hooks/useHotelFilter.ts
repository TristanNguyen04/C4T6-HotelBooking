import { useMemo } from "react";
import type { Hotel } from "../types/hotel";

interface UseHotelFilterProps {
  hotels: Hotel[];
  priceMin: number;
  priceMax: number;
  selectedStarRatings: number[];
  selectedGuestRatings: string[];
  selectedAmenities: string[];
}

const getGuestRatingRange = (score: number): string | null => {
  if (score >= 90) return 'Outstanding';
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Very Good';
  if (score >= 60) return 'Good';
  return null; // will not show ratings below 60
};

const getHotelCountForStarRating = (hotels: Hotel[], starRating: number): number => {
  return hotels.filter(hotel => {
      const rating = hotel.rating ?? 0;
      return rating >= starRating && rating < starRating + 1;
  }).length;
};

const getHotelCountForGuestRating = (hotels: Hotel[], ratingRange: string): number => {
  return hotels.filter(hotel => {
      const guestScore = hotel.categories?.overall?.score;
      if (!guestScore) return false;

      switch (ratingRange) {
          case 'Outstanding':
              return guestScore >= 90;
          case 'Excellent':
              return guestScore >= 80 && guestScore < 90;
          case 'Very Good':
              return guestScore >= 70 && guestScore < 80;
          case 'Good':
              return guestScore >= 60 && guestScore < 70;
          default:
              return false;
      }
  }).length;
};

const getHotelCountForAmenity = (hotels: Hotel[], amenityKey: string): number => {
  return hotels.filter(hotel => {
    return hotel.amenities?.[amenityKey] === true;
  }).length;
};

const getAllAmenities = (hotels: Hotel[]): string[] => {
  const amenitySet = new Set<string>();
  hotels.forEach(hotel => {
    Object.keys(hotel.amenities ?? {}).forEach(key => amenitySet.add(key));
  });
  return Array.from(amenitySet).sort();
};

export function useHotelFilter({ hotels, priceMin, priceMax, selectedStarRatings, selectedGuestRatings, selectedAmenities }: UseHotelFilterProps) {
  return useMemo(() => {
    return (hotels ?? []).filter((hotel) => {
      const price = hotel.price ?? Infinity;
      const rating = hotel.rating ?? 0;
      const guestScore = hotel.categories?.overall?.score;

      const withinMin = priceMin === 0 || price >= priceMin;
      const withinMax = priceMax === Infinity || price <= priceMax;
      
      const meetsStars = selectedStarRatings.length === 0 || 
                        selectedStarRatings.some(starRating => {
                          return rating >= starRating && rating < starRating + 1;
                        });

      const meetsGuestRating = selectedGuestRatings.length === 0 || 
                              (guestScore && selectedGuestRatings.includes(getGuestRatingRange(guestScore) || ''));

      const meetsAmenity = selectedAmenities.length === 0 || 
                          selectedAmenities.some(amenityKey => {
                            return hotel.amenities?.[amenityKey] === true;
                          });

      return withinMin && withinMax && meetsStars && meetsGuestRating && meetsAmenity;
    });
  }, [hotels, priceMin, priceMax, selectedStarRatings, selectedGuestRatings, selectedAmenities]);
}


export { getHotelCountForStarRating, getHotelCountForGuestRating, getHotelCountForAmenity, getAllAmenities };