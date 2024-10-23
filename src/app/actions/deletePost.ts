"use server";
import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type Post = Tables<"posts">;

export default async function deletePost(postId: number) {
  const supabase = createClient();

  const { data: postData, error: postError } = await supabase.from("posts").select("*").eq("id", postId);

  if (postError) {
    console.log(postError.message);
    return;
  }

  let isbn = undefined;
  let userId = undefined;
  if (postData?.length > 0) {
    isbn = postData[0].isbn;
    userId = postData[0].user_id;
  }
  const { data, error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) {
    alert(error.message);
    return false;
  }

  revalidatePath(`/books${isbn}`);
  revalidatePath(`/manage/${userId}/posts`);

  return true;
}
