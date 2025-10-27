import { expect, test } from "@playwright/test";
import { GNBPage } from "./gnb.page";

let gnbPage: GNBPage;

test.beforeEach(async ({ page }) => {
  gnbPage = new GNBPage(page);
  await gnbPage.goto();
});

test("홈 링크를 클릭하면 홈 페이지로 이동한다.", async ({ page }) => {
  await gnbPage.clickHomeLink();
  await expect(page).toHaveURL("/");
});

// 여기서 로그아웃하면 다른 테스트 케이스에서 로그인된 상태를 유지할 수가 없다.
// 방법 찾아봐야 함
// test("로그아웃 시 로그인 버튼이 표시된다.", async ({ page }) => {
//   await gnbPage.logout();
//   await expect(gnbPage.loginButton).toBeVisible();
// });

test("테마 토글 버튼 클릭 시 테마가 변경된다.", async ({ page }) => {
  const htmlElement = page.locator("html");
  await gnbPage.toggleTheme();
  await expect(htmlElement).not.toHaveClass(/dark/);

  await gnbPage.toggleTheme();
  await expect(htmlElement).toHaveClass(/dark/);
});

test.describe("책 검색 바 테스트", () => {
  test("키워드 검색 시 해당 페이지로 이동한다.", async ({ page }) => {
    await gnbPage.searchKeywordBySearchBar("하루키");
    await expect(page).toHaveURL("/search?query=하루키");
  });

  test("키워드 입력 후 해당 책 제목을 클릭하면 책 상세 페이지로 이동한다.", async ({ page }) => {
    await gnbPage.fillKeyworkAndSelectItemInSearchBar("하루키", "직업으로서의 소설가");
    await expect(page).toHaveURL("/books/9788972757719");
  });

  // 이 라인 아래의 테스트들은 통합 테스트에서 하면 될 것 같긴하다.
  test("키워드를 한글자만 입력하면 '2글자 이상 검색' 하라는 안내 메시지가 표시된다.", async ({ page }) => {
    await gnbPage.fillSearchBar("책");
    await expect(gnbPage.searchResults).toContainText("2자 이상 입력");
  });

  test("검색 결과가 없으면 '검색 결과가 없습니다.' 메시지가 표시된다.", async ({ page }) => {
    await gnbPage.fillSearchBar("책책");
    await expect(gnbPage.searchResults).toContainText("검색된 책이 없습니다.");
  });

  test("검색 중일 때 '검색중...' 메시지가 표시된다.", async ({ page }) => {
    gnbPage.fillSearchBar("책책");
    await expect(gnbPage.searchResults).toContainText("검색");
  });
});
