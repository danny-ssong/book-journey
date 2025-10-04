"use client";
import UserPostDashboard from "@/app/_components/UserPostDashboard";
import { useAuth } from "@/app/_hooks/useAuth";
import { Suspense } from "react";
export default function StaticsticsPage() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPostDashboard user={user!} />
    </Suspense>
  );
}
