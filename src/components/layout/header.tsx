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
  { label: "About", href: "/about" },
  { label: "Joy", href: "/category/joy" },
  { label: "Bliss", href: "/category/bliss" },
  { label: "Grace", href: "/category/grace" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
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
      <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: "#D9CFC7" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Menu</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors"
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
                          className="text-foreground hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors relative"
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
                      className="text-foreground hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors"
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
                className="text-foreground hover:bg-[#8B5A3C]/10 hover:text-[#6D4530] transition-colors relative"
                onClick={() => router.push("/cart")}
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
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block py-2.5 px-4 text-foreground text-base font-medium uppercase tracking-wide hover:text-[#8B5A3C] hover:bg-[#8B5A3C]/10 transition-all duration-300 rounded-md"
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

    </>
  )
}
