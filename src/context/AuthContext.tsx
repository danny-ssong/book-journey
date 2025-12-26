"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

import Loading from "@/components/common/Loading";

import { useGetMe } from "@/react-query/me";
import { User } from "@/types/user";

const AuthContext = createContext<User | null>(null);

export const useAuthContext = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext not found");
  }

  return auth;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();

  if (isPending) return <Loading />;

  if (isError) {
    router.push("/login");
    return null;
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
