import dayjs from "dayjs";
import { PostWithBook } from "../_models/supabaseTypes";

export function getGroupByAuthor(posts: PostWithBook[]) {
  const groupedByAuthor = posts.reduce((acc: Record<string, number>, post) => {
    const author = post.book.author || "Unknown";

    if (!acc[author]) acc[author] = 0;

    acc[author] += 1;

    return acc;
  }, {});

  return Object.entries(groupedByAuthor).map(([author, count]) => ({
    author,
    count,
  }));
}

export function getGroupByMonth(posts: PostWithBook[]) {
  const groupedByMonth = posts.reduce((acc: Record<string, number>, post) => {
    const month = dayjs(post.start_date).format("YYYY-MM"); // 월은 0부터 시작하므로 +1
    if (!acc[month]) acc[month] = 0;

    acc[month] += 1;

    return acc;
  }, {});
  return Object.entries(groupedByMonth).map(([month, count]) => ({
    month,
    count,
  }));
}

export function getGroupByYear(posts: PostWithBook[]) {
  const groupedByYear = posts.reduce((acc: Record<string, number>, post) => {
    const year = dayjs(post.start_date).format("YYYY");
    if (!acc[year]) acc[year] = 0;

    acc[year] += 1;

    return acc;
  }, {});
  return Object.entries(groupedByYear).map(([year, count]) => ({
    year,
    count,
  }));
}
