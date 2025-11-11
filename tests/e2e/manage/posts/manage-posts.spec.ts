import { expect, test as base } from "@playwright/test";
import { ManagePostsPage } from "./manage-posts.page";

const test = base.extend<{ managePostsPage: ManagePostsPage }>({
  managePostsPage: async ({ page }, use) => {
    const managePostsPage = new ManagePostsPage(page);
    await managePostsPage.goto();
    await use(managePostsPage);
  },
});

test("자신의 비공개 포스트가 보여야 한다.", async ({ page, managePostsPage }) => {
  await expect(page.getByText("소확행은 비공개 포스트").first()).toBeVisible();
});

test("다른 사용자의 포스트는 보이지 않는다.", async ({ page, managePostsPage }) => {
  await expect(page.getByText("브릿마리 여기 있다는 다른 사용자 포스트").first()).not.toBeVisible();
});

test("간단히 보기 View에서는 책 이미지가 보이지 않는다.", async ({ page, managePostsPage }) => {
  await managePostsPage.toggleView(false);
  await expect(managePostsPage.getPostCardImage("밸런타인데이의 무말랭이")).not.toBeVisible();
});

test("포스트 수정 페이지로 이동할 수 있다.", async ({ page, managePostsPage }) => {
  await managePostsPage.goToEditPage("밸런타인데이의 무말랭이");
  await expect(page).toHaveURL("/posts/edit/65");
});

test("포스트를 삭제할 수 있다.", async ({ page, managePostsPage }) => {
  await managePostsPage.deletePost("코끼리 공장의 해피엔드는 삭제될 포스트");
  await expect(page.getByText("코끼리 공장의 해피엔드는 삭제될 포스트").first()).not.toBeVisible();
});

test("무한스크롤 - 스크롤을 끝까지 내리면 추가 포스트를 불러온다.", async ({ page, managePostsPage }) => {
  await managePostsPage.scrollToBottom();
  await expect(page.getByText("위너 1")).toBeVisible();
});
