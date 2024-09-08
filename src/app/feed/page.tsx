"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Page() {
  const supabase = createClient();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("user", data);
      setUserInfo(data?.user);
    };
    getUser();
  }, []);

  return <div>feed {userInfo?.email}</div>;
}
