"use client";

import { useContext } from "react";

import { AuthContext } from "@/providers/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다");
  }
  return context;
}
