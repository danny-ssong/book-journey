import { createBrowserClient } from "@supabase/ssr";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL/PUBLISHABLE_KEY가 설정되지 않았습니다");
  }
  return { url, key };
}

export function createSupabaseBrowserClient() {
  const { url, key } = getSupabaseEnv();
  return createBrowserClient(url, key);
}
