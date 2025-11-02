import { expect, test } from "@playwright/test";
import { NewPostPage } from "./new-post.page";

let newPostPage: NewPostPage;

test.beforeEach(async ({ page }) => {
  newPostPage = new NewPostPage(page);
  await newPostPage.goto();
});

test("새 글을 작성 후 글 관리 페이지로 이동하고 작성한 글이 보여야 한다.", async ({ page }) => {
  await newPostPage.createPost({
    bookTitle: "직업으로서의 소설가",
    privacy: "공개",
    rating: 5,
    readDate: new Date(),
    title: "새로운 포스트 제목",
    content: "새로운 포스트 내용",
  });

  await expect(page).toHaveURL("/manage/posts");
  await expect(page.getByText("새로운 포스트 제목").first()).toBeVisible();
});

// 유효성 검사는 통합테스트에서 진행
