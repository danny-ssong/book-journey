import { expect, test as base } from "@playwright/test";
import { SearchPage } from "./search.page";

const test = base.extend<{ searchPage: SearchPage }>({
  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await use(searchPage);
  },
});

test("하루키로 검색하면 검색 결과가 10개 표시되어야 한다.", async ({ page, searchPage }) => {
  await expect(searchPage.searchedBooks).toHaveCount(10);
});

test("검색 결과 중 책 제목을 클릭하면 해당 책 상세 페이지로 이동해야 한다.", async ({ page, searchPage }) => {
  await searchPage.clickSearchedBookTitle("달리기를 말할 때 내가 하고 싶은 이야기");
  await expect(page).toHaveURL(new RegExp("/books/[0-9]+"));
});

test("다음 페이지로 이동하면 새로운 검색 결과가 표시되어야 한다.", async ({ page, searchPage }) => {
  await searchPage.clickNextPageButton();

  const firstPageBook = searchPage.getSearchedBook("달리기를 말할 때 내가 하고 싶은 이야기");
  const secondPageBook = searchPage.getSearchedBook("먼 북소리");

  await expect(firstPageBook).not.toBeVisible();
  await expect(secondPageBook).toBeVisible();
});

test("다음 페이지로 갔다가 이전 페이지로 돌아오면 첫 페이지 결과가 표시되어야 한다.", async ({ page, searchPage }) => {
  await searchPage.clickNextPageButton();
  await searchPage.clickPreviousPageButton();

  const firstPageBook = searchPage.getSearchedBook("달리기를 말할 때 내가 하고 싶은 이야기");
  const secondPageBook = searchPage.getSearchedBook("먼 북소리");

  await expect(firstPageBook).toBeVisible();
  await expect(secondPageBook).not.toBeVisible();
});
