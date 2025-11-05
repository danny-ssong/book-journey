import { expect, test } from "@playwright/test";
import { NewPostPage } from "./new-post.page";
import dayjs from "dayjs";
import { ManagePostsPage } from "../../manage/posts/manage-posts.page";
import { HomePage } from "../../home/home.page";

let newPostPage: NewPostPage;

test.beforeEach(async ({ page }) => {
  newPostPage = new NewPostPage(page);
  await newPostPage.goto();
});

test("포스트 공개 작성", async ({ page }) => {
  await test.step("포스트 작성 후 글 관리 페이지로 이동한다.", async () => {
    await newPostPage.createPost({
      bookTitle: "직업으로서의 소설가",
      privacy: "공개",
      rating: 4,
      readDate: new Date("2022-02-02"),
      title: "공개로 작성된 포스트 제목",
      content: "공개로 작성된 포스트 내용",
    });

    await expect(page).toHaveURL("/manage/posts");
  });

  await test.step("글 관리 페이지에 작성한 포스트가 반영되어야 한다.", async () => {
    const managePostsPage = new ManagePostsPage(page);

    const recentEditDate = managePostsPage.getPostCardRecentEditDate("공개로 작성된 포스트 제목");
    await expect(recentEditDate.getByText(dayjs(new Date()).format("YYYY-MM-DD"))).toBeVisible();

    const rate = managePostsPage.getPostCardRate("공개로 작성된 포스트 제목");
    await expect(rate).toHaveAttribute("aria-label", "평점 4점");
  });

  await test.step("작성한 포스트가 홈 페이지에 반영되어야 한다.", async () => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const postCard = homePage.getPostCardByPostTitle("공개로 작성된 포스트 제목");
    await expect(postCard.getByText("공개로 작성된 포스트 내용").first()).toBeVisible();
  });
});

test("포스트 비공개로 작성", async ({ page }) => {
  await test.step("포스트 작성 후 글 관리 페이지로 이동한다.", async () => {
    await newPostPage.createPost({
      bookTitle: "직업으로서의 소설가",
      privacy: "비공개",
      rating: 4,
      readDate: new Date("2022-02-02"),
      title: "비공개로 작성된 포스트 제목",
      content: "비공개로 작성된 포스트 내용",
    });

    await expect(page).toHaveURL("/manage/posts");
  });

  await test.step("글 관리 페이지에 작성한 포스트가 반영되어야 한다.", async () => {
    const managePostsPage = new ManagePostsPage(page);

    const recentEditDate = managePostsPage.getPostCardRecentEditDate("비공개로 작성된 포스트 제목");
    await expect(recentEditDate.getByText(dayjs(new Date()).format("YYYY-MM-DD"))).toBeVisible();

    const rate = managePostsPage.getPostCardRate("비공개로 작성된 포스트 제목");
    await expect(rate).toHaveAttribute("aria-label", "평점 4점");
  });

  await test.step("홈 페이지에서 작성한 포스트가 보이지 않아야 한다.", async () => {
    const homePage = new HomePage(page);
    const postCard = homePage.getPostCardByPostTitle("비공개로 작성된 포스트 제목");
    await expect(postCard).not.toBeVisible();
  });
});
