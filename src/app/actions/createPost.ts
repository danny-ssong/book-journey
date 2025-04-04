"use server";

import { createClient } from "@/utils/supabase/server";
import getUserOnServer from "../_lib/getUserOnServer";
import { revalidateTag } from "next/cache";
import { CreateBookDto, CreatePostDto } from "../_models/supabaseTypes";

export async function createPost(book: CreateBookDto, post: CreatePostDto) {
  const supabase = createClient();

  const { data: result, error: resultError } = await supabase
    .from("book")
    .upsert([book])
    .select();
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
    revalidateTag(`posts-${book.isbn}`);
    return postId;
  }

  return;
}
