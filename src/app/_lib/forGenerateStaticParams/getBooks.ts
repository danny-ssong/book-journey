"use server";
import { createClient } from "@/utils/supabase/client";

export async function getBooks() {
  //generate static params는 cookie나 header에 접근하면 안되는데, supabase/ssr의 server에서 사용하는 supabase client는 이걸 사용하고 있어서. cleint걸로 대신 사용
  const supabase = createClient();
  const { data, error } = await supabase.from("book").select();

  if (error) {
    console.error(`${error.details} \n${error.message}`);
    return;
  }

  return data;
}
