import type { Hotel } from "../types/hotel";
interface UseHotelFilterProps {
    hotels: Hotel[];
    priceMin: number;
    priceMax: number;
    selectedStarRatings: number[];
    selectedGuestRatings: string[];
    selectedAmenities: string[];
    showTotalPrice?: boolean;
}
declare const getHotelCountForStarRating: (hotels: Hotel[], starRating: number) => number;
declare const getHotelCountForGuestRating: (hotels: Hotel[], ratingRange: string) => number;
declare const getHotelCountForAmenity: (hotels: Hotel[], amenityKey: string) => number;
declare const getAllAmenities: (hotels: Hotel[]) => string[];
export declare function useHotelFilter({ hotels, priceMin, priceMax, selectedStarRatings, selectedGuestRatings, selectedAmenities, showTotalPrice }: UseHotelFilterProps): Hotel[];
export { getHotelCountForStarRating, getHotelCountForGuestRating, getHotelCountForAmenity, getAllAmenities };
