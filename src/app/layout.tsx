import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

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
      <body className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Header />
            <div className="flex flex-1 justify-center pt-16">
              <Sidebar />
              <main className="w-full max-w-3xl p-8">{children}</main>
            </div>
            <Toaster position="top-center" richColors />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
