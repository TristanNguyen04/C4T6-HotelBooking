import { PrismaClient } from '@prisma/client';
import { AuthRequest, } from '../middleware/auth';
import { Response } from 'express';

const prisma = new PrismaClient();

export const createBooking = async (req: AuthRequest, res: Response) => {
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { hotelId, hotelName, checkin, checkout, guests, price, currency , sessionId} = req.body;

    const booking = await prisma.booking.create({
        data: {
            userId: req.userId,
            hotelId,
            hotelName,
            checkin: new Date(checkin),
            checkout: new Date(checkout),
            guests,
            price,
            currency,
            stripeSessionId: sessionId // added to check for dup bookings during checkout
        }
    })

    res.json(booking);
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