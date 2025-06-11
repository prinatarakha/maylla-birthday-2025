import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Maylla's Birthday 2025",
  description: "Maylla's Birthday 2025",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
