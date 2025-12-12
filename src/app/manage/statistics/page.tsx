"use client";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import UserPostDashboard from "@/components/user/UserPostDashboard";

import { useGetMe } from "@/react-query/me";

export default function StaticsticsPage() {
  const { data: user } = useGetMe();

  if (!user) return null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPostDashboard user={user} />
    </Suspense>
  );
}
