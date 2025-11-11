import { Locator, Page } from "@playwright/test";

export class BookPage {
  readonly page: Page;
  readonly bookInfo: Locator;
  readonly postCards: Locator;
  readonly writePostButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookInfo = this.page.getByRole("region", { name: "책 정보" });
    this.postCards = this.page.getByRole("list", { name: "책 포스트 목록" }).getByRole("article");
    this.writePostButton = this.bookInfo.getByRole("button", { name: "글 쓰기" });
  }

  getBookTitle() {
    return this.bookInfo.getByLabel("책 제목");
  }

  getPostCard(postTitle: string) {
    return this.postCards.filter({ hasText: postTitle }).first();
  }

  async goto() {
    await this.page.goto("/books/9791130616650");
  }

  async clickWritePostButton() {
    await this.writePostButton.click();
  }
}
