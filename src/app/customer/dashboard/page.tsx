"use client"

import { useState, useEffect } from "react"
import { Package, ShoppingCart, User, TrendingUp, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"

interface AuthenticatedUser {
  id: string
  fullname: string
  email: string
  phone?: string
  address?: string
}

interface Order {
  _id: string
  orderId: string
  orderStatus: string
  totalAmount: number
  createdAt: string
  items: Array<{ productName: string; quantity: number }>
}

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface DashboardStats {
  totalOrders: number
  totalSpent: number
  cartItems: number
  memberSince: string
}

export default function CustomerDashboard() {
  const { cartItems } = useCart()
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalSpent: 0,
    cartItems: 0,
    memberSince: "",
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Update cart items count when context updates
  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      cartItems: cartItems.length,
    }))
  }, [cartItems])

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch user profile
        const profileResponse = await fetch("/api/customer/profile")
        const profileData = await profileResponse.json()

        if (profileData.success && profileData.user) {
          setUser(profileData.user)

          // Format member since date
          const memberSince = new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })

          // Fetch orders
          const ordersResponse = await fetch("/api/customer/orders?page=1&limit=5")
          const ordersData = await ordersResponse.json()

          // Calculate stats
          const totalOrders = ordersData.stats?.totalOrders || 0
          const totalSpent = ordersData.stats?.totalSpent || 0

          setStats((prev) => ({
            ...prev,
            totalOrders,
            totalSpent,
            memberSince,
            // Keep cartItems from context
            cartItems: prev.cartItems,
          }))

          // Set recent orders
          if (ordersData.orders && Array.isArray(ordersData.orders)) {
            setRecentOrders(ordersData.orders.slice(0, 3))
          }
        } else {
          toast({
            description: "Failed to load profile",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error loading dashboard:", error)
        toast({
          description: "Failed to load dashboard data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [toast])

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Cart Items",
      value: stats.cartItems.toString(),
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Spent",
      value: `₹${stats.totalSpent.toFixed(0)}`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-700",
      processing: "bg-blue-50 text-blue-700",
      shipped: "bg-purple-50 text-purple-700",
      "in-transit": "bg-purple-50 text-purple-700",
      delivered: "bg-green-50 text-green-700",
      cancelled: "bg-red-50 text-red-700",
    }
    return colors[status] || "bg-gray-50 text-gray-700"
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "#D9CFC7" }}>
          <p className="text-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "#D9CFC7" }}>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.fullname.split(" ")[0]}!
        </h1>
        <p className="text-foreground/70">Here's an overview of your account and recent activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border" style={{ borderColor: "#D9CFC7" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground/70">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-foreground mt-2">{stat.value}</h3>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Profile & Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card className="border" style={{ borderColor: "#D9CFC7" }}>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground/70">Full Name</p>
              <p className="text-foreground font-medium mt-1">{user?.fullname}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/70">Email Address</p>
              <p className="text-foreground font-medium mt-1 break-all">{user?.email}</p>
            </div>
            {user?.phone && (
              <div>
                <p className="text-sm font-medium text-foreground/70">Phone</p>
                <p className="text-foreground font-medium mt-1">{user.phone}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-foreground/70">Member Since</p>
              <p className="text-foreground font-medium mt-1">{stats.memberSince}</p>
            </div>
            <a
              href="/customer/profile"
              className="inline-block mt-4 text-[#6D4530] hover:text-[#5A3A26] font-medium flex items-center gap-2"
            >
              Edit Profile <ArrowRight className="w-4 h-4" />
            </a>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="border" style={{ borderColor: "#D9CFC7" }}>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-foreground/30 mx-auto mb-3" />
                <p className="text-foreground/70">No orders yet</p>
                <p className="text-sm text-foreground/50 mt-1">Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recentOrders.map((order) => (
                  <div key={order._id} className="p-3 bg-[#F5F1ED] rounded-lg">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm break-all">{order.orderId}</p>
                        <p className="text-xs text-foreground/70 mt-1">
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus.replace("-", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-2 pt-2 border-t" style={{ borderColor: "#D9CFC7" }}>
                      <p className="text-xs text-foreground/70">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </p>
                      <p className="font-semibold text-foreground">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border" style={{ borderColor: "#D9CFC7" }}>
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/customer/orders"
              className="flex items-center gap-3 p-4 bg-[#EED9C4] rounded-lg hover:bg-[#EED9C4]/80 transition-colors"
            >
              <Package className="h-5 w-5 text-foreground" />
              <span className="text-foreground font-medium">View All Orders</span>
            </a>
            <a
              href="/customer/cart"
              className="flex items-center gap-3 p-4 bg-[#EED9C4] rounded-lg hover:bg-[#EED9C4]/80 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-foreground" />
              <span className="text-foreground font-medium">View Cart</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
