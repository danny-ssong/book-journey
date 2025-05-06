"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <form
      onSubmit={() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        router.refresh();
      }}
    >
      <button className="overflow-visible text-nowrap px-4 py-2">
        로그아웃
      </button>
    </form>
  );
}
