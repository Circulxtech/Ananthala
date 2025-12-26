"use client"

import { BarChart3, TrendingUp, Users, ShoppingCart, Package, DollarSign } from "lucide-react"

export default function AnalyticsPage() {
  const stats = [
    {
      label: "Total Revenue",
      value: "₹2,45,680",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Users",
      value: "856",
      change: "+15.3%",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Total Products",
      value: "245",
      change: "+5.1%",
      icon: Package,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#6D4530]">Analytics</h1>
        <p className="text-[#8B5A3C]/70 mt-1">Monitor your business performance and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow"
              style={{ borderColor: "#D9CFC7" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-[#6D4530] mb-1">{stat.value}</div>
              <div className="text-sm text-[#8B5A3C]/70">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="bg-white rounded-lg border p-6 h-80 flex items-center justify-center"
          style={{ borderColor: "#D9CFC7" }}
        >
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-[#8B5A3C]/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#6D4530] mb-2">Sales Chart</h3>
            <p className="text-sm text-[#8B5A3C]/70">Sales analytics chart will appear here</p>
          </div>
        </div>
        <div
          className="bg-white rounded-lg border p-6 h-80 flex items-center justify-center"
          style={{ borderColor: "#D9CFC7" }}
        >
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-[#8B5A3C]/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#6D4530] mb-2">User Growth</h3>
            <p className="text-sm text-[#8B5A3C]/70">User growth chart will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
