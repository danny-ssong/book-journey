/**
 * 임의의 seed SQL 파일을 Supabase DB에 적용하는 공통 로직.
 *
 * 흐름 (4단계):
 *   1. prisma db push   — schema.prisma 기준으로 public 테이블 sync
 *   2. schema-extras.sql — Prisma 자동 생성 FK 제거 + cross-schema FK 부착
 *   3. CLEANUP_SQL      — 도메인 + auth 테이블 TRUNCATE CASCADE
 *   4. SEED 파일        — INSERT 데이터 적용
 *
 * 호출 예:
 *   await applySeed("tests/e2e/fixture/seed.sql");   // E2E fixture
 *   await applySeed("migration-seed.sql");           // RDS 변환본
 *
 * 환경:
 *   process.env.TARGET_DB_URL이 있으면 운영 Supabase에 적용,
 *   없으면 로컬 supabase_db_book-journey 컨테이너에 적용.
 */
import { execSync, spawnSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import path from "path";

const CONTAINER = "supabase_db_book-journey";
const EXTRAS_PATH = path.resolve(process.cwd(), "supabase/schema-extras.sql");

// RESTART IDENTITY는 cascade된 auth.* sequence까지 reset 시도 → 운영 supabase에서는
// auth.refresh_tokens_id_seq 등의 owner가 아니라 권한 거부. sequence는 seed 파일의
// setval로 보정하므로 RESTART IDENTITY 없이 그냥 CASCADE만 사용.
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
`;

// db push의 introspection이 cross-schema FK를 만나면 실패 → 사전에 떼어둔다.
// 옛 camelCase 제약명(snake_case 전환 이전)도 함께 드롭 — 한 번 정리되면 NO-OP.
const PRE_PUSH_SQL = `
ALTER TABLE IF EXISTS public.post DROP CONSTRAINT IF EXISTS post_user_id_auth_fkey;
ALTER TABLE IF EXISTS public.profile DROP CONSTRAINT IF EXISTS profile_user_id_auth_fkey;
ALTER TABLE IF EXISTS public.post DROP CONSTRAINT IF EXISTS "post_userId_auth_fkey";
ALTER TABLE IF EXISTS public.profile DROP CONSTRAINT IF EXISTS "profile_userId_auth_fkey";
`;

// TARGET_DB_URL에 비번을 박지 않고 SUPABASE_DB_PASSWORD env로 분리할 수 있게 합성한다.
// shell history와 docker process list에서 비번 노출을 줄이는 용도.
// URL.password setter가 일부 문자에서 truncate되는 케이스가 있어 string-replace로 직접 합성.
function targetDbUrl(): string | undefined {
  const raw = process.env.TARGET_DB_URL;
  if (!raw) return undefined;
  const pwd = process.env.SUPABASE_DB_PASSWORD;
  if (!pwd) return raw;
  // 이미 비번이 박혀있으면 그대로
  if (/^\w+:\/\/[^@/]+:[^@/]+@/.test(raw)) return raw;
  // user@host → user:pwd@host
  return raw.replace(/^(\w+:\/\/[^@/]+)@/, `$1:${encodeURIComponent(pwd)}@`);
}

// 비번에 shell 메타문자가 들어있어도 안전하도록 spawnSync로 argv 직접 전달.
// (execSync(string)은 shell 경유라 URL 안의 "/$/!/` 등에서 인용이 깨질 수 있음)
function buildDockerArgs(): string[] {
  const url = targetDbUrl();
  if (url) {
    // 호스트에 psql 없을 수 있어 일회용 컨테이너 경유
    return ["run", "--rm", "-i", "postgres:17", "psql", "-v", "ON_ERROR_STOP=1", url];
  }
  return [
    "exec",
    "-e",
    "PGPASSWORD=postgres",
    "-i",
    CONTAINER,
    "psql",
    "-v",
    "ON_ERROR_STOP=1",
    "-U",
    "supabase_admin",
    "-h",
    "localhost",
    "-d",
    "postgres",
  ];
}

function runSql(sql: string, label: string): void {
  console.log(`▶ ${label} (${(sql.length / 1024).toFixed(1)} KB)`);
  const result = spawnSync("docker", buildDockerArgs(), {
    input: sql,
    stdio: ["pipe", "inherit", "inherit"],
  });
  if (result.status !== 0) {
    throw new Error(`psql 실행 실패 (exit ${result.status})`);
  }
}

function pushPrismaSchema(): void {
  console.log("▶ prisma db push");
  const env: NodeJS.ProcessEnv = { ...process.env };
  const url = targetDbUrl();
  if (url) {
    env.DATABASE_URL = url;
    env.DIRECT_URL = url;
  }
  execSync("npx prisma db push --accept-data-loss", { stdio: "inherit", env });
}

export async function applySeed(seedPath: string): Promise<void> {
  const absoluteSeedPath = path.resolve(process.cwd(), seedPath);

  if (!existsSync(absoluteSeedPath)) {
    throw new Error(`SEED 파일 없음: ${absoluteSeedPath}`);
  }
  if (!existsSync(EXTRAS_PATH)) {
    throw new Error(`schema-extras.sql 없음: ${EXTRAS_PATH}`);
  }

  console.log(
    `적용 대상: ${targetDbUrl() ? "운영(TARGET_DB_URL)" : `로컬(${CONTAINER})`}`,
  );
  console.log(`SEED: ${seedPath}`);
  console.log("");

  // 0. cross-schema FK 사전 분리
  runSql(PRE_PUSH_SQL, "cross-schema FK 사전 분리");

  // 1. Prisma 스키마 sync
  pushPrismaSchema();

  // 2. cross-schema FK 재부착
  runSql(readFileSync(EXTRAS_PATH, "utf8"), "schema-extras.sql");

  // 3. 기존 데이터 제거
  runSql(CLEANUP_SQL, "TRUNCATE CASCADE");

  // 4. seed 적용
  runSql(readFileSync(absoluteSeedPath, "utf8"), seedPath);

  console.log("");
  console.log("✓ 완료");
}
