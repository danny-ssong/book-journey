import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

type PostWithBook = Tables<"posts"> & {
  books: {
    title: string;
    author: string;
  };
};

export default async function getPostWithBook(postId: string): Promise<PostWithBook | undefined> {
  const supabse = createClient();
  const { data, error } = await supabse.from("posts").select(`*, books(title, author)`).eq("id", postId);

  if (error) console.error(error);

  if (data) {
    return data[0];
  }
  return;
}
