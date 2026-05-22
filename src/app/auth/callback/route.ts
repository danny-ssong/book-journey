import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase/server'

// Supabase OAuth가 code를 쿼리스트링으로 전달한다.
// exchangeCodeForSession이 세션 쿠키를 설정한 뒤 profile upsert → next 또는 / 로 리다이렉트.
//
// profile upsert를 여기서 하는 이유:
//   - 트리거(handle_new_user) 대신 코드에서 명시적으로 처리 → 디버깅/타입 안전
//   - 매 로그인마다 멱등 호출이라 신규/기존 유저 모두 profile 보장
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`)
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('OAuth code exchange failed:', error)
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
  }

  const user = data.user
  if (user) {
    const meta = user.user_metadata ?? {}
    const fallbackName = meta.name ?? meta.full_name ?? user.email?.split('@')[0] ?? 'User'

    await prisma.profile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        nickname: `user-${user.id.slice(0, 8)}`,
        name: fallbackName,
        avatarUrl: meta.avatar_url ?? null,
        version: 1,
      },
    })
  }

  return NextResponse.redirect(`${origin}${next}`)
}
