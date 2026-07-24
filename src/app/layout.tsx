import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'ScholarFlow — AI Knowledge Workspace',
  description: 'Your AI-powered knowledge workspace for smarter studying.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0d14',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
        <body className="bg-background font-sans antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}