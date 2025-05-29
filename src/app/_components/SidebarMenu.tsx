"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import getMe from "../_lib/getMe";

export default function SidebarMenu() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const user = await getMe();
      setUser(user);
    };
    fetchMe();
  }, []);

  return (
    <aside className="h-full py-4 lg:w-[200px]">
      <div className="h-full px-5 py-6">
        <Button className="mb-5 w-full px-4 py-2 text-center">
          <Link href={!!user ? `/posts/new` : "/login"}>글쓰기</Link>
        </Button>
        {!!user && (
          <ul className="flex flex-col gap-2">
            <li>
              <Link href={`/manage/posts`}>글 관리</Link>
            </li>
            <li>
              <Link href={`/manage/settings/profile`}>프로필 관리</Link>
            </li>
            <li>
              <Link href={`/manage/statistics`}>독서 통계</Link>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
}
