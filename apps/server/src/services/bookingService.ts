import { PrismaClient } from '@prisma/client';

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

export const retrieveBookingRecord = async (prisma: PrismaClient , userId: string) => {
  return prisma.booking.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
