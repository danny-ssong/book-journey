import "server-only";

import { createClient } from "@supabase/supabase-js";

// secret 키는 모든 RLS를 우회한다. 절대 클라이언트 번들에 포함되어선 안 된다.
function getAdminEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    throw new Error("Supabase admin 환경변수가 설정되지 않았습니다");
  }
  return { url, secretKey };
}

const { url, secretKey } = getAdminEnv();

export const supabaseAdmin = createClient(url, secretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
