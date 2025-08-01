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
exports.fetchHotelRoomPrices = exports.fetchHotelDetails = exports.fetchHotelPrices = exports.fetchHotels = void 0;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'https://hotelapi.loyalty.dev/api';
const fetchHotels = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${BASE_URL}/hotels`, { params });
    return res.data;
});
exports.fetchHotels = fetchHotels;
const fetchHotelPrices = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${BASE_URL}/hotels/prices`, { params });
    return res.data;
});
exports.fetchHotelPrices = fetchHotelPrices;
const fetchHotelDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${BASE_URL}/hotels/${id}`);
    return res.data;
});
exports.fetchHotelDetails = fetchHotelDetails;
const fetchHotelRoomPrices = (id, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(`${BASE_URL}/hotels/${id}/price`, { params });
        return res.data;
    }
    catch (error) {
        throw error;
    }
});
exports.fetchHotelRoomPrices = fetchHotelRoomPrices;
