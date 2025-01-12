import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { User } from "@supabase/supabase-js";
import getUserProfile from "../_lib/getUserProfile";

export default async function UserLoginStatus({ user }: { user: User | null }) {
  if (!user) {
    return (
      <div className="py-2 pl-4">
        <Link href="/login">로그인</Link>
      </div>
    );
  }

  const profile = await getUserProfile(user?.id);

  return (
    <div className="flex items-center justify-between py-2 pl-4">
      <p className="text-nowrap text-xs">{profile?.username}</p>
      <LogoutButton />
    </div>
  );
}
