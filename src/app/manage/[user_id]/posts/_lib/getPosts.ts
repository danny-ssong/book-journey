import getUserOnServer from "@/app/_lib/getUserOnServer";
import { createClient } from "@/utils/supabase/server";

export default async function getUserPosts(size: number, page: number = 1) {
  const supabase = createClient();
  const user = await getUserOnServer();

  if (!user) return { posts: [], isLastPage: false };

  const start = size * (page - 1);
  const end = start + size - 1;
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(`*, books (title, author)`)
    .eq("user_id", user.id)
    .range(start, end);

  if (!posts || postsError) return { posts: [], isLastPage: false };

  const { count: postCount, error: countError } = await supabase.from("posts").select("*", { count: "exact" }).eq("user_id", user.id);

  const isLastPage = end >= (postCount ?? 0);

  return { posts, isLastPage };
}
