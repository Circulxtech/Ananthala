"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, User, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useCart } from "@/contexts/cart-context"

const menuItems = [
  { label: "MATTRESS", href: "/mattress" },
  { label: "PILLOWS", href: "/pillows" },
  { label: "BEDDING", href: "/bedding" },
  { label: "BESTSELLERS", href: "/bestsellers" },
  { label: "NEW LAUNCHES", href: "/new-launches" },
]

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItems, isCartOpen, setIsCartOpen } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchOpen(false)
    }
  }

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery("")
    }
  }

  return (
    <>
      <header className="bg-[#F5F1ED] border-b relative z-50" style={{ borderColor: '#D9CFC7' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Hamburger Menu and Search Icon */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#8B5A3C] hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Menu</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#8B5A3C] hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors"
                onClick={handleSearchIconClick}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
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
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#8B5A3C] hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">User account</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#8B5A3C] hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8B5A3C] text-white text-xs rounded-full min-w-[1rem] h-4 flex items-center justify-center px-1">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#F5F1ED] border-b shadow-lg animate-in slide-in-from-top duration-300 z-40" style={{ borderColor: '#D9CFC7' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    autoFocus
                    className="w-full px-4 py-3 pl-12 pr-12 bg-white border rounded-md text-[#6D4530] placeholder:text-[#8B5A3C]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5A3C]/30 transition-all"
                    style={{ borderColor: '#D9CFC7' }}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B5A3C]/50" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5A3C]/50 hover:text-[#6D4530] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#F5F1ED] border-b shadow-lg animate-in slide-in-from-top duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto z-40" style={{ borderColor: '#D9CFC7' }}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-[#6D4530] text-base font-normal tracking-wide hover:text-[#8B5A3C] hover:bg-[#8B5A3C]/10 transition-all duration-300 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {(isMenuOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => {
            setIsMenuOpen(false)
            setIsSearchOpen(false)
          }}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
    </>
  )
}
