import { PrismaClient } from "@prisma/client";

// use the same prisma connection
const prisma = new PrismaClient();

export default prisma;