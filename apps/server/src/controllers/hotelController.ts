import { Request, Response } from 'express';
import { fetchHotels, fetchHotelPrices, fetchHotelDetails, fetchHotelRoomPrices } from '../services/hotelService';
import axios from 'axios';

export const searchHotels = async (req: Request, res: Response) => {
    try {
        const { destination_id, checkin, checkout, guests, currency='SGD', lang='en_US'} = req.query;

        if(!destination_id || !checkin || !checkout || !guests){
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const baseParams = {
            destination_id,
            checkin,
            checkout,
            guests,
            currency,
            lang,
            partner_id: '1',
        };

        const [hotels, prices] = await Promise.all([
            fetchHotels(baseParams),
            fetchHotelPrices(baseParams),
        ]);

        const hotelsWithPrices = hotels.reduce((acc: any[], hotel: any) => {
            const priceInfo = prices.hotels.find((price: any) => price.id == hotel.id);
            if(priceInfo){
                acc.push({
                    ...hotel,
                    price: priceInfo?.price || null,
                    currency: prices.currency || null,
                });
            }
            return acc;
        }, []);

        res.json({
            data: hotelsWithPrices,
            completed: prices.completed
        });
    } catch (error){
        console.error('Error searching hotels:', error);
        res.status(500).json( {error: 'Error fetching hotel data' });
    }
}

export const getHotelDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { destination_id, checkin, checkout, guests, currency='SGD', lang='en_US'} = req.query;

        if(!checkin || !checkout || !guests){
            return res.status(400).json({ error: 'Missing required paramaters' });
        }

        const queryParams = {
            destination_id,
            checkin,
            checkout,
            guests,
            currency,
            lang,
            partner_id: '1'
        };

        const [hotelInfo, roomPricing] = await Promise.all([
            fetchHotelDetails(id),
            fetchHotelRoomPrices(id, queryParams),
        ]);

        return res.json({
            ...hotelInfo,
            rooms: roomPricing.rooms || [],
            completed: roomPricing.completed
        });
    } catch (error : any){
        if(axios.isAxiosError(error) && error.response?.status === 422) {
            return res.status(422).json({
              error: 'This hotel does not support price lookup for the given dates or guest configuration.'
            });
          }
        console.error('Error fetching hotel details:', error);
        res.status(500).json({ error: 'Error fetching hotel data' });
    }
}