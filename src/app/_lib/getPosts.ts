import { PostWithUserProfileAndBook } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getPosts(
  size: number,
  page: number = 1
): Promise<{ posts: PostWithUserProfileAndBook[]; isLastPage: boolean }> {
  const supabase = createClient();

  const start = size * (page - 1);
  const end = start + size;
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(`*, books (*), profiles(*)`)
    .range(start, end);

  if (!posts || postsError) return { posts: [], isLastPage: false };

  const { count: postCount, error: countError } = await supabase.from("posts").select("*", { count: "exact" });

  const isLastPage = end >= (postCount ?? 0);

  return { posts, isLastPage };
}
