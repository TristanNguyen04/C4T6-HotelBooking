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
                checkin: new Date('2025-08-01').toISOString(),
                checkout: new Date('2025-08-05').toISOString(),
                guests: "3",
                price: 1234,
                currency: "SGD",
                sessionId: "session123"
        });


        expect(create.userId).toBe(userId);
        expect(create.hotelId).toBe("Test123");
        expect(create.hotelName).toBe("Test Hotel");
        expect(create.checkin).toEqual(new Date('2025-08-01'));
        expect(create.checkout).toEqual(new Date('2025-08-05'));
        expect(create.guests).toBe("3");
        expect(create.price).toEqual(1234);
        expect(create.currency).toBe("SGD");
        expect(create.stripeSessionId).toBe("session123");
    })
})