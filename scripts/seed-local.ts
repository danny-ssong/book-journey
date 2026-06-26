/**
 * 로컬 Supabase DB를 E2E fixture(tests/e2e/fixture/seed.sql) 기준으로 초기화한다.
 *
 * 진입점:
 *   - CLI:        scripts/seed-local-cli.ts → `npm run db:reset:fixture`
 *   - Playwright: tests/e2e/fixture/db-reset.setup.ts (globalSetup)
 *
 * 흐름:
 *   1. cross-schema FK 사전 분리 (prisma db push 실패 방지)
 *   2. prisma db push       — schema.prisma 기준 public 테이블 sync
 *   3. schema-extras.sql    — Prisma 자동 생성 FK 제거 + cross-schema FK 부착
 *   4. TRUNCATE CASCADE     — 도메인 + auth 테이블 초기화
 *   5. fixture seed.sql 적용
 *
 * fixture seed.sql 재생성:
 *   docker exec supabase_db_book-journey pg_dump -U postgres -d postgres \
 *     --data-only --inserts --column-inserts --no-owner --no-acl \
 *     -t auth.users -t auth.identities \
 *     -t public.author -t public.book -t public.profile -t public.post \
 *     -t public.profile_most_read_author \
 *     > tests/e2e/fixture/seed.sql
 */
import { execSync, spawnSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import path from 'path'

const CONTAINER = 'supabase_db_book-journey'
const FIXTURE_SEED_PATH = path.resolve(process.cwd(), 'tests/e2e/fixture/seed.sql')
const EXTRAS_PATH = path.resolve(process.cwd(), 'supabase/schema-extras.sql')

// RESTART IDENTITY는 cascade된 auth.* sequence까지 reset 시도 → 권한 거부 가능.
// sequence는 seed 파일의 setval로 보정하므로 CASCADE만 사용.
const CLEANUP_SQL = `
TRUNCATE
  public.profile_most_read_author,
  public.post,
  public.profile,
  public.book,
  public.author,
  auth.identities,
  auth.users
CASCADE;
`

// db push의 introspection이 cross-schema FK를 만나면 실패 → 사전에 떼어둔다.
// 옛 camelCase 제약명도 함께 드롭 — 이미 정리되었으면 NO-OP.
const PRE_PUSH_SQL = `
ALTER TABLE IF EXISTS public.post DROP CONSTRAINT IF EXISTS post_user_id_auth_fkey;
ALTER TABLE IF EXISTS public.post DROP CONSTRAINT IF EXISTS "post_userId_auth_fkey";
ALTER TABLE IF EXISTS public.profile DROP CONSTRAINT IF EXISTS profile_user_id_auth_fkey;
ALTER TABLE IF EXISTS public.profile DROP CONSTRAINT IF EXISTS "profile_userId_auth_fkey";
ALTER TABLE IF EXISTS public.profile DROP CONSTRAINT IF EXISTS profile_id_auth_fkey;
`

function runSql(sql: string, label: string): void {
  console.log(`▶ ${label} (${(sql.length / 1024).toFixed(1)} KB)`)
  const result = spawnSync(
    'docker',
    [
      'exec',
      '-e',
      'PGPASSWORD=postgres',
      '-i',
      CONTAINER,
      'psql',
      '-v',
      'ON_ERROR_STOP=1',
      '-U',
      'supabase_admin',
      '-h',
      'localhost',
      '-d',
      'postgres',
    ],
    {
      input: sql,
      stdio: ['pipe', 'inherit', 'inherit'],
    },
  )
  if (result.status !== 0) {
    throw new Error(`psql 실행 실패 (exit ${result.status})`)
  }
}

export async function seedLocal(): Promise<void> {
  if (!existsSync(FIXTURE_SEED_PATH)) {
    throw new Error(`SEED 파일 없음: ${FIXTURE_SEED_PATH}`)
  }
  if (!existsSync(EXTRAS_PATH)) {
    throw new Error(`schema-extras.sql 없음: ${EXTRAS_PATH}`)
  }

  console.log(`적용 대상: 로컬(${CONTAINER})`)
  console.log('SEED: tests/e2e/fixture/seed.sql')
  console.log('')

  runSql(PRE_PUSH_SQL, 'cross-schema FK 사전 분리')

  console.log('▶ prisma db push')
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })

  runSql(readFileSync(EXTRAS_PATH, 'utf8'), 'schema-extras.sql')
  runSql(CLEANUP_SQL, 'TRUNCATE CASCADE')
  runSql(readFileSync(FIXTURE_SEED_PATH, 'utf8'), 'tests/e2e/fixture/seed.sql')

  console.log('')
  console.log('✓ 완료')
}
