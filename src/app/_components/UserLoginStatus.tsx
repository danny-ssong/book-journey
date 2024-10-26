import Link from "next/link";
import getUserOnServer from "../_lib/getUserOnServer";
import LogoutButton from "./LogoutButton";
import { User } from "@supabase/supabase-js";

export default async function UserLoginStatus({ user }: { user: User | null }) {
  return <div className="px-4 py-2">{!!user ? <LogoutButton /> : <Link href="/login">로그인</Link>}</div>;
}
