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
exports.getMyBookings = exports.createBooking = void 0;
const bookingService_1 = require("../services/bookingService");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { hotelId, hotelName, roomKey, roomDescription, roomImage, specialRequest, primaryGuestFullName, primaryGuestPhoneNumber, checkin, checkout, guests, baseRateInCurrency, includedTaxesAndFeesInCurrency, sessionId, } = req.body;
    try {
        const booking = yield prismaClient_1.default.booking.create({
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
    }
    catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});
exports.createBooking = createBooking;
const getMyBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const bookings = yield (0, bookingService_1.retrieveBookingRecord)(req.userId);
    res.json(bookings);
});
exports.getMyBookings = getMyBookings;
