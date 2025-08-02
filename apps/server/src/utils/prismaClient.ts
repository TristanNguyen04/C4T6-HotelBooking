import { PrismaClient } from "@prisma/client";

// use the same prisma connection
const prisma = new PrismaClient();

export default prisma;

export const fuzzPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_TEST_URL!,
    },
  },
});