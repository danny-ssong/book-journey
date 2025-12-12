"use client";

import UserPostDashboard from "@/components/user/UserPostDashboard";

import { useGetMe } from "@/react-query/me";

export default function StaticsticsPage() {
  const { data: user } = useGetMe();

  if (!user) return null;

  return <UserPostDashboard user={user} />;
}
