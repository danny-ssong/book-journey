import { Profile } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";
import { cacheWithLogging } from "@/utils/cache-utils";

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

  return cacheWithLogging(fetchUserProfile, ["profile", user_id], `getProfile_${user_id}`, {
    tags: [`profile-${user_id}`],
  });
}
