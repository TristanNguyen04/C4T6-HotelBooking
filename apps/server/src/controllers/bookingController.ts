import { PrismaClient } from '@prisma/client';
import { AuthRequest, } from '../middleware/auth';
import { Response } from 'express';
import { createBookingRecord } from '../services/bookingService';
import prisma from '../utils/prismaClient';

export const createBooking = async (req: AuthRequest, res: Response) => {
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { hotelId, hotelName, checkin, checkout, guests, price, currency , sessionId} = req.body;

    const booking = await createBookingRecord({
        userId: req.userId,
        hotelId,
        hotelName,
        checkin,
        checkout,
        guests,
        price,
        currency,
        sessionId
    });

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