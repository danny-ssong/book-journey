"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    const error = await supabase.auth.signOut();
    if (error) console.error("logout error");

    router.refresh();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
