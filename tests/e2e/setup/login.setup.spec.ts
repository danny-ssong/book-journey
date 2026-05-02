import { test as setup } from "@playwright/test";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const authFile = "tests/e2e/.auth.json";

// OAuth-only 테스트 유저는 encrypted_password가 비어있다.
// admin API로 임시 password를 세팅한 뒤 password grant로 세션을 발급해
// @supabase/ssr이 직접 만든 쿠키를 그대로 Playwright context에 주입한다.
// → Google OAuth UI를 거치지 않으므로 "browser may not be secure" 차단을 피한다.
const TEST_PASSWORD = "e2e-test-password";

setup("admin API로 세션 발급 후 storageState 저장", async ({ browser }) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  const email = process.env.TEST_USER_EMAIL;
  const baseURL = process.env.TEST_BASE_URL;

  if (!supabaseUrl || !anonKey || !secretKey || !email || !baseURL) {
    throw new Error(
      "필수 환경변수 누락: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY, TEST_USER_EMAIL, TEST_BASE_URL",
    );
  }

  // admin API가 운영 유저 비밀번호를 덮어쓰지 못하도록 호스트 가드.
  // SUPABASE_SECRET_KEY/TEST_USER_EMAIL이 운영 값으로 잘못 세팅되어도
  // localhost가 아니면 즉시 실패한다.
  const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);
  const supabaseHost = new URL(supabaseUrl).hostname;
  const baseHost = new URL(baseURL).hostname;
  if (!LOCAL_HOSTS.has(supabaseHost) || !LOCAL_HOSTS.has(baseHost)) {
    throw new Error(
      `E2E setup은 localhost에서만 실행 가능합니다. supabase=${supabaseHost}, base=${baseHost}`,
    );
  }

  // 1. admin client로 테스트 유저 찾고 임시 password 세팅
  const admin = createClient(supabaseUrl, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: list, error: listErr } = await admin.auth.admin.listUsers();
  if (listErr) throw listErr;
  const user = list.users.find((u) => u.email === email);
  if (!user) {
    throw new Error(
      `테스트 유저(${email})가 DB에 없습니다. tests/e2e/fixture/seed.sql을 확인하세요.`,
    );
  }

  const { error: updateErr } = await admin.auth.admin.updateUserById(user.id, {
    password: TEST_PASSWORD,
  });
  if (updateErr) throw updateErr;

  // 2. @supabase/ssr server client로 signInWithPassword → setAll 콜백으로 쿠키 캡처
  const captured: { name: string; value: string; options: CookieOptions }[] =
    [];
  const ssr = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll: () => [],
      setAll: (cookies) => {
        captured.push(...cookies);
      },
    },
  });

  const { error: signInErr } = await ssr.auth.signInWithPassword({
    email,
    password: TEST_PASSWORD,
  });
  if (signInErr) throw signInErr;

  if (captured.length === 0) {
    throw new Error(
      "signInWithPassword 후 캡처된 쿠키가 없습니다. @supabase/ssr 동작 확인 필요.",
    );
  }

  // 3. Playwright context에 쿠키 주입 후 storageState 저장
  // cookie 라이브러리 포맷 → Playwright 포맷 변환:
  //   sameSite는 소문자 → 파스칼, maxAge는 → expires(unix sec), domain은 직접 채움
  const { hostname } = new URL(baseURL);
  const nowSec = Math.floor(Date.now() / 1000);
  const context = await browser.newContext();
  await context.addCookies(
    captured.map(({ name, value, options }) => ({
      name,
      value,
      domain: hostname,
      path: options.path ?? "/",
      httpOnly: options.httpOnly ?? false,
      secure: options.secure ?? false,
      sameSite:
        options.sameSite === "strict" || options.sameSite === true
          ? "Strict"
          : options.sameSite === "none"
            ? "None"
            : "Lax",
      expires:
        options.expires instanceof Date
          ? Math.floor(options.expires.getTime() / 1000)
          : typeof options.maxAge === "number"
            ? nowSec + options.maxAge
            : -1,
    })),
  );
  await context.storageState({ path: authFile });
  await context.close();
});
