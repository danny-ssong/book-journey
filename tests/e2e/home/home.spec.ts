import { test, expect } from "@playwright/test";
import { HomePage } from "./home.page";

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

test("최신 포스트들이 보여야 한다.", async ({ page }) => {
  await expect(page.getByText("무라카미 하루키는 어렵다").first()).toBeVisible();
  await expect(page.getByText("밸런타인데이의 무말랭이").first()).toBeVisible();
  await expect(page.getByText("코끼리 공장의 해피엔드").first()).toBeVisible();
  await expect(page.getByText("브릿마리 여기 있다").first()).toBeVisible();
});

test("포스트의 책 제목을 클릭하면 책 상세 페이지로 이동한다.", async ({ page }) => {
  await homePage.clickBookTitleInPost("1Q84 3");
  await expect(page).toHaveURL("/books/9788954611800");
});

test("포스트의 저자 이름을 클릭하면 저자 상세 페이지로 이동한다.", async ({ page }) => {
  await homePage.clickAuthorNameInPost("무라카미 하루키");
  await expect(page).toHaveURL("search?query=무라카미 하루키");
});

test("포스트의 제목을 클릭하면 포스트 상세 페이지로 이동한다.", async ({ page }) => {
  await homePage.clickPostTitleInPost("1Q84 3 제목");
  await expect(page).toHaveURL("/posts/61");
});

test("포스트의 내용을 클릭하면 포스트 상세 페이지로 이동한다.", async ({ page }) => {
  await homePage.clickContentInPost("1Q84 3 감상");
  await expect(page).toHaveURL("/posts/61");
});

test("포스트의 작성자 이름을 클릭하면 사용자 상세 페이지로 이동한다.", async ({ page }) => {
  await homePage.clickUserNameInPost("excited-tree");
  await expect(page).toHaveURL("/users/91803ee8-3e35-42a7-88c9-9b3feb9b2771");
});

test("무한스크롤 - 스크롤을 끝까지 내리면 추가 포스트를 불러온다.", async ({ page }) => {
  await homePage.scrollToBottom();
  await expect(page.getByText("위너 1")).toBeVisible();
});
