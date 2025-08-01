"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// use the same prisma connection
const prisma = new client_1.PrismaClient();
exports.default = prisma;
