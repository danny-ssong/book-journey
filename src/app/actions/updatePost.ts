"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import getUserOnServer from "../_lib/getUserOnServer";

export async function updatePost(
  id: number,
  book: SearchedBook,
  content: string,
  startDate: string,
  endDate: string,
  rating: number,
  title: string
) {
  const supabase = createClient();
  const user = await getUserOnServer();

  const post = { content, startDate, endDate, isbn: book.isbn, rating, title };
  const { data, error } = await supabase.from("posts").update(post).eq("id", id).select();

  if (error) {
    console.error(`${error.details} \n${error.message}`);
    return;
  }

  if (data) {
    const userId = user?.id;
    if (userId) revalidatePath(`/manage/${userId}/posts`);

    revalidatePath(`/books${book.isbn}`);
    return id;
  }

  return;
}
