"use client";

import Link from "next/link";

import ProfileViewer from "@/components/post/ProfileViewer";
import { Button } from "@/components/ui/button";

import { useAuthContext } from "@/providers/AuthProvider";

export default function Page() {
  const user = useAuthContext();

  return (
    <div>
      <ProfileViewer user={user} />
      <div className="mt-4 flex justify-end">
        <Button className="px-4 py-2">
          <Link href={`/manage/settings/profile/edit`}>수정</Link>
        </Button>
      </div>
    </div>
  );
}
