"use client"

import { useState, useEffect } from "react"
import { Package, Heart, ShoppingCart, User, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthenticatedUser {
  id: string
  fullname: string
  email: string
}

export default function CustomerDashboard() {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)

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
      }
    }
    checkAuth()
  }, [])

  const stats = [
    {
      title: "Total Orders",
      value: "0",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Wishlist Items",
      value: "0",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Cart Items",
      value: "0",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Spent",
      value: "₹0",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentOrders = [
    // Placeholder for recent orders - will be populated from database
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 border" style={{ borderColor: "#D9CFC7" }}>
        <h1 className="text-3xl font-bold text-[#6D4530] mb-2">Welcome back, {user?.fullname.split(" ")[0]}!</h1>
        <p className="text-[#8B5A3C]/70">Here's an overview of your account and recent activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border" style={{ borderColor: "#D9CFC7" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#8B5A3C]/70">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-[#6D4530] mt-2">{stat.value}</h3>
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

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border" style={{ borderColor: "#D9CFC7" }}>
          <CardHeader>
            <CardTitle className="text-[#6D4530] flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#8B5A3C]/70">Full Name</p>
              <p className="text-[#6D4530] font-medium mt-1">{user?.fullname}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#8B5A3C]/70">Email Address</p>
              <p className="text-[#6D4530] font-medium mt-1">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#8B5A3C]/70">Member Since</p>
              <p className="text-[#6D4530] font-medium mt-1">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border" style={{ borderColor: "#D9CFC7" }}>
          <CardHeader>
            <CardTitle className="text-[#6D4530] flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-[#8B5A3C]/30 mx-auto mb-3" />
                <p className="text-[#8B5A3C]/70">No orders yet</p>
                <p className="text-sm text-[#8B5A3C]/50 mt-1">Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="space-y-3">{/* Recent orders will be displayed here */}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border" style={{ borderColor: "#D9CFC7" }}>
        <CardHeader>
          <CardTitle className="text-[#6D4530]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/customer/orders"
              className="flex items-center gap-3 p-4 bg-[#F5F1ED] rounded-lg hover:bg-[#8B5A3C]/10 transition-colors"
            >
              <Package className="h-5 w-5 text-[#8B5A3C]" />
              <span className="text-[#6D4530] font-medium">View Orders</span>
            </a>
            <a
              href="/customer/wishlist"
              className="flex items-center gap-3 p-4 bg-[#F5F1ED] rounded-lg hover:bg-[#8B5A3C]/10 transition-colors"
            >
              <Heart className="h-5 w-5 text-[#8B5A3C]" />
              <span className="text-[#6D4530] font-medium">My Wishlist</span>
            </a>
            <a
              href="/customer/profile"
              className="flex items-center gap-3 p-4 bg-[#F5F1ED] rounded-lg hover:bg-[#8B5A3C]/10 transition-colors"
            >
              <User className="h-5 w-5 text-[#8B5A3C]" />
              <span className="text-[#6D4530] font-medium">Edit Profile</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
