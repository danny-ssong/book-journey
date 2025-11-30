import { Toaster } from "sonner";

import { AuthProvider } from "@/providers/AuthProvider";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
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
                <Sidebar />
                <main className="mx-auto w-full max-w-3xl p-8">{children}</main>
              </div>
              <Toaster position="top-center" richColors />
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
