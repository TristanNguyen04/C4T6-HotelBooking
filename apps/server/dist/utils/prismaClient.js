"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuzzPrisma = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const isTestEnv = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'jest';
const dbUrl = isTestEnv
    ? 'postgresql://hotelproject:hotelproject@localhost:5432/db_test'
    : process.env.DATABASE_URL;
console.log('Prisma is connecting to DB URL:', dbUrl);
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: dbUrl
        },
    },
});
exports.default = prisma;
exports.fuzzPrisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_TEST_URL,
        },
    },
});
