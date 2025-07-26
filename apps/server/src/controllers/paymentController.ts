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
                    images: [item.image],
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
                    specialRequest: item.specialRequest || null,
                    primaryGuestTitle: item.primaryGuestTitle,
                    primaryGuestFirstName: item.primaryGuestFirstName,
                    primaryGuestLastName: item.primaryGuestLastName,
                    primaryGuestPhoneNumber: item.primaryGuestPhoneNumber,
                    checkin: item.checkin,
                    checkout: item.checkout,
                    guests: item.guests.toString(),
                    adults: item.adults,
                    rooms: item.rooms,
                    children: item.children,
                    childrenAges: item.childrenAges || [],
                    price: item.price,
                    currency: item.currency,
                    baseRateInCurrency: item.baseRateInCurrency,
                    includedTaxesAndFeesInCurrency: item.includedTaxesAndFeesInCurrency,
                    excludedTaxesAndFeesInCurrency: item.excludedTaxesAndFeesInCurrency,
                })))
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: "Failed to create session" });
    }
};

export const handlePaymentSuccess = async (req: Request, res: Response) => {
    const { sessionId } = req.body;
    
    try {
        // retrieve stripe session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        console.log("Session metadata:", session.metadata);
        
        if (session.payment_status != "paid") {
            return res.status(400).json({ error: "Payment not completed" });
        }

        // retrieve metadata
        const{ userId, bookings: bookingsJSON} = session.metadata || {};
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

        // used for testing only, to create user in the db
        let user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: userId,
                    email: 'fallback_email@example.com',  // replace or get from metadata/auth
                    password: 'hashed_password_here',     // always hash passwords in real apps
                    name: 'New User',
                },
            });
        }

        // create booking using metadata passed with all new fields
        const bookingsMade = JSON.parse(bookingsJSON);
        const createdBookings = [];
        
        for (const booking of bookingsMade) {
            const createdBooking = await prisma.booking.create({
                data: {
                    userId,
                    hotelId: booking.hotelId,
                    hotelName: booking.hotelName,
                    roomKey: booking.roomKey,
                    roomDescription: booking.roomDescription,
                    roomImage: booking.roomImage,
                    specialRequest: booking.specialRequest,
                    primaryGuestTitle: booking.primaryGuestTitle,
                    primaryGuestFirstName: booking.primaryGuestFirstName,
                    primaryGuestLastName: booking.primaryGuestLastName,
                    primaryGuestPhoneNumber: booking.primaryGuestPhoneNumber,
                    checkin: new Date(booking.checkin),
                    checkout: new Date(booking.checkout),
                    guests: booking.guests.toString(),
                    adults: parseInt(booking.adults),
                    rooms: parseInt(booking.rooms),
                    children: parseInt(booking.children),
                    childrenAges: booking.childrenAges || [],
                    price: parseFloat(booking.price),
                    currency: booking.currency,
                    baseRateInCurrency: parseFloat(booking.baseRateInCurrency),
                    includedTaxesAndFeesInCurrency: parseFloat(booking.includedTaxesAndFeesInCurrency),
                    excludedTaxesAndFeesInCurrency: parseFloat(booking.excludedTaxesAndFeesInCurrency),
                    stripeSessionId: sessionId,
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