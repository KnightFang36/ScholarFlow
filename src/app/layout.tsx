import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ScholarFlow — AI Knowledge Workspace',
  description: 'Think deeper, study smarter, with an AI workspace built for scholars.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0d14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: 'oklch(0.1 0 0)',
          colorForeground: 'oklch(0.97 0 0)',
          colorPrimary: 'oklch(0.98 0 0)',
          colorInput: 'oklch(1 0 0 / 6%)',
          colorInputForeground: 'oklch(0.97 0 0)',
          colorBorder: 'oklch(1 0 0 / 10%)',
          borderRadius: '0.625rem',
        },
        elements: {
          card: 'shadow-none border border-border',
          socialButtonsBlockButton: 'border-border hover:bg-muted',
          formButtonPrimary:
            'bg-primary text-primary-foreground shadow-none hover:bg-primary/80',
          footer: 'hidden',
        },
      }}
    >
      <html lang="en" className="bg-background">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
