"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, User, Menu, X, Search, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const menuItems = []

interface AuthenticatedUser {
  id: string
  fullname: string
  email: string
}

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cartItems, isCartOpen, setIsCartOpen } = useCart()
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify")
        const data = await response.json()
        if (data.success && data.user) {
          setUser(data.user)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const getFirstName = (fullname: string) => {
    return fullname.split(" ")[0]
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const getGradientColor = (name: string) => {
    const firstLetter = name.charAt(0).toUpperCase()
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-teal-500 to-green-500",
    ]
    const index = firstLetter.charCodeAt(0) % colors.length
    return colors[index]
  }

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
      <header className="bg-[#F5F1ED] border-b sticky top-0 z-50" style={{ borderColor: "#D9CFC7" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
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

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="Ananthala Logo"
                  className="h-20 w-auto hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {!isLoading && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#8B5A3C] hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors relative"
                        >
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${getGradientColor(user.fullname)} flex items-center justify-center text-white font-semibold text-sm`}
                          >
                            {getFirstName(user.fullname).charAt(0).toUpperCase()}
                          </div>
                          <span className="sr-only">User menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5 text-sm text-[#6D4530]">
                          <div className="font-medium">{getFirstName(user.fullname)}</div>
                          <div className="text-xs text-[#8B5A3C]/70 truncate">{user.email}</div>
                        </div>
                        <DropdownMenuItem asChild className="text-[#6D4530] cursor-pointer">
                          <Link href="/customer/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-[#6D4530] cursor-pointer">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
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
                  )}
                </>
              )}
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

        {isSearchOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-[#F5F1ED] border-b shadow-lg animate-in slide-in-from-top duration-300 z-40"
            style={{ borderColor: "#D9CFC7" }}
          >
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
                    style={{ borderColor: "#D9CFC7" }}
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
          <div
            className="fixed left-0 top-16 bottom-0 w-40 bg-[#F5F1ED] border-r shadow-lg animate-in slide-in-from-left duration-300 overflow-y-auto z-40"
            style={{ borderColor: "#D9CFC7" }}
          >
            <nav className="p-3">
              <ul className="space-y-0.5">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block py-2 px-3 text-[#6D4530] text-sm font-normal tracking-wide hover:text-[#8B5A3C] hover:bg-[#8B5A3C]/10 transition-all duration-300 rounded-md"
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

      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => {
            setIsSearchOpen(false)
          }}
        />
      )}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => {
            setIsMenuOpen(false)
          }}
        />
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
    </>
  )
}
