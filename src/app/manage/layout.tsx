"use client";
import { useAuth } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";

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
