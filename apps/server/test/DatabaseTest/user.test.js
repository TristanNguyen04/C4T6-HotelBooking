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
describe("User model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.deleteMany();
    }));
    test("Create User Successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                name: 'testuser123',
                email: "test@example.com",
                password: "password123",
                verificationToken: "token123",
                isVerified: true,
            },
        });
        expect(user.id).toBeDefined();
        expect(user.name).toBe('testuser123');
        expect(user.email).toBe("test@example.com");
        expect(user.password).toBe("password123");
        expect(user.createdAt).toBeInstanceOf(Date);
        expect(user.isVerified).toBe(true);
        expect(user.verificationToken).toBe("token123");
    }));
    test("Create user without optional fields", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                email: "test2@example.com",
                password: "password123",
            },
        });
        expect(user.id).toBeDefined();
        expect(user.name).toBeNull();
        expect(user.email).toBe("test2@example.com");
        expect(user.verificationToken).toBeNull();
        expect(user.isVerified).toBe(false);
    }));
    test("Enforce unique email", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.create({
            data: {
                email: "unique@example.com",
                password: "password123",
            },
        });
        yield expect(prisma.user.create({
            data: {
                email: "unique@example.com", // duplicate
                password: "password456",
            },
        })).rejects.toThrow();
    }));
});
