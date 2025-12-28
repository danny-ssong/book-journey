"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";

import ErrorAlert from "@/components/common/ErrorAlert";
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

export const AuthProvider = ({
  children,
  unAuthorizedBehavior = "show-message",
}: {
  children: React.ReactNode;
  unAuthorizedBehavior?: "redirect" | "show-message";
}) => {
  const { data, isPending, isError, error } = useGetMe();
  const router = useRouter();

  if (isPending) return <Loading />;

  if (isError) {
    if (unAuthorizedBehavior === "redirect") {
      router.push("/login");
      return null;
    } else {
      return (
        <ErrorAlert title="에러가 발생했습니다" description={error?.message} />
      );
    }
  }

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
