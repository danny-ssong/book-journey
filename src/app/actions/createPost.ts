"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import getUserOnServer from "../_lib/getUserOnServer";

export async function createPost(
  book: SearchedBook,
  content: string,
  startDate: string,
  endDate: string,
  rating: number,
  title: string
) {
  const supabase = createClient();
  const user = await getUserOnServer();
  const bookData = {
    isbn: book.isbn,
    title: book.title,
    author: book.authors[0],
    published_date: book.datetime,
    thumbnail: book.thumbnail,
  };
  const { data: result, error: resultError } = await supabase.from("book").upsert([bookData]).select();

  const post = { content, startDate, endDate, isbn: book.isbn, rating, title };
  const { data, error } = await supabase.from("post").insert([post]).select();

  if (resultError) {
    console.error(`${resultError.details} \n${resultError.message}`);
    return;
  }

  if (error) {
    console.error(`${error.details} \n${error.message}`);
    return;
  }

  if (data?.length > 0) {
    const postId = data[0].id;
    const userId = user?.id;
    if (userId) revalidatePath(`/manage/${userId}/posts`);

    revalidatePath(`/books${book.isbn}`);
    return postId;
  }

  return;
}
