import getUserOnServer from "@/app/_lib/getUserOnServer";
import { PostWithBook } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getUserPosts(
  userId: string,
  size: number,
  page: number = 1
): Promise<{ postsWithBook: PostWithBook[]; isLastPage: boolean }> {
  const supabase = createClient();

  const start = size * (page - 1);
  const end = start + size;
  const { data: postsWithBook, error: postsError } = await supabase
    .from("posts")
    .select(`*, books (*)`)
    .eq("user_id", userId)
    .range(start, end);

  if (!postsWithBook || postsError) return { postsWithBook: [], isLastPage: false };

  const { count: postCount, error: countError } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  const isLastPage = end >= (postCount ?? 0);

  return { postsWithBook, isLastPage };
}
