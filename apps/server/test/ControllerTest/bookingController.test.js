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
const index_1 = __importDefault(require("../../src/index"));
const supertest_1 = __importDefault(require("supertest"));
const setup_1 = require("../helper/setup");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../../src/utils/prismaClient"));
const bookingParam = {
    hotelId: "h123",
    hotelName: "Grand Hotel",
    roomKey: "R1",
    roomDescription: "Sea View",
    roomImage: "https://example.com/image.jpg",
    specialRequest: "Late check-in",
    primaryGuestFullName: "John Doe",
    primaryGuestPhoneNumber: "12345678",
    checkin: new Date().toISOString(),
    checkout: new Date(Date.now() + 86400000).toISOString(),
    guests: "2",
    baseRateInCurrency: 100,
    includedTaxesAndFeesInCurrency: 120,
    sessionId: "1234",
};
describe("Test Booking API: /api/bookings", () => {
    let userId;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, setup_1.setupTest)();
        userId = user.userId;
        token = user.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        (0, setup_1.tearDown)();
    }));
    // Test 1
    test("Test createBooking", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/bookings")
            .set('Authorization', `Bearer ${token}`)
            .send(bookingParam);
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            hotelId: bookingParam.hotelId,
            hotelName: bookingParam.hotelName,
            roomKey: bookingParam.roomKey,
            roomDescription: bookingParam.roomDescription,
            roomImage: bookingParam.roomImage,
            request: bookingParam.specialRequest,
            guestName: bookingParam.primaryGuestFullName,
            guestNumber: bookingParam.primaryGuestPhoneNumber,
            checkin: expect.any(String),
            checkout: expect.any(String),
            guests: bookingParam.guests,
            baseRateInCurrency: bookingParam.baseRateInCurrency,
            includedTaxesAndFeesInCurrency: bookingParam.includedTaxesAndFeesInCurrency,
            stripeSessionId: bookingParam.sessionId,
        });
    }));
    test("createBooking handles errors gracefully", () => __awaiter(void 0, void 0, void 0, function* () {
        const createSpy = jest
            .spyOn(prismaClient_1.default.booking, "create")
            .mockRejectedValue(new Error("Database failure"));
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/bookings")
            .set("Authorization", `Bearer ${token}`)
            .send(bookingParam);
        expect(res.body).toEqual({ error: "Failed to create booking" });
        expect(res.statusCode).toBe(500);
        createSpy.mockRestore();
    }));
    test("User is unauthorized", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/bookings")
            .send(bookingParam);
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: "Missing authorization header" });
    }));
    test("Retrieve Bookings : Authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/bookings/me")
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        // expect(res.body[0]).toMatchObject({...mockBookings, userId: userId});
    }));
    test("Retrieve Bookings : Not Authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/bookings/me");
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: "Missing authorization header" });
    }));
    test("Retrieve Bookings : Not Authorized", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/bookings/me")
            .set('Authorization', `Bearer ${null}`);
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: "Invalid token" });
    }));
    const JWT_SECRET = process.env.JWT_SECRET || '1234567890';
    test("No user id in createBooking", () => __awaiter(void 0, void 0, void 0, function* () {
        const badToken = jsonwebtoken_1.default.sign({}, JWT_SECRET); // JWT with no user ID
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/bookings")
            .set('Authorization', `Bearer ${badToken}`)
            .send(bookingParam);
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    }));
    test("No user id in getMyBookings", () => __awaiter(void 0, void 0, void 0, function* () {
        const badToken = jsonwebtoken_1.default.sign({}, JWT_SECRET); // JWT with no user ID
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/bookings/me")
            .set('Authorization', `Bearer ${badToken}`);
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    }));
});
