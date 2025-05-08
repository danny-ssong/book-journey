// "use server";

// import { PostWithUserProfileAndBook } from "@/types/supabaseTypes";
// import { createClient } from "@/utils/supabase/server";

// export default async function getPosts(
//   size: number,
//   page: number = 1,
//   userId?: string,
//   isIncludePrivate: boolean = false,
// ): Promise<{ posts: PostWithUserProfileAndBook[]; isLastPage: boolean }> {
//   const supabase = createClient();

//   const start = size * (page - 1);
//   const end = start + size - 1;

//   let postQuery = supabase
//     .from("post")
//     .select(`*, book (*), profile(*)`)
//     .order("start_date", { ascending: false })
//     .range(start, end);

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
//   if (!posts || postsError) return { posts: [], isLastPage: false };

//   const { count: postCount, error: countError } = await postTotalCountQuery;
//   if (countError) return { posts: [], isLastPage: false };

//   const isLastPage = end >= (postCount ?? 0) - 1;
//   return { posts, isLastPage };
// }
