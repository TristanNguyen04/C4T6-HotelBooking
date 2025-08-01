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
const prismaClient_1 = __importDefault(require("../../src/utils/prismaClient"));
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
const booking = {
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
};
describe('Testing Database util functions: Clear Booking Table', () => {
    let id;
    const originalEnv = process.env.NODE_ENV;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const { token, userId } = yield (0, setup_1.setupTest)();
        id = userId;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.booking.deleteMany();
        process.env.NODE_ENV = originalEnv;
    }));
    test('Clear Booking Table: In Test Env', () => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.booking.create({
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
                baseRateInCurrency: booking.baseRateInCurrency,
                includedTaxesAndFeesInCurrency: booking.includedTaxesAndFeesInCurrency,
                stripeSessionId: "1234",
                User: {
                    connect: { id: id }
                }
            },
        });
        const found = yield prismaClient_1.default.booking.findMany({
            where: {
                userId: id
            }
        });
        if (!found) {
            fail('Set up failed');
        }
        ;
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/dbutil/clear-bookingtable');
        const found2 = yield prismaClient_1.default.booking.findMany({ where: { userId: id } });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Booking table cleared successfully');
        expect(found2.length).toBe(0);
    }));
    test('Clear Booking Table: Not in Test Env', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.NODE_ENV = 'live';
        yield prismaClient_1.default.booking.create({
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
                baseRateInCurrency: booking.baseRateInCurrency,
                includedTaxesAndFeesInCurrency: booking.includedTaxesAndFeesInCurrency,
                stripeSessionId: "1234",
                User: {
                    connect: { id: id }
                }
            },
        });
        const found = yield prismaClient_1.default.booking.findMany({
            where: {
                userId: id
            }
        });
        if (!found) {
            fail('Set up failed');
        }
        ;
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/dbutil/clear-bookingtable');
        const found2 = yield prismaClient_1.default.booking.findMany({ where: { userId: id } });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Access denied. Only allowed in test environment.');
        expect(found2.length).toBeGreaterThan(0);
    }));
    test('Clear Booking Table: Unexpected Error', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteManySpy = jest.spyOn(prismaClient_1.default.booking, 'deleteMany')
            .mockRejectedValue(new Error('Failed to clear booking table'));
        yield prismaClient_1.default.booking.create({
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
                baseRateInCurrency: booking.baseRateInCurrency,
                includedTaxesAndFeesInCurrency: booking.includedTaxesAndFeesInCurrency,
                stripeSessionId: "1234",
                User: {
                    connect: { id: id }
                }
            },
        });
        const found = yield prismaClient_1.default.booking.findMany({
            where: {
                userId: id
            }
        });
        if (!found) {
            fail('Set up failed');
        }
        ;
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/dbutil/clear-bookingtable');
        const found2 = yield prismaClient_1.default.booking.findMany({ where: { userId: id } });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to clear booking table');
        expect(found2.length).toBeGreaterThan(0);
        deleteManySpy.mockRestore();
    }));
});
describe('Testing Database util functions: Clear User Table', () => {
    let id;
    const originalEnv = process.env.NODE_ENV;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const { token, userId } = yield (0, setup_1.setupTest)();
        id = userId;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.booking.deleteMany();
        process.env.NODE_ENV = originalEnv;
    }));
    test('Clear User Table: In Test Env', () => __awaiter(void 0, void 0, void 0, function* () {
        const found = yield prismaClient_1.default.user.findUnique({ where: { id: id } });
        if (!found) {
            fail('Set up failed');
        }
        ;
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/dbutil/clear-usertable');
        const found2 = yield prismaClient_1.default.booking.findMany({ where: { userId: id } });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User table cleared successfully');
        expect(found2.length).toBe(0);
    }));
    test('Clear User Table: Not In Test Env', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.NODE_ENV = 'live';
        const found = yield prismaClient_1.default.user.findUnique({ where: { id: id } });
        if (!found) {
            fail('Set up failed');
        }
        ;
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/dbutil/clear-usertable');
        const found2 = yield prismaClient_1.default.user.findMany({ where: { id: id } });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Access denied. Only allowed in test environment.');
        expect(found2.length).toBeGreaterThan(0);
    }));
    test('Clear User Table: Unexpected Error', () => __awaiter(void 0, void 0, void 0, function* () {
        const deleteManySpy = jest.spyOn(prismaClient_1.default.user, 'deleteMany')
            .mockRejectedValue(new Error('Failed to clear user table'));
        const found = yield prismaClient_1.default.user.findUnique({ where: { id: id } });
        if (!found) {
            fail('Set up failed');
        }
        ;
        const response = yield (0, supertest_1.default)(index_1.default).get('/api/dbutil/clear-usertable');
        const found2 = yield prismaClient_1.default.user.findMany({ where: { id: id } });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to clear user table');
        expect(found2.length).toBeGreaterThan(0);
        deleteManySpy.mockRestore();
    }));
});
describe('Testing Database util functions: Add verified user to database', () => {
    let id;
    const originalEnv = process.env.NODE_ENV;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const { token, userId } = yield (0, setup_1.setupTest)();
        id = userId;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.booking.deleteMany();
        process.env.NODE_ENV = originalEnv;
    }));
    test('Add Verified User: In Test Env', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/dbutil/add-verified-user')
            .query({ name: '999', email: '999@gmail.com', password: 123456 });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('TEST: Added verified user');
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: '999@gmail.com' } });
        expect(user).toBeDefined();
    }));
    test('Add Verified User: In Test Env - No email', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/dbutil/add-verified-user')
            .query({ name: '999', password: 123456 });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Error 400');
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: '999@gmail.com' } });
        expect(user).toBeNull();
    }));
    test('Add Verified User: In Test Env - No name', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/dbutil/add-verified-user')
            .query({ email: '999@gmail.com', password: 123456 });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Error 400');
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: '999@gmail.com' } });
        expect(user).toBeNull();
    }));
    test('Add Verified User: Not In Test Env', () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.NODE_ENV = 'live';
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/dbutil/add-verified-user')
            .query({ name: '999', email: '999@gmail.com', password: 123456 });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Access denied. Only allowed in test environment.');
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: '999@gmail.com' } });
        expect(user).toBeNull();
    }));
    test('Add Verified User: Unexpected Error', () => __awaiter(void 0, void 0, void 0, function* () {
        const addUniqueSpy = jest.spyOn(prismaClient_1.default.user, 'create')
            .mockRejectedValue(new Error('Error 400'));
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/dbutil/add-verified-user')
            .query({ name: '999', email: '999@gmail.com', password: 123456 });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Error 400');
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: '999@gmail.com' } });
        expect(user).toBeNull();
        addUniqueSpy.mockRestore();
    }));
});
