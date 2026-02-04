import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import { FixedSidebar } from "@/components/layout/fixed-sidebar"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
})
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ANANTHALA - Premium Mattresses for Better Sleep",
  description:
    "Premium mattresses crafted for your best sleep. Experience luxury comfort with our 100-night trial and 15-year warranty.",
 
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.className} antialiased`} style={{ fontWeight: 300 }}>
        <CartProvider>
          {children}
          <FixedSidebar />
        </CartProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
