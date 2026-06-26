import { redirect } from 'next/navigation'

import 'server-only'

import { prisma } from '@/lib/prisma'
import { createSupabaseServerClient } from '@/lib/supabase/server'

/**
 * 현재 요청자의 auth.users.id를 반환. 인증 안 된 상태면 /login으로 redirect.
 *
 * getClaims()는 JWT 서명을 published public key로 로컬 검증하므로
 * getSession()처럼 위조된 쿠키에 속지 않으며 getUser()처럼 매 요청 네트워크를 타지도 않는다.
 */
export async function requireUserId(): Promise<string> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims?.sub) {
    redirect('/login')
  }
  return data.claims.sub
}

/**
 * 현재 요청자의 Profile을 반환 (도메인 정보 포함). 미인증 또는 Profile 없음이면 /login redirect.
 * Profile이 없는 경우는 트리거가 동작하지 않은 비정상 상태로 간주한다.
 */
export async function requireProfile() {
  const userId = await requireUserId()
  const profile = await prisma.profile.findUnique({ where: { id: userId } })
  if (!profile) {
    redirect('/login')
  }
  return profile
}

/**
 * 리소스 소유자 검증. ownerUserId(auth.users.id)가 현재 요청자와 다르면 throw.
 */
export async function requireOwner(ownerUserId: string | null | undefined) {
  const userId = await requireUserId()
  if (ownerUserId !== userId) {
    throw new Error('접근 권한이 없습니다')
  }
  return userId
}
