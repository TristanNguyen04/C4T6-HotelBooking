import prisma from '../../src/utils/prismaClient';
import { createBookingRecord , retrieveBookingRecord } from '../../src/services/bookingService';
import { setupTest , tearDown } from '../helper/setup';

describe('Test Booking Wrapper Functions', ()=>{
    let userId: string;
    let token: string;
    beforeAll(async () => {
        const user = await setupTest();
        userId = user.userId;
        token = user.token;
    });

    afterAll(async()=>{
        tearDown();
    })

    test('Test createBookingRecord', async()=>{
        const create = await createBookingRecord({
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
    })
})