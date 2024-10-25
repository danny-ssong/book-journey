import { createClient } from "@/utils/supabase/client";

export default async function getUserOnClient() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;

  return data.user;
}
