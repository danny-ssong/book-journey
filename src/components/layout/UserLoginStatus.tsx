'use client'

import Link from 'next/link'

import { useGetMe } from '@/api/client/me.queries'

import LogoutButton from './LogoutButton'

export default function UserLoginStatus() {
  const { data: user, isPending } = useGetMe()

  if (isPending) {
    return (
      <div className="flex items-center justify-end py-2" aria-hidden>
        <div className="h-8 w-16 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center justify-end gap-2 py-2 lg:gap-4">
        <p className="hidden text-nowrap text-xs lg:block">{user.profile.nickname}</p>
        <LogoutButton />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-end py-2">
      <Link href="/login" className="text-nowrap text-sm">
        로그인
      </Link>
    </div>
  )
}
