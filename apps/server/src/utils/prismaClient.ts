import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from "@prisma/client";

// use the same prisma connection
const isTestEnv = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'jest';

// Check if DATABASE_URL exists
if (!process.env.DATABASE_URL && !isTestEnv) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const dbUrl = isTestEnv
  ? 'postgresql://hotelproject:hotelproject@localhost:5432/db_test'
  : process.env.DATABASE_URL;

console.log('Prisma is connecting to DB URL:', dbUrl);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl
    },
  },
});

export default prisma;

export const fuzzPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_TEST_URL!,
    },
  },
});