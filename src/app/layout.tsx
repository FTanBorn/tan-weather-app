// src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider from './ThemeProvider'
import ClientLayout from '@/components/ClientLayout'
import { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
