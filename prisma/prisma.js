import { PrismaClient } from '@prisma/client';

// Prevent starting multiple prisma clients
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;