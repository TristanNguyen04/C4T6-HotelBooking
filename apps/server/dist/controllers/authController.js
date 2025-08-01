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
exports.deleteAccount = exports.changePassword = exports.updateProfile = exports.getProfile = exports.checkVerificationStatus = exports.resendVerificationEmail = exports.login = exports.verifyEmail = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_1 = require("../utils/sendEmail");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const JWT_SECRET = process.env.JWT_SECRET || '1234567890';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password, name } = req.body;
    const existing = yield prismaClient_1.default.user.findUnique({
        where: {
            email
        }
    });
    if (existing) {
        return res.status(400).send(createErrorHtml('Email Already in Use', 'An account with this email address already exists. Please try logging in or use a different email address.'));
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
    const user = yield prismaClient_1.default.user.create({
        data: { email, password: hashedPassword, name, verificationToken }
    });
    yield (0, sendEmail_1.sendVerificationEmail)(email, verificationToken);
    if (((_a = req.headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes('application/x-www-form-urlencoded')) ||
        ((_b = req.headers['accept']) === null || _b === void 0 ? void 0 : _b.includes('text/html'))) {
        return res.send(createSuccessHtml('Registration Successful! 📧', 'Please check your email to verify your account. You\'ll need to click the verification link before you can sign in.'));
    }
    res.json({ message: 'Registration successful. Please check your email to verify your account.' });
});
exports.register = register;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
        return res.status(400).send(createErrorHtml('Missing Token', 'The verification link appears to be incomplete. Please check your email and click the complete link.'));
    }
    const user = yield prismaClient_1.default.user.findFirst({
        where: {
            verificationToken: token
        }
    });
    if (!user) {
        return res.status(400).send(createErrorHtml('Invalid or Expired Token', 'This verification link has expired or is invalid. You can request a new verification email from the login page.'));
    }
    yield prismaClient_1.default.user.update({
        where: { id: user.id },
        data: { isVerified: true, verificationToken: null }
    });
    res.send(createSuccessHtml('Email Verified Successfully! 🎉', 'Your account has been verified. You can now sign in and start booking amazing hotels!'));
});
exports.verifyEmail = verifyEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prismaClient_1.default.user.findUnique({
        where: { email }
    });
    if (!user) {
        return res.status(401).json({ error: 'Please sign up first!' });
    }
    if (!user.isVerified) {
        return res.status(400).json({ error: 'Please verify your email first!' });
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            isVerified: user.isVerified
        }
    });
});
exports.login = login;
const resendVerificationEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = req.body;
    const user = yield prismaClient_1.default.user.findUnique({
        where: { email }
    });
    if (!user) {
        return res.status(404).send(createErrorHtml('User Not Found', 'No account found with this email address. Please check the email or create a new account.'));
    }
    if (user.isVerified) {
        return res.status(400).send(createErrorHtml('Already Verified', 'This email address is already verified. You can sign in normally.'));
    }
    const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
    yield prismaClient_1.default.user.update({
        where: { id: user.id },
        data: { verificationToken }
    });
    yield (0, sendEmail_1.sendVerificationEmail)(email, verificationToken);
    if ((_a = req.headers['accept']) === null || _a === void 0 ? void 0 : _a.includes('text/html')) {
        return res.send(createSuccessHtml('Verification Email Sent 📧', 'A new verification email has been sent. Please check your inbox and click the verification link.'));
    }
    res.json({ message: 'Verification email sent successfully' });
});
exports.resendVerificationEmail = resendVerificationEmail;
const checkVerificationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email is required' });
    }
    const user = yield prismaClient_1.default.user.findUnique({
        where: { email },
        select: { isVerified: true }
    });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ isVerified: user.isVerified });
});
exports.checkVerificationStatus = checkVerificationStatus;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prismaClient_1.default.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                isVerified: true
            }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name || name.trim().length === 0) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const user = yield prismaClient_1.default.user.update({
            where: { id: req.userId },
            data: { name: name.trim() },
            select: {
                id: true,
                email: true,
                name: true,
                isVerified: true
            }
        });
        res.json({
            message: 'Profile updated successfully',
            user
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});
exports.updateProfile = updateProfile;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }
        const user = yield prismaClient_1.default.user.findFirst({
            where: { id: req.userId },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isCurrentPasswordValid = yield bcrypt_1.default.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield prismaClient_1.default.user.update({
            where: { id: req.userId },
            data: { password: hashedNewPassword }
        });
        res.json({ message: 'Password changed successfully' });
    }
    catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});
exports.changePassword = changePassword;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ error: 'Password is required to delete account' });
        }
        const user = yield prismaClient_1.default.user.findFirst({
            where: { id: req.userId }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        yield prismaClient_1.default.user.delete({
            where: { id: req.userId }
        });
        res.json({ message: 'Account deleted successfully' });
    }
    catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
});
exports.deleteAccount = deleteAccount;
function createSuccessHtml(title, message) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - StayEase</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="text-center max-w-md mx-auto px-4">
            <div class="bg-green-100 text-green-600 p-8 rounded-lg mb-6">
                <div class="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold mb-2">${title}</h2>
                <p>${message}</p>
            </div>
            <div class="space-y-3">
                <a href="${frontendUrl}/login" class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-decoration-none">
                    Go to Login
                </a>
                <a href="${frontendUrl}/" class="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-decoration-none">
                    Browse Hotels
                </a>
            </div>
        </div>
    </body>
    </html>
    `;
}
function createErrorHtml(title, message) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - StayEase</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="text-center max-w-md mx-auto px-4">
            <div class="bg-red-100 text-red-600 p-8 rounded-lg mb-6">
                <div class="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold mb-2">${title}</h2>
                <p>${message}</p>
            </div>
            <div class="space-y-3">
                <a href="${frontendUrl}/login" class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-decoration-none">
                    Go to Login
                </a>
                <a href="${frontendUrl}/register" class="block w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-decoration-none">
                    Create Account
                </a>
                <a href="${frontendUrl}/" class="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-decoration-none">
                    Browse Hotels
                </a>
            </div>
        </div>
    </body>
    </html>
    `;
}
