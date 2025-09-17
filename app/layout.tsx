import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import PageLoader from '@/components/common/page-loader'
import { NavigationLoaderProvider } from '@/lib/providers/navigation-loader-provider'
import './globals.css'
import { metadata } from '@/lib/config/app'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <NavigationLoaderProvider>
          {children}
          <Analytics />
          <PageLoader />
        </NavigationLoaderProvider>
      </body>
    </html>
  )
}
