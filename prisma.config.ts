import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// 프로젝트는 .env가 아닌 .env.local을 사용한다 (Next.js 컨벤션 정렬)
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // 마이그레이션은 prepared statements를 사용하므로 pooler가 아닌 직접 연결을 쓴다.
  // Local에서는 DIRECT_URL = DATABASE_URL이지만 운영에서는 분리된다 (pooler 6543 vs direct 5432).
  // 런타임 PrismaClient는 src/lib/prisma.ts의 PrismaPg 어댑터가 별도로 DATABASE_URL을 사용한다.
  datasource: {
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
