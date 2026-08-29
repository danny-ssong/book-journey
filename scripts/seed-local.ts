/**
 * 로컬 Supabase DB를 E2E fixture(tests/e2e/fixture/seed.sql) 기준으로 초기화한다.
 *
 * 진입점:
 *   - CLI:        scripts/seed-local-cli.ts → `npm run db:reset:fixture`
 *   - Playwright: tests/e2e/fixture/db-reset.setup.ts (globalSetup)
 *
 * 흐름:
 *   1. 구 cross-schema FK 정리 (예전 로컬 DB에 남아 있을 수 있음)
 *   2. prisma db push       — schema.prisma 기준 public 테이블 sync
 *   3. 트리거 마이그레이션    — auth.users ↔ profile 동기화 트리거 부착
 *   4. TRUNCATE CASCADE     — 도메인 + auth 테이블 초기화
 *   5. fixture seed.sql 적용
 *
 * 3번은 운영에 적용되는 마이그레이션 파일을 그대로 실행한다. 같은 SQL을 두 곳에
 * 복사해두면 반드시 어긋나므로, 로컬도 단일 원본을 참조한다.
 * Tiptap 작업(quote 테이블)이 마이그레이션으로 편입되면 2~3번은
 * `prisma migrate reset` 한 줄로 대체된다.
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
const TRIGGERS_MIGRATION_PATH = path.resolve(
  process.cwd(),
  'prisma/migrations/20260626000001_auth_user_sync_triggers/migration.sql',
)

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

// cross-schema FK는 더 이상 만들지 않지만(Prisma introspection이 P4002로 실패한다),
// 전환 이전에 만들어진 로컬 DB에는 남아 있을 수 있다. 이미 정리되었으면 NO-OP.
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
  if (!existsSync(TRIGGERS_MIGRATION_PATH)) {
    throw new Error(`트리거 마이그레이션 없음: ${TRIGGERS_MIGRATION_PATH}`)
  }

  console.log(`적용 대상: 로컬(${CONTAINER})`)
  console.log('SEED: tests/e2e/fixture/seed.sql')
  console.log('')

  runSql(PRE_PUSH_SQL, '구 cross-schema FK 정리')

  console.log('▶ prisma db push')
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' })

  runSql(readFileSync(TRIGGERS_MIGRATION_PATH, 'utf8'), 'auth.users 동기화 트리거')
  runSql(CLEANUP_SQL, 'TRUNCATE CASCADE')
  runSql(readFileSync(FIXTURE_SEED_PATH, 'utf8'), 'tests/e2e/fixture/seed.sql')

  console.log('')
  console.log('✓ 완료')
}
