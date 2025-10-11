import { Toaster } from "sonner";

import { AuthProvider } from "@/providers/AuthProvider";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

import Header from "@/components/layout/Header";
import SidebarMenu from "@/components/layout/SidebarMenu";

import "./globals.css";

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
                <Toaster position="top-center" richColors />
              </div>
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
