"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Package, Users, ShoppingCart, BarChart3, Settings, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminDashboard() {
  const [isVerifying, setIsVerifying] = useState(true)
  const [adminData, setAdminData] = useState<{ fullname: string; email: string } | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/auth/admin/admin-verify", {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Authentication failed")
        }

        const data = await response.json()

        if (!data.authenticated || data.user?.role !== "admin") {
          sessionStorage.removeItem("admin_session")
          router.replace("/admin")
          return
        }

        sessionStorage.setItem("admin_session", "active")
        setAdminData({
          fullname: data.user.fullname,
          email: data.user.email,
        })
        setIsVerifying(false)
      } catch (error) {
        sessionStorage.removeItem("admin_session")
        router.replace("/admin")
      }
    }

    verifyAuth()

    const intervalId = setInterval(
      () => {
        verifyAuth()
      },
      30 * 60 * 1000,
    ) // 30 minutes

    return () => clearInterval(intervalId)
  }, [router])

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("admin_session")

      await fetch("/api/auth/admin/admin-logout", {
        method: "POST",
        credentials: "include",
      })

      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })

      router.replace("/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getFirstName = (fullname: string) => {
    return fullname.split(" ")[0]
  }

  const getGradientColor = (name: string) => {
    const colors = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-teal-600",
      "from-orange-500 to-red-600",
      "from-pink-500 to-rose-600",
      "from-indigo-500 to-blue-600",
      "from-yellow-500 to-orange-600",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-[#E5D5C5] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="w-8 h-8 text-[#8B5A3C]" />
          </div>
          <p className="text-[#8B5A3C] font-medium">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      <header className="bg-white border-b border-[#E5D5C5] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B5A3C] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-normal text-[#6D4530] tracking-wide">Ananthala Admin</h1>
                <p className="text-xs text-[#B8A396]">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {adminData && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${getGradientColor(adminData.fullname)} flex items-center justify-center text-white font-medium shadow-md hover:shadow-lg transition-shadow`}
                      >
                        {adminData.fullname.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-[#6D4530] hidden sm:inline font-medium">
                        {getFirstName(adminData.fullname)}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border-[#E5D5C5]">
                    <div className="px-3 py-2 border-b border-[#E5D5C5]">
                      <p className="text-sm font-medium text-[#6D4530]">{adminData.fullname}</p>
                      <p className="text-xs text-[#B8A396] mt-1">{adminData.email}</p>
                      <p className="text-xs text-[#8B5A3C] mt-1 font-medium">Admin Access</p>
                    </div>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-[#8B5A3C] cursor-pointer hover:bg-[#F5F1ED] focus:bg-[#F5F1ED]"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-normal text-[#6D4530] mb-2">Dashboard Overview</h2>
          <p className="text-[#8B5A3C]">Manage your Ananthala store</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Orders Card */}
          <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
                <ShoppingCart className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-[#F5F1ED] text-[#8B5A3C] font-medium">New</span>
            </div>
            <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Orders</h3>
            <p className="text-[#B8A396] text-sm">Manage customer orders and fulfillment</p>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
                <Package className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
              </div>
            </div>
            <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Products</h3>
            <p className="text-[#B8A396] text-sm">Manage product catalog and inventory</p>
          </div>

          {/* Customers Card */}
          <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
                <Users className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
              </div>
            </div>
            <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Customers</h3>
            <p className="text-[#B8A396] text-sm">View and manage customer information</p>
          </div>

          {/* Analytics Card */}
          <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
                <BarChart3 className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
              </div>
            </div>
            <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Analytics</h3>
            <p className="text-[#B8A396] text-sm">View sales reports and insights</p>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
                <Settings className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
              </div>
            </div>
            <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Settings</h3>
            <p className="text-[#B8A396] text-sm">Configure store settings and preferences</p>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-[#E5D5C5] p-4">
            <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-1">Total Orders</p>
            <p className="text-2xl font-medium text-[#6D4530]">0</p>
          </div>
          <div className="bg-white rounded-lg border border-[#E5D5C5] p-4">
            <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-1">Total Products</p>
            <p className="text-2xl font-medium text-[#6D4530]">0</p>
          </div>
          <div className="bg-white rounded-lg border border-[#E5D5C5] p-4">
            <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-1">Total Customers</p>
            <p className="text-2xl font-medium text-[#6D4530]">0</p>
          </div>
          <div className="bg-white rounded-lg border border-[#E5D5C5] p-4">
            <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-1">Revenue</p>
            <p className="text-2xl font-medium text-[#6D4530]">$0</p>
          </div>
        </div>
      </main>
    </div>
  )
}
