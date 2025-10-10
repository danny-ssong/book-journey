"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

import ProfileViewer from "../../../../components/post/ProfileViewer";

export default function Page() {
  const { user } = useAuth();

  return (
    <div>
      <ProfileViewer user={user!} />
      <div className="my-4 flex justify-end">
        <Button className="px-4 py-2">
          <Link href={`/manage/settings/profile/edit`}>수정</Link>
        </Button>
      </div>
    </div>
  );
}
