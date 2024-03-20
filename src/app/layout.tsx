import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'regenerator-runtime/runtime'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/authOptions"
import NextAuthProvider from './context/client-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { ChildrenProps } from '@/lib/types'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Medmatch',
  description: 'Ace your Obstetrics and Gynecology Interviews with our personalized AI Experience',
}

export default async function RootLayout({
  children,
}: ChildrenProps) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
          </ThemeProvider>
          
        </NextAuthProvider>
      </body>
    </html>
  )
}
