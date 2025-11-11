import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly postCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postCards = this.page.getByRole("region", { name: "최신 글" }).getByRole("article");
  }

  getPostCardByPostTitle(postTitle: string) {
    return this.postCards.filter({ hasText: postTitle }).first();
  }
  async goto() {
    await this.page.goto("/");
  }

  async clickBookTitleInPost(bookTitle: string) {
    await this.postCards.getByText(bookTitle, { exact: true }).click();
  }

  async clickAuthorNameInPost(authorName: string) {
    await this.postCards.getByLabel("저자").filter({ hasText: authorName }).first().click();
  }

  async clickPostTitleInPost(postTitle: string) {
    await this.postCards.getByText(postTitle).click();
  }

  async clickContentInPost(content: string) {
    await this.postCards.getByText(content).click();
  }

  async clickUserNameInPost(userName: string) {
    await this.postCards.getByText(userName, { exact: true }).last().click();
  }

  async scrollToBottom() {
    await this.page.mouse.wheel(0, 10000);
    await this.page.waitForRequest((r) => r.url().includes("/posts"));
    // 25ms 소요
    // await this.page.waitForLoadState("networkidle");
    // waitForLoadState는 800ms 정도 소요
  }
}
