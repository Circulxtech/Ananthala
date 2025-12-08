"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { label: "MATTRESS", href: "/mattress" },
  { label: "PILLOWS", href: "/pillows" },
  { label: "BEDDING", href: "/bedding" },
  { label: "SUPPORT & MOBILITY", href: "/support-mobility" },
  { label: "BESTSELLERS", href: "/bestsellers" },
  { label: "NEW LAUNCHES", href: "/new-launches" },
  { label: "HELP ME CHOOSE", href: "/help-me-choose" },
  { label: "MORE", href: "/more" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-[#F5F1ED] border-b border-[#8B5A3C]/20 relative z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Hamburger Menu */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#8B5A3C] hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </Button>
            </div>

            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center">
                <span className="text-[#8B5A3C] text-xl font-normal tracking-wider hover:text-[#6D4530] transition-colors">
                  ANANTHALA
                </span>
              </Link>
            </div>

            {/* Right side - User and Cart icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#8B5A3C] hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User account</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#8B5A3C] hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[#8B5A3C] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
                <span className="sr-only">Shopping cart</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />

          {/* Menu Panel */}
          <div className="fixed top-16 left-0 w-80 max-w-[85vw] h-[calc(100vh-4rem)] bg-[#F5F1ED] z-50 shadow-xl overflow-y-auto animate-in slide-in-from-left duration-300">
            <nav className="py-6 px-6">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-[#6D4530] text-base font-normal tracking-wide hover:text-[#8B5A3C] hover:bg-[#8B5A3C]/5 transition-all duration-300 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
