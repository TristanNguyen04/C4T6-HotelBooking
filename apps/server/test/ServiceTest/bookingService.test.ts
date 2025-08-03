import prisma from '../../src/utils/prismaClient';
import { retrieveBookingRecord } from '../../src/services/bookingService';
import { setupTest , tearDown } from '../helper/setup';

describe('Test Booking Wrapper Functions', ()=>{
    let userId: string;
    let token: string;
    beforeAll(async () => {
        const user = await setupTest();
        userId = user.userId;
        token = user.token;
        await prisma.booking.createMany({
      data: [
        {
          userId: userId,
          hotelId: "h1",
          hotelName: "Hotel One",
          roomKey: "R1",
          roomDescription: "Description 1",
          guestName: "Guest 1",
          guestNumber: "12345678",
          checkin: new Date('2025-01-01'),
          checkout: new Date('2025-01-02'),
          guests: "1",
          baseRateInCurrency: 100,
          includedTaxesAndFeesInCurrency: 120,
          createdAt: new Date('2025-01-10'),
          stripeSessionId: '12345',
        },
        {
          userId: userId,
          hotelId: "h2",
          hotelName: "Hotel Two",
          roomKey: "R2",
          roomDescription: "Description 2",
          guestName: "Guest 2",
          guestNumber: "87654321",
          checkin: new Date('2025-02-01'),
          checkout: new Date('2025-02-02'),
          guests: "2",
          baseRateInCurrency: 200,
          includedTaxesAndFeesInCurrency: 240,
          createdAt: new Date('2025-02-10'),
          stripeSessionId: '12345'
        },
      ]
    });
    });

    afterAll(async()=>{
        tearDown();
    })
    test('should return bookings ordered by createdAt descending', async () => {
    const bookings = await retrieveBookingRecord(prisma, userId);

    expect(bookings.length).toBe(2);

    // Check order: latest createdAt first
    expect(new Date(bookings[0].createdAt) > new Date(bookings[1].createdAt)).toBe(true);

    // Check that the returned bookings belong to the user
    bookings.forEach(b => {
      expect(b.userId).toBe(userId);
    });
  });

  test('should return empty array if no bookings found', async () => {
    const bookings = await retrieveBookingRecord(prisma, 'nonexistent-user-id');
    expect(bookings).toEqual([]);
  });
    
}) 