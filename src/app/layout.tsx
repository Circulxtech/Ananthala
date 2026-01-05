import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Geist_Mono } from "next/font/google"
import Script from "next/script"
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
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uwococqrjx");
            `,
          }}
        />
      </head>
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
