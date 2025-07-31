import { PrismaClient } from '@prisma/client';
import { AuthRequest, } from '../middleware/auth';
import { Response } from 'express';

const prisma = new PrismaClient();

export const createBooking = async (req: AuthRequest, res: Response) => {
    if(!req.userId){
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
        hotelId,
        hotelName,
        roomKey,
        roomDescription,
        roomImage,
        specialRequest,
        primaryGuestFullName,
        primaryGuestPhoneNumber,
        checkin,
        checkout,
        guests,
        baseRateInCurrency,
        includedTaxesAndFeesInCurrency,
        sessionId,
    } = req.body;

    try {
        const booking = await prisma.booking.create({
            data: {
                hotelId,
                hotelName,
                roomKey,
                roomDescription,
                roomImage: roomImage || '',
                request: specialRequest || '',
                guestName: primaryGuestFullName || '',
                guestNumber: primaryGuestPhoneNumber || '',
                checkin: new Date(checkin),
                checkout: new Date(checkout),
                guests,
                baseRateInCurrency: parseFloat(baseRateInCurrency),
                includedTaxesAndFeesInCurrency: parseFloat(includedTaxesAndFeesInCurrency),
                stripeSessionId: sessionId,
                User: {
                    connect: { id: req.userId }
                }
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