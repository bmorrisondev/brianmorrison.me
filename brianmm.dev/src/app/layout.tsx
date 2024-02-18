import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  openGraph: {
    title: 'Brian Morrison II',
    description: 'Connect with me!',
    url: 'https://brianmmdev',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://brianmm.dev/img/og.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
