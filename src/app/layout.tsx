import { createClient } from "@/utils/supabase/server";
import "./globals.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginSection from "./_components/LoginStatus";
import LogoutButton from "./_components/LogoutButton";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();
  console.log("RootLayout render");

  return (
    <html lang="en">
      <body>
        <div className="w-full h-screen flex flex-col">
          <header className="w-full h-20 flex bg-slate-500 justify-between items-center">
            <div className="flex justify-between items-center w-[500px] pl-10">
              <div>Book-Journey Logo</div>
              <nav className="flex">
                <ul className="flex gap-10">
                  <li>
                    <Link href="/">홈</Link>
                  </li>
                  <li>
                    <Link href="/feed">피드</Link>
                  </li>
                </ul>
              </nav>
              <div>search bar</div>
            </div>
            {!!user.user ? <LogoutButton /> : <Link href="/login">로그인</Link>}
          </header>
          <div className="px-10 pt-10 bg-red-50 flex flex-grow">
            <aside className="w-[200px] bg-blue-200 px-5 py-4">
              <ul>
                <li className="mb-5 border bg-slate-800 text-white px-4 py-2 w-full text-center">
                  <Link href="/posts/new">글쓰기</Link>
                </li>
                <li>
                  <Link href="/settings/profile">프로필</Link>
                </li>
              </ul>
            </aside>
            <main className="w-full flex justify-center">{children}</main>
            <aside></aside>
          </div>
        </div>
      </body>
    </html>
  );
}
