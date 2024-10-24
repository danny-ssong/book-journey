import { createClient } from "@/utils/supabase/server";
import Profile from "./_components/Profile";
import { notFound } from "next/navigation";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) notFound();

  const profile = await supabase.from("profiles").select("*").eq("user_id", data.user?.id).single();

  return <Profile profile={profile} />;
}
