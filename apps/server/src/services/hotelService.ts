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
        console.error('Error fetching hotel room prices:', error);
        throw error;
    }
}

export const searchRoomsByHotel = async (
    hotelId: string,
    checkin: string,
    checkout: string,
    adults: number,
    children: number,
    rooms: number
) => {
    const params = {
        checkin,
        checkout,
        guests: adults + children,
        adults,
        children,
        rooms,
        currency: 'SGD',
        lang: 'en_US',
        partner_id: '1'
    };
    
    try {
        const res = await axios.get(`${BASE_URL}/hotels/${hotelId}/price`, { params });
        return {
            rooms: res.data.rooms || [],
            completed: res.data.completed || false
        };
    } catch (error) {
        console.error('Error searching rooms for hotel:', error);
        throw error;
    }
}


