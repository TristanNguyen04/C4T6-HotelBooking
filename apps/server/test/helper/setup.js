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
exports.setupTest = setupTest;
exports.tearDown = tearDown;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../../src/utils/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function setupTest() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prismaClient_1.default.$connect();
        yield prismaClient_1.default.booking.deleteMany();
        yield prismaClient_1.default.user.deleteMany();
        const hashedPassword = yield bcrypt_1.default.hash('hashedpassword', 10);
        const testUser = yield prismaClient_1.default.user.create({
            data: {
                email: '123@gmail.com',
                password: hashedPassword,
                isVerified: true,
            }
        });
        const JWT_SECRET = process.env.JWT_SECRET || '1234567890';
        const userId = testUser.id;
        console.log('my id', userId);
        const token = jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
        return { token, userId: testUser.id };
    });
}
function tearDown() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prismaClient_1.default.$connect();
        yield prismaClient_1.default.booking.deleteMany();
        yield prismaClient_1.default.user.deleteMany();
        yield prismaClient_1.default.$disconnect();
    });
}
