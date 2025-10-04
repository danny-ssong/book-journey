"use client";
import { useAuthContext } from "@/app/_context/AuthContext";

export function useAuth() {
  return useAuthContext();
}
