import { Locator, Page } from "@playwright/test";

export class GNBPage {
  readonly page: Page;
  readonly gnb: Locator;
  readonly homeLink: Locator;
  readonly logoutButton: Locator;
  readonly loginButton: Locator;
  readonly themeToggleButton: Locator;
  readonly searchInput: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gnb = page.getByRole("banner");
    this.homeLink = this.gnb.getByRole("link", { name: "홈" });
    this.logoutButton = this.gnb.getByRole("button", { name: "로그아웃 버튼" });
    this.loginButton = this.gnb.getByRole("link", { name: "로그인" });
    this.themeToggleButton = this.gnb.getByRole("button", { name: "Toggle theme" });
    this.searchInput = this.gnb.getByRole("textbox", { name: "책 검색 입력창" });
    this.searchResults = page.getByRole("status", { name: "책 검색 결과" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async logout() {
    await this.logoutButton.click();
  }

  async login() {
    await this.loginButton.click();
  }

  async toggleTheme() {
    await this.themeToggleButton.click();
  }

  async clickHomeLink() {
    await this.homeLink.click();
  }

  async fillSearchBar(keyword: string) {
    await this.searchInput.fill(keyword);
  }

  async searchKeywordBySearchBar(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press("Enter");
  }

  async fillKeyworkAndSelectItemInSearchBar(keyword: string, itemTitle: string) {
    await this.searchInput.fill(keyword);
    await this.searchResults.getByText(itemTitle, { exact: true }).click();
  }
}
