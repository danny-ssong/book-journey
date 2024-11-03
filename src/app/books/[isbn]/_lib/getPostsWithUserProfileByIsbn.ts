import { PostWithUserProfile } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getPostsWithUserProfileByIsbn(isbn: string): Promise<PostWithUserProfile[] | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from("post").select(`*, profile(*)`).eq("isbn", isbn);

  if (error) {
    console.error(error);
    return;
  }

  return data;
}
