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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Optionally reset and seed test DB
    yield prisma.$executeRaw `TRUNCATE TABLE "User", "Booking" RESTART IDENTITY CASCADE;`;
    yield prisma.booking.deleteMany();
    yield prisma.user.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.booking.deleteMany();
    yield prisma.user.deleteMany();
    yield prisma.$disconnect();
}));
