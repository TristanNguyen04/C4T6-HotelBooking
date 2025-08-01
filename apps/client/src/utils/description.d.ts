export interface HotelDescription {
    amenities: string;
    dining: string;
    businessAmenities: {
        closedFacilities: {
            context: string;
            facilities: string[];
        }[];
        other: string;
    };
    rooms: string;
    attractions: string[];
    nearestAirports: string[];
    preferredAirport: string;
    location: string;
    headline: string;
}
export declare function parseHotelDescription(text: string): HotelDescription;
