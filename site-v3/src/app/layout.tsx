import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { DevMode } from '@/components/DevMode'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const uncial = localFont({
  src: '../fonts/UncialAntiqua-Regular.ttf',
  variable: '--font-uncial',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Knight Stained Glass — Cincinnati, OH',
  description:
    'Church restorations, commercial installations, and residential stained glass by Andrea Knight. Serving the Cincinnati area.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${uncial.variable}`}>
        <DevMode />
        {children}
      </body>
    </html>
  )
}
