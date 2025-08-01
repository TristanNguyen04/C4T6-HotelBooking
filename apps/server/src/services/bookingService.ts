import prisma from '../utils/prismaClient';

interface BookingInput {
  userId: string;
  hotelId: string;
  hotelName: string;
  roomKey: string;
  roomDescription: string;
  roomImage?: string;
  request?: string;
  guestName: string;
  guestNumber: string;
  checkin: string;
  checkout: string;
  guests: string;
  baseRateInCurrency: number;
  includedTaxesAndFeesInCurrency: number;
  sessionId: string;
}

export const createBookingRecord = async (booking: BookingInput) => {
  return prisma.booking.create({
    data: {
      userId: booking.userId,
      hotelId: booking.hotelId,
      hotelName: booking.hotelName,
      roomKey: booking.roomKey,
      roomDescription: booking.roomDescription,
      roomImage: booking.roomImage,
      request: booking.request,
      guestName: booking.guestName,
      guestNumber: booking.guestNumber,
      checkin: new Date(booking.checkin),
      checkout: new Date(booking.checkout),
      guests: booking.guests,
      baseRateInCurrency: booking.baseRateInCurrency,
      includedTaxesAndFeesInCurrency: booking.includedTaxesAndFeesInCurrency,
      stripeSessionId: booking.sessionId,
    }
  });
};

export const retrieveBookingRecord = async (userId: string) => {
  return prisma.booking.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
