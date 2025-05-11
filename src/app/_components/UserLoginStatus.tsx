"use client";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import getMe from "../_lib/getMe";

export default function UserLoginStatus() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const user = await getMe();
      setUser(user);
    };
    fetchMe();
  }, []);

  if (!user) {
    return (
      <div className="py-2 pl-4">
        <Link href="/login">로그인</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-2 pl-4">
      <p className="text-nowrap text-xs">{user.profile.nickname}</p>
      <LogoutButton />
    </div>
  );
}
