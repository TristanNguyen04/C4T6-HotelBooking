export type Hotel = {
    id: string;
    name: string;
    address: string;
    currency: string;
    latitude: number;
    longitude: number;
    price?: number;
    totalPrice?: number;
    nights?: number;
    distance: number;
    rating: number;
    searchRank: number;
    description: string;
    amenities?: {
        [key: string]: boolean | undefined;
    };
    image_details: {
        suffix: string;
        count: number;
        prefix: string;
    };
    categories: {
        overall?: {
            name: string;
            score: number;
            popularity: number;
        };
    };
    number_of_images?: number;
    trustyou?: {
        id: string;
        score: {
            [key: string]: number;
        };
    };
    rooms?: Room[];
};
export interface RoomImage {
    url: string;
    high_resolution_url: string;
    hero_image: boolean;
}
export interface RoomAdditionalInfo {
    breakfastInfo: string;
    displayFields: {
        special_check_in_instructions?: string;
        check_in_instructions?: string;
        know_before_you_go?: string;
        fees_optional?: string;
        fees_mandatory?: string;
        kaligo_service_fee?: number;
        hotel_fees?: number[];
        surcharges?: Array<{
            type: string;
            amount: number;
        }>;
    };
}
export interface Room {
    key: string;
    roomDescription: string;
    roomNormalizedDescription: string;
    type: string;
    free_cancellation: boolean;
    long_description: string;
    roomAdditionalInfo: RoomAdditionalInfo;
    description: string;
    images: RoomImage[];
    amenities: string[];
    price_type: string;
    max_cash_payment: number;
    coverted_max_cash_payment: number;
    points: number;
    bonuses: number;
    bonus_programs: number[];
    bonus_tiers: number[];
    lowest_price: number;
    price: number;
    converted_price: number;
    lowest_converted_price: number;
    chargeableRate: number;
    market_rates: number[];
    base_rate: number;
    base_rate_in_currency: number;
    included_taxes_and_fees_total: number;
    included_taxes_and_fees_total_in_currency: number;
    excluded_taxes_and_fees_currency: string;
    excluded_taxes_and_fees_total: number;
    excluded_taxes_and_fees_total_in_currency: number;
    included_taxes_and_fees: Array<{
        id: string;
        amount: number;
        currency: string;
    }>;
    included_taxes_and_fees_in_currency: Array<{
        id: string;
        amount: number;
        currency: string;
    }>;
}
export interface RoomType {
    roomNormalizedDescription: string;
    rooms: Room[];
    lowestPrice: number;
    hasFreeCancellation: boolean;
    images: RoomImage[];
    amenities: string[];
    hasBreakfast: boolean;
}
export type SortBy = "price" | "distance" | "rating" | "searchRank";
export type SortOrder = "asc" | "desc";
export type SortOption = "Price (Low to High)" | "Price (High to Low)" | "Distance (Close to Far)" | "Distance (Far to Close)" | "Star Rating (Low to High)" | "Star Rating (High to Low)" | "Guest Rating (Low to High)" | "Guest Rating (High to Low)" | "Relevance (Default)";
export interface HotelSearchParams {
    destination_id: string;
    checkin: string;
    checkout: string;
    guests: string;
}
export interface SearchContext {
    destination_id: string;
    checkin: string;
    checkout: string;
    guests: string;
    rooms: number;
    adults: number;
    children: number;
    term: string;
    childrenAges: number[];
}
export interface FilterBarProps {
    hotels: Hotel[];
    priceMin: number;
    setPriceMin: (val: number) => void;
    priceMax: number;
    setPriceMax: (val: number) => void;
    selectedStarRatings: number[];
    setSelectedStarRatings: (ratings: number[]) => void;
    selectedGuestRatings: string[];
    setSelectedGuestRatings: (ratings: string[]) => void;
    selectedAmenities: string[];
    setSelectedAmenities: (amenities: string[]) => void;
    showTotalPrice: boolean;
}
export interface PriceRangeFilterProps {
    hotels: Hotel[];
    priceMin: number;
    setPriceMin: (val: number) => void;
    priceMax: number;
    setPriceMax: (val: number) => void;
    showTotalPrice: boolean;
}
export interface StarRatingFilterProps {
    hotels: Hotel[];
    selectedStarRatings: number[];
    setSelectedStarRatings: (ratings: number[]) => void;
}
export interface GuestRatingFilterProps {
    hotels: Hotel[];
    selectedGuestRatings: string[];
    setSelectedGuestRatings: (ratings: string[]) => void;
}
export interface AmenityFilterProps {
    hotels: Hotel[];
    selectedAmenities: string[];
    setSelectedAmenities: (amenities: string[]) => void;
}
export declare const INIT_HOTEL: {
    id: string;
    imageCount: number;
    latitude: number;
    longitude: number;
    name: string;
    address: string;
    address1: string;
    rating: number;
    trustyou: {
        id: string;
        score: {
            overall: number;
            kaligo_overall: number;
            solo: number;
            couple: number;
            family: number;
            business: number;
        };
    };
    categories: {
        overall: {
            name: string;
            score: number;
            popularity: number;
        };
        lake_hotel: {
            name: string;
            score: number;
            popularity: number;
        };
        business_hotel: {
            name: string;
            score: number;
            popularity: number;
        };
        city_hotel: {
            name: string;
            score: number;
            popularity: number;
        };
    };
    amenities_ratings: {
        name: string;
        score: number;
    }[];
    description: string;
    amenities: {
        airConditioning: boolean;
        businessCenter: boolean;
        clothingIron: boolean;
        dataPorts: boolean;
        dryCleaning: boolean;
        hairDryer: boolean;
        meetingRooms: boolean;
        outdoorPool: boolean;
        parkingGarage: boolean;
        roomService: boolean;
        safe: boolean;
        tVInRoom: boolean;
        voiceMail: boolean;
    };
    image_details: {
        suffix: string;
        count: number;
        prefix: string;
    };
};
export interface BookingPriceBreakdown {
    base_rate_in_currency: number;
    included_taxes_and_fees_total_in_currency: number;
    excluded_taxes_and_fees_total_in_currency: number;
    total_price: number;
    currency: string;
    nights: number;
}
export interface BookingDetails {
    hotelId: string;
    hotelName: string;
    roomKey: string;
    roomDescription: string;
    roomImage?: string;
    checkin: string;
    checkout: string;
    guests: string;
    adults: number;
    rooms: number;
    children: number;
    childrenAges: number[];
    priceBreakdown: BookingPriceBreakdown;
    specialRequest?: string;
    primaryGuestTitle: string;
    primaryGuestFirstName: string;
    primaryGuestLastName: string;
    primaryGuestPhoneNumber: string;
}
export interface GuestDetails {
    primaryGuestTitle: string;
    primaryGuestFirstName: string;
    primaryGuestLastName: string;
    primaryGuestPhoneNumber: string;
    specialRequest?: string;
}
export interface PaymentItem {
    hotelId: string;
    hotelName: string;
    roomKey: string;
    roomDescription: string;
    roomImage?: string;
    name: string;
    image: string;
    price: number;
    currency: string;
    quantity: number;
    checkin: string;
    checkout: string;
    guests: string;
    adults: number;
    rooms: number;
    children: number;
    childrenAges: number[];
    baseRateInCurrency: number;
    includedTaxesAndFeesInCurrency: number;
    excludedTaxesAndFeesInCurrency: number;
    primaryGuestTitle: string;
    primaryGuestFirstName: string;
    primaryGuestLastName: string;
    primaryGuestPhoneNumber: string;
    specialRequest?: string;
}
export interface BookingHistory {
    id: string;
    hotelId: string;
    hotelName: string;
    roomKey: string;
    roomDescription: string;
    roomImage?: string;
    request?: string;
    guestName: string;
    guestNumber: string;
    checkin: string;
    checkout: string;
    guests: string;
    baseRateInCurrency: number;
    includedTaxesAndFeesInCurrency: number;
    createdAt: string;
    stripeSessionId: string;
}
export interface Destination {
    uid: string;
    term: string;
    lat: number;
    lng: number;
    state?: string;
    type: 'city' | 'hotel' | 'airport';
}
