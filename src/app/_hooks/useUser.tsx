"use client";
import { User } from "@/types/user";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import getMe from "../_lib/getMe";

type UserContextType = {
  user: User | null;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    if (response.ok) {
      window.location.href = "/";
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        if (!user) throw new Error("사용자 정보를 불러오는데 실패했습니다");

        setUser(user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): { user: User | null; logout: () => void } {
  const context = useContext(UserContext);
  if (context == null) {
    throw new Error("useUser는 UserProvider 내부에서만 사용할 수 있습니다");
  }
  return { user: context.user, logout: context.logout };
}
