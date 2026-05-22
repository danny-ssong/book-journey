import { test as base, expect } from "@playwright/test";
import { EditPostPage } from "./edit-post.page";
import { ManagePostsPage } from "../manage-posts.page";
import { HomePage } from "../../../home/home.page";

const test = base.extend<{ editPostPage: EditPostPage }>({
  editPostPage: async ({ page }, use) => {
    const editPostPage = new EditPostPage(page);
    await editPostPage.goto("61");
    await use(editPostPage);
  },
});

test("포스트 공개 수정", async ({ page, editPostPage }) => {
  await test.step("포스트 수정 후 글 관리 페이지로 이동한다.", async () => {
    await editPostPage.editPost({
      bookTitle: "무라카미 하루키는 어렵다",
      privacy: "공개",
      rating: 4,
      readDate: new Date("2022-02-02"),
      title: "수정된 포스트 제목",
      content: "수정된 포스트 내용",
    });

    await expect(page).toHaveURL("/manage/posts");
  });

  await test.step("글 관리 페이지에 수정 내역이 반영되어야 한다.", async () => {
    const managePostsPage = new ManagePostsPage(page);

    const rate = managePostsPage.getPostCardRate("수정된 포스트 제목");
    await expect(rate).toHaveAttribute("aria-label", "평점 4점");
  });

  await test.step("수정 된 포스트가 홈 페이지에 반영되어야 한다.", async () => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const postCard = homePage.getPostCardByPostTitle("수정된 포스트 제목");
    await expect(postCard.getByText("수정된 포스트 내용").first()).toBeVisible();
  });

  await test.step("수정된 포스트 상세에서 읽은 날짜가 변경된 값으로 표시된다.", async () => {
    const homePage = new HomePage(page);
    await homePage.clickPostTitleInPost("수정된 포스트 제목");
    await page.waitForURL(/posts\/\d+/);
    await expect(page.getByLabel("읽은 날짜")).toContainText("2022-02");
  });
});

test("포스트 비공개로 수정", async ({ page, editPostPage }) => {
  await test.step("포스트 수정 후 글 관리 페이지로 이동한다.", async () => {
    await editPostPage.editPost({
      bookTitle: "직업으로서의 소설가",
      privacy: "비공개",
      rating: 4,
      readDate: new Date("2022-02-02"),
      title: "비공개로 수정된 포스트 제목",
      content: "비공개로 수정된 포스트 내용",
    });

    await expect(page).toHaveURL("/manage/posts");
  });

  await test.step("글 관리 페이지에 수정 내역이 반영되어야 한다.", async () => {
    const managePostsPage = new ManagePostsPage(page);

    const rate = managePostsPage.getPostCardRate("비공개로 수정된 포스트 제목");
    await expect(rate).toHaveAttribute("aria-label", "평점 4점");
  });

  await test.step("홈 페이지에서 수정된 포스트가 보이지 않아야 한다.", async () => {
    const homePage = new HomePage(page);
    const postCard = homePage.getPostCardByPostTitle("비공개로 수정된 포스트 제목");
    await expect(postCard).not.toBeVisible();
  });
});
