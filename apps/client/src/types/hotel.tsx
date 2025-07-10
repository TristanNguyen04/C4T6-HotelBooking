export type Hotel = {
    id: string;
    name: string;
    address: string;
    currency: string;
    price?: number;
    distance: number;
    rating: number;
    searchRank: number;
};

export type SortBy = "price" | "distance" | "rating" | "searchRank";

export type SortOrder = "asc" | "desc";

export interface HotelSearchParams {
  destination_id: string;
  checkin: string;
  checkout: string;
  guests: string;
}