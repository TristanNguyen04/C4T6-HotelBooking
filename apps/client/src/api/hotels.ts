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

