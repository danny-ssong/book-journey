// "use server";
// import { createClient } from "@/utils/supabase/server";
// import { revalidatePath, revalidateTag } from "next/cache";
// import getUserOnServer from "../_lib/getUserOnServer";

// export default async function updateProfile(username: string, bio: string, image: File | null) {
//   const supabase = createClient();
//   const user = await getUserOnServer();

//   if (!user) {
//     console.error("No user found in session");
//     return false;
//   }

//   const { error: insertError } = await supabase
//     .from("profile")
//     .update({
//       username: username,
//       // imageURL: undefined,
//       bio: bio,
//     })
//     .eq("user_id", user.id);

//   if (insertError) {
//     console.error("Error inserting profile:", insertError);
//     return false;
//   }
//   // revalidatePath(`/manage/settings/profile`);
//   revalidateTag(`profile-${user.id}`);

//   return true;
// }
