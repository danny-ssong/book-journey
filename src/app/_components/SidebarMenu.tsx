import { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function SidebarMenu({ user }: { user: User | null }) {
  return (
    <aside className="h-full w-[200px] border bg-white px-5 py-6">
      <div className="mb-5 w-full border bg-slate-800 px-4 py-2 text-center text-white">
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
          <li>
            <Link href={`/manage/statistics`}>독서 통계</Link>
          </li>
        </ul>
      )}
    </aside>
  );
}
