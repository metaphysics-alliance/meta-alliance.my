import type { ReactNode } from 'react'
import localFont from 'next/font/local'

const notoCJK = localFont({
  src: '../src/Noto Sans CJK Regular.otf',
  display: 'swap',
  weight: '400',
  variable: '--font-app',
})

const cnZcool = localFont({
  src: [
    { path: '../src/simplified-zcool-cang-er-yu-yang-ti-W02.ttf', weight: '400', style: 'normal' },
    { path: '../src/simplified-zcool-cang-er-yu-yang-ti-W04.ttf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-cn',
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
    facebook: '9uxfb6r955f9cl5i4w9b2j8rz1ittg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metaphysics Alliance',
    description: 'Chinese metaphysics for decisive clarity.',
    images: ['/images/og-default.jpg'],
  },
  other: {
    'facebook-domain-verification': '9uxfb6r955f9cl5i4w9b2j8rz1ittg', //Facebook domain verification
  },
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <head><meta name="facebook-domain-verification" content="9uxfb6r955f9cl5i4w9b2j8rz1ittg" /></head>
      <body className={`${notoCJK.className} ${notoCJK.variable} ${cnZcool.variable}`}>
        {children}
      </body>
    </html>
  )
}
