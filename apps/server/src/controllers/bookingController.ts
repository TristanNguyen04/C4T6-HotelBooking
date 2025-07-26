import { PrismaClient } from '@prisma/client';
import { AuthRequest, } from '../middleware/auth';
import { Response } from 'express';

const prisma = new PrismaClient();

export const createBooking = async (req: AuthRequest, res: Response) => {
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // const { hotelId, hotelName, checkin, checkout, guests, price, currency , sessionId} = req.body;

    const {
        hotelId,
        hotelName,
        roomKey,
        roomDescription,
        roomImage,
        specialRequest,
        primaryGuestTitle,
        primaryGuestFirstName,
        primaryGuestLastName,
        primaryGuestPhoneNumber,
        checkin,
        checkout,
        guests,
        adults,
        rooms,
        children,
        childrenAges,
        price,
        currency,
        baseRateInCurrency,
        includedTaxesAndFeesInCurrency,
        excludedTaxesAndFeesInCurrency,
        sessionId,
    } = req.body;

    try {
        const booking = await prisma.booking.create({
            data: {
                userId: req.userId,
                hotelId,
                hotelName,
                roomKey,
                roomDescription,
                roomImage: roomImage || '',
                specialRequest: specialRequest || '',
                primaryGuestTitle,
                primaryGuestFirstName,
                primaryGuestLastName,
                primaryGuestPhoneNumber,
                checkin: new Date(checkin),
                checkout: new Date(checkout),
                guests,
                adults: parseInt(adults),
                rooms: parseInt(rooms),
                children: parseInt(children),
                childrenAges: childrenAges || [],
                price: parseFloat(price),
                currency,
                baseRateInCurrency: parseFloat(baseRateInCurrency),
                includedTaxesAndFeesInCurrency: parseFloat(includedTaxesAndFeesInCurrency),
                excludedTaxesAndFeesInCurrency: parseFloat(excludedTaxesAndFeesInCurrency),
                stripeSessionId: sessionId,
            }
        });

        res.json(booking);
        
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
}

export const getMyBookings = async(req: AuthRequest, res: Response) => {
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const bookings = await prisma.booking.findMany({
        where: {
            userId: req.userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.json(bookings);
}