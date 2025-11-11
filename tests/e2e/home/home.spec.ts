import { test as base, expect } from "@playwright/test";
import { HomePage } from "./home.page";

const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
});

test("최신 포스트들이 보여야 한다.", async ({ homePage }) => {
  await expect(homePage.getPostCardByPostTitle("무라카미 하루키는 어렵다")).toBeVisible();
  await expect(homePage.getPostCardByPostTitle("밸런타인데이의 무말랭이")).toBeVisible();
  await expect(homePage.getPostCardByPostTitle("코끼리 공장의 해피엔드")).toBeVisible();
  await expect(homePage.getPostCardByPostTitle("브릿마리 여기 있다")).toBeVisible();
});

test("비공개 포스트는 보이지 않는다.", async ({ homePage }) => {
  await expect(homePage.getPostCardByPostTitle("소확행은 비공개 포스트")).not.toBeVisible();
});

test("포스트의 저자 이름을 클릭하면 저자 상세 페이지로 이동한다.", async ({ page, homePage }) => {
  await homePage.clickAuthorNameInPost("무라카미 하루키");
  await expect(page).toHaveURL("search?query=무라카미 하루키");
});

test("포스트의 책 제목을 클릭하면 책 상세 페이지로 이동한다.", async ({ page, homePage }) => {
  await homePage.clickBookTitleInPost("1Q84 1");
  await expect(page).toHaveURL("/books/9788954608640");
});

test("포스트의 제목을 클릭하면 포스트 상세 페이지로 이동한다.", async ({ page, homePage }) => {
  await homePage.clickPostTitleInPost("1Q84 1 제목");
  await expect(page).toHaveURL("/posts/59");
});

test("포스트의 내용을 클릭하면 포스트 상세 페이지로 이동한다.", async ({ page, homePage }) => {
  await homePage.clickContentInPost("1Q84 1 감상");
  await expect(page).toHaveURL("/posts/59");
});

test("포스트의 작성자 이름을 클릭하면 사용자 상세 페이지로 이동한다.", async ({ page, homePage }) => {
  await homePage.clickUserNameInPost("excited-tree");
  await expect(page).toHaveURL("/users/91803ee8-3e35-42a7-88c9-9b3feb9b2771");
});

test("무한스크롤 - 스크롤을 끝까지 내리면 추가 포스트를 불러온다.", async ({ page, homePage }) => {
  await homePage.scrollToBottom();
  await expect(page.getByText("위너 1")).toBeVisible();
});
