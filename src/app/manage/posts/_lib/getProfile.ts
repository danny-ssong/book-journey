import { Profile } from "@/app/_types/supabaseTypes";
import { createClient } from "@/utils/supabase/server";

export default async function getProfile(user_id: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("user_id", user_id).single();

  if (profileError) return null;

  return profile;
}
