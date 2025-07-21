export type Hotel = {
    id: string;
    name: string;
    address: string;
    currency: string;
    price?: number;
    longitude: number;
    latitude: number;
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
        }
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

export type SortOption =
  | "Price (Low to High)"
  | "Price (High to Low)"
  | "Distance (Close to Far)"
  | "Distance (Far to Close)"
  | "Star Rating (Low to High)"
  | "Star Rating (High to Low)"
  | "Guest Rating (Low to High)"
  | "Guest Rating (High to Low)"
  | "Relevance (Default)";

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

export const INIT_HOTEL = {
  "id": "diH7",
  "imageCount": 86,
  "latitude": 1.28624,
  "longitude": 103.852889,
  "name": "The Fullerton Hotel Singapore",
  "address": "1 Fullerton Square",
  "address1": "1 Fullerton Square",
  "rating": 5,
  "trustyou": {
    "id": "8e3920e5-46c6-4a1c-b21d-bc67463c2186",
    "score": {
      "overall": 95,
      "kaligo_overall": 4.8,
      "solo": 95,
      "couple": 93,
      "family": 93,
      "business": 92
    }
  },
  "categories": {
    "overall": {
      "name": "Overall",
      "score": 90,
      "popularity": 5
    },
    "lake_hotel": {
      "name": "Lake Hotel",
      "score": 69,
      "popularity": 1.9934110367893
    },
    "business_hotel": {
      "name": "Business Hotel",
      "score": 97,
      "popularity": 2.9867220735786
    },
    "city_hotel": {
      "name": "City Hotel",
      "score": 88,
      "popularity": 3.98003311036789
    }
  },
  "amenities_ratings": [
    {
      "name": "Location",
      "score": 96
    },
    {
      "name": "Wellness",
      "score": 95
    },
    {
      "name": "Service",
      "score": 91
    },
    {
      "name": "WiFi",
      "score": 87
    },
    {
      "name": "Vibe",
      "score": 86
    },
    {
      "name": "Breakfast",
      "score": 84
    },
    {
      "name": "Amenities",
      "score": 81
    },
    {
      "name": "Food",
      "score": 80
    },
    {
      "name": "Room",
      "score": 77
    },
    {
      "name": "Comfort",
      "score": 62
    }
  ],
  "description": "something",
  "amenities": {
    "airConditioning": true,
    "businessCenter": true,
    "clothingIron": true,
    "dataPorts": true,
    "dryCleaning": true,
    "hairDryer": true,
    "meetingRooms": true,
    "outdoorPool": true,
    "parkingGarage": true,
    "roomService": true,
    "safe": true,
    "tVInRoom": true,
    "voiceMail": true
  },
  "image_details": {
    "suffix": ".jpg",
    "count": 86,
    "prefix": "https://d2ey9sqrvkqdfs.cloudfront.net/diH7/"
  }
}