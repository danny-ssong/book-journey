"use client";

import { useRouter } from "next/navigation";

import { useGetMe } from "@/react-query/me";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError } = useGetMe();
  const router = useRouter();

  if (data) {
    return <>{children}</>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    router.push("/login");
    return null;
  }
}
