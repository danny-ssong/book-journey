import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

// Prisma 7은 Driver Adapter 방식 — connection은 어댑터가 관리한다
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Next.js dev 환경에서 HMR로 Prisma Client가 중복 인스턴스화되는 것을 막는 싱글톤
export const prisma = globalThis.prismaClient ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaClient = prisma;
}
