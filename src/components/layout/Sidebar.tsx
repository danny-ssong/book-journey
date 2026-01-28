"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BarChart3, FileText, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useGetMe } from "@/api/client/me.queries";

const menuItems = [
  {
    href: "/manage/posts",
    label: "글 관리",
    icon: FileText,
  },
  {
    href: "/manage/settings/profile",
    label: "프로필 관리",
    icon: Settings,
  },
  {
    href: "/manage/statistics",
    label: "독서 통계",
    icon: BarChart3,
  },
];

export function SidebarMenuContent() {
  const { data: user } = useGetMe();
  const pathname = usePathname();

  return (
    <div className="px-3 py-6">
      <Button asChild className="mb-6 w-full px-4 py-2 text-center">
        <Link href={!!user ? `/posts/new` : "/login"}>글쓰기</Link>
      </Button>
      {!!user && (
        <nav aria-label="사이드바 메뉴">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="hidden w-[200px] border-r py-4 lg:block"
      role="complementary"
      aria-label="사이드바"
    >
      <SidebarMenuContent />
    </aside>
  );
}
