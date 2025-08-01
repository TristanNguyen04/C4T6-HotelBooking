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
exports.searchHotelUsingDest = exports.getHotelDetails = exports.searchHotels = exports.calculateNights = void 0;
const hotelService_1 = require("../services/hotelService");
const axios_1 = __importDefault(require("axios"));
const calculateNights = (checkin, checkout) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    return Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));
};
exports.calculateNights = calculateNights;
const searchHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { destination_id, checkin, checkout, guests, currency = 'SGD', lang = 'en_US' } = req.query;
        if (!destination_id || !checkin || !checkout || !guests) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        const nights = (0, exports.calculateNights)(checkin, checkout);
        const baseParams = {
            destination_id,
            checkin,
            checkout,
            guests,
            currency,
            lang,
            landing_page: 'wl-acme-earn',
            product_type: 'earn',
            partner_id: '1089'
        };
        const [hotels, prices] = yield Promise.all([
            (0, hotelService_1.fetchHotels)(baseParams),
            (0, hotelService_1.fetchHotelPrices)(baseParams),
        ]);
        const hotelsWithPrices = hotels.reduce((acc, hotel) => {
            const priceInfo = prices.hotels.find((price) => price.id == hotel.id);
            if (priceInfo) {
                const totalPrice = (priceInfo === null || priceInfo === void 0 ? void 0 : priceInfo.price) || 0;
                const pricePerNight = nights > 0 ? Math.round((totalPrice / nights) * 100) / 100 : totalPrice;
                acc.push(Object.assign(Object.assign({}, hotel), { price: pricePerNight, totalPrice: totalPrice, nights: nights, currency: prices.currency || null }));
            }
            return acc;
        }, []);
        res.json({
            data: hotelsWithPrices,
            completed: prices.completed
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching hotel data' });
    }
});
exports.searchHotels = searchHotels;
const getHotelDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id } = req.params;
        const { destination_id, checkin, checkout, guests, currency = 'SGD', lang = 'en_US' } = req.query;
        if (!checkin || !checkout || !guests) {
            return res.status(400).json({ error: 'Missing required paramaters' });
        }
        const nights = (0, exports.calculateNights)(checkin, checkout);
        const queryParams = {
            destination_id,
            checkin,
            checkout,
            guests,
            currency,
            lang,
            landing_page: 'wl-acme-earn',
            product_type: 'earn',
            partner_id: '1089'
        };
        const [hotelInfo, roomPricing] = yield Promise.all([
            (0, hotelService_1.fetchHotelDetails)(id),
            (0, hotelService_1.fetchHotelRoomPrices)(id, queryParams),
        ]);
        // Process room pricing to convert total prices to per-night prices
        const processedRooms = ((_a = roomPricing.rooms) === null || _a === void 0 ? void 0 : _a.map((room) => {
            const totalPrice = room.price || 0;
            const pricePerNight = nights > 0 ? Math.round((totalPrice / nights) * 100) / 100 : totalPrice;
            return Object.assign(Object.assign({}, room), { converted_price: pricePerNight, lowest_converted_price: totalPrice, nights: nights });
        })) || [];
        return res.json(Object.assign(Object.assign({}, hotelInfo), { rooms: processedRooms, completed: roomPricing.completed }));
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error) && ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 422) {
            return res.status(422).json({
                error: 'This hotel does not support price lookup for the given dates or guest configuration.'
            });
        }
        console.error('Error fetching hotel details:', error);
        res.status(500).json({ error: 'Error fetching hotel data' });
    }
});
exports.getHotelDetails = getHotelDetails;
const searchHotelUsingDest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { destination_id, checkin: checkin, checkout: checkout, guests: guest } = req.query;
        if (!destination_id || !checkin || !checkout || !guest) {
            return res.status(400).json({ error: 'Missing destination_id parameter' });
        }
        const baseParams = {
            destination_id: destination_id,
            checkin: checkin,
            checkout: checkout,
            guests: guest,
            currency: 'SGD',
            lang: 'en_US',
            landing_page: 'wl-acme-earn',
            product_type: 'earn',
            partner_id: '1089'
        };
        const hotels = yield (0, hotelService_1.fetchHotels)(baseParams);
        return res.json(hotels);
    }
    catch (error) {
        console.error('Error fetching hotels by destination:', error);
        return res.status(500).json({ error: 'Error fetching hotels' });
    }
});
exports.searchHotelUsingDest = searchHotelUsingDest;
// const baseParams = {
//   destination_id,
//   checkin: '2025-07-20', // dummy values
//   checkout: '2025-07-22',
//   guests: '1',
//   currency: 'SGD',
//   lang: 'en_US',
//   landing_page: 'wl-acme-earn',
//   product_type: 'earn',
//   partner_id: '1089'
// };
