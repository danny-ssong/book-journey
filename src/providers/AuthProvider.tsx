"use client";

import { ReactNode, createContext } from "react";

import { useGetMe, useLogout } from "@/react-query/me";
import { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
