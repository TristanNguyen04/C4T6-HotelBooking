import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface BookingInput {
  userId: string;
  hotelId: string;
  hotelName: string;
  checkin: string;
  checkout: string;
  guests: string;
  price: number;
  currency: string;
  sessionId: string;
}

export const createBookingRecord = async (booking: BookingInput) => {
  return prisma.booking.create({
    data: {
      userId: booking.userId,
      hotelId: booking.hotelId,
      hotelName: booking.hotelName,
      checkin: new Date(booking.checkin),
      checkout: new Date(booking.checkout),
      guests: booking.guests,
      price: booking.price,
      currency: booking.currency,
      stripeSessionId: booking.sessionId,
    }
  });
};
