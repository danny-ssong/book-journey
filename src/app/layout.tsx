import "./globals.css";
import ReactQueryProvider from "./_components/ReactQueryProvider";
import SidebarMenu from "./_components/SidebarMenu";
import { ThemeProvider } from "./_components/theme-privider";
import { UserProvider } from "./_hooks/useUser";
import Header from "./_components/Header";
import { Divide } from "lucide-react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <UserProvider>
              <div className="relative h-screen">
                <Header />
                <div className="flex h-full overflow-hidden pt-16">
                  <div className="mr-4 hidden border-r lg:block">
                    <SidebarMenu />
                  </div>
                  <main className="flex-1 overflow-y-auto py-0 sm:py-8">
                    <div className="mx-auto h-full px-4 sm:w-[800px] sm:px-0">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </UserProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
