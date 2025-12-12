"use client";

import Link from "next/link";
import { notFound } from "next/navigation";

import ProfileViewer from "@/components/post/ProfileViewer";
import { Button } from "@/components/ui/button";

import { useGetMe } from "@/react-query/me";

export default function Page() {
  const { data: user, isPending, isError } = useGetMe();

  if (isPending) return <div>Loading...</div>;
  if (isError) notFound();

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
