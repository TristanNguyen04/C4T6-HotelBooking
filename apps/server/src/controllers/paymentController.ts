import { Router,Request,Response } from "express";
import stripe from "../utils/stripeClient";
import { PrismaClient } from '@prisma/client';
import { createBookingRecord } from '../services/bookingService';
import prisma from '../utils/prismaClient';

export const createCheckoutSession = async(req:Request, res:Response) => {
    try {
        // dynamically adding from post request from confirmation page to the checkout page
        const {items, userId} = req.body;
        if(!userId || !Array.isArray(items) || items.length === 0){
            return res.status(400).json({error: "Missing Booking / Userid"});
        }

        const line_items = items.map((item:any) => ({
            price_data: {
                currency: item.currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:5173/paymentSuccess?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:5173/payment',
            mode: "payment",
            line_items,
            metadata: {
                userId,
                bookings: JSON.stringify(items.map((item: any) => ({
                    hotelId: item.hotelId,
                    hotelName: item.hotelName,
                    roomKey: item.roomKey,
                    roomDescription: item.roomDescription,
                    roomImage: item.roomImage || null,
                    request: item.specialRequest || null,
                    guestName: item.primaryGuestFirstName + " " + item.primaryGuestLastName,
                    guestNumber: item.primaryGuestPhoneNumber,
                    checkin: item.checkin,
                    checkout: item.checkout,
                    guests: item.guests.toString(),
                    baseRateInCurrency: item.baseRateInCurrency,
                    includedTaxesAndFeesInCurrency: item.includedTaxesAndFeesInCurrency,
                })))
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: "Failed to create session" });
    }
};

export const handlePaymentSuccess = async (req: Request, res: Response) => {
    const { sessionId } = req.body;
    
    try {
        // retrieve stripe session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (session.payment_status != "paid") {
            return res.status(400).json({ error: "Payment not completed" });
        }

        // retrieve metadata
        const{ userId, bookings: bookingsJSON} = session.metadata || {};
        console.log(userId);
        console.log(bookingsJSON);
        if (!userId || !bookingsJSON) {
            return res.status(400).json({ error: "Missing booking information in session metadata" });
        }

        // Check if bookings with this sessionId already exist for the user
        const existingBooking = await prisma.booking.findFirst({
            where: {
                userId,
                stripeSessionId: sessionId
            }
        });

        if (existingBooking) {
            return res.status(200).json({ message: "Bookings for this session already exist, skipping creation." });
        }

        // create booking using metadata passed with all new fields
        const bookingsMade = JSON.parse(bookingsJSON);
        const createdBookings = [];
        
        for (const booking of bookingsMade) {
            const createdBooking = await prisma.booking.create({
                data: {
                    hotelId: booking.hotelId,
                    hotelName: booking.hotelName,
                    roomKey: booking.roomKey,
                    roomDescription: booking.roomDescription,
                    roomImage: booking.roomImage,
                    request: booking.specialRequest,
                    guestName: booking.guestName,
                    guestNumber: booking.guestNumber,
                    checkin: new Date(booking.checkin),
                    checkout: new Date(booking.checkout),
                    guests: booking.guests.toString(),
                    baseRateInCurrency: parseFloat(booking.baseRateInCurrency),
                    includedTaxesAndFeesInCurrency: parseFloat(booking.includedTaxesAndFeesInCurrency),
                    stripeSessionId: sessionId,
                    User: {
                        connect: { id: userId }
                    }
                },
            });
            createdBookings.push(createdBooking);
        }
        
        res.status(201).json({ 
            message: "Booking created successfully", 
            bookings: createdBookings 
        });

    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ error: "Failed to verify payment" });
    }
};

export const mockPaymentSuccess = async (req: Request, res: Response) => {
    if(process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'jest'){
        return res.status(400).json({error:'Only used in test environment'})
    }
    const { sessionId, userId, bookings } = req.body;

    if (!sessionId || !userId || !bookings) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    // Idempotency check
    const existingBooking = await prisma.booking.findFirst({
        where: { userId, stripeSessionId: sessionId }
    });

    if (existingBooking) {
        return res.status(200).json({ message: "Booking already exists" });
    }

    const createdBookings = [];
    for (const booking of bookings) {
        const createdBooking = await prisma.booking.create({
        data: {
            hotelId: booking.hotelId,
            hotelName: booking.hotelName,
            roomKey: booking.roomKey,
            roomDescription: booking.roomDescription,
            roomImage: booking.roomImage,
            request: booking.request,
            guestName: booking.guestName,
            guestNumber: booking.guestNumber,
            checkin: new Date(booking.checkin),
            checkout: new Date(booking.checkout),
            guests: booking.guests.toString(),
            baseRateInCurrency: parseFloat(booking.baseRateInCurrency),
            includedTaxesAndFeesInCurrency: parseFloat(booking.includedTaxesAndFeesInCurrency),
            stripeSessionId: sessionId,
            User: {
            connect: { id: userId }
            }
        }
        });
        createdBookings.push(createdBooking);
    }

    res.status(201).json({ message: "Mock booking created", bookings: createdBookings });
};
