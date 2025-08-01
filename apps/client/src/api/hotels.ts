import API from './axios';
import type { HotelSearchParams } from '../types/hotel';

export const searchLocations = (query: string) => API.get(`/destinations`, {params: {query}});

export const searchHotels = (params: 
    HotelSearchParams
) => API.get('/hotels/search', { params });

export const searchHotelDetails = (
    id: string,
    params: HotelSearchParams
) => API.get(`/hotels/${id}/details`, { params });

export const searchDestinationNearby = (
    params: {
        lat: string,
        lng: string,
        radius: string,
    }
) => API.get(`/destinations/nearby`, {params});

export const searchHotelwithDest = (params:
    HotelSearchParams
) => API.get(`/destinations/hotel`,{params});

