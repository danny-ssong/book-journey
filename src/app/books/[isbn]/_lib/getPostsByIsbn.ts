import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

type Post = Tables<"posts">;

export default async function getPostsByIsbn(isbn: string): Promise<Post[] | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("isbn", isbn);

  if (error) {
    console.log(error);
    return;
  }

  return data;
}
