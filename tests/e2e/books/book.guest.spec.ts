import { expect, test } from "@playwright/test";
import { BookPage } from "./book.page";

let bookPage: BookPage;

test.beforeEach(async ({ page }) => {
  bookPage = new BookPage(page);
  await bookPage.goto();
});

test("글 쓰기 버튼 클릭 시 로그인페이지로 이동해야 한다.", async ({ page }) => {
  const bookPage = new BookPage(page);
  await bookPage.clickWritePostButton();
  await expect(page).toHaveURL(new RegExp("accounts.google.com"));
});
