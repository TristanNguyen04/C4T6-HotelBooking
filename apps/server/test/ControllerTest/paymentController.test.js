"use strict";
// apps/server/test/paymentController.test.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../src/index"));
const stripeClient_1 = __importDefault(require("../../src/utils/stripeClient"));
const setup_1 = require("../helper/setup");
// mock the stripe client
jest.mock("../../src/utils/stripeClient", () => ({
    checkout: {
        sessions: {
            create: jest.fn(),
            retrieve: jest.fn(),
        },
    },
}));
const item = {
    hotelId: "h123",
    hotelName: "Grand Hotel",
    roomKey: "R1",
    roomDescription: "Sea View",
    roomImage: "https://example.com/image.jpg",
    request: "Late check-in",
    guestName: "John Doe",
    guestNumber: "12345678",
    checkin: new Date().toISOString(),
    checkout: new Date(Date.now() + 86400000).toISOString(),
    guests: "2",
    baseRateInCurrency: 100,
    includedTaxesAndFeesInCurrency: 120
};
const metaData = {
    userId: 'userId',
    bookings: JSON.stringify([
        {
            hotelId: item.hotelId,
            hotelName: item.hotelName,
            roomKey: item.roomKey,
            roomDescription: item.roomDescription,
            roomImage: item.roomImage,
            request: item.request,
            guestName: item.guestName,
            guestNumber: item.guestNumber,
            checkin: "2025-08-05T00:00:00.000Z",
            checkout: "2025-08-11T00:00:00.000Z",
            guests: item.guests,
            baseRateInCurrency: item.baseRateInCurrency,
            includedTaxesAndFeesInCurrency: item.includedTaxesAndFeesInCurrency,
        },
    ]),
};
const bookingData = [
    {
        hotelId: item.hotelId,
        hotelName: item.hotelName,
        roomKey: item.roomKey,
        roomDescription: item.roomDescription,
        roomImage: item.roomImage,
        specialRequest: item.request, // key should match controller code
        guestName: item.guestName,
        guestNumber: item.guestNumber,
        checkin: new Date(item.checkin).toISOString(),
        checkout: new Date(item.checkout).toISOString(),
        guests: item.guests,
        baseRateInCurrency: item.baseRateInCurrency,
        includedTaxesAndFeesInCurrency: item.includedTaxesAndFeesInCurrency,
    },
];
describe("POST /payment/checkout", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    let userId;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, setup_1.setupTest)();
        userId = user.userId;
        token = user.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setup_1.tearDown)();
    }));
    const mockURL = "https://mockstripe.com/session";
    const mockStripe = stripeClient_1.default.checkout.sessions.create;
    // Test 1:
    test("Receive Post Request | Create Stripe Checkout Session", () => __awaiter(void 0, void 0, void 0, function* () {
        mockStripe.mockResolvedValueOnce({ url: mockURL });
        const res = yield (0, supertest_1.default)(index_1.default)
            // make post request to createCheckOutSession
            .post("/api/payments/checkout")
            .send({
            userId: userId,
            items: [item],
        });
        expect(res.body).toEqual({ url: mockURL });
        expect(mockStripe).toHaveBeenCalledTimes(1);
        expect(res.statusCode).toBe(200);
    }));
    // Test 2:
    test("No UserID", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/payments/checkout")
            .send({
            items: [item],
        });
        expect(res.statusCode).toBe(400);
        expect(mockStripe).toHaveBeenCalledTimes(0);
    }));
    // Test 3:
    test("No item", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/api/payments/checkout").send({
            userId: userId,
            items: [],
        });
        expect(res.statusCode).toBe(400);
        expect(mockStripe).toHaveBeenCalledTimes(0);
    }));
    // Test 4:
    test("API Error -> Error 500", () => __awaiter(void 0, void 0, void 0, function* () {
        mockStripe.mockRejectedValueOnce(new Error("Stripe API Error"));
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/payments/checkout")
            .send({
            userId: userId,
            items: [item],
        });
        expect(res.statusCode).toBe(500);
        expect(mockStripe).toHaveBeenCalledTimes(1);
    }));
});
describe("POST /api/payments/success", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    let userId;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, setup_1.setupTest)();
        userId = user.userId;
        token = user.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setup_1.tearDown)();
    }));
    const mockURL = "https://mockstripe.com/session";
    const mockRetrieve = stripeClient_1.default.checkout.sessions.retrieve;
    // Test 1
    test("Payment Success", () => __awaiter(void 0, void 0, void 0, function* () {
        const metaDataMock = {
            userId: userId,
            bookings: JSON.stringify(bookingData),
        };
        mockRetrieve.mockResolvedValueOnce({
            payment_status: "paid",
            metadata: metaDataMock,
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/payments/success")
            .send({ sessionId: "1234" });
        expect(res.body.message).toBe("Booking created successfully");
        expect(res.statusCode).toBe(201);
        expect(res.body.bookings.length).toBeGreaterThan(0);
    }));
    // Test 2
    test("Payment Unsuccessful", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRetrieve.mockResolvedValueOnce({
            payment_status: "not_paid",
            metadata: metaData,
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/payments/success")
            .send({ sessionId: "1234" });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Payment not completed" });
    }));
    // Test 3
    test("No MetaData", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRetrieve.mockResolvedValueOnce({
            payment_status: "paid",
            metadata: {},
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/payments/success")
            .send({ sessionId: "1234" });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: "Missing booking information in session metadata",
        });
    }));
    // Test 4
    test("No UserId", () => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = metaData, modifiedMetaData = __rest(metaData, ["userId"]);
        mockRetrieve.mockResolvedValueOnce({
            payment_status: "paid",
            metadata: modifiedMetaData,
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/payments/success")
            .send({ sessionId: "1234" });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: "Missing booking information in session metadata",
        });
    }));
    // Test 5
    test("Booking Exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const metaDataMock = {
            userId: userId,
            bookings: JSON.stringify(bookingData),
        };
        mockRetrieve.mockResolvedValueOnce({
            payment_status: "paid",
            metadata: metaDataMock,
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/payments/success")
            .send({ sessionId: "1234" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            message: "Bookings for this session already exist, skipping creation.",
        });
    }));
    // Test 7
    test("Stripe Status 500", () => __awaiter(void 0, void 0, void 0, function* () {
        mockRetrieve.mockRejectedValueOnce(new Error("Stripe API Failure"));
        const res = yield (0, supertest_1.default)(index_1.default)
            .post("/api/payments/success")
            .send({ sessionId: "1234" });
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: "Failed to verify payment" });
    }));
});
