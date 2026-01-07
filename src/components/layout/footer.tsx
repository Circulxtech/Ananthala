"use client"

import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-stone-50 border-t border-amber-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
              <img src="/logo.png" alt="Ananthala Logo" className="h-16 w-auto" />
            </Link>
            <p className="text-foreground mb-6 font-medium text-base leading-relaxed">
              Premium mattresses crafted for your best sleep. Experience luxury comfort with our 100-night trial and
              15-year warranty.
            </p>
            {/* Contact Details */}
            <div className="space-y-3 mb-6 text-foreground text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-foreground flex-shrink-0" />
                <span className="font-medium">1-800-SLEEP-WELL</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-foreground flex-shrink-0" />
                <span className="font-medium">support@ananthala.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-foreground flex-shrink-0" />
                <span className="font-medium">123 Sleep Street, San Francisco, CA</span>
              </div>
            </div>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors text-amber-900"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors text-amber-900"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors text-amber-900"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-4 text-foreground font-semibold text-base">CONTACT</h4>
            <ul className="space-y-3 text-foreground text-sm">
              <li>
                <Link href="/dealer-enquiry" className="hover:text-amber-950 transition-colors font-medium">
                  Dealer Enquiry
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-amber-950 transition-colors font-medium">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/policy-terms" className="hover:text-amber-950 transition-colors font-medium">
                  T&C
                </Link>
              </li>
              <li>
                <Link href="/policy-shipping" className="hover:text-amber-950 transition-colors font-medium">
                  Shipping & Return
                </Link>
              </li>
              <li>
                <Link href="/policy-terms" className="hover:text-amber-950 transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policy-refund" className="hover:text-amber-950 transition-colors font-medium">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ANANTHALA */}
          <div>
            <h4 className="mb-4 text-foreground font-semibold text-base">ANANTHALA</h4>
            <ul className="space-y-3 text-foreground text-sm">
              <li>
                <Link href="/" className="hover:text-amber-950 transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/mattress" className="hover:text-amber-950 transition-colors font-medium">
                  Mattress
                </Link>
              </li>
              <li>
                <Link href="/bedding" className="hover:text-amber-950 transition-colors font-medium">
                  Bedding
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-amber-950 transition-colors font-medium">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-950 transition-colors font-medium">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-amber-950 transition-colors font-medium">
                  Story
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-100 flex flex-col md:flex-row justify-between items-center gap-4 text-foreground text-sm">
          <p className="font-medium">© 2025 Ananthala. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end">
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
          </div>
        </div>
      </div>
    </footer>
  )
}
