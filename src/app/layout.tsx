import "./globals.css";
import ReactQueryProvider from "./_components/ReactQueryProvider";
import SidebarMenu from "./_components/SidebarMenu";
import { ThemeProvider } from "./_components/theme-privider";
import { AuthProvider } from "./_context/AuthContext";
import Header from "./_components/Header";

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
            <AuthProvider>
              <Header />
              <div className="flex h-full justify-center pt-16">
                <SidebarMenu />
                <main className="w-[800px] p-8">{children}</main>
              </div>
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
