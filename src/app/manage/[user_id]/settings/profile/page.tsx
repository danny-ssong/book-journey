import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProfileViewer from "./_components/ProfileViewer";
import getProfile from "../../posts/_lib/getProfile";
import getUserOnServer from "@/app/_lib/getUserOnServer";

export default async function Page() {
  const user = await getUserOnServer();

  if (!user) notFound();

  const profile = await getProfile(user.id);
  if (!profile) notFound();

  return (
    <div className="ml-5">
      <ProfileViewer profile={profile} />
    </div>
  );
}
