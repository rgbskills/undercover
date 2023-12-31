import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { siteConfig } from '@/config/site'
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import { CartProvider } from "@/app/shop/CartProvider";

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

  const heroImages = [{
    url: "/hero/slide1.png",
    width: 1164,
    height: 655
  },
  {
    url: "/hero/slide2.png",
    width: 1164,
    height: 655
  },
  {
    url: "/hero/slide3.png",
    width: 1164,
    height: 655
  },
  {
    url: "/hero/slide4.png",
    width: 1164,
    height: 655
  },
  {
    url: "/hero/slide5.png",
    width: 1164,
    height: 655
  }];


  return (
    <html lang="en">
      {/*
        suppressHydrationWarning={true} - gets rid of the
        "Extra attributes from the server: cz-shortcut-listen" error
       */}
      <body suppressHydrationWarning={true} className={`${OpenSans.className} min-h-screen bg-slate-950 font-sans antialiased`}>
        <ServerAuthProvider>
          <CartProvider>
            <div className='container mx-auto'>
              <Navigation />
            </div>
            <Hero
              images={heroImages}
              button={{text: "Show me more", href: "/shop"}}
            />
            <div className='container mx-auto'>
                {children}
            </div>
          </CartProvider>
        </ServerAuthProvider>
      </body>
    </html>
  )
}
