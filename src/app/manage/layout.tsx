"use client";

import { AuthProvider } from "@/providers/AuthProvider";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
