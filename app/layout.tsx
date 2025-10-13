import type { ReactNode } from 'react'

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
      <body>{children}</body>
    </html>
  )
}
