import { Post } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getPostsByIsbn(isbn: string): Promise<Post[] | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("isbn", isbn);

  if (error) {
    console.error(error);
    return;
  }

  return data;
}
