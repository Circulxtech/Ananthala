"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Package, Users, ShoppingCart, BarChart3, Settings } from "lucide-react"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

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
        setIsLoading(false)
      } catch (error) {
        sessionStorage.removeItem("admin_session")
        router.replace("/admin")
      }
    }

    verifyAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-[#EED9C4] flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="w-8 h-8 text-[#EED9C4]" />
          </div>
          <p className="text-[#8B5A3C] font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-normal text-[#6D4530] mb-2">Dashboard Overview</h2>
        <p className="text-[#8B5A3C]">Manage your Ananthala store</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => router.push("/admin/orders")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
              <ShoppingCart className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-[#F5F1ED] text-[#8B5A3C] font-medium">New</span>
          </div>
          <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Order Management</h3>
          <p className="text-[#B8A396] text-sm">Manage customer orders and fulfillment</p>
        </div>

        <div
          onClick={() => router.push("/admin/products")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
              <Package className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
            </div>
          </div>
          <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Product Management</h3>
          <p className="text-[#B8A396] text-sm">Manage product catalog and inventory</p>
        </div>

        <div
          onClick={() => router.push("/admin/users")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
              <Users className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
            </div>
          </div>
          <h3 className="text-[#6D4530] font-medium mb-2 text-lg">User Management</h3>
          <p className="text-[#B8A396] text-sm">View and manage user information</p>
        </div>

        <div
          onClick={() => router.push("/admin/analytics")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
              <BarChart3 className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
            </div>
          </div>
          <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Analytics</h3>
          <p className="text-[#B8A396] text-sm">View sales reports and insights</p>
        </div>

        <div
          onClick={() => router.push("/admin/settings")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#F5F1ED] flex items-center justify-center group-hover:bg-[#8B5A3C] transition-colors">
              <Settings className="w-6 h-6 text-[#8B5A3C] group-hover:text-white transition-colors" />
            </div>
          </div>
          <h3 className="text-[#6D4530] font-medium mb-2 text-lg">Settings</h3>
          <p className="text-[#B8A396] text-sm">Configure store settings and preferences</p>
        </div>
      </div>

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
          <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-1">Total Users</p>
          <p className="text-2xl font-medium text-[#6D4530]">0</p>
        </div>
        <div className="bg-white rounded-lg border border-[#E5D5C5] p-4">
          <p className="text-xs text-[#B8A396] uppercase tracking-wide mb-1">Revenue</p>
          <p className="text-2xl font-medium text-[#6D4530]">$0</p>
        </div>
      </div>
    </div>
  )
}
