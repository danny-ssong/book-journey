import { PostWithUserProfileAndBook } from "@/app/_models/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getPost(postId: string): Promise<PostWithUserProfileAndBook | undefined> {
  const supabse = createClient();
  const { data, error } = await supabse.from("post").select(`*, book(*), profile(*)`).eq("id", postId);

  if (error) console.error(error);

  if (data) {
    return data[0];
  }
  return;
}
