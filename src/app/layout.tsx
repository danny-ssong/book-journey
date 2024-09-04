import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-full h-screen flex flex-col">
          <header className="w-full h-20 flex bg-slate-500">
            <nav>
              <ul>
                <li>
                  <Link href="/">홈</Link>
                </li>
                <li>
                  <Link href="/feed">피드</Link>
                </li>
              </ul>
            </nav>
            <div>search bar</div>
            <div>
              <Link href="/login">로그인</Link>
              <Link href="/logout">로그아웃</Link>
            </div>
          </header>
          <div className="px-10 pt-10 bg-red-50 flex flex-grow">
            <aside className="w-[200px]">
              <ul>
                <li>글쓰기</li>
                <li>프로필</li>
              </ul>
            </aside>
            {children}
            <aside></aside>
          </div>
        </div>
      </body>
    </html>
  );
}
