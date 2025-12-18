"use client"

import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export function Footer() {
  const router = useRouter()

  const onNavigate = (page: string) => {
    router.push(`/${page}`)
  }

  return (
    <footer className="bg-stone-50 border-t border-amber-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="tracking-widest mb-4 text-black">ANANTHALA</p>
            <p className="text-black mb-6">
              Premium mattresses crafted for your best sleep. Experience luxury comfort with our 100-night trial
              and 15-year warranty.
            </p>
            {/* Contact Details */}
            <div className="space-y-2 mb-6 text-black">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-black" />
                <span>1-800-SLEEP-WELL</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-black" />
                <span>support@ananthala.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-black" />
                <span>123 Sleep Street, San Francisco, CA</span>
              </div>
            </div>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors text-amber-900"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors text-amber-900"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors text-amber-900"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* contact */}
          <div>
            <h4 className="mb-4 text-black">CONTACT</h4>
            <ul className="space-y-2 text-black">
              <li>
                <button
                  onClick={() => onNavigate("products")}
                  className="hover:text-amber-950 transition-colors"
                >
                  Dealer Enquiry
                </button>
              </li>
              <li>
                <button className="hover:text-amber-950 transition-colors">Contact Us</button>
              </li>
              <li>
                <button className="hover:text-amber-950 transition-colors">T&C</button>
              </li>
              <li>
                <button className="hover:text-amber-950 transition-colors">Shipping & Return</button>
              </li>
              <li>
                <button className="hover:text-amber-950 transition-colors">Terms of Service</button>
              </li>
              <li>
                <button className="hover:text-amber-950 transition-colors">Refund Policy</button>
              </li>
            </ul>
          </div>

          {/* Ananthala */}
          <div>
            <h4 className="mb-4 text-black">ANANTHALA</h4>
            <ul className="space-y-2 text-black">
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-amber-950 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-amber-950 transition-colors"
                >
                  Mattress
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("track-order")}
                  className="hover:text-amber-950 transition-colors"
                >
                  Bedding
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("policy-refund")}
                  className="hover:text-amber-950 transition-colors"
                >
                  Press
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("policy-shipping")}
                  className="hover:text-amber-950 transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button className="hover:text-amber-950 transition-colors">Story</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-100 flex flex-col md:flex-row justify-between items-center gap-4 text-black">
          <p>© 2025 Ananthala. All rights reserved.</p>
          <div className="flex gap-6">
            <button
              onClick={() => onNavigate("policy-privacy")}
              className="hover:text-amber-950 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate("policy-terms")}
              className="hover:text-amber-950 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onNavigate("policy-refund")}
              className="hover:text-amber-950 transition-colors"
            >
              Refund Policy
            </button>
            <button
              onClick={() => onNavigate("policy-shipping")}
              className="hover:text-amber-950 transition-colors"
            >
              Shipping Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
