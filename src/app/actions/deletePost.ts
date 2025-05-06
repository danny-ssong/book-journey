// "use server";
// import { createClient } from "@/utils/supabase/server";
// import { revalidateTag } from "next/cache";

// export default async function deletePost(postId: number) {
//   const supabase = createClient();

//   const { data: postData, error: postError } = await supabase.from("post").select("*").eq("id", postId);

//   if (postError) {
//     console.error(postError.message);
//     return;
//   }

//   let isbn = undefined;
//   let userId = undefined;
//   if (postData?.length > 0) {
//     isbn = postData[0].isbn;
//     userId = postData[0].user_id;
//   }
//   const { data, error } = await supabase.from("post").delete().eq("id", postId);
//   if (error) {
//     alert(error.message);
//     return false;
//   }

//   revalidateTag(`posts-${isbn}`);
//   revalidateTag(`posts-${postId}`);

//   return true;
// }
