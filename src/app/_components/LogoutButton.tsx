"use client";
import { useUser } from "../_hooks/useUser";

export default function LogoutButton() {
  const { logout } = useUser();
  return (
    <form onSubmit={logout}>
      <button className="overflow-visible text-nowrap px-4 py-2">
        로그아웃
      </button>
    </form>
  );
}
