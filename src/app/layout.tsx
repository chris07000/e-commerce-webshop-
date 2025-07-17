import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import HydrationProvider from '@/components/HydrationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NYO - Not Your Ordinary | Premium E-commerce',
  description: 'Discover premium products that redefine quality and style. NYO is not your ordinary shopping experience.',
  keywords: ['premium', 'e-commerce', 'luxury', 'style', 'NYO', 'not your ordinary', 'shopping'],
  authors: [{ name: 'NYO' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  openGraph: {
    title: 'NYO - Not Your Ordinary',
    description: 'Premium products that redefine quality and style',
    type: 'website',
    locale: 'en_US',
  },
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