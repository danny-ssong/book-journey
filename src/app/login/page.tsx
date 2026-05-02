"use client";

import { useEffect } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

// /login 진입 즉시 Google OAuth 흐름으로 점프한다 (NestJS의 redirect 동작 유지).
// signInWithOAuth는 내부적으로 PKCE code_verifier를 sessionStorage에 저장한 뒤
// Supabase authorize URL로 redirect하므로 클라이언트에서 호출해야 한다.
export default function LoginPage() {
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    void supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }, []);

  return null;
}
