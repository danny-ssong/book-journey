"use client";

import Link from "next/link";

import { useAuth } from "../../hooks/useAuth";
import LogoutButton from "./LogoutButton";

export default function UserLoginStatus() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-nowrap py-2 pl-4">
        <Link href="/login">로그인</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-2">
      <p className="xs:block hidden text-nowrap text-xs">
        {user.profile.nickname}
      </p>
      <LogoutButton />
    </div>
  );
}
