import { useMemo } from "react";
const getGuestRatingRange = (score) => {
    if (score >= 90)
        return 'Outstanding';
    if (score >= 80)
        return 'Excellent';
    if (score >= 70)
        return 'Very Good';
    if (score >= 60)
        return 'Good';
    return null; // will not show ratings below 60
};
const getHotelCountForStarRating = (hotels, starRating) => {
    return hotels.filter(hotel => {
        const rating = hotel.rating ?? 0;
        return rating >= starRating && rating < starRating + 1;
    }).length;
};
const getHotelCountForGuestRating = (hotels, ratingRange) => {
    return hotels.filter(hotel => {
        const guestScore = hotel.categories?.overall?.score;
        if (!guestScore)
            return false;
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
const getHotelCountForAmenity = (hotels, amenityKey) => {
    return hotels.filter(hotel => {
        return hotel.amenities?.[amenityKey] === true;
    }).length;
};
const getAllAmenities = (hotels) => {
    const amenitySet = new Set();
    hotels.forEach(hotel => {
        Object.keys(hotel.amenities ?? {})
            .filter(key => key.trim() !== '')
            .forEach(key => amenitySet.add(key));
    });
    return Array.from(amenitySet).sort();
};
export function useHotelFilter({ hotels, priceMin, priceMax, selectedStarRatings, selectedGuestRatings, selectedAmenities, showTotalPrice = false }) {
    return useMemo(() => {
        return (hotels ?? []).filter((hotel) => {
            // Get the appropriate price based on the toggle
            const price = showTotalPrice ? (hotel.totalPrice || hotel.price || Infinity) : (hotel.price ?? Infinity);
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
    }, [hotels, priceMin, priceMax, selectedStarRatings, selectedGuestRatings, selectedAmenities, showTotalPrice]);
}
export { getHotelCountForStarRating, getHotelCountForGuestRating, getHotelCountForAmenity, getAllAmenities };
