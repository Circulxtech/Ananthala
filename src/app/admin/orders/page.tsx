"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Filter, Eye, Download, MoreVertical, Truck, CheckCircle, Clock, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { IndianRupee } from "lucide-react"

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  size: string
}

interface TimelineEvent {
  status: string
  timestamp: string
  description: string
}

interface Order {
  _id: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  orderStatus: string
  paymentStatus: string
  totalAmount: number
  items: OrderItem[]
  createdAt: string
  orderTimeline: TimelineEvent[]
  shippingAddress?: {
    fullAddress: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  trackingNumber?: string
}

interface Stats {
  totalOrders: number
  processedOrders: number
  deliveredOrders: number
  inTransitOrders: number
  totalRevenue: number
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchOrders()
  }, [filterStatus, page])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterStatus !== "all") params.append("status", filterStatus)
      if (searchQuery) params.append("search", searchQuery)
      params.append("page", page.toString())

      const response = await fetch(`/api/admin/orders?${params}`, {
        credentials: "include",
      })
      const data = await response.json()
      setOrders(data.orders || [])
      setStats(data.stats)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchOrders()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700"
      case "in-transit":
        return "bg-blue-100 text-blue-700"
      case "processing":
        return "bg-yellow-100 text-yellow-700"
      case "shipped":
        return "bg-purple-100 text-purple-700"
      case "pending":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-red-100 text-red-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "in-transit":
        return <Truck className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const statCards = [
    {
      label: "Total Orders",
      value: stats?.totalOrders || 0,
      color: "bg-blue-50 border-blue-200",
      icon: Package,
      textColor: "text-blue-700",
    },
    {
      label: "Processing",
      value: stats?.processedOrders || 0,
      color: "bg-yellow-50 border-yellow-200",
      icon: Package,
      textColor: "text-yellow-700",
    },
    {
      label: "In Transit",
      value: stats?.inTransitOrders || 0,
      color: "bg-purple-50 border-purple-200",
      icon: Truck,
      textColor: "text-purple-700",
    },
    {
      label: "Delivered",
      value: stats?.deliveredOrders || 0,
      color: "bg-green-50 border-green-200",
      icon: CheckCircle,
      textColor: "text-green-700",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#6D4530]">Order Management</h1>
          <p className="text-[#8B5A3C]/70 mt-1">Track and manage all customer orders</p>
        </div>
        <Button className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`${stat.color} border rounded-lg p-6 transition-all hover:shadow-md`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#8B5A3C]/70 text-sm font-medium">{stat.label}</p>
                  <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.textColor}/30`} />
              </div>
            </div>
          )
        })}

        {stats && (
          <div className="bg-gradient-to-r from-[#8B5A3C] to-[#6D4530] rounded-lg p-6 text-white border border-[#8B5A3C]">
            <p className="text-white/70 text-sm font-medium">Total Revenue</p>
            <div className="flex items-center gap-2 mt-2">
              <IndianRupee className="w-6 h-6" />
              <p className="text-2xl font-bold">
                {stats.totalRevenue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 space-y-4" style={{ borderColor: "#D9CFC7" }}>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B5A3C]/50 w-4 h-4" />
            <Input
              placeholder="Search by order ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white w-full sm:w-auto">
            Search
          </Button>
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border overflow-hidden" style={{ borderColor: "#D9CFC7" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F1ED]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Items</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#6D4530]">Date</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[#6D4530]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#D9CFC7" }}>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#8B5A3C]/70">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#8B5A3C]/70">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const status = order.orderStatus || "pending"
                  return (
                    <tr key={order._id} className="hover:bg-[#F5F1ED]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-mono text-sm text-[#8B5A3C]">{order.orderId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-[#6D4530]">{order.customerName}</div>
                          <div className="text-xs text-[#8B5A3C]/70">{order.customerEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#6D4530]">
                        {Array.isArray(order.items) ? order.items.length : 0} items
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#6D4530] flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          {order.totalAmount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(status)}`}
                        >
                          {getStatusIcon(status)}
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#6D4530]">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(order)
                                setIsDetailModalOpen(true)
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: "#D9CFC7" }}>
          <div className="text-sm text-[#8B5A3C]/70">
            Showing {orders.length > 0 ? (page - 1) * 10 + 1 : 0} - {Math.min(page * 10, stats?.totalOrders || 0)} of{" "}
            {stats?.totalOrders || 0} orders
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Page {page}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={orders.length < 10}>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#6D4530]">Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#F5F1ED] rounded-lg">
                <div>
                  <p className="text-xs text-[#8B5A3C]/70 font-medium">Order ID</p>
                  <p className="text-lg font-semibold text-[#6D4530]">{selectedOrder.orderId}</p>
                </div>
                <div>
                  <p className="text-xs text-[#8B5A3C]/70 font-medium">Order Date</p>
                  <p className="text-lg font-semibold text-[#6D4530]">
                    {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="font-semibold text-[#6D4530] mb-3">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-[#6D4530]">
                    <span className="font-medium">Name:</span> {selectedOrder.customerName}
                  </p>
                  <p className="text-[#6D4530]">
                    <span className="font-medium">Email:</span> {selectedOrder.customerEmail}
                  </p>
                  <p className="text-[#6D4530]">
                    <span className="font-medium">Phone:</span> {selectedOrder.customerPhone}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-[#6D4530] mb-3">Order Items</h3>
                <div className="space-y-3">
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-lg"
                        style={{ borderColor: "#D9CFC7" }}
                      >
                        <div>
                          <p className="font-medium text-[#6D4530]">{item.productName}</p>
                          <p className="text-xs text-[#8B5A3C]/70">
                            Size: {item.size} | Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-[#6D4530]">
                          <IndianRupee className="w-4 h-4" />
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#8B5A3C]/70">No items in this order</p>
                  )}
                </div>
              </div>

              {/* Order Timeline */}
              <div>
                <h3 className="font-semibold text-[#6D4530] mb-3">Order Journey</h3>
                <div className="space-y-3">
                  {Array.isArray(selectedOrder.orderTimeline) && selectedOrder.orderTimeline.length > 0 ? (
                    selectedOrder.orderTimeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-[#8B5A3C] mt-1" />
                          {index < selectedOrder.orderTimeline!.length - 1 && (
                            <div className="w-0.5 h-12 bg-[#D9CFC7]" />
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="font-medium text-[#6D4530]">{event.status}</p>
                          <p className="text-sm text-[#8B5A3C]/70">{event.description}</p>
                          <p className="text-xs text-[#8B5A3C]/50">
                            {new Date(event.timestamp).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#8B5A3C]/70">No timeline events yet</p>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-[#F5F1ED] rounded-lg space-y-2">
                <div className="flex justify-between text-[#6D4530]">
                  <span>Subtotal:</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {Array.isArray(selectedOrder.items)
                      ? selectedOrder.items
                          .reduce((sum, item) => sum + item.price * item.quantity, 0)
                          .toLocaleString("en-IN")
                      : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-[#6D4530]">
                  <span>Shipping:</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    0.00
                  </span>
                </div>
                <div
                  className="border-t pt-2 flex justify-between font-semibold text-[#6D4530]"
                  style={{ borderColor: "#D9CFC7" }}
                >
                  <span>Total:</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-4 h-4" />
                    {selectedOrder.totalAmount
                      ? selectedOrder.totalAmount.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : "0.00"}
                  </span>
                </div>
              </div>

              {/* Order Status Badge */}
              <div className="flex items-center justify-between p-4 bg-[#F5F1ED] rounded-lg">
                <div>
                  <p className="text-xs text-[#8B5A3C]/70 font-medium">Current Status</p>
                  <p
                    className={`text-lg font-semibold mt-1 flex items-center gap-2 ${getStatusColor(
                      selectedOrder.orderStatus || "pending",
                    )
                      .replace("px-", "")
                      .replace("py-", "")}`}
                  >
                    {getStatusIcon(selectedOrder.orderStatus || "pending")}
                    {(selectedOrder.orderStatus || "pending").charAt(0).toUpperCase() +
                      (selectedOrder.orderStatus || "pending").slice(1)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
