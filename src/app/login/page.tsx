"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function Page() {
  const supabase = createClient();
  useEffect(() => {
    const signInWithGoogle = async () => {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
          //localhost:3000/auth/callback
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
    };
    signInWithGoogle();
  }, [supabase]);

  return <p>Redirecting...</p>;
}
