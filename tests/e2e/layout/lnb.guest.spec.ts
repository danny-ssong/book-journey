import { test as base, expect } from "@playwright/test";
import { LNBPage } from "./lnb.page";

const test = base.extend<{ lnbPage: LNBPage }>({
  lnbPage: async ({ page }, use) => {
    const lnbPage = new LNBPage(page);
    await lnbPage.goto();
    await use(lnbPage);
  },
});

test("글쓰기 버튼 클릭 시 로그인 페이지로 이동한다.", async ({ page, lnbPage }) => {
  await lnbPage.clickWritePost();
  await expect(page).toHaveURL(new RegExp("accounts.google.com"));
});

test("LNB에서 '글 관리', '프로필 관리', '독서 통계' 링크가 보이지 않아야 한다.", async ({ page, lnbPage }) => {
  await expect(lnbPage.lnb.getByText("글 관리")).not.toBeVisible();
  await expect(lnbPage.lnb.getByText("프로필 관리")).not.toBeVisible();
  await expect(lnbPage.lnb.getByText("독서 통계")).not.toBeVisible();
});
