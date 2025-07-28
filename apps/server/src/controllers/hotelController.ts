import { Request, Response } from 'express';
import { fetchHotels, fetchHotelPrices, fetchHotelDetails, fetchHotelRoomPrices } from '../services/hotelService';
import axios from 'axios';

export const calculateNights = (checkin: string, checkout: string) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    if(checkinDate > checkoutDate){
        throw new Error('Checkin date is before Checkout date');
    }
    return Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));
}

export const searchHotels = async (req: Request, res: Response) => {
    try {
        const { destination_id, checkin, checkout, guests, currency='SGD', lang='en_US'} = req.query;

        if(!destination_id || !checkin || !checkout || !guests){
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        try{
            const nights = calculateNights(checkin as string, checkout as string);
            const baseParams = {
                destination_id,
                checkin,
                checkout,
                guests,
                currency,
                lang,
                landing_page: 'wl-acme-earn',
                product_type: 'earn',
                partner_id: '1089'
            };
    
            const [hotels, prices] = await Promise.all([
                fetchHotels(baseParams),
                fetchHotelPrices(baseParams),
            ]);
    
            const hotelsWithPrices = hotels.reduce((acc: any[], hotel: any) => {
                const priceInfo = prices.hotels.find((price: any) => price.id == hotel.id);
                if(priceInfo){
                    const totalPrice = priceInfo?.price || 0;
                    const pricePerNight = nights > 0 ? Math.round((totalPrice / nights) * 100) / 100 : totalPrice;
                    
                    acc.push({
                        ...hotel,
                        price: pricePerNight, // Price per night
                        totalPrice: totalPrice, // Total price for the stay
                        nights: nights,
                        currency: prices.currency || null,
                    });
                }
                return acc;
            }, []);
    
            res.json({
                data: hotelsWithPrices,
                completed: prices.completed
            });
        }
        catch(e: any){
            return res.status(500).json({error: 'Checkin date is before Checkout date'})
        }

    } catch (error){
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

        const nights = calculateNights(checkin as string, checkout as string);

        const queryParams = {
            destination_id,
            checkin,
            checkout,
            guests,
            currency,
            lang,
            landing_page: 'wl-acme-earn',
            product_type: 'earn',
            partner_id: '1089'
        };

        const [hotelInfo, roomPricing] = await Promise.all([
            fetchHotelDetails(id),
            fetchHotelRoomPrices(id, queryParams),
        ]);

        // Process room pricing to convert total prices to per-night prices
        const processedRooms = roomPricing.rooms?.map((room: any) => {
            const totalPrice = room.price || 0;
            const pricePerNight = nights > 0 ? Math.round((totalPrice / nights) * 100) / 100 : totalPrice;
            
            return {
                ...room,
                converted_price: pricePerNight, // Per-night price
                lowest_converted_price: totalPrice, // Total price for the stay
                nights: nights
            };
        }) || [];

        return res.json({
            ...hotelInfo,
            rooms: processedRooms,
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


export const searchHotelUsingDest = async (req: Request, res: Response) => {
try {
    const { destination_id} = req.query;

    if (!destination_id) {
      return res.status(400).json({ error: 'Missing destination_id parameter' });
    }

    const baseParams = {
        destination_id,
        checkin: '2025-07-20', // dummy values
        checkout: '2025-07-22',
        guests: '1',
        currency: 'SGD',
        lang: 'en_US',
        landing_page: 'wl-acme-earn',
        product_type: 'earn',
        partner_id: '1089'
    };

    const hotels = await fetchHotels(baseParams);
    return res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels by destination:', error);
    return res.status(500).json({ error: 'Error fetching hotels' });
  }
};