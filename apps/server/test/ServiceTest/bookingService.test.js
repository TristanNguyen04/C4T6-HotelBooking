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
const bookingService_1 = require("../../src/services/bookingService");
const setup_1 = require("../helper/setup");
describe('Test Booking Wrapper Functions', () => {
    let userId;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, setup_1.setupTest)();
        userId = user.userId;
        token = user.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        (0, setup_1.tearDown)();
    }));
    test('Test createBookingRecord', () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield (0, bookingService_1.createBookingRecord)({
            userId: userId,
            hotelId: "Test123",
            hotelName: "Test Hotel",
            roomKey: "suite-ocean-view",
            roomDescription: "Suite with Ocean View and Balcony",
            roomImage: "suite-image.jpg",
            request: "Early check-in preferred",
            guestName: "Alice Johnson",
            guestNumber: "+1122334455",
            checkin: new Date('2025-08-01').toISOString(),
            checkout: new Date('2025-08-05').toISOString(),
            guests: "3",
            baseRateInCurrency: 1234,
            includedTaxesAndFeesInCurrency: 250,
            sessionId: "session123"
        });
        expect(create.userId).toBe(userId);
        expect(create.hotelId).toBe("Test123");
        expect(create.hotelName).toBe("Test Hotel");
        expect(create.roomKey).toBe("suite-ocean-view");
        expect(create.roomDescription).toBe("Suite with Ocean View and Balcony");
        expect(create.roomImage).toBe("suite-image.jpg");
        expect(create.request).toBe("Early check-in preferred");
        expect(create.guestName).toBe("Alice Johnson");
        expect(create.guestNumber).toBe("+1122334455");
        expect(create.checkin).toEqual(new Date('2025-08-01'));
        expect(create.checkout).toEqual(new Date('2025-08-05'));
        expect(create.guests).toBe("3");
        expect(create.baseRateInCurrency).toEqual(1234);
        expect(create.includedTaxesAndFeesInCurrency).toEqual(250);
        expect(create.stripeSessionId).toBe("session123");
    }));
});
