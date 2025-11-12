import { expect, test as base } from "@playwright/test";
import { GNBPage } from "./gnb.page";

const test = base.extend<{ gnbPage: GNBPage }>({
  gnbPage: async ({ page }, use) => {
    const gnbPage = new GNBPage(page);
    await gnbPage.goto();
    await use(gnbPage);
  },
});

test("홈 링크를 클릭하면 홈 페이지로 이동한다.", async ({ page, gnbPage }) => {
  await gnbPage.clickHomeLink();
  await expect(page).toHaveURL("/");
});

test("로그인 버튼 클릭 시 구글 로그인 주소로 이동한다.", async ({ page, gnbPage }) => {
  await gnbPage.login();
  await expect(page).toHaveURL(new RegExp("accounts.google.com"));
});
