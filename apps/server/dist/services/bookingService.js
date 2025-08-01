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
exports.retrieveBookingRecord = exports.createBookingRecord = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const createBookingRecord = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    return prismaClient_1.default.booking.create({
        data: {
            userId: booking.userId,
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
            guests: booking.guests,
            baseRateInCurrency: booking.baseRateInCurrency,
            includedTaxesAndFeesInCurrency: booking.includedTaxesAndFeesInCurrency,
            stripeSessionId: booking.sessionId,
        }
    });
});
exports.createBookingRecord = createBookingRecord;
const retrieveBookingRecord = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return prismaClient_1.default.booking.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });
});
exports.retrieveBookingRecord = retrieveBookingRecord;
