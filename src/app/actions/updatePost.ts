// "use server";

// import { createClient } from "@/utils/supabase/server";
// import { revalidateTag } from "next/cache";
// import getUserOnServer from "../_lib/getUserOnServer";
// import { CreateBookDto, CreatePostDto } from "../../types/supabaseTypes";

// export async function updatePost(
//   id: number,
//   createBookDto: CreateBookDto,
//   createPostDto: CreatePostDto,
// ) {
//   const supabase = createClient();
//   const user = await getUserOnServer();

//   const { data: result, error: resultError } = await supabase
//     .from("book")
//     .upsert([createBookDto])
//     .select();
//   const { data, error } = await supabase
//     .from("post")
//     .update(createPostDto)
//     .eq("id", id)
//     .select();

//   if (resultError) {
//     console.error(`${resultError.details} \n${resultError.message}`);
//     return;
//   }

//   if (error) {
//     console.error(`${error.details} \n${error.message}`);
//     return;
//   }

//   if (data) {
//     revalidateTag(`posts-${id}`);
//     revalidateTag(`posts-${createBookDto.isbn}`);
//     return id;
//   }

//   return;
// }
