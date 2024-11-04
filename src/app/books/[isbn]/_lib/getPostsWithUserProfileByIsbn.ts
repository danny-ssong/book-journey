import { PostWithUserProfile } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getPostsWithUserProfileByIsbn(isbn: string): Promise<PostWithUserProfile[] | undefined> {
  const supabase = createClient();
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
}
