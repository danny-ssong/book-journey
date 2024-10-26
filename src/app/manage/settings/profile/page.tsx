import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ProfileViewer from "./_components/ProfileViewer";
import getProfile from "../../posts/_lib/getProfile";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import Link from "next/link";
import Button from "@/app/_components/Button";

export default async function Page() {
  const user = await getUserOnServer();

  if (!user) notFound();

  const profile = await getProfile(user.id);
  if (!profile) notFound();

  return (
    <div className="mt-5">
      <ProfileViewer profile={profile} />
      <div className="flex justify-end mt-5">
        <Button>
          <Link href={`/manage/settings/profile/edit`}>수정</Link>
        </Button>
      </div>
    </div>
  );
}
