import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Optionally reset and seed test DB
  await prisma.$executeRaw`TRUNCATE TABLE "User", "Booking" RESTART IDENTITY CASCADE;`;
  await  prisma.booking.deleteMany();
  await  prisma.user.deleteMany();
});

afterAll(async () => {
  await  prisma.booking.deleteMany();
  await  prisma.user.deleteMany();
  await prisma.$disconnect();
});
