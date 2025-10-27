import { test, expect } from "playwright/test";
import { LNBPage } from "./lnb.page";

let lnbPage: LNBPage;

test.beforeEach(async ({ page }) => {
  lnbPage = new LNBPage(page);
  await lnbPage.goto();
});

test("글쓰기 버튼 클릭 시 해당 페이지로 이동한다.", async ({ page }) => {
  await lnbPage.clickWritePost();
  await expect(page).toHaveURL("/posts/new");
});

test("글 관리 클릭 시 해당 페이지로 이동한다.", async ({ page }) => {
  await lnbPage.clickManageMyPosts();
  await expect(page).toHaveURL("/manage/posts");
});

test("프로필 관리 클릭 시 해당 페이지로 이동한다.", async ({ page }) => {
  await lnbPage.clickManageMyProfile();
  await expect(page).toHaveURL("/manage/settings/profile");
});

test("독서 통계 클릭 시 해당 페이지로 이동한다.", async ({ page }) => {
  await lnbPage.clickMyStatistics();
  await expect(page).toHaveURL("/manage/statistics");
});
