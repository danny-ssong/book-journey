// "use server";

// import { PostWithBook } from "@/types/supabaseTypes";
// import { createClient } from "@/utils/supabase/server";

// export default async function getUserAllPosts(
//   userId?: string,
//   isIncludePrivate: boolean = false,
// ): Promise<PostWithBook[]> {
//   const supabase = createClient();

//   let postQuery = supabase
//     .from("post")
//     .select(`*, book (*)`)
//     .order("start_date", { ascending: false });

//   let postTotalCountQuery = supabase
//     .from("post")
//     .select("*", { count: "exact" });

//   if (userId) {
//     postQuery = postQuery.eq("user_id", userId);
//     postTotalCountQuery = postTotalCountQuery.eq("user_id", userId);
//   }

//   if (!isIncludePrivate) {
//     postQuery = postQuery.eq("is_private", false);
//     postTotalCountQuery = postTotalCountQuery.eq("is_private", false);
//   }

//   const { data: posts, error: postsError } = await postQuery;
//   if (!posts || postsError) return [];

//   const { count: postCount, error: countError } = await postTotalCountQuery;
//   if (countError) [];

//   return posts;
// }
