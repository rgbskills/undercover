import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { siteConfig } from '@/config/site'
import Navigation from '@/components/Navigation';

const OpenSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${OpenSans.className} min-h-screen bg-slate-950 font-sans antialiased`}>
        <div className='container mx-auto'>
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  )
}
