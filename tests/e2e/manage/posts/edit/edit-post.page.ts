import { Locator, Page } from "@playwright/test";

export class EditPostPage {
  readonly page: Page;
  readonly searchBar: Locator;
  readonly privacySelector: Locator;
  readonly ratingSelector: Locator;
  readonly monthPicker: Locator;
  readonly monthCalendar: Locator;
  readonly titleInput: Locator;
  readonly contentInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = this.page.getByPlaceholder("책 제목을 검색하세요...");
    this.privacySelector = this.page.getByLabel("공개 범위");
    this.ratingSelector = this.page.getByLabel("평점");
    this.monthPicker = this.page.getByLabel("읽은 날짜");
    this.monthCalendar = this.page.getByLabel("월 선택 달력");
    this.titleInput = this.page.getByPlaceholder("제목을 입력하세요");
    this.contentInput = this.page.getByPlaceholder("감상을 작성해보세요");
    this.saveButton = this.page.getByRole("button", { name: "저장", exact: true });
  }

  async goto(postId: string) {
    await this.page.goto(`/posts/edit/${postId}`);
  }

  async editPost({
    bookTitle,
    privacy,
    rating,
    readDate,
    title,
    content,
  }: {
    bookTitle: string;
    privacy: "공개" | "비공개";
    rating: 1 | 2 | 3 | 4 | 5;
    readDate: Date;
    title: string;
    content: string;
  }) {
    await this.fillBookTitleAndSelectBook(bookTitle, bookTitle);
    await this.selectPrivacy(privacy);
    await this.selectRating(rating);
    await this.selectReadDate(readDate);
    await this.fillTitle(title);
    await this.fillContent(content);
    await this.saveButton.click();
  }

  private async fillBookTitleAndSelectBook(searchKeyword: string, bookTitle: string) {
    await this.searchBar.clear();
    await this.searchBar.pressSequentially(searchKeyword, { delay: 50 });
    await this.page.getByRole("status", { name: "책 검색 결과" }).getByText(bookTitle).click();
  }

  private async selectRating(value: 1 | 2 | 3 | 4 | 5) {
    await this.ratingSelector
      .locator("svg")
      .nth(value - 1)
      .click();
  }

  private async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  private async fillContent(content: string) {
    await this.contentInput.fill(content);
  }

  private async selectPrivacy(value: "공개" | "비공개") {
    await this.privacySelector.click();
    await this.privacySelector.selectOption({ label: value });
  }

  private async selectReadDate(date: Date) {
    await this.monthPicker.click();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // 년도 선택
    if (year !== currentYear) {
      const yearDiff = year - currentYear;
      const direction = yearDiff > 0 ? "다음 년도" : "이전 년도";
      const times = Math.abs(yearDiff);

      for (let i = 0; i < times; i++) {
        await this.monthCalendar.getByRole("button", { name: direction }).click();
      }
    }

    await this.monthCalendar.getByRole("button", { name: `${month}월`, exact: true }).click();
  }
}
