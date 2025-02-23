import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function SidebarMenu({ user }: { user: User | null }) {
  return (
    <aside>
      <Card className="h-full">
        <CardContent className="h-full w-[200px] px-5 py-6">
          <Button className="mb-5 w-full px-4 py-2 text-center">
            <Link href={!!user ? `/posts/new` : "/login"}>글쓰기</Link>
          </Button>
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
        </CardContent>
      </Card>
    </aside>
  );
}
