"use client"

import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-gray-800 py-1 px-4">
      
          

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-100">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4 text-foreground text-base">
            <p className="font-medium">© 2025 Ananthala. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center">
              <Link href="/policy-privacy" className="hover:text-amber-950 transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link href="/policy-terms" className="hover:text-amber-950 transition-colors font-medium">
                Terms & Conditions
              </Link>
              <Link href="/policy-refund" className="hover:text-amber-950 transition-colors font-medium">
                Refund Policy
              </Link>
              <Link href="/policy-shipping" className="hover:text-amber-950 transition-colors font-medium">
                Shipping Policy
              </Link>
              <Link
                href="/track-order"
                className="px-5 py-2 bg-amber-900 hover:bg-amber-950 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Track Order
              </Link>
            </div>
          </div>
        </div>
      
    </footer>
  )
}
