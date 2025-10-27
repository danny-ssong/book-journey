import { test, expect } from "playwright/test";
import { LNBPage } from "./lnb.page";

let lnbPage: LNBPage;

test.beforeEach(async ({ page }) => {
  lnbPage = new LNBPage(page);
  await lnbPage.goto();
});

test("글쓰기 버튼 클릭 시 로그인 페이지로 이동한다.", async ({ page }) => {
  await lnbPage.clickWritePost();
  await expect(page).toHaveURL(new RegExp("accounts.google.com"));
});

test("LNB에서 '글 관리', '프로필 관리', '독서 통계' 링크가 보이지 않아야 한다.", async ({ page }) => {
  await expect(lnbPage.lnb.getByText("글 관리")).not.toBeVisible();
  await expect(lnbPage.lnb.getByText("프로필 관리")).not.toBeVisible();
  await expect(lnbPage.lnb.getByText("독서 통계")).not.toBeVisible();
});
