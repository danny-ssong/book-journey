"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";
import getUserOnServer from "../_lib/getUserOnServer";

export async function updatePost(
  id: number,
  book: SearchedBook,
  content: string,
  start_date: string,
  end_date: string,
  rating: number,
  title: string,
  is_private: boolean
) {
  const supabase = createClient();
  const user = await getUserOnServer();

  const post = { content, start_date, end_date, isbn: book.isbn, rating, title, is_private };
  const { data, error } = await supabase.from("post").update(post).eq("id", id).select();

  if (error) {
    console.error(`${error.details} \n${error.message}`);
    return;
  }

  if (data) {
    revalidateTag(`posts-${id}`);
    revalidateTag(`posts-${book.isbn}`);
    return id;
  }

  return;
}
