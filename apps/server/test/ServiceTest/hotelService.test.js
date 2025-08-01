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
Object.defineProperty(exports, "__esModule", { value: true });
const hotelService_1 = require("../../src/services/hotelService");
const baseParams = {
    destination_id: 'RsBU',
    checkin: '2025-08-10',
    checkout: '2025-08-25',
    guests: '2',
    currency: 'SGD',
    lang: 'en_US',
    landing_page: 'wl-acme-earn',
    product_type: 'earn',
    partner_id: '1089'
};
describe('Hotel Service Test', () => {
    beforeAll(() => {
        jest.retryTimes(5);
    });
    test('Fetch Hotel Details : Valid ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, hotelService_1.fetchHotelDetails)('050G');
        expect(res.id).toBe('050G');
        expect(res.name).toBeDefined();
    }), 20000);
    test('Fetch Hotel Details : Invalid Params', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, hotelService_1.fetchHotelDetails)('////');
            fail('Expected error was not thrown');
        }
        catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toEqual({
                errors: [
                    {
                        code: "TE1001",
                        message: "destination_id or region_id must be present"
                    }
                ]
            });
        }
    }));
    test('Fetch Hotel Prices : Valid Params', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, hotelService_1.fetchHotelPrices)(baseParams);
        expect(res.completed).toBe(true);
    }));
    test('Fetch Hotel Prices : Invalid Params', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { destination_id } = baseParams, invalid = __rest(baseParams, ["destination_id"]);
            yield (0, hotelService_1.fetchHotelPrices)(invalid);
            fail('Expected error was not thrown');
        }
        catch (err) {
            expect(err.response.status).toBe(422);
            expect(err.response.data).toEqual({
                completed: true,
                hotels: [],
            });
        }
    }), 10000);
    test('Fetch Hotel Room Prices : Valid Params', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, hotelService_1.fetchHotelRoomPrices)('0vcz', baseParams);
        expect(res.completed).toBe(true);
        expect(res.completed).toBe(true);
    }), 20000);
    test('Fetch Hotel Room Prices : Invalid Params', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, hotelService_1.fetchHotelRoomPrices)('////', baseParams);
            fail('Expected error was not thrown');
        }
        catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toEqual({
                error: "Invalid params"
            });
        }
    }));
    test('Fetch Hotels : Valid Params', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, hotelService_1.fetchHotels)(baseParams);
        expect(res.length).toBeGreaterThan(0);
    }), 20000);
    test('Fetch Hotels : Invalid Params', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { destination_id } = baseParams, invalid = __rest(baseParams, ["destination_id"]);
            yield (0, hotelService_1.fetchHotels)(invalid);
            fail('Expected error was not thrown');
        }
        catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toEqual({
                errors: [
                    {
                        code: "TE1001",
                        message: "destination_id or region_id must be present"
                    }
                ]
            });
        }
    }));
});
// describe('Fetch rooms by Hotel', ()=>{
//     beforeAll(()=>{
//         jest.retryTimes(5);
//     })
//     test('Return Rooms successfully', async ()=>{
//         const result = await searchRoomsByHotel(
//             '050G', //hotel id
//             '2025-08-10', //checkin 
//             '2025-08-15', //check out
//             1, // adults
//             1, // children
//             1, // rooms
//         );
//         expect(result.completed).toBe(true);
//     },10000);
//     test('Unexpected Error', async () => {
//         const error = new Error('Error');
//         // Manually mock just axios.get for this test
//         const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce(error);
//         // Optional: spy on console.error
//         const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
//         await expect(
//             searchRoomsByHotel(
//                 '050G',
//                 '2025-08-10',
//                 '2025-08-15',
//                 1,
//                 1,
//                 1
//             )
//         ).rejects.toThrow('Error');
//         expect(errorSpy).toHaveBeenCalledWith('Error searching rooms for hotel:', error);
//         // Cleanup
//         axiosSpy.mockRestore();
//         errorSpy.mockRestore();
//     });
// })
