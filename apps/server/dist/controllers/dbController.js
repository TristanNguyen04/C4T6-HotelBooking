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
exports.addVerifiedUser = exports.clearUserTable = exports.clearBookingTable = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClient_1 = __importStar(require("../utils/prismaClient"));
const clearBookingTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'jest') {
        return res.status(400).json({ error: 'Access denied. Only allowed in test environment.' });
    }
    try {
        yield req.prisma.booking.deleteMany();
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
        yield req.prisma.user.deleteMany();
        res.status(200).json({ message: 'User table cleared successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to clear user table' });
    }
});
exports.clearUserTable = clearUserTable;
const addVerifiedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isTestEnv = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'jest';
    const isFuzzing = req.prisma === prismaClient_1.fuzzPrisma;
    if (!isTestEnv && !isFuzzing) {
        return res.status(403).json({ error: 'Access denied: only allowed in fuzzing or test environment' });
    }
    try {
        const client = req.prisma || (isTestEnv ? prismaClient_1.default : null);
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.log('missing param');
            throw new Error('Missing Parameters');
        }
        const hashedPassword = yield bcrypt_1.default.hash(String(password), 10);
        const user = yield prismaClient_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                verificationToken: "token123",
                isVerified: true,
            },
        });
        console.log(user);
        return res.status(200).json({ message: 'TEST: Added verified user' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error 400' });
    }
});
exports.addVerifiedUser = addVerifiedUser;
