"use client";
import ProfileViewer from "./_components/ProfileViewer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/_hooks/useUser";

export default function Page() {
  const { user } = useUser();
  if (!user) return <div>로그인 후 이용해주세요.</div>;

  return (
    <div>
      <ProfileViewer user={user} />
      <div className="my-4 flex justify-end">
        <Button className="px-4 py-2">
          <Link href={`/manage/settings/profile/edit`}>수정</Link>
        </Button>
      </div>
    </div>
  );
}
