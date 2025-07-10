import { Router,Request,Response } from "express";
import stripe from "../utils/stripeClient";
import { PrismaClient } from '@prisma/client';
import { createBookingRecord } from '../services/bookingService';

const prisma = new PrismaClient();

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
        success_url: 'http://localhost:5173/paymentSuccess?session_id={CHECKOUT_SESSION_ID}', // this should be routed to a confirmation page/ homepage
        cancel_url: 'http://localhost:5173/payment', // routed to homepage or the page before or something
        mode: "payment",
        line_items,
        metadata: {
            userId,
            bookings: JSON.stringify(items.map((item: { hotelId: any; hotelName: any; checkin: any; checkout: any; guests: { toString: () => any; }; price: any; currency: any; }) => ({
                hotelId: item.hotelId,
                hotelName: item.hotelName,
                checkin: item.checkin,
                checkout: item.checkout,
                guests: item.guests.toString(),
                price: item.price,
                currency: item.currency,
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
    // retrieve session id
    const { sessionId } = req.body;
    
    try {
        // retrieve stripe 
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
        // create booking using metadata passed
        const bookingsMade = JSON.parse(bookingsJSON);
        const createdBookings = [];
        for (const booking of bookingsMade) {
            await prisma.booking.create({
                data: {
                userId,
                hotelId: booking.hotelId,
                hotelName: booking.hotelName,
                checkin: new Date(booking.checkin),
                checkout: new Date(booking.checkout),
                guests: booking.guests.toString(),
                price: booking.price,
                currency: booking.currency,
                stripeSessionId: sessionId, // used to check for duplicated entries using session id
                },
            });
        }
        res.status(201).json({ message: "Booking created successfully" }); // signal success

  } catch (error) {
    res.status(500).json({ error: "Failed to verify payment" });
  }
};