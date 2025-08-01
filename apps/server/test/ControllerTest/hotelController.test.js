"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../src/index"));
const setup_1 = require("../helper/setup");
const hotelController_1 = require("../../src/controllers/hotelController");
const hotelService = __importStar(require("../../src/services/hotelService"));
jest.mock("../../src/services/hotelService");
const fetchHotels = hotelService.fetchHotels;
const fetchHotelPrices = hotelService.fetchHotelPrices;
const fetchHotelDetails = hotelService.fetchHotelDetails;
const fetchHotelRoomPrices = hotelService.fetchHotelRoomPrices;
const mockHotels = [
    { id: '1', name: 'Hotel A' },
    { id: '2', name: 'Hotel B' },
];
const mockPrices = {
    currency: 'SGD',
    hotels: [
        { id: '1', price: 200 },
        { id: '2', price: 300 },
    ],
};
const mockHotelInfo = {
    id: '1',
    name: 'Test Hotel',
    description: 'Sample Hotel',
};
const mockRoomPricing = {
    rooms: [
        {
            id: '101',
            name: 'Deluxe Room',
            price: 200,
            converted_price: 200,
            lowest_converted_price: 200,
            nights: null
        },
    ],
};
const queryParams = {
    destination_id: '123',
    checkin: '25-06-2025',
    checkout: '26-06-2025',
    guests: '2',
    currency: 'SGD',
    lang: 'en_US',
    partner_id: '1',
};
describe('Testing for Calculation of Nights', () => {
    test('Check-in is before checkout', () => {
        const res = (0, hotelController_1.calculateNights)('2025-08-01', '2025-08-10');
        expect(res).toBe(9);
    });
    test('Check-in is the same as Check-out', () => {
        const res = (0, hotelController_1.calculateNights)('2025-08-01', '2025-08-01');
        expect(res).toBe(0);
    });
});
describe("GET /api/hotels/search", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setup_1.setupTest)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setup_1.tearDown)();
    }));
    // Test 1
    test("Successfully search hotels", () => __awaiter(void 0, void 0, void 0, function* () {
        fetchHotels.mockResolvedValue(mockHotels);
        fetchHotelPrices.mockResolvedValue(mockPrices);
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/hotels/search").query(queryParams);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toEqual([
            { id: '1', name: 'Hotel A', price: 200, currency: 'SGD', nights: null, totalPrice: 200 },
            { id: '2', name: 'Hotel B', price: 300, currency: 'SGD', nights: null, totalPrice: 300 },
        ]);
    }));
    // Test 2
    test("Missing Destination Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const incompleteQuery = Object.assign({}, queryParams);
        delete incompleteQuery.destination_id;
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/search")
            .query(incompleteQuery);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Missing required parameters" });
    }));
    // Test 3
    test("Missing Checkin", () => __awaiter(void 0, void 0, void 0, function* () {
        const incompleteQuery = Object.assign({}, queryParams);
        delete incompleteQuery.checkin;
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/search")
            .query(incompleteQuery);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Missing required parameters" });
    }));
    // Test 4
    test("Missing Checkout", () => __awaiter(void 0, void 0, void 0, function* () {
        const incompleteQuery = Object.assign({}, queryParams);
        delete incompleteQuery.checkout;
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/search")
            .query(incompleteQuery);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Missing required parameters" });
    }));
    // Test 5
    test("Missing Guest", () => __awaiter(void 0, void 0, void 0, function* () {
        fetchHotels.mockResolvedValue(mockHotels);
        fetchHotelPrices.mockResolvedValue(mockPrices);
        const incompleteQuery = Object.assign({}, queryParams);
        delete incompleteQuery.guests;
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/search")
            .query(incompleteQuery);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Missing required parameters" });
    }));
    // Test 5
    test("Unexpected Error Thrown", () => __awaiter(void 0, void 0, void 0, function* () {
        fetchHotelPrices.mockRejectedValueOnce(Error('Unexpected Error'));
        const incompleteQuery = Object.assign({}, queryParams);
        delete incompleteQuery.guests;
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/hotels/search").query(queryParams);
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toEqual('Error fetching hotel data');
    }));
});
describe("GET /api/hotels/:id/details", () => {
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
    // Test 1
    test("Get Hotel Details Successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        fetchHotelDetails.mockResolvedValue(mockHotelInfo);
        fetchHotelRoomPrices.mockResolvedValue(mockRoomPricing);
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/050G/details")
            .query(queryParams);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(Object.assign(Object.assign({}, mockHotelInfo), { rooms: mockRoomPricing.rooms }));
    }));
    // Test 2
    test("Missing required Param: checkin", () => __awaiter(void 0, void 0, void 0, function* () {
        const incompleteQuery = Object.assign({}, queryParams);
        delete incompleteQuery.checkin;
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/050G/details")
            .query(incompleteQuery);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Missing required paramaters" });
    }));
    // Test 3
    test("Missing required Param: checkout", () => __awaiter(void 0, void 0, void 0, function* () {
        const incompleteQuery = Object.assign({}, queryParams);
        delete incompleteQuery.checkout;
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/050G/details")
            .query(incompleteQuery);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Missing required paramaters" });
    }));
    // Test 4
    test("Missing required Param: guests", () => __awaiter(void 0, void 0, void 0, function* () {
        const incompleteQuery = Object.assign({}, queryParams);
        delete incompleteQuery.guests;
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/050G/details")
            .query(incompleteQuery);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Missing required paramaters" });
    }));
    test('Returns 400 if required query params are missing', () => __awaiter(void 0, void 0, void 0, function* () {
        fetchHotelDetails.mockResolvedValue(mockHotelInfo);
        fetchHotelRoomPrices.mockRejectedValue({
            isAxiosError: true,
            response: { status: 422 },
        });
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/hotels/050G/details").query(queryParams);
        expect(res.status).toBe(422);
        expect(res.body.error).toBe('This hotel does not support price lookup for the given dates or guest configuration.');
    }));
    test("Returns 500 on unexpected error", () => __awaiter(void 0, void 0, void 0, function* () {
        fetchHotelDetails.mockResolvedValue(mockHotelInfo);
        fetchHotelRoomPrices.mockRejectedValue(new Error("Unexpected"));
        const res = yield (0, supertest_1.default)(index_1.default)
            .get("/api/hotels/050G/details")
            .query(queryParams);
        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Error fetching hotel data");
    }));
});
