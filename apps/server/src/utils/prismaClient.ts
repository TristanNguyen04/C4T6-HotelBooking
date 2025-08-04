import dotenv from 'dotenv';
dotenv.config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DATABASE_TEST_URL:', process.env.DATABASE_TEST_URL);

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