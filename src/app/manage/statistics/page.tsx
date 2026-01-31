"use client";

import UserPostDashboard from "@/app/_components/statistics/UserPostDashboard";

import { useAuthContext } from "@/providers/AuthProvider";

export default function StaticsticsPage() {
  const user = useAuthContext();

  return <UserPostDashboard user={user} />;
}
