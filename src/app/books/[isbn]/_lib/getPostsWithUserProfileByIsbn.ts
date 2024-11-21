import { PostWithUserProfile } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";

export default async function getPostsByISBN(isbn: string): Promise<PostWithUserProfile[] | undefined> {
  const supabase = createClient();

  const fetchPostsByISBN = async () => {
    const { data, error } = await supabase
      .from("post")
      .select(`*, profile(*)`)
      .eq("isbn", isbn)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return undefined;
    }

    return data;
  };

  const cachedPosts = unstable_cache(fetchPostsByISBN, ["posts", isbn], { tags: [`posts-${isbn}`] });

  return cachedPosts();
}
