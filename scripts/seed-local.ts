/**
 * 로컬 Supabase DB를 E2E fixture(tests/e2e/fixture/seed.sql) 기준으로 초기화한다.
 *
 * 진입점:
 *   - CLI:        scripts/seed-local-cli.ts → `npm run db:reset:fixture`
 *   - Playwright: tests/e2e/fixture/db-reset.setup.ts (globalSetup)
 *
 * 실제 흐름은 scripts/lib/apply-seed.ts 참고 (push → extras → cleanup → seed).
 *
 * fixture seed.sql 재생성 (스냅샷 갱신):
 *   docker exec supabase_db_book-journey pg_dump -U postgres -d postgres \
 *     --data-only --inserts --column-inserts --no-owner --no-acl \
 *     -t auth.users -t auth.identities \
 *     -t public.author -t public.book -t public.profile -t public.post \
 *     -t public.profile_most_read_author \
 *     > tests/e2e/fixture/seed.sql
 */
import { applySeed } from "./lib/apply-seed";

const FIXTURE_SEED_PATH = "tests/e2e/fixture/seed.sql";

export async function seedLocal(): Promise<void> {
  await applySeed(FIXTURE_SEED_PATH);
}
