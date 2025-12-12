import { Locator, Page } from "@playwright/test";

export class LNBPage {
  readonly page: Page;
  readonly lnb: Locator;
  readonly writePostButton: Locator;
  readonly manageMyPosts: Locator;
  readonly manageMyProfile: Locator;
  readonly myStatistics: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lnb = page.getByRole("complementary");
    this.writePostButton = this.lnb.getByRole("link", { name: "글쓰기" });
    this.manageMyPosts = this.lnb.getByRole("link", { name: "글 관리" });
    this.manageMyProfile = this.lnb.getByRole("link", { name: "프로필 관리" });
    this.myStatistics = this.lnb.getByRole("link", { name: "독서 통계" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickWritePost() {
    await this.writePostButton.click();
  }

  async clickManageMyPosts() {
    await this.manageMyPosts.click();
  }

  async clickManageMyProfile() {
    await this.manageMyProfile.click();
  }

  async clickMyStatistics() {
    await this.myStatistics.click();
  }
}
