import dayjs from "dayjs";
import { PostWithBook } from "../_models/supabaseTypes";

export function getGroupByAuthor(posts: PostWithBook[]) {
  const groupedByAuthor = posts.reduce(
    (acc: Record<string, PostWithBook[]>, post) => {
      const author = post.book.author || "Unknown";

      if (!acc[author]) acc[author] = [];
      acc[author].push(post);

      return acc;
    },
    {},
  );

  return Object.entries(groupedByAuthor).map(([author, posts]) => ({
    author,
    posts,
  }));
}

export function getGroupByMonth(posts: PostWithBook[]) {
  const groupedByMonth = posts.reduce(
    (acc: Record<string, PostWithBook[]>, post) => {
      const month = dayjs(post.start_date).format("YYYY-MM"); // 월은 0부터 시작하므로 +1
      if (!acc[month]) acc[month] = [];

      acc[month].push(post);

      return acc;
    },
    {},
  );
  return Object.entries(groupedByMonth).map(([month, posts]) => ({
    month,
    posts,
  }));
}

export function getGroupByYear(posts: PostWithBook[]) {
  const groupedByYear = posts.reduce(
    (acc: Record<string, PostWithBook[]>, post) => {
      const year = dayjs(post.start_date).format("YYYY");
      if (!acc[year]) acc[year] = [];

      acc[year].push(post);

      return acc;
    },
    {},
  );

  return Object.entries(groupedByYear).map(([year, posts]) => ({
    year,
    posts,
  }));
}
