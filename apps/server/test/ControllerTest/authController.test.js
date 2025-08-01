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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../src/index"));
const prismaClient_1 = __importDefault(require("../../src/utils/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setup_1 = require("../helper/setup");
const JWT_SECRET = process.env.JWT_SECRET || '1234567890';
const testUserData = {
    email: 'testuser@example.com',
    password: 'TestPass123!',
    name: 'Test User',
};
// Registration Test Suite
describe('Registration Flow', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    test('User Registration', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        expect(res.body.message).toContain('Registration successful. Please check your email to verify your account.');
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: testUserData.email } });
        expect(res.statusCode).toBe(200);
        expect(user).toBeDefined();
        expect(user === null || user === void 0 ? void 0 : user.name).toEqual('Test User');
        expect(user === null || user === void 0 ? void 0 : user.isVerified).toEqual(false);
        expect(user === null || user === void 0 ? void 0 : user.email).toEqual('testuser@example.com');
        expect(user === null || user === void 0 ? void 0 : user.verificationToken).toBeDefined();
    }));
    test('Duplicate Email Registration', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual('Email already in use');
    }));
});
// Email Verification Test Suite
describe('Email Verification', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    test('Email Verification Successful', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: testUserData.email } });
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/auth/verify-email').query({ token: user === null || user === void 0 ? void 0 : user.verificationToken });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Email verified successfully. You can now login.');
        const updatedUser = yield prismaClient_1.default.user.findUnique({ where: { email: testUserData.email } });
        expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.isVerified).toBe(true);
    }));
    test('Email Verification: Invalid or Expired Token', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: testUserData.email } });
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/auth/verify-email').query({ token: 'fake-token' });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual('Invalid or expired token');
    }));
    test('Email Verification: Missing Token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/auth/verify-email').query({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toEqual('Missing token');
    }));
});
// Log in Test Suite
describe('Log In Flow', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    test('Log in successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        yield prismaClient_1.default.user.update({
            where: { email: testUserData.email },
            data: { isVerified: true }
        });
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/login').send(testUserData);
        const user = yield prismaClient_1.default.user.findUnique({ where: { email: testUserData.email } });
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, JWT_SECRET, { expiresIn: '1d' });
        expect(res.body).toEqual({ token, user: { id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email, name: user === null || user === void 0 ? void 0 : user.name, isVerified: true } });
    }));
    test('Log in Error: Sign Up first', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/login').send(testUserData);
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: 'Please sign up first!' });
    }));
    test('Log in Error: Verify email first', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/login').send(testUserData);
        expect(res.body).toEqual({ error: 'Please verify your email first!' });
        expect(res.statusCode).toBe(400);
    }));
    test('Log in Error: Wrong Password', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        yield prismaClient_1.default.user.update({
            where: { email: testUserData.email },
            data: { isVerified: true }
        });
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'fake123' });
        expect(res.body).toEqual({ error: 'Invalid credentials' });
        expect(res.statusCode).toBe(401);
    }));
});
// Resend Email Verification Test Suite
describe('Resend Email Verification Flow', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    test('Resend Verification Email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/resend-verification').send({ email: testUserData.email });
        expect(res.body.message).toEqual('Verification email sent successfully');
        expect(res.statusCode).toBe(200);
    }), 10000);
    test('Resend Verification : User not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/resend-verification').send({ email: testUserData.email });
        expect(res.body.error).toEqual('User not found');
        expect(res.statusCode).toBe(404);
    }));
    test('Resend Verification : Email is verified', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(index_1.default).post('/api/auth/register').send(testUserData);
        yield prismaClient_1.default.user.update({
            where: { email: testUserData.email },
            data: { isVerified: true },
        });
        const res = yield (0, supertest_1.default)(index_1.default).post('/api/auth/resend-verification').send({ email: testUserData.email });
        expect(res.body.error).toEqual('Email is already verified');
        expect(res.statusCode).toBe(400);
    }));
});
// Check Verification Test Suite
describe('Check Verification Status', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.deleteMany();
    }));
    test('Check Verification Status: Verified', () => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaClient_1.default.user.create({
            data: {
                email: testUserData.email,
                password: yield bcrypt_1.default.hash(testUserData.password, 10),
                name: testUserData.name,
                isVerified: true,
            },
        });
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/auth/check-verification').query({ email: testUserData.email });
        expect(res.statusCode).toBe(200);
        expect(res.body.isVerified).toEqual(true);
    }));
    test('Check Verification Status: Email is required', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/auth/check-verification').query({});
        expect(res.body.error).toEqual('Email is required');
        expect(res.statusCode).toBe(400);
    }));
    test('Check Verification Status: User not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/api/auth/check-verification').query({ email: 'unregistered@email.com' });
        expect(res.body.error).toEqual('User not found');
        expect(res.statusCode).toBe(404);
    }));
});
describe('Get Profile', () => {
    let userId;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, setup_1.setupTest)();
        userId = user.userId;
        token = user.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setup_1.tearDown)();
    }));
    test('Get Profile Successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toMatchObject({
            id: userId,
            email: '123@gmail.com',
            name: null,
            createdAt: expect.any(String), // may be ISO string, not Date
            isVerified: true
        });
    }));
    test('Get Profile : User not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakeUserId = 'non-existent-user-id';
        const token = jsonwebtoken_1.default.sign({ id: fakeUserId }, JWT_SECRET, {
            expiresIn: '1h'
        });
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('User not found');
    }));
    test('Get Profile : Unexpected Error', () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jest.spyOn(prismaClient_1.default.user, 'findUnique').mockRejectedValue(new Error('Error'));
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe('Failed to fetch profile');
    }));
});
describe('Update Profile', () => {
    let userId;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, setup_1.setupTest)();
        userId = user.userId;
        token = user.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setup_1.tearDown)();
    }));
    test('Update Profile Successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .patch('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`) // add valid token
            .send({ name: 'New Name' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            message: 'Profile updated successfully',
            user: {
                id: userId,
                email: '123@gmail.com',
                name: 'New Name',
                isVerified: true,
            },
        });
    }));
    test('Update Profile : Name is required', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .patch('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: '      ' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Name is required' });
    }));
    test('Update Profile : Unexpected Error', () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = jest.spyOn(prismaClient_1.default.user, 'update').mockRejectedValue(new Error('error'));
        const res = yield (0, supertest_1.default)(index_1.default)
            .patch('/api/auth/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: '123' });
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: 'Failed to update profile' });
        spy.mockRestore();
    }));
});
describe('Change Password', () => {
    let userId;
    let token;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, setup_1.setupTest)();
        userId = user.userId;
        token = user.token;
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, setup_1.tearDown)();
    }));
    test('Update Password Successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .patch('/api/auth/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({
            currentPassword: 'hashedpassword',
            newPassword: 'newHashedPassword'
        });
        expect(res.body).toEqual({ message: 'Password changed successfully' });
        expect(res.statusCode).toBe(200);
    }));
    test('Update Password: No password given', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .patch('/api/auth/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({});
        expect(res.body.error).toEqual('Current password and new password are required');
        expect(res.statusCode).toBe(400);
    }));
    test('Update Password: Password length < 6', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .patch('/api/auth/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({
            currentPassword: 'hashedpassword',
            newPassword: '123'
        });
        expect(res.body.error).toEqual('New password must be at least 6 characters long');
        expect(res.statusCode).toBe(400);
    }));
    test('Update Password: Wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .patch('/api/auth/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({
            currentPassword: 'wrongPassword',
            newPassword: 'newHashedPassword'
        });
        expect(res.body.error).toBe('Current password is incorrect');
        expect(res.statusCode).toBe(400);
    }));
});
// describe('Test getUID', ()=>{
//   let userId: string;
//   let token: string;
//   beforeAll(async () => {
//     const user = await setupTest();
//     userId = user.userId;
//     token = user.token;
//   });
//   test('getUID successfully', async()=>{
//     const res = await request(app).get('/api/auth/get-uid').query('123@gmail.com');
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('token');
//     expect(typeof res.body.token).toBe('string');
//   })
// })
