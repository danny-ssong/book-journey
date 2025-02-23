import { createClient } from "@/utils/supabase/server";
import Profile from "../_components/Profile";
import { notFound } from "next/navigation";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import getProfile from "../../../posts/_lib/getProfile";

export default async function Page() {
  const supabase = createClient();
  const user = await getUserOnServer();

  if (!user) notFound();

  const profile = await getProfile(user?.id);
  if (!profile) notFound();

  return <Profile profile={profile} />;
}
