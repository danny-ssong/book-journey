"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

function LoginStatus() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    const error = await supabase.auth.signOut();
    if (error) console.error("logout error");

    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex gap-x-11 pr-10">
      {!!user ? (
        <>
          <Link href="/settings/profile">내정보</Link>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </div>
  );
}

export default LoginStatus;
