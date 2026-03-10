"use client"

import { useState } from "react"
import { Package, Search, CheckCircle, Truck, MapPin, ArrowRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface TimelineEntry {
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
  shippingAddress?: {
    fullAddress?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  items: Array<{
    productName: string
    quantity: number
    price: number
    size?: string
    fabric?: string
    productColor?: string
  }>
  subtotal: number
  shippingCost: number
  discount: number
  totalAmount: number
  paymentStatus: "pending" | "completed" | "failed"
  orderStatus: "pending" | "processing" | "shipped" | "in-transit" | "delivered" | "cancelled"
  orderTimeline: TimelineEntry[]
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  "in-transit": "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <MapPin className="w-5 h-5" />,
  processing: <Package className="w-5 h-5" />,
  shipped: <Truck className="w-5 h-5" />,
  "in-transit": <Truck className="w-5 h-5" />,
  delivered: <CheckCircle className="w-5 h-5" />,
  cancelled: <MapPin className="w-5 h-5" />,
}

export default function TrackOrderPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      toast({
        description: "Please enter an Order ID",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const response = await fetch(`/api/track-order?orderId=${encodeURIComponent(searchQuery.trim())}`)
      const data = await response.json()

      if (response.ok) {
        setOrder(data)
      } else {
        setOrder(null)
        toast({
          description: data.error || "Order not found",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Track order error:", error)
      setOrder(null)
      toast({
        description: "Failed to track order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTrackAnother = () => {
    setSearchQuery("")
    setOrder(null)
    setSearched(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-[#FAFAF8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8DED6] py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6D4530]">Track Order</h1>
          <p className="text-[#8B5A3C] mt-2">Enter your Order ID to track your shipment</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Search Section */}
        <Card className="border border-[#D9CFC7] rounded-lg mb-8">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6D4530] mb-2">Order ID</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter Order ID (e.g., ORD-1773134921366-693)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-[#D9CFC7] focus:border-[#6D4530] focus:ring-[#6D4530]"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#6D4530] hover:bg-[#5A3A26] text-white"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {loading ? "Searching..." : "Track"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {searched && !order && !loading && (
          <Card className="border border-[#E8A897] bg-[#FFF5F3] rounded-lg">
            <CardContent className="p-6 text-center">
              <MapPin className="w-12 h-12 text-[#D97B72] mx-auto mb-3" />
              <p className="text-[#8B5A3C] font-medium">Order not found</p>
              <p className="text-sm text-[#8B5A3C]/70 mt-1">Please check your Order ID and try again</p>
            </CardContent>
          </Card>
        )}

        {order && (
          <div className="space-y-6">
            {/* Order Summary Card */}
            <Card className="border border-[#D9CFC7] rounded-lg overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-[#8B5A3C]">Order ID</p>
                    <p className="text-xl font-bold text-[#6D4530] mt-1">{order.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#8B5A3C]">Order Date</p>
                    <p className="text-lg font-semibold text-[#6D4530] mt-1">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#8B5A3C]">Current Status</p>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusColors[order.orderStatus]}`}
                      >
                        {statusIcons[order.orderStatus]}
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1).replace("-", " ")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#8B5A3C]">Total Amount</p>
                    <p className="text-xl font-bold text-[#6D4530] mt-1">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

             {/* Tracking Number */}
            {order.trackingNumber && (
              <Card className="border-[#D9CFC7]">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#6D4530] mb-2">Tracking Number</h3>
                  <p className="font-mono text-lg text-[#6D4530]">{order.trackingNumber}</p>
                  <p className="text-sm text-[#8B5A3C]/70 mt-2">Use this number to track with the courier</p>
                </CardContent>
              </Card>
            )}

            {/* Delivery Timeline */}
            <Card className="border border-[#D9CFC7] rounded-lg overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#6D4530] mb-6">Delivery Timeline</h2>

                <div className="space-y-6">
                  {order.orderTimeline && order.orderTimeline.length > 0 ? (
                    order.orderTimeline.map((entry, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${statusColors[entry.status]} bg-white`}>
                            {statusIcons[entry.status]}
                          </div>
                          {index < order.orderTimeline.length - 1 && (
                            <div className="w-1 h-12 bg-[#D9CFC7] my-2"></div>
                          )}
                        </div>
                        <div className="flex-1 py-1">
                          <p className="font-semibold text-[#6D4530] capitalize">
                            {entry.status.replace("-", " ")}
                          </p>
                          <p className="text-sm text-[#8B5A3C]/70 mt-1">{entry.timestamp}</p>
                          <p className="text-sm text-[#6D4530] mt-2">{entry.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#8B5A3C]">No timeline available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Items Ordered */}
            {order.items && order.items.length > 0 && (
              <Card className="border border-[#D9CFC7] rounded-lg overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[#6D4530] mb-4">Items Ordered</h2>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-start p-3 bg-[#F5F1ED] rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-[#6D4530]">{item.productName}</p>
                          <p className="text-sm text-[#8B5A3C]/70 mt-1">Qty: {item.quantity}</p>
                          {(item.size || item.fabric || item.productColor) && (
                            <p className="text-xs text-[#8B5A3C]/60 mt-1">
                              {[item.size, item.fabric, item.productColor].filter(Boolean).join(" • ")}
                            </p>
                          )}
                        </div>
                        <p className="font-semibold text-[#6D4530]">₹{item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Shipping Address */}
            {order.shippingAddress && (
              <Card className="border border-[#D9CFC7] rounded-lg overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-[#6D4530] mb-4">Shipping Address</h2>
                  <div className="bg-[#F5F1ED] rounded-lg p-4">
                    {order.shippingAddress.fullAddress && (
                      <p className="text-[#6D4530]">{order.shippingAddress.fullAddress}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2 text-sm text-[#8B5A3C]">
                      {order.shippingAddress.city && <span>{order.shippingAddress.city}</span>}
                      {order.shippingAddress.state && <span>{order.shippingAddress.state}</span>}
                      {order.shippingAddress.zipCode && <span>{order.shippingAddress.zipCode}</span>}
                      {order.shippingAddress.country && <span>{order.shippingAddress.country}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Summary */}
            <Card className="border border-[#D9CFC7] rounded-lg overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-[#6D4530]">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal.toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#6D4530]">
                    <span>Shipping</span>
                    <span>₹{order.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#D9CFC7] pt-2 mt-2 flex justify-between font-bold text-lg text-[#6D4530]">
                    <span>Total</span>
                    <span>₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>



           

            {/* Track Another Order Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleTrackAnother}
                className="bg-[#6D4530] hover:bg-[#5A3A26] text-white px-8"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Track Another Order
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searched && !order && (
          <Card className="border border-[#D9CFC7] rounded-lg">
            <CardContent className="p-12 text-center">
              <Truck className="w-16 h-16 text-[#8B5A3C]/30 mx-auto mb-4" />
              <p className="text-lg font-medium text-[#8B5A3C]">Enter your Order ID above to track your order</p>
            </CardContent>
          </Card>
        )}
      </div>
      </main>
      <Footer />
    </div>
  )
}
