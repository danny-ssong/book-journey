import { Locator, Page } from "@playwright/test";

export class SearchPage {
  readonly page: Page;
  readonly searchedBooks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchedBooks = this.page.getByRole("region", { name: "검색 결과" }).getByRole("article");
  }

  getSearchedBook(bookTitle: string) {
    return this.searchedBooks.filter({ hasText: bookTitle }).first();
  }

  async clickSearchedBookTitle(bookTitle: string) {
    await this.getSearchedBook(bookTitle).getByText(bookTitle, { exact: true }).click();
  }

  async goto() {
    await this.page.goto("/search?query=하루키");
  }

  async clickNextPageButton() {
    await this.page.getByRole("button", { name: "다음 페이지" }).click();
  }

  async clickPreviousPageButton() {
    await this.page.getByRole("button", { name: "이전 페이지" }).click();
  }
}
