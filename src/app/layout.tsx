import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'regenerator-runtime/runtime'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import NextAuthProvider from './context/client-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { ChildrenProps } from '@/lib/types'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: ChildrenProps) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
          </ThemeProvider>
          
        </NextAuthProvider>
      </body>
    </html>
  )
}
