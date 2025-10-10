"use client";
import BookChartPerMonth from "./BookChartPerMonth";
import AuthorChart from "./AuthorChart";
import { getGroupByAuthor, getGroupByMonth, getGroupByYear } from "@/api/post";
import { Card, CardContent } from "@/components/ui/card";
import { useUserPosts } from "@/react-query/post";
import { User } from "@/types/user";

export default function UserPostDashboard({ user }: { user: User }) {
  const { data: posts } = useUserPosts(user.id, 9999);

  const postsGroupByAuthor = getGroupByAuthor(posts?.data);
  const postsGroupByMonth = getGroupByMonth(posts?.data);
  const postsGroupByYear = getGroupByYear(posts?.data);

  const today = new Date();
  const thisYear = today.getFullYear();

  const thisYearPosts = postsGroupByYear.find(
    (obj) => obj.year === thisYear.toString(),
  );

  const lastYearPosts = postsGroupByYear.find(
    (obj) => obj.year === (thisYear - 1).toString(),
  );

  return (
    <section>
      <Card>
        <CardContent className="space-y-8 rounded-lg p-6">
          <div className="text-center">
            <p className="mt-2 text-lg">
              총 읽은 책:
              <span className="font-bold text-blue-600">
                {posts?.data.length}
              </span>
            </p>
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
              <div>
                <h3 className="mb-4 text-xl font-semibold">작가별 독서 통계</h3>
                <AuthorChart data={postsGroupByAuthor} />
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">월별 독서 통계</h3>
                <BookChartPerMonth data={postsGroupByMonth} />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
