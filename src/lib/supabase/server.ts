import { cookies } from 'next/headers'

import { createServerClient } from '@supabase/ssr'

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL/PUBLISHABLE_KEY가 설정되지 않았습니다')
  }
  return { url, key }
}

export async function createSupabaseServerClient() {
  const { url, key } = getSupabaseEnv()
  const cookieStore = await cookies()

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // RSC에서는 cookies().set이 noop이며 throw할 수 있다. 세션 갱신은 proxy.ts가 담당.
        }
      },
    },
  })
}
