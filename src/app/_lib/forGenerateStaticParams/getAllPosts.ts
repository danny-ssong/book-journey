"use server";
import { Post } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/client";

export async function getAllPosts(): Promise<Post[] | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase.from("post").select();

  if (error) {
    console.error(`${error.details} \n${error.message}`);
    return;
  }

  return data;
}
