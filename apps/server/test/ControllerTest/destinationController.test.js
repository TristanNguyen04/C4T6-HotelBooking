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
const hotelService_1 = require("../../src/services/hotelService");
const calculateDistance = __importStar(require("../../src/utils/calculateDistance"));
const catchSymbols = {
    term: "!@#$, ', :\"",
    type: "tree",
    uid: "A!@#",
};
describe("GET /api/search", () => {
    // Test 1
    test("Return multiple matches - San", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=san");
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    }));
    // Test 2
    test("Return multiple matches - Sa", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=sa");
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    }));
    // Test 3
    test("Rturn multiple matches - Singapore", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=singapore");
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    }));
    // Test 4
    test("Error: No query", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations");
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Missing query parameter" });
    }));
    // Test 5
    test("Return multiple results - z", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=z");
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
    }));
    test("No query given", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=");
        expect(res.body).toEqual({ error: "Missing query parameter" });
    }));
    test("Query contains numbers", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=1");
        expect(res.body).toBeDefined();
    }));
    test("Query contains symbols: !", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=!");
        expect(res.body).toEqual(expect.arrayContaining([
            expect.objectContaining(catchSymbols)
        ]));
    }));
    test("Query contains symbols: {}", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query={");
        expect(res.body).toEqual([]);
        const res1 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=}");
        expect(res1.body).toEqual([]);
    }));
    test("Query contains symbols: <>", () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=<");
        expect(res1.body).toEqual([]);
        const res2 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=>");
        expect(res2.body).toEqual([]);
    }));
    test("Query contains symbols: []", () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=[");
        expect(res1.body).toEqual([]);
        const res2 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=]");
        expect(res2.body).toEqual([]);
    }));
    test("Query contains symbols: +=", () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=+");
        expect(res1.body).toEqual({ "error": "Missing query parameter" });
        const res2 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query==");
        expect(res2.body).toEqual([]);
    }));
    test("Query contains symbols: `~", () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=`");
        expect(res1.body).toEqual([]);
        const res2 = yield (0, supertest_1.default)(index_1.default).get("/api/destinations?query=~");
        expect(res2.body).toEqual([]);
    }));
});
describe('Calculate Distance between two locations using Lat and Lng', () => {
    // Valid
    test('-90 < Lat < 90 , -180 < Lng < 180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '1.3521', lng: '103.8198', radius: '10' });
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.statusCode).toBe(200);
    }));
    // Lat below -90
    test('Lat < -90 , -180 < Lng < 180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '-90.1', lng: '103.8198', radius: '10' });
        expect(res.body).toEqual({ error: "Invalid latitude or longitude values" });
        expect(res.statusCode).toBe(400);
    }));
    // Lat greater than 90
    test('90 < Lat , -180 < Lng < 180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '90.1', lng: '103.8198', radius: '10' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid latitude or longitude values" });
    }));
    // Lng lower than -180
    test('-90 < Lat , Lng < -180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '-1.3521', lng: '-180.01', radius: '10' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid latitude or longitude values" });
    }));
    // Lng greater than 180
    test('-90 < Lat , Lng < -180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '-1.3521', lng: '180.01', radius: '10' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid latitude or longitude values" });
    }));
    // Both values can be wrong
    test('-90 > Lat , Lng < -180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '-90.01', lng: '-180.01', radius: '10' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid latitude or longitude values" });
    }));
    // Both values can be wrong
    test('-90 > Lat , Lng < -180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '90.01', lng: '180.01', radius: '10' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid latitude or longitude values" });
    }));
    // Both values can be wrong
    test('-90 > Lat , Lng < -180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '-90.01', lng: '180.01', radius: '10' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid latitude or longitude values" });
    }));
    // Both values can be wrong
    test('-90 > Lat , Lng < -180', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: '90.01', lng: '-180.01', radius: '10' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid latitude or longitude values" });
    }));
    test('NaN value', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/destinations/nearby')
            .query({ lat: 'string', lng: 'dog', radius: 'cat' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Invalid params" });
    }));
});
jest.mock("../../src/services/hotelService", () => ({
    fetchHotels: jest.fn(),
}));
const baseParams = {
    destination_id: 'RsBU',
    checkin: '2025-07-20', // dummy values
    checkout: '2025-07-22',
    guests: '1',
    currency: 'SGD',
    lang: 'en_US',
    landing_page: 'wl-acme-earn',
    product_type: 'earn',
    partner_id: '1089'
};
const mockHotels = [
    { id: '1', name: 'Hotel A' },
    { id: '2', name: 'Hotel B' },
];
describe('Search Hotels using Destination', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('Successfully Search for Hotels with correct params', () => __awaiter(void 0, void 0, void 0, function* () {
        hotelService_1.fetchHotels.mockResolvedValue(mockHotels);
        const hotels = yield (0, supertest_1.default)(index_1.default).get('/api/destinations/hotel').query(baseParams);
        expect(hotels.body).toEqual(mockHotels);
    }));
    test('Unexpected Error', () => __awaiter(void 0, void 0, void 0, function* () {
        hotelService_1.fetchHotels.mockRejectedValueOnce(Error('Error'));
        const hotels = yield (0, supertest_1.default)(index_1.default).get('/api/destinations/hotel').query(baseParams);
        expect(hotels.body.error).toEqual('Error fetching hotels');
        expect(hotels.statusCode).toBe(500);
    }));
    test('Missing Parameter : destination_id', () => __awaiter(void 0, void 0, void 0, function* () {
        const { destination_id } = baseParams, incompleteParam = __rest(baseParams, ["destination_id"]);
        const hotels = yield (0, supertest_1.default)(index_1.default).get('/api/destinations/hotel').query(incompleteParam);
        expect(hotels.statusCode).toBe(400);
        expect(hotels.body.error).toEqual('Missing destination_id parameter');
    }));
    test('Missing Parameter : checkin', () => __awaiter(void 0, void 0, void 0, function* () {
        const { checkin } = baseParams, incompleteParam = __rest(baseParams, ["checkin"]);
        const hotels = yield (0, supertest_1.default)(index_1.default).get('/api/destinations/hotel').query(incompleteParam);
        expect(hotels.statusCode).toBe(400);
        expect(hotels.body.error).toEqual('Missing destination_id parameter');
    }));
    test('Missing Parameter : checkout', () => __awaiter(void 0, void 0, void 0, function* () {
        const { checkout } = baseParams, incompleteParam = __rest(baseParams, ["checkout"]);
        const hotels = yield (0, supertest_1.default)(index_1.default).get('/api/destinations/hotel').query(incompleteParam);
        expect(hotels.statusCode).toBe(400);
        expect(hotels.body.error).toEqual('Missing destination_id parameter');
    }));
    test('Missing Parameter : guests', () => __awaiter(void 0, void 0, void 0, function* () {
        const { guests } = baseParams, incompleteParam = __rest(baseParams, ["guests"]);
        const hotels = yield (0, supertest_1.default)(index_1.default).get('/api/destinations/hotel').query(incompleteParam);
        expect(hotels.statusCode).toBe(400);
        expect(hotels.body.error).toEqual('Missing destination_id parameter');
    }));
    test("should return 500 if calculateDistance throws an error", () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(calculateDistance, 'calculateDistance').mockImplementation(() => {
            throw new Error("Something went wrong");
        });
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/destinations/nearby')
            .query({ lat: '1.3521', lng: '103.8198', radius: '10' });
        expect(res.body).toEqual({ error: "Internal Server Error" });
        expect(res.status).toBe(500);
        jest.restoreAllMocks();
    }));
});
