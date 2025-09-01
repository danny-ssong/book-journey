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
              <div className="h-full">
                <Header />
                <div className="flex h-full justify-center pt-16">
                  <div className="mr-4 hidden border-r lg:block">
                    <SidebarMenu />
                  </div>
                  <main className="px-4 py-0 sm:w-[800px] sm:px-0 sm:py-8">
                    {children}
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
