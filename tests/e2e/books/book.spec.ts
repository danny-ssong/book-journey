import { expect, test } from "@playwright/test";
import { BookPage } from "./book.page";

let bookPage: BookPage;

test.beforeEach(async ({ page }) => {
  bookPage = new BookPage(page);
  await bookPage.goto();
});

test("책 타이틀이 보여야 한다.", async ({ page }) => {
  await expect(bookPage.getBookInfo()).toBeVisible();
});

test("책 포스트 목록이 보여야 한다.", async ({ page }) => {
  const postCard = bookPage.getPostCard("타이틀");
  await expect(postCard).toBeVisible();
});

test("글 쓰기 버튼 클릭 시 글 작성 페이지로 이동해야 하며, 책 제목이 입력되어 있어야 한다.", async ({ page }) => {
  await bookPage.clickWritePostButton();
  await expect(page).toHaveURL("/posts/new?isbn=9791130616650");
  await expect(page.getByPlaceholder("책 제목을 검색하세요...")).toHaveValue("베어타운");
});
