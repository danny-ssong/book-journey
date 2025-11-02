import { Locator, Page } from "@playwright/test";

export class ManagePostsPage {
  readonly page: Page;
  readonly postCards: Locator;
  readonly expandViewButton: Locator;
  readonly compactViewButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.postCards = this.page.getByRole("region", { name: "글 관리" }).getByRole("article");
    this.expandViewButton = this.page.getByRole("button", { name: "확장하여 보기" });
    this.compactViewButton = this.page.getByRole("button", { name: "간단히 보기" });
  }

  getPostCard(postTitle: string) {
    return this.postCards.filter({ hasText: postTitle }).first();
  }

  getPostCardImage(postTitle: string) {
    return this.getPostCard(postTitle).getByRole("img", { name: postTitle });
  }

  async goto() {
    await this.page.goto("/manage/posts");
  }

  async toggleView(isExpanded: boolean) {
    if (isExpanded) {
      await this.expandViewButton.click();
    } else {
      await this.compactViewButton.click();
    }
  }

  async goToEditPage(postTitle: string) {
    const postCard = this.getPostCard(postTitle);
    await postCard.hover();
    await postCard.getByRole("link", { name: "수정" }).click();
  }

  async deletePost(postTitle: string) {
    this.page.on("dialog", (dialog) => dialog.accept());
    const postCard = this.getPostCard(postTitle);
    await postCard.hover();
    await postCard.getByRole("button", { name: "삭제" }).click();
  }
}
