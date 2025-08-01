"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentSuccess = exports.createCheckoutSession = void 0;
const stripeClient_1 = __importDefault(require("../utils/stripeClient"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // dynamically adding from post request from confirmation page to the checkout page
        const { items, userId } = req.body;
        if (!userId || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Missing Booking / Userid" });
        }
        const line_items = items.map((item) => ({
            price_data: {
                currency: item.currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity
        }));
        const session = yield stripeClient_1.default.checkout.sessions.create({
            success_url: 'http://localhost:5173/paymentSuccess?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:5173/payment',
            mode: "payment",
            line_items,
            metadata: {
                userId,
                bookings: JSON.stringify(items.map((item) => ({
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
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create session" });
    }
});
exports.createCheckoutSession = createCheckoutSession;
const handlePaymentSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sessionId } = req.body;
    try {
        // retrieve stripe session
        const session = yield stripeClient_1.default.checkout.sessions.retrieve(sessionId);
        if (session.payment_status != "paid") {
            return res.status(400).json({ error: "Payment not completed" });
        }
        // retrieve metadata
        const { userId, bookings: bookingsJSON } = session.metadata || {};
        console.log(userId);
        console.log(bookingsJSON);
        if (!userId || !bookingsJSON) {
            return res.status(400).json({ error: "Missing booking information in session metadata" });
        }
        // Check if bookings with this sessionId already exist for the user
        const existingBooking = yield prismaClient_1.default.booking.findFirst({
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
            const createdBooking = yield prismaClient_1.default.booking.create({
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
    }
    catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ error: "Failed to verify payment" });
    }
});
exports.handlePaymentSuccess = handlePaymentSuccess;
