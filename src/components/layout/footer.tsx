"use client"

import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-gray-800 py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      {/* Bottom Bar */}
      <div className="pt-4 sm:pt-6 md:pt-8 border-t border-amber-100">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:gap-6 text-foreground">
          {/* Copyright */}
          <p className="font-medium text-xs sm:text-sm md:text-base text-center">
            © 2025 Ananthala. All rights reserved.
          </p>
          
          {/* Links Grid - Responsive */}
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center items-center">
            <Link 
              href="/policy-privacy" 
              className="hover:text-amber-950 transition-colors font-medium text-xs sm:text-sm md:text-base"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link 
              href="/policy-terms" 
              className="hover:text-amber-950 transition-colors font-medium text-xs sm:text-sm md:text-base"
            >
              Terms
            </Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link 
              href="/policy-refund" 
              className="hover:text-amber-950 transition-colors font-medium text-xs sm:text-sm md:text-base"
            >
              Refund
            </Link>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <Link 
              href="/policy-shipping" 
              className="hover:text-amber-950 transition-colors font-medium text-xs sm:text-sm md:text-base"
            >
              Shipping
            </Link>
          </div>
          
          {/* Track Order Button */}
          <div className="flex justify-center">
            <Link
              href="/track-order"
              className="px-3 sm:px-5 py-2 bg-amber-900 hover:bg-amber-950 text-white font-semibold rounded-lg transition-colors whitespace-nowrap text-xs sm:text-sm md:text-base"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
