"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function Page() {
  const supabase = createClient();
  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      console.log("sign out");
    };
    signOut();
  }, []);

  return <div>profile</div>;
}
