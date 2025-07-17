import { PrismaClient } from '@prisma/client';

// สร้าง Prisma Client instance แบบ global
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 