import { createClient } from "@/utils/supabase/server";

export default async function getUserOnServer() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  return data.user;
}
