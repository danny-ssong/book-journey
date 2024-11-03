"use server";
import { createClient } from "@/utils/supabase/client";

export async function getBook(isbn: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("book").select().eq("isbn", isbn).single();

  if (error) {
    console.error(`${error.details} \n${error.message}`);
    return;
  }

  return data;
}
