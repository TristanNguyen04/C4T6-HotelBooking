import axios from 'axios';

const BASE_URL = 'https://hotelapi.loyalty.dev/api';

export const fetchHotels = async (params: Record<string, any>) =>{
    const res = await axios.get(`${BASE_URL}/hotels`, { params });
    return res.data;
}

export const fetchHotelPrices = async (params: Record<string, any>) => {
    const res = await axios.get(`${BASE_URL}/hotels/prices`, { params });
    return res.data;
}

export const fetchHotelDetails = async (id: string) => {
    const res = await axios.get(`${BASE_URL}/hotels/${id}`);
    return res.data;
}

export const fetchHotelRoomPrices = async (id: string, params: Record<string, any>) => {
    try {
        const res = await axios.get(`${BASE_URL}/hotels/${id}/price`, { params });
        return res.data;
    } catch (error) {
        // console.error('Error fetching hotel room prices:', error);
        throw error;
    }
}


