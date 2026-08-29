import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

/**
 * 운영 DB 전용 Prisma 설정.
 *
 * 기본 설정(prisma.config.ts)은 .env.local — 즉 로컬 DB만 가리킨다.
 * 운영에 붙는 명령은 항상 --config 로 이 파일을 명시해야만 동작하므로,
 * 실수로 운영 DB에 db push / migrate reset 이 실행되는 것을 구조적으로 막는다.
 *
 *   npx prisma migrate status --config prisma.prod.config.ts
 *   npx prisma migrate deploy --config prisma.prod.config.ts
 *
 * migrate 계열은 prepared statement를 쓰므로 pooler(6543)가 아닌 DIRECT_URL(5432)을 사용한다.
 */
config({ path: '.env.prod', override: true })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DIRECT_URL'],
  },
})
