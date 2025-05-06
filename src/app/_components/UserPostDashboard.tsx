import BookChartPerMonth from "./BookChartPerMonth";
import AuthorChart from "./AuthorChart";
import {
  getGroupByAuthor,
  getGroupByMonth,
  getGroupByYear,
} from "../_lib/getPostsGroupBy";
import { Card, CardContent } from "@/components/ui/card";
import { getUserPosts } from "../posts/_lib/post";

export default async function UserPostDashboard({
  userId,
}: {
  userId: string;
}) {
  const { data: posts } = await getUserPosts(500, userId);

  const postsGroupByAuthor = getGroupByAuthor(posts);
  const postsGroupByMonth = getGroupByMonth(posts);
  const postsGroupByYear = getGroupByYear(posts);

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
              총 읽은 책:{" "}
              <span className="font-bold text-blue-600">{posts.length}</span>
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

          <div>
            <h3 className="mb-4 text-xl font-semibold">작가별 독서 통계</h3>
            <AuthorChart data={postsGroupByAuthor} />
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">월별 독서 통계</h3>
            <BookChartPerMonth data={postsGroupByMonth} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
