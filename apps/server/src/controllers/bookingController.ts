import { PrismaClient } from '@prisma/client';
import { AuthRequest, } from '../middleware/auth';
import { Response } from 'express';
import { createBookingRecord, retrieveBookingRecord } from '../services/bookingService';

const prisma = new PrismaClient();

export const createBooking = async (req: AuthRequest, res: Response) => {
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const booking = await createBookingRecord({
        ...req.body,
        userId: req.userId,
    })
    res.json(booking);
}

export const getMyBookings = async(req: AuthRequest, res: Response) => {
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const bookings = await retrieveBookingRecord(req.userId);

    res.json(bookings);
}