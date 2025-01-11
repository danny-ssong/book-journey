import { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function SidebarMenu({ user }: { user: User | null }) {
  return (
    <aside className="w-[200px] bg-white px-5 py-6 border h-full">
      <div className="mb-5 border bg-slate-800 text-white px-4 py-2 w-full text-center">
        <Link href={!!user ? `/posts/new` : "/login"}>글쓰기</Link>
      </div>
      {!!user && (
        <ul className="flex flex-col gap-2">
          <li>
            <Link href={`/manage/posts`}>글 관리</Link>
          </li>
          <li>
            <Link href={`/manage/settings/profile`}>프로필 관리</Link>
          </li>
        </ul>
      )}
    </aside>
  );
}
