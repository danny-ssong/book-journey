"use client";

import { Suspense } from "react";

import UserPostDashboard from "@/components/user/UserPostDashboard";

import { useAuth } from "@/hooks/useAuth";

export default function StaticsticsPage() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPostDashboard user={user!} />
    </Suspense>
  );
}
