"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, User, Menu, X, Search, LogOut, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchDropdown } from "@/components/search/search-dropdown"

const menuItems = [
  { label: "Shop", href: "/#find-your-perfect-mattress" },
  { label: "Joy", href: "/category/joy#shop" },
  { label: "Bliss", href: "/category/bliss#shop" },
  { label: " Grace", href: "/category/grace#shop" },
  { label: "My Account", href: "/login" },
  { label: "About Ananthala", href: "/about" },
  { label: "Search", onClick: "search" as const },
]

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
  const { cartItems } = useCart()
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

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm" style={{ borderColor: "#D9CFC7" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4 -ml-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-[#EED9C4] hover:bg-transparent transition-all duration-300 p-0 h-14 w-14 rounded-lg font-black flex items-center justify-center group outline-none focus:outline-none focus-visible:ring-0 focus:ring-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-14 w-14 stroke-[3] group-hover:animate-bounce" />
                ) : (
                  <Menu className="h-14 w-14 stroke-[3] group-hover:animate-bounce" />
                )}
                <span className="sr-only">Menu</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-[#EED9C4] hover:bg-transparent transition-all duration-300 relative p-0 h-14 w-14 rounded-lg font-black group flex items-center justify-center outline-none focus:outline-none focus-visible:ring-0 focus:ring-0"
                onClick={handleSearchIconClick}
              >
                <Search className="h-12 w-12 stroke-[2.5] group-hover:animate-bounce" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center group">
                <img
                  src="/logo.png"
                  alt="Ananthala Logo"
                  className="h-20 w-auto hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                />
              </Link>
            </div>

            <div className="flex items-center gap-4 -mr-2">
              {!isLoading && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-foreground hover:ring-2 hover:ring-[#EED9C4] transition-all duration-300 relative p-1 h-14 w-14 group outline-none focus:outline-none focus-visible:ring-0 focus:ring-0"
                        >
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGradientColor(
                              user.fullname,
                            )} flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-white group-hover:animate-bounce`}
                          >
                            {getFirstName(user.fullname).charAt(0).toUpperCase()}
                          </div>
                          <span className="sr-only">User menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5 text-sm text-[#6D4530]">
                          <div className="font-bold">{getFirstName(user.fullname)}</div>
                          <div className="text-xs text-[#8B5A3C]/70 truncate">{user.email}</div>
                        </div>
                        <DropdownMenuItem asChild className="text-[#6D4530] cursor-pointer font-semibold">
                          <Link href="/customer/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="text-[#6D4530] cursor-pointer font-semibold">
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
                        className="text-foreground hover:text-[#EED9C4] hover:bg-transparent transition-all duration-300 p-0 h-14 w-14 rounded-lg font-black flex items-center justify-center group outline-none focus:outline-none focus-visible:ring-0 focus:ring-0"
                      >
                        <User className="h-12 w-12 stroke-[2.5] group-hover:animate-bounce" />
                        <span className="sr-only">User account</span>
                      </Button>
                    </Link>
                  )}
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-[#EED9C4] hover:bg-transparent transition-all duration-300 relative p-0 h-14 w-14 rounded-lg font-black group flex items-center justify-center outline-none focus:outline-none focus-visible:ring-0 focus:ring-0"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="h-12 w-12 stroke-[2.5] group-hover:animate-bounce" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-br from-[#8B5A3C] to-[#6D4530] text-white text-xs font-black rounded-full min-w-[1.5rem] h-6 flex items-center justify-center px-0.5 border-2 border-white shadow-lg animate-pulse">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </div>
          </div>
        </div>

      <SearchDropdown
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />

        {isMenuOpen && (
          <div
            className="fixed left-0 top-16 bottom-0 w-56 bg-white border-r shadow-lg animate-in slide-in-from-left duration-300 overflow-y-auto z-40"
            style={{ borderColor: "#D9CFC7" }}
          >
            <nav className="p-4">
              <div className="flex items-center justify-center py-4">
                <img src="/logo.png" alt="Ananthala" className="h-14 w-auto" />
              </div>
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block py-2.5 px-4 text-foreground text-base font-medium uppercase tracking-wide hover:text-[#8B5A3C] transition-all duration-300 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="w-full text-left py-2.5 px-4 text-foreground text-base font-medium uppercase tracking-wide hover:text-[#8B5A3C] transition-all duration-300 rounded-md"
                        onClick={() => {
                          setIsMenuOpen(false)
                          if (item.onClick === "search") {
                            setIsSearchOpen(true)
                          }
                        }}
                      >
                        {item.label}
                      </button>
                    )}
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

    </>
  )
}
