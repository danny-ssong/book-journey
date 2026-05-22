'use client'

import { useAuthContext } from '@/providers/AuthProvider'

import UserPostDashboard from '@/app/_components/statistics/UserPostDashboard'

export default function StaticsticsPage() {
  const user = useAuthContext()

  return <UserPostDashboard user={user} />
}
