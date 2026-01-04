"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Package, Users, ShoppingCart, BarChart3, TrendingUp, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardStats {
  totalUsers: number
  totalProducts: number
  totalInventory: number
  totalRevenue: number
  adminCount: number
  agentCount: number
}

interface RecentUser {
  _id: string
  fullname: string
  email: string
  createdAt: string
  phone?: string
}

interface RecentOrder {
  id: string
  productTitle: string
  seller: string
  quantity: number
  amount: number
  status: "pending" | "processing" | "shipped" | "delivered"
  date: string
}

interface CategoryData {
  _id: string
  count: number
}

interface InventoryData {
  _id: string
  totalStock: number
  avgPrice: number
  productCount: number
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [inventoryData, setInventoryData] = useState<InventoryData[]>([])
  const [error, setError] = useState("")
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

        await fetchDashboardData()
      } catch (error) {
        sessionStorage.removeItem("admin_session")
        router.replace("/admin")
      }
    }

    verifyAuth()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const [statsRes, ordersRes] = await Promise.all([
        fetch("/api/admin/dashboard/stats", { credentials: "include" }),
        fetch("/api/admin/dashboard/recent-orders", { credentials: "include" }),
      ])

      if (!statsRes.ok || !ordersRes.ok) {
        throw new Error("Failed to fetch dashboard data")
      }

      const statsData = await statsRes.json()
      const ordersData = await ordersRes.json()

      setStats(statsData.stats)
      setRecentUsers(statsData.recentUsers)
      setCategoryData(statsData.categoryData)
      setInventoryData(statsData.inventoryByCategory)
      setRecentOrders(ordersData.recentOrders)
      setIsLoading(false)
    } catch (err) {
      setError("Failed to load dashboard data")
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700"
      case "shipped":
        return "bg-blue-100 text-blue-700"
      case "processing":
        return "bg-purple-100 text-purple-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-[#8B5A3C] font-medium">{error}</p>
          <Button onClick={fetchDashboardData} className="mt-4 bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#6D4530] mb-2">Dashboard Overview</h2>
        <p className="text-[#8B5A3C]">Real-time insights and analytics for your Ananthala store</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[#8B5A3C] text-sm font-medium mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-[#6D4530]">{stats?.totalUsers || 0}</p>
          <div className="mt-3 flex gap-2 text-xs text-[#8B5A3C]">
            <span>Admins: {stats?.adminCount}</span>
            <span>|</span>
            <span>Agents: {stats?.agentCount}</span>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[#8B5A3C] text-sm font-medium mb-1">Total Products</h3>
          <p className="text-3xl font-bold text-[#6D4530]">{stats?.totalProducts || 0}</p>
          <p className="mt-3 text-xs text-[#8B5A3C]">Active listings in catalog</p>
        </div>

        {/* Total Inventory */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[#8B5A3C] text-sm font-medium mb-1">Total Inventory</h3>
          <p className="text-3xl font-bold text-[#6D4530]">{stats?.totalInventory || 0}</p>
          <p className="mt-3 text-xs text-[#8B5A3C]">Units in stock</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-[#8B5A3C] text-sm font-medium mb-1">Inventory Value</h3>
          <p className="text-3xl font-bold text-[#6D4530]">₹{(stats?.totalRevenue || 0).toLocaleString()}</p>
          <p className="mt-3 text-xs text-[#8B5A3C]">Total stock value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#6D4530] mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            Product Categories
          </h3>
          <div className="space-y-4">
            {categoryData.map((cat) => (
              <div key={cat._id} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-[#6D4530] capitalize">{cat._id}</span>
                    <span className="text-sm font-bold text-[#8B5A3C]">{cat.count}</span>
                  </div>
                  <div className="w-full bg-[#F5F1ED] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#8B5A3C] to-[#D9CFC7] h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, (cat.count / (categoryData[0]?.count || 1)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory by Category */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#6D4530] mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" />
            Stock by Category
          </h3>
          <div className="space-y-4">
            {inventoryData.map((item) => (
              <div key={item._id} className="border-b border-[#E5D5C5] pb-3 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-[#6D4530] capitalize">{item._id}</p>
                    <p className="text-xs text-[#8B5A3C]">{item.productCount} products</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#6D4530]">{item.totalStock}</p>
                    <p className="text-xs text-[#8B5A3C]">₹{item.avgPrice.toFixed(0)}</p>
                  </div>
                </div>
                <div className="w-full bg-[#F5F1ED] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#8B5A3C] to-[#D9CFC7] h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (item.totalStock / (inventoryData[0]?.totalStock || 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Joined Users */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#6D4530] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Recently Joined Users
          </h3>
          <div className="space-y-3">
            {recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <div key={user._id} className="border-b border-[#E5D5C5] pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-[#6D4530]">{user.fullname}</p>
                    <span className="text-xs bg-[#F5F1ED] text-[#8B5A3C] px-2 py-1 rounded-full">{user.createdAt}</span>
                  </div>
                  <p className="text-sm text-[#8B5A3C]">{user.email}</p>
                  {user.phone && <p className="text-xs text-[#B8A396] mt-1">{user.phone}</p>}
                </div>
              ))
            ) : (
              <p className="text-center text-[#8B5A3C] py-4">No users yet</p>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#6D4530] mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            Recent Product Activity
          </h3>
          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="border-b border-[#E5D5C5] pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-[#6D4530] truncate">{order.productTitle}</p>
                      <p className="text-xs text-[#8B5A3C]">by {order.seller}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-[#8B5A3C] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {order.date}
                    </span>
                    <div className="text-right">
                      <p className="font-bold text-[#6D4530]">₹{order.amount.toFixed(0)}</p>
                      <p className="text-xs text-[#8B5A3C]">{order.quantity} units</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#8B5A3C] py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <button
          onClick={() => router.push("/admin/users")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300 group text-left"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-[#6D4530] mb-1">Manage Users</h4>
          <p className="text-sm text-[#8B5A3C]">View & manage user accounts</p>
        </button>

        <button
          onClick={() => router.push("/admin/products")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300 group text-left"
        >
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
            <Package className="w-6 h-6 text-orange-600" />
          </div>
          <h4 className="font-semibold text-[#6D4530] mb-1">Manage Products</h4>
          <p className="text-sm text-[#8B5A3C]">Add, edit & remove products</p>
        </button>

        <button
          onClick={() => router.push("/admin/orders")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300 group text-left"
        >
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
            <ShoppingCart className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold text-[#6D4530] mb-1">View Orders</h4>
          <p className="text-sm text-[#8B5A3C]">Track & manage orders</p>
        </button>

        <button
          onClick={() => router.push("/admin/analytics")}
          className="bg-white rounded-xl border border-[#E5D5C5] shadow-md p-6 hover:shadow-lg transition-all duration-300 group text-left"
        >
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-[#6D4530] mb-1">Analytics</h4>
          <p className="text-sm text-[#8B5A3C]">View detailed reports</p>
        </button>
      </div>
    </div>
  )
}
