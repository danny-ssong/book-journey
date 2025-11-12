import { test as setup, expect } from "@playwright/test";
import { existsSync } from "fs";

export const authFile = "tests/e2e/.auth.json";

setup("authenticate with Google", async ({ page, browser }) => {
  if (existsSync(authFile)) {
    const context = await browser.newContext({ storageState: authFile });
    const testPage = await context.newPage();

    try {
      await testPage.goto("/");
      const logoutButton = testPage.getByRole("button", { name: "로그아웃 버튼" });
      await logoutButton.waitFor({ state: "visible", timeout: 3000 });

      console.log("✅ Auth file이 유효합니다. 로그인 프로세스를 건너뜁니다.");
      await context.close();
      return;
    } catch (error) {
      console.log("⚠️ Auth file이 만료되었습니다. 재로그인을 진행합니다.");
      await context.close();
    }
  }

  console.log("🔐 Starting Google OAuth login...");
  await page.goto("/login");

  // Google OAuth 페이지로 리다이렉트 대기
  await page.waitForURL("**/accounts.google.com/**");

  // 이메일 입력
  await page.fill('input[type="email"]', process.env.TEST_GOOGLE_EMAIL!);
  await page.click("#identifierNext");

  // 비밀번호 입력 (페이지 로드 대기)
  await page.waitForSelector('input[type="password"]', { state: "visible" });
  await page.fill('input[type="password"]', process.env.TEST_GOOGLE_PASSWORD!);
  await page.click("#passwordNext");

  await page.getByText("계속").waitFor({ state: "visible", timeout: 5000 });
  await page.getByText("계속").click();

  // 앱으로 리다이렉트 대기 (성공적으로 로그인됨)
  await page.waitForURL("/");

  // 로그인 상태 확인
  await expect(page.locator("text=로그인")).not.toBeVisible();

  // 인증 상태를 파일에 저장
  await page.context().storageState({ path: authFile });
});
