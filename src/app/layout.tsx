import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ReactQueryProvider>
            <Header />
            <div className="flex flex-1 justify-center">
              <Sidebar />
              <main className="w-full max-w-3xl p-4">{children}</main>
            </div>
            <Toaster position="top-center" richColors />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
