"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function updateProfile(username: string, bio: string, image: File | null) {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching session:", userError);
    return;
  }

  const user = userData?.user;
  if (!user) {
    console.error("No user found in session");
    return;
  }

  const { error: insertError } = await supabase
    .from("profiles")
    .update({
      username: username,
      // imageURL: undefined,
      bio: bio,
      favorite_authors: [],
    })
    .eq("user_id", userData.user.id);

  if (insertError) {
    console.error("Error inserting profile:", insertError);
    return;
  }
  revalidatePath(`/manage/${userData.user.id}/settings/profile`);

  return true;
}
