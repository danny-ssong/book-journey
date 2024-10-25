"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import getUserOnServer from "../_lib/getUserOnServer";

export default async function updateProfile(username: string, bio: string, image: File | null) {
  const supabase = createClient();
  const user = await getUserOnServer();

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
    .eq("user_id", user.id);

  if (insertError) {
    console.error("Error inserting profile:", insertError);
    return;
  }
  revalidatePath(`/manage/${user.id}/settings/profile`);

  return true;
}
