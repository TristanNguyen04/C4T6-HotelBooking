export type Hotel = {
    id: string;
    name: string;
    address: string;
    currency: string;
    price?: number;
    distance: number;
    rating: number;
    searchRank: number;
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
};

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

export interface Histogram {
  bins: number[];
  min: number;
  max: number;
  binBoundaries: number[]; // Add this to track actual bin boundaries
}

export interface FilterBarProps {
  hotels: Hotel[];
  rooms: number;
  histogram: Histogram | null;
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
}

export interface PriceRangeFilterProps {
  rooms: number;
  histogram: Histogram;
  priceMin: number;
  setPriceMin: (val: number) => void;
  priceMax: number;
  setPriceMax: (val: number) => void;
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