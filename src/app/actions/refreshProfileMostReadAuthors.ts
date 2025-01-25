"use server";
import { createClient } from "@/utils/supabase/server";
import getUserOnServer from "../_lib/getUserOnServer";

export default async function refreshProfileMostReadAuthors() {
  const supabase = createClient();
  const user = await getUserOnServer();

  if (!user) {
    console.error(`user not found while refreshProfileFavorites`);
    return;
  }

  const mostReadAuthors = await calcMostReadAuthors(user.id);

  if (!mostReadAuthors) {
    console.error("most read authors null...");
    return;
  }

  const { data, error } = await supabase
    .from("profile")
    .update({ mostRead_authors: mostReadAuthors })
    .eq("user_id", user.id);

  if (error) {
    console.error("when update most read authors  ", error);
  }
}

async function calcMostReadAuthors(user_id: string) {
  const supabase = createClient();

  const { data: postsWithBook, error } = await supabase
    .from("post")
    .select(`*, book(author)`)
    .eq("user_id", user_id);

  if (error) return null;

  const readAuthorCounts = new Map();

  for (const post of postsWithBook) {
    const author = post.book.author;
    const readAuthorCount = readAuthorCounts.get(author);

    if (!readAuthorCount) {
      readAuthorCounts.set(author, 1);
    } else {
      readAuthorCounts.set(author, readAuthorCount + 1);
    }
  }

  const mostReadAuthors = Array.from(readAuthorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([author, count]) => author);

  return mostReadAuthors;
}
