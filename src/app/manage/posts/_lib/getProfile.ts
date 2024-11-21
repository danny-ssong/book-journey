import { Profile } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";

export default async function getProfile(user_id: string): Promise<Profile | null> {
  const supabase = createClient();

  const fetchUserProfile = async () => {
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (profileError) return null;
    return profile;
  };

  const cachedProfile = unstable_cache(fetchUserProfile, ["profile", user_id], { tags: [`profile-${user_id}`] });

  return cachedProfile();
}
