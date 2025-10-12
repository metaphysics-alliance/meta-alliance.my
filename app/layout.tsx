import type { ReactNode } from 'react'

export const metadata = {
  title: 'Meta Alliance',
  description: 'Metaphysics Alliance official site',
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
