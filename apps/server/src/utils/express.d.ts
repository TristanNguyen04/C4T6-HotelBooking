import { PrismaClient } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
    }
  }
}

import { Request } from "express";

export interface PrismaRequest extends Request {
  prisma: PrismaClient;
}
