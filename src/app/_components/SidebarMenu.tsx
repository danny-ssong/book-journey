import { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function SidebarMenu({ user }: { user: User | null }) {
  return (
    <aside className="min-w-[200px] bg-white px-5 py-4">
      {!!user ? (
        <ul>
          <li className="mb-5 border bg-slate-800 text-white px-4 py-2 w-full text-center">
            <Link href="/posts/new">글쓰기</Link>
          </li>
          <li>
            <Link href={`/manage/posts`}>글 관리</Link>
          </li>
          <li>
            <Link href={`/manage/settings/profile`}>프로필 관리</Link>
          </li>
        </ul>
      ) : (
        <div>로그인이 필요합니다.</div>
      )}
    </aside>
  );
}