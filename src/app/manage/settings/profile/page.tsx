import { notFound } from "next/navigation";
import ProfileViewer from "./_components/ProfileViewer";
import getProfile from "../../posts/_lib/getProfile";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserPostDashboard from "@/app/_components/UserPostDashboard";

export default async function Page() {
  const user = await getUserOnServer();

  if (!user) notFound();

  const profile = await getProfile(user.id);
  if (!profile) notFound();

  return (
    <div>
      <ProfileViewer profile={profile} />
      <div className="my-4 flex justify-end">
        <Button className="px-4 py-2">
          <Link href={`/manage/settings/profile/edit`}>수정</Link>
        </Button>
      </div>
    </div>
  );
}
