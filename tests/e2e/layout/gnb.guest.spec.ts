import { expect, test } from "@playwright/test";
import { GNBPage } from "./gnb.page";

let gnbPage: GNBPage;

test.beforeEach(async ({ page }) => {
  gnbPage = new GNBPage(page);
  await gnbPage.goto();
});

test("홈 링크를 클릭하면 홈 페이지로 이동한다.", async ({ page }) => {
  await gnbPage.clickHomeLink();
  await expect(page).toHaveURL("/");
});

test("로그인 버튼 클릭 시 구글 로그인 주소로 이동한다.", async ({ page }) => {
  await gnbPage.login();
  await expect(page).toHaveURL(new RegExp("accounts.google.com"));
});
