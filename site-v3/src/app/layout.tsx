import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { DevMode } from '@/components/DevMode'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const SITE_URL = 'https://www.knightstainedglass.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Knight Stained Glass',
  description:
    'Church restorations, commercial installations, and custom residential stained glass by Andrea Knight. Serving the Cincinnati area.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Knight Stained Glass',
    description:
      'Church restorations, commercial installations, and custom residential stained glass by Andrea Knight. Serving the Cincinnati area.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Knight Stained Glass',
    description:
      'Church restorations, commercial installations, and custom residential stained glass by Andrea Knight. Serving the Cincinnati area.',
    images: ['/og-image.jpg'],
  },
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
