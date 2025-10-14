import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import HydrationProvider from '@/components/HydrationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NYO - Not Your Ordinary | Streetwear',
  description: 'NYO Streetwear - Premium products that redefine quality and style. Not your ordinary streetwear brand.',
  keywords: ['streetwear', 'NYO', 'not your ordinary', 'premium', 'fashion', 'clothing', 'style'],
  authors: [{ name: 'NYO Streetwear' }],
  icons: {
    icon: '/nyo.png',
    shortcut: '/nyo.png',
    apple: '/nyo.png',
  },
  openGraph: {
    title: 'NYO - Not Your Ordinary Streetwear',
    description: 'NYO Streetwear - Premium products that redefine quality and style',
    type: 'website',
    locale: 'en_US',
    url: 'https://nyo.wtf',
    siteName: 'NYO Streetwear',
    images: [
      {
        url: '/nyo.png',
        width: 1200,
        height: 630,
        alt: 'NYO - Not Your Ordinary Streetwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYO - Not Your Ordinary Streetwear',
    description: 'NYO Streetwear - Premium products that redefine quality and style',
    images: ['/nyo.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <HydrationProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                className: 'text-sm font-medium',
                style: {
                  background: '#1a1a1a',
                  color: '#fafafa',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fafafa',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fafafa',
                  },
                },
              }}
            />
          </HydrationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 