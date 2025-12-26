"use client";

import UserPostDashboard from "@/components/user/UserPostDashboard";

import { useAuthContext } from "@/context/AuthContext";

export default function StaticsticsPage() {
  const user = useAuthContext();

  return <UserPostDashboard user={user} />;
}
