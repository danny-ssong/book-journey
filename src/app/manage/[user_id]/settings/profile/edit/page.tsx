import { createClient } from "@/utils/supabase/server";
import Profile from "../_components/Profile";
import { notFound } from "next/navigation";
import getUserOnServer from "@/app/_lib/getUserOnServer";

export default async function Page() {
  const supabase = createClient();
  const user = await getUserOnServer();

  if (!user) notFound();

  const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("user_id", user?.id).single();

  return <Profile profile={profile} />;
}
