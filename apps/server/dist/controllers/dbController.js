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
exports.addVerifiedUser = exports.clearUserTable = exports.clearBookingTable = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const clearBookingTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'jest') {
        return res.status(400).json({ error: 'Access denied. Only allowed in test environment.' });
    }
    try {
        yield prismaClient_1.default.booking.deleteMany();
        res.status(200).json({ message: 'Booking table cleared successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to clear booking table' });
    }
});
exports.clearBookingTable = clearBookingTable;
const clearUserTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'jest') {
        return res.status(400).json({ error: 'Access denied. Only allowed in test environment.' });
    }
    try {
        yield prismaClient_1.default.user.deleteMany();
        res.status(200).json({ message: 'User table cleared successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to clear user table' });
    }
});
exports.clearUserTable = clearUserTable;
const addVerifiedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'jest') {
        return res.status(400).json({ error: 'Access denied. Only allowed in test environment.' });
    }
    try {
        const { name, email, password } = req.query;
        if (!name || !email || !password) {
            throw new Error('Missing Parameters');
        }
        yield prismaClient_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                verificationToken: "token123",
                isVerified: true,
            },
        });
        return res.status(200).json({ message: 'TEST: Added verified user' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error 400' });
    }
});
exports.addVerifiedUser = addVerifiedUser;
