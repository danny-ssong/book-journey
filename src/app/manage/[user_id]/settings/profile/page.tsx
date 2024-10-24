import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProfileViewer from "./_components/ProfileViewer";

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) notFound();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", data.user?.id)
    .single();

  if (!profile) notFound();

  return <ProfileViewer profile={profile} />;
}
