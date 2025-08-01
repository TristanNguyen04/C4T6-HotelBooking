import API from './axios';
export const searchLocations = (query) => API.get(`/destinations`, { params: { query } });
export const searchHotels = (params) => API.get('/hotels/search', { params });
export const searchHotelDetails = (id, params) => API.get(`/hotels/${id}/details`, { params });
export const searchDestinationNearby = (params) => API.get(`/destinations/nearby`, { params });
export const searchHotelwithDest = (params) => API.get(`/destinations/hotel`, { params });
