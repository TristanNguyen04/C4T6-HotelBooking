import type { HotelSearchParams } from '../types/hotel';
export declare const searchLocations: (query: string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const searchHotels: (params: HotelSearchParams) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const searchHotelDetails: (id: string, params: HotelSearchParams) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const searchDestinationNearby: (params: {
    lat: string;
    lng: string;
    radius: string;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const searchHotelwithDest: (params: HotelSearchParams) => Promise<import("axios").AxiosResponse<any, any>>;
