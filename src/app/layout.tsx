import { createClient } from "@/utils/supabase/server";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "./_components/LogoutButton";
import BookSearchArea from "./_components/MainBookSearchInput";
import ReactQueryProvider from "./_components/ReactQueryProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className="w-full h-screen">
        <div className="w-full h-full flex flex-col">
          <header className="w-full min-h-[64px] flex bg-slate-500 justify-between items-center fixed">
            <div className="flex justify-between items-center w-[800px] pl-10">
              <div>Book-Journey Logo</div>
              <nav>
                <ul className="flex gap-10">
                  <li>
                    <Link href="/">홈</Link>
                  </li>
                  <li>
                    <Link href="/feed">피드</Link>
                  </li>
                </ul>
              </nav>
              <BookSearchArea />
            </div>
            {!!user.user ? <LogoutButton /> : <Link href="/login">로그인</Link>}
          </header>
          <div className="px-10 mt-[64px] pt-10 bg-red-50 flex flex-1 ">
            <aside className="min-w-[200px] bg-blue-200 px-5 py-4">
              <ul>
                <li className="mb-5 border bg-slate-800 text-white px-4 py-2 w-full text-center">
                  <Link href="/posts/new">글쓰기</Link>
                </li>
                <li>
                  <Link href={`/manage/${user.user?.id}/posts`}>글 관리</Link>
                </li>
                <li>
                  <Link href={`/manage/${user.user?.id}/settings/profile`}>프로필 관리</Link>
                </li>
              </ul>
            </aside>
            <ReactQueryProvider>
              <main className="w-full flex justify-center py-4">{children}</main>
            </ReactQueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
