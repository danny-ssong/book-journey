"use client";
import UserPostDashboard from "@/app/_components/UserPostDashboard";
import { useUser } from "@/app/_hooks/useUser";

export default function StaticsticsPage() {
  const { user } = useUser();
  if (!user) return <div>로그인 후 이용해주세요.</div>;

  return <UserPostDashboard user={user} />;
}
