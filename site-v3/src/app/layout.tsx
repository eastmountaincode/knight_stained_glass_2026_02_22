import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { DevMode } from '@/components/DevMode'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Knight Stained Glass — Cincinnati, OH',
  description:
    'Church restorations, commercial installations, and custom residential stained glass by Andrea Knight. Serving the Cincinnati area.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ghg2orb.css" />
      </head>
      <body className={inter.variable}>
        <DevMode />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
