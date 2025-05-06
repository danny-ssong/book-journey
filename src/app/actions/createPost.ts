// import { Book } from "@/types/book";
// import { Post } from "@/types/post";
// import { fetchWithAuth } from "@/utils/auth";
// import { createClient } from "@/utils/supabase/server";
// import { revalidateTag } from "next/cache";

// export async function createPost(book: Partial<Book>, post: Partial<Post>) {
//   try {
//     const res = await fetchWithAuth(
//       `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books`,
//       {
//         method: "POST",
//         body: JSON.stringify({ book }),
//       },
//     );
//   }
//   const supabase = createClient();

//   const { data: result, error: resultError } = await supabase
//     .from("book")
//     .upsert([book])
//     .select();
//   const { data, error } = await supabase.from("post").insert([post]).select();

//   if (resultError) {
//     console.error(`${resultError.details} \n${resultError.message}`);
//     return;
//   }

//   if (error) {
//     console.error(`${error.details} \n${error.message}`);
//     return;
//   }

//   if (data?.length > 0) {
//     const postId = data[0].id;
//     revalidateTag(`posts-${book.isbn}`);
//     return postId;
//   }

//   return;
// }
