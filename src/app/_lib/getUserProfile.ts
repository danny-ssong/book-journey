import { createClient } from "@/utils/supabase/server";
import { Profile } from "../_models/supabaseTypes";

export default async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("profile").select("*").eq("user_id", userId).single();
  if (error) return null;
  return data;
}
