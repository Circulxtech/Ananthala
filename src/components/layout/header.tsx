"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

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
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [user, setUser] = useState<{ fullname: string; email: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      toast({
        title: "Success",
        description: "Logged out successfully",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      })
    }
  }

  const getFirstName = (fullname: string) => {
    return fullname.split(" ")[0]
  }

  const getGradientColor = (name: string) => {
    const firstChar = name.charAt(0).toUpperCase()
    const hue = ((firstChar.charCodeAt(0) - 65) * 137.5) % 360
    return `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 60) % 360}, 70%, 50%))`
  }

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
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
              {!isLoading && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#8B5A3C]/30 bg-white hover:bg-[#8B5A3C]/5 transition-colors">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                            style={{ background: getGradientColor(user.fullname) }}
                          >
                            {getFirstName(user.fullname).charAt(0).toUpperCase()}
                          </div>
                          <span className="text-[#6D4530] text-sm font-medium hidden sm:block">
                            {getFirstName(user.fullname)}
                          </span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-white border-[#8B5A3C]/20">
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="text-[#6D4530] cursor-pointer hover:bg-[#8B5A3C]/10 focus:bg-[#8B5A3C]/10"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
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
                <span className="absolute -top-1 -right-1 bg-[#8B5A3C] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
                <span className="sr-only">Shopping cart</span>
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#F5F1ED] border-b border-[#8B5A3C]/20 shadow-lg animate-in slide-in-from-top duration-300 max-h-[calc(100vh-4rem)] overflow-y-auto">
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

      {isMenuOpen && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setIsMenuOpen(false)} />}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
