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
exports.sendBookingConfirmationEmail = exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
});
const sendVerificationEmail = (to, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'jest') {
        return;
    }
    const verifyUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Welcome to StayEase!</h2>
            <p>Thank you for registering with us. To complete your registration, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${verifyUrl}" 
                   style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Verify Email Address
                </a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">${verifyUrl}</p>
            
            <p>This link will expire in 24 hours for security reasons.</p>
            
            <p>If you didn't create an account, you can safely ignore this email.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px; text-align: center;">
                This is an automated email from StayEase. Please do not reply to this email.
            </p>
        </div>
    `;
    yield transporter.sendMail({
        from: `"StayEase - Hotel Booking Website" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Verify Your Email - StayEase',
        html: htmlContent
    });
});
exports.sendVerificationEmail = sendVerificationEmail;
const parseGuestInfo = (guestsParam) => {
    const defaultResult = { rooms: 1, adults: 0, children: 0, childrenAges: [] };
    if (!guestsParam)
        return defaultResult;
    if (guestsParam.includes('|') && !guestsParam.includes(':')) {
        const [roomsStr = '', adultsStr = ''] = guestsParam.split('|');
        return {
            rooms: parseInt(roomsStr) || 1,
            adults: parseInt(adultsStr) || 0,
            children: 0,
            childrenAges: []
        };
    }
    if (guestsParam.includes(':')) {
        const [adultsStr = '', agesStr] = guestsParam.split(':');
        const adults = parseInt(adultsStr) || 0;
        const childrenAges = agesStr ?
            agesStr.split(',').map(age => parseInt(age)).filter(age => !isNaN(age)) :
            [];
        return {
            rooms: 1,
            adults,
            children: childrenAges.length,
            childrenAges
        };
    }
    const numericValue = parseInt(guestsParam);
    if (!isNaN(numericValue)) {
        return {
            rooms: 1,
            adults: numericValue,
            children: 0,
            childrenAges: []
        };
    }
    return defaultResult;
};
const sendBookingConfirmationEmail = (to, userName, bookings) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'jest') {
        return;
    }
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const totalAmount = bookings.reduce((sum, booking) => sum + booking.baseRateInCurrency + booking.includedTaxesAndFeesInCurrency, 0);
    const bookingDetailsHtml = bookings.map(booking => {
        const guestInfo = parseGuestInfo(booking.guests);
        const guestDetails = [
            `${guestInfo.rooms} room${guestInfo.rooms !== 1 ? 's' : ''}`,
            `${guestInfo.adults} adult${guestInfo.adults !== 1 ? 's' : ''}`
        ];
        if (guestInfo.children > 0) {
            const childrenText = `${guestInfo.children} child${guestInfo.children !== 1 ? 'ren' : ''}`;
            const agesText = guestInfo.childrenAges.length > 0 ? ` (ages: ${guestInfo.childrenAges.join(', ')})` : '';
            guestDetails.push(childrenText + agesText);
        }
        return `
            <div style="border: 1px solid #e1e5e9; border-radius: 8px; padding: 20px; margin: 15px 0; background-color: #f8f9fa;">
                <h3 style="color: #333; margin-top: 0;">${booking.hotelName}</h3>
                <p style="color: #666; margin: 5px 0;"><strong>Room:</strong> ${booking.roomDescription}</p>
                <p style="color: #666; margin: 5px 0;"><strong>Guest:</strong> ${booking.guestName}</p>
                <p style="color: #666; margin: 5px 0;"><strong>Check-in:</strong> ${formatDate(booking.checkin)}</p>
                <p style="color: #666; margin: 5px 0;"><strong>Check-out:</strong> ${formatDate(booking.checkout)}</p>
                <p style="color: #666; margin: 5px 0;"><strong>Accommodation:</strong> ${guestDetails.join(' • ')}</p>
                <p style="color: #666; margin: 5px 0;"><strong>Total Cost:</strong> $${(booking.baseRateInCurrency + booking.includedTaxesAndFeesInCurrency).toFixed(2)}</p>
                ${booking.request ? `<p style="color: #666; margin: 5px 0;"><strong>Special Request:</strong> ${booking.request}</p>` : ''}
                <p style="color: #28a745; font-weight: bold; margin: 10px 0 0 0;">Booking ID: ${booking.id}</p>
            </div>
        `;
    }).join('');
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Booking Confirmation - StayEase</h2>
            <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                <h3 style="margin: 0;">✅ Your Booking is Confirmed!</h3>
            </div>
            
            <p>Dear ${userName},</p>
            <p>Thank you for choosing StayEase! Your payment has been successfully processed and your booking${bookings.length > 1 ? 's have' : ' has'} been confirmed.</p>
            
            <h3 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Booking Details:</h3>
            ${bookingDetailsHtml}
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Payment Summary</h3>
                <p style="font-size: 18px; font-weight: bold; color: #28a745;">Total Paid: $${totalAmount.toFixed(2)}</p>
            </div>
            
            <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h4 style="color: #333; margin-top: 0;">Important Information:</h4>
                <ul style="color: #666; margin: 0; padding-left: 20px;">
                    <li>Please save this confirmation email for your records</li>
                    <li>Bring a valid ID when checking in</li>
                    <li>Check-in time is typically 3:00 PM and check-out is 11:00 AM</li>
                    <li>For any changes or cancellations, please contact the hotel directly</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/bookings" 
                   style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    View My Bookings
                </a>
            </div>
            
            <p>We hope you have a wonderful stay! If you have any questions, please don't hesitate to contact us.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px; text-align: center;">
                This is an automated confirmation email from StayEase. Please do not reply to this email.<br>
                For support, please visit our website or contact customer service.
            </p>
        </div>
    `;
    yield transporter.sendMail({
        from: `"StayEase - Hotel Booking" <${process.env.SMTP_USER}>`,
        to,
        subject: `Booking Confirmation - StayEase ${bookings.length > 1 ? `(${bookings.length} bookings)` : ''}`,
        html: htmlContent
    });
});
exports.sendBookingConfirmationEmail = sendBookingConfirmationEmail;
