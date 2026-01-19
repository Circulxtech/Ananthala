"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Plus_Jakarta_Sans } from "next/font/google"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  MessageSquare,
  ChevronDown,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const googleSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-google-sans",
})

interface AuthenticatedAdmin {
  id: string
  fullname: string
  email: string
  role: string
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    icon: BookOpen,
  },
  {
    label: "Review Videos",
    href: "/admin/review-videos",
    icon: MessageSquare,
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Agent Management",
    href: "/admin/agents",
    icon: Users,
  },
  {
    label: "Order Management",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Enquiry & Queries",
    icon: MessageSquare,
    subItems: [
      {
        label: "Dealer Enquiries",
        href: "/admin/enquiries/dealer",
      },
      {
        label: "Contact Us",
        href: "/admin/enquiries/contact",
      },
    ],
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [admin, setAdmin] = useState<AuthenticatedAdmin | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/admin/admin-verify", {
          credentials: "include",
        })
        const data = await response.json()

        if (data.authenticated && data.user && data.user.role === "admin") {
          setAdmin(data.user)
        } else {
          sessionStorage.removeItem("admin_session")
          router.push("/admin")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        sessionStorage.removeItem("admin_session")
        router.push("/admin")
      } finally {
        setIsLoading(false)
      }
    }

    // Only check auth if not on login page
    if (pathname !== "/admin") {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [router, pathname])

  useEffect(() => {
    if (pathname.startsWith("/admin/enquiries")) {
      setOpenDropdown("Enquiry & Queries")
    }
  }, [pathname])

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("admin_session")
      await fetch("/api/auth/admin/admin-logout", {
        method: "POST",
        credentials: "include",
      })
      setAdmin(null)
      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const getFirstName = (fullname: string) => {
    return fullname.split(" ")[0]
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

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  const renderMenuItem = (item: any, isMobile = false) => {
    const Icon = item.icon

    if (item.subItems) {
      const isOpen = openDropdown === item.label
      const hasActiveSubItem = item.subItems.some((sub: any) => pathname === sub.href)

      return (
        <div key={item.label}>
          <button
            onClick={() => toggleDropdown(item.label)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
              hasActiveSubItem || isOpen
                ? "bg-[#8B5A3C] text-white"
                : "text-[#6D4530] hover:bg-[#8B5A3C]/10 hover:text-[#8B5A3C]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>
          {isOpen && (
            <div className="mt-1 ml-4 space-y-1">
              {item.subItems.map((subItem: any) => {
                const isActive = pathname === subItem.href
                return (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#8B5A3C]/20 text-[#8B5A3C] font-medium"
                        : "text-[#6D4530] hover:bg-[#8B5A3C]/10 hover:text-[#8B5A3C]"
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{subItem.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )
    }

    const isActive = pathname === item.href
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => isMobile && setIsSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive ? "bg-[#8B5A3C] text-white" : "text-[#6D4530] hover:bg-[#8B5A3C]/10 hover:text-[#8B5A3C]"
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className="font-medium">{item.label}</span>
      </Link>
    )
  }

  if (isLoading && pathname !== "/admin") {
    return (
      <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-[#E5D5C5] flex items-center justify-center mx-auto mb-4 animate-pulse p-2">
            <img src="/logo.png" alt="Ananthala" className="w-full h-full object-contain" />
          </div>
          <p className="text-[#8B5A3C] font-medium">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!admin || pathname === "/admin") {
    return children
  }

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      <style jsx global>{`
        .admin-portal * {
          font-family: var(--font-google-sans) !important;
        }
      `}</style>
      <div className={`admin-portal ${googleSans.variable}`}>
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-40" style={{ borderColor: "#D9CFC7" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-[#8B5A3C] hover:bg-[#8B5A3C]/10"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Ananthala" className="h-8 w-auto" />
                  <div>
                    <Link
                      href="/admin/dashboard"
                      className="text-[#8B5A3C] text-lg font-normal tracking-wider hover:text-[#6D4530] transition-colors"
                    >
                      ANANTHALA ADMIN
                    </Link>
                    <p className="text-xs text-[#B8A396]">Admin Portal</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium text-[#6D4530]">{getFirstName(admin.fullname)}</div>
                  <div className="text-xs text-[#8B5A3C]/70">{admin.email}</div>
                </div>
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${getGradientColor(admin.fullname)} flex items-center justify-center text-white font-semibold`}
                >
                  {getFirstName(admin.fullname).charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <aside
            className="hidden lg:block w-64 bg-white border-r min-h-[calc(100vh-4rem)] sticky top-16"
            style={{ borderColor: "#D9CFC7" }}
          >
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => renderMenuItem(item, false))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#6D4530] hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </aside>

          {isSidebarOpen && (
            <>
              <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
              <aside
                className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r z-50 lg:hidden animate-in slide-in-from-left duration-300"
                style={{ borderColor: "#D9CFC7" }}
              >
                <nav className="p-4 space-y-1">
                  {menuItems.map((item) => renderMenuItem(item, true))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#6D4530] hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </aside>
            </>
          )}

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
