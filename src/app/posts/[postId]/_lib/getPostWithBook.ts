import { PostWithBook } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getPostWithBook(postId: string): Promise<PostWithBook | undefined> {
  const supabse = createClient();
  const { data, error } = await supabse.from("posts").select(`*, books(*)`).eq("id", postId);

  if (error) console.error(error);

  if (data) {
    return data[0];
  }
  return;
}
