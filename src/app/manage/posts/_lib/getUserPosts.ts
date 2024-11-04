import { PostWithBook } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getUserPosts(
  userId: string,
  size: number,
  page: number = 1
): Promise<{ postsWithBook: PostWithBook[]; isLastPage: boolean }> {
  const supabase = createClient();

  const start = size * (page - 1);
  const end = start + size - 1;
  const { data: postsWithBook, error: postsError } = await supabase
    .from("post")
    .select(`*, book (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(start, end);

  if (!postsWithBook || postsError) return { postsWithBook: [], isLastPage: false };

  const { count: postCount, error: countError } = await supabase
    .from("post")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

  const isLastPage = end >= (postCount ?? 0);

  return { postsWithBook, isLastPage };
}
