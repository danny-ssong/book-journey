import "./globals.css";
import BookSearchArea from "./_components/MainBookSearchInput";
import ReactQueryProvider from "./_components/ReactQueryProvider";
import getUserOnServer from "./_lib/getUserOnServer";
import HeaderNavLinks from "./_components/HeaderNavLinks";
import UserLoginStatus from "./_components/UserLoginStatus";
import SidebarMenu from "./_components/SidebarMenu";
import { ThemeProvider } from "./_components/theme-privider";
import ThemeModeToggle from "./_components/ThemeModeToggle";

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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <div className="flex h-full w-full">
              <header className="fixed flex min-h-16 w-full items-center justify-between border bg-background px-10">
                <div className="flex items-center gap-10">
                  <p className="text-nowrap">Book-Journey Logo</p>
                  <HeaderNavLinks />
                </div>
                <BookSearchArea />
                <div className="flex items-center gap-6">
                  <UserLoginStatus user={user} />
                  <ThemeModeToggle />
                </div>
              </header>
              <div className="mx-auto mt-16 flex px-10 py-10">
                <SidebarMenu user={user} />
                <main className="ml-10 w-[850px]">{children}</main>
              </div>
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
