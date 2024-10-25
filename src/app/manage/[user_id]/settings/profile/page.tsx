import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProfileViewer from "./_components/ProfileViewer";
import getProfile from "../../posts/_lib/getProfile";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import Link from "next/link";

export default async function Page() {
  const user = await getUserOnServer();

  if (!user) notFound();

  const profile = await getProfile(user.id);
  if (!profile) notFound();

  return (
    <div className="ml-5">
      <ProfileViewer profile={profile} />
      <div className="flex justify-end mt-5">
        <Link className="px-4 py-2 border rounded-full" href={`/manage/${user?.id}/settings/profile/edit`}>
          수정
        </Link>
      </div>
    </div>
  );
}
