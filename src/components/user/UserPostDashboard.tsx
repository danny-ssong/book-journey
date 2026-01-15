"use client";

import ErrorAlert from "@/components/common/ErrorAlert";
import SpinnerLoader from "@/components/common/SpinnerLoader";
import { Card } from "@/components/ui/card";

import { useUserPosts } from "@/react-query/post";
import { User } from "@/types/user";

import AuthorChart from "./AuthorChart";
import BookChartPerMonth from "./BookChartPerMonth";
import {
  getGroupByAuthor,
  getGroupByMonth,
  getGroupByYear,
} from "./_lib/group-by";

export default function UserPostDashboard({ user }: { user: User }) {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useUserPosts(user.id, 9999);

  if (isLoading) {
    return <SpinnerLoader text="통계를 불러오는 중..." size="md" />;
  }

  if (posts) {
    const postsGroupByAuthor = getGroupByAuthor(posts.data);
    const postsGroupByMonth = getGroupByMonth(posts.data);
    const postsGroupByYear = getGroupByYear(posts.data);

    const today = new Date();
    const thisYear = today.getFullYear();

    const thisYearPosts = postsGroupByYear.find(
      (obj) => obj.year === thisYear.toString(),
    );

    const lastYearPosts = postsGroupByYear.find(
      (obj) => obj.year === (thisYear - 1).toString(),
    );

    return (
      <Card className="space-y-8 p-6">
        <div className="text-center">
          <span className="mt-2 text-lg">총 읽은 책:</span>
          <span className="ml-2 font-bold text-blue-600">
            {posts.data.length}
          </span>
          <div className="mt-4 flex justify-center space-x-8">
            <div>
              <p className="text-sm">올해 읽은 책</p>
              <p className="text-lg font-bold text-green-600">
                {thisYearPosts?.posts.length || 0}
              </p>
            </div>
            <div>
              <p className="text-sm">작년에 읽은 책</p>
              <p className="text-lg font-bold text-red-600">
                {lastYearPosts?.posts.length || 0}
              </p>
            </div>
          </div>
        </div>

        {postsGroupByAuthor.length === 0 ? (
          <div className="text-center">독서 데이터가 없습니다.</div>
        ) : (
          <>
            <section aria-labelledby="author-statistics-chart">
              <h2
                id="author-statistics-chart"
                className="mb-4 text-xl font-semibold"
              >
                작가별 독서 통계
              </h2>
              <AuthorChart data={postsGroupByAuthor} />
            </section>

            <section aria-labelledby="month-statistics-chart">
              <h2
                id="month-statistics-chart"
                className="mb-4 text-xl font-semibold"
              >
                월별 독서 통계
              </h2>
              <BookChartPerMonth data={postsGroupByMonth} />
            </section>
          </>
        )}
      </Card>
    );
  }

  if (isError) {
    return (
      <ErrorAlert
        title="데이터를 불러올 수 없습니다"
        description={error?.message || "잠시 후 다시 시도해주세요."}
      />
    );
  }

  return null;
}
