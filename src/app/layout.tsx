import "./globals.css";
import BookSearchArea from "./_components/MainBookSearchInput";
import ReactQueryProvider from "./_components/ReactQueryProvider";
import getUserOnServer from "./_lib/getUserOnServer";
import HeaderNavLinks from "./_components/HeaderNavLinks";
import UserLoginStatus from "./_components/UserLoginStatus";
import SidebarMenu from "./_components/SidebarMenu";
import { ThemeProvider } from "./_components/theme-privider";
import ModeToggle from "./_components/ModeToggle";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserOnServer();
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-x-hidden overflow-y-scroll">
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-full w-full">
            <header className="fixed flex min-h-16 w-full items-center justify-between border px-10">
              <div className="flex items-center gap-10">
                <p>Book-Journey Logo</p>
                <HeaderNavLinks />
              </div>
              <BookSearchArea />
              <div className="flex items-center gap-6">
                <UserLoginStatus user={user} />
                <ModeToggle />
              </div>
            </header>
            <div className="mx-auto mt-16 flex px-10 py-10">
              <SidebarMenu user={user} />

              <ReactQueryProvider>
                <main className="ml-10 w-[850px]">{children}</main>
              </ReactQueryProvider>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
