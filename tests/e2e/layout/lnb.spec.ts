import { test as base, expect } from "@playwright/test";
import { LNBPage } from "./lnb.page";

const test = base.extend<{ lnbPage: LNBPage }>({
  lnbPage: async ({ page }, use) => {
    const lnbPage = new LNBPage(page);
    await lnbPage.goto();
    await use(lnbPage);
  },
});

test("글쓰기 버튼 클릭 시 해당 페이지로 이동한다.", async ({ page, lnbPage }) => {
  await lnbPage.clickWritePost();
  await expect(page).toHaveURL("/posts/new");
});

test("글 관리 클릭 시 해당 페이지로 이동한다.", async ({ page, lnbPage }) => {
  await lnbPage.clickManageMyPosts();
  await expect(page).toHaveURL("/manage/posts");
});

test("프로필 관리 클릭 시 해당 페이지로 이동한다.", async ({ page, lnbPage }) => {
  await lnbPage.clickManageMyProfile();
  await expect(page).toHaveURL("/manage/settings/profile");
});

test("독서 통계 클릭 시 해당 페이지로 이동한다.", async ({ page, lnbPage }) => {
  await lnbPage.clickMyStatistics();
  await expect(page).toHaveURL("/manage/statistics");
});
