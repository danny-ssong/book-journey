"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (user === null) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
