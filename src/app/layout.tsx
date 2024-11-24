import "./globals.css";
import BookSearchArea from "./_components/MainBookSearchInput";
import ReactQueryProvider from "./_components/ReactQueryProvider";
import getUserOnServer from "./_lib/getUserOnServer";
import HeaderNavLinks from "./_components/HeaderNavLinks";
import UserLoginStatus from "./_components/UserLoginStatus";
import SidebarMenu from "./_components/SidebarMenu";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserOnServer();
  return (
    <html lang="en">
      <body className="w-full h-screen">
        <div className="w-full h-full flex flex-col">
          <header className="w-full min-h-[64px] flex bg-white justify-between items-center fixed px-10 border">
            <div className="flex justify-between items-center w-[800px]">
              <div>Book-Journey Logo</div>
              <HeaderNavLinks />
              <BookSearchArea />
            </div>
            <UserLoginStatus user={user} />
          </header>
          <div className="px-10 mt-[64px] pt-10 bg-slate-50 flex flex-1 ">
            <SidebarMenu user={user} />
            <ReactQueryProvider>
              <main className="mx-auto px-4 md:px-10 lg:px-20">{children}</main>
            </ReactQueryProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
