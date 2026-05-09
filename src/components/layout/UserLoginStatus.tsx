"use client";

import Link from "next/link";

import { useGetMe } from "@/api/client/me.queries";

import LogoutButton from "./LogoutButton";

export default function UserLoginStatus() {
  const { data: user, isPending } = useGetMe();

  if (isPending) {
    return <div className="w-[120px] py-2" aria-hidden />;
  }

  if (user) {
    return (
      <div className="flex w-[120px] items-center justify-between py-2">
        <p className="xs:block hidden text-nowrap text-xs">
          {user.profile.nickname}
        </p>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="w-[120px] text-nowrap py-2 pl-4">
      <Link href="/login">로그인</Link>
    </div>
  );
}
