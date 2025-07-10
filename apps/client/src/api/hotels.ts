import API from './axios';

export const searchLocations = (query: string) => API.get(`/destinations`, {params: {query}});

export const searchHotels = (params: {
    destination_id: string,
    checkin: string;
    checkout: string;
    guests: string;
}) => API.get('/hotels/search', { params });

