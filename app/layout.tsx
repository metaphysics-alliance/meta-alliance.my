import type { ReactNode } from 'react'
import localFont from 'next/font/local'

const notoCJK = localFont({
  src: '../src/Noto Sans CJK Regular.otf',
  display: 'swap',
  weight: '400',
  variable: '--font-app',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Metaphysics Alliance',
    template: '%s | Metaphysics Alliance',
  },
  description: 'Chinese metaphysics for decisive clarity. Cross‑validated insights across BaZi, Zi Wei, Qi Men, Feng Shui and numerology.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'Metaphysics Alliance',
    title: 'Metaphysics Alliance',
    description: 'Chinese metaphysics for decisive clarity.',
    images: ['/images/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metaphysics Alliance',
    description: 'Chinese metaphysics for decisive clarity.',
    images: ['/images/og-default.jpg'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <body className={`${notoCJK.className}`}>{children}</body>
    </html>
  )
}
