/**
 * RDS dump을 변환한 migration-seed.sql을 Supabase DB에 적용한다.
 *
 * 사전:
 *   1. rds-staging 컨테이너에 RDS dump 적재 완료
 *   2. tsx scripts/build-migration-seed.ts → migration-seed.sql 생성
 *
 * 로컬:
 *   tsx scripts/apply-migration-seed.ts
 *
 * 운영(Supabase 클라우드) 컷오버:
 *   TARGET_DB_URL='postgresql://postgres:<pwd>@db.<ref>.supabase.co:5432/postgres' \
 *     tsx scripts/apply-migration-seed.ts
 *
 * 실제 흐름은 scripts/lib/apply-seed.ts 참고 (push → extras → cleanup → seed).
 */
import { applySeed } from "./lib/apply-seed";

const RDS_SEED_PATH = "migration-seed.sql";

applySeed(RDS_SEED_PATH).catch((err) => {
  console.error("실패:", err);
  process.exit(1);
});
