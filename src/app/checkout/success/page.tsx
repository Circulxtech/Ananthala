"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import {
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  Package,
  MapPin,
  CreditCard,
  Clock,
  Phone,
  Mail,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface OrderData {
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
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
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  shippingAddress: {
    fullAddress?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  createdAt: string
}

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [order, setOrder] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const orderId = searchParams.get("orderId")
        console.log("[v0] Order ID from URL:", orderId)
        
        if (!orderId) {
          console.log("[v0] No order ID in URL, fetching latest order...")
          // Fallback: fetch latest order
          const response = await fetch("/api/customer/orders", {
            credentials: "include",
          })
          const data = await response.json()
          console.log("[v0] Orders response:", data)
          if (data.orders && data.orders.length > 0) {
            setOrder(data.orders[0])
          } else {
            setError("Unable to load order details. Please refresh the page.")
          }
        } else {
          // Fetch specific order by ID
          console.log("[v0] Fetching order with ID:", orderId)
          const response = await fetch(`/api/customer/orders/${orderId}`, {
            credentials: "include",
          })
          
          console.log("[v0] Order API response status:", response.status)
          
          if (!response.ok) {
            const errorData = await response.json()
            console.error("[v0] Error response:", errorData)
            throw new Error(errorData.error || "Failed to fetch order")
          }
          
          const data = await response.json()
          console.log("[v0] Order data received:", data)
          
          if (data.success && data.order) {
            setOrder(data.order)
          } else if (data.order) {
            setOrder(data.order)
          } else {
            setError("Unable to load order details")
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching order:", error)
        setError(error instanceof Error ? error.message : "Failed to load order details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [searchParams])

  const getPaymentMethodDisplay = (method: string) => {
    const methods: Record<string, string> = {
      razorpay: "Razorpay",
      card: "Credit/Debit Card",
      upi: "UPI",
      cod: "Cash on Delivery",
    }
    return methods[method] || method
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col text-foreground">
      <Header />
      <main className="flex-1 py-8 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-50"></div>
                <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-green-500 relative" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-3 font-cormorant font-bold">
              Order Placed Successfully!
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto mb-2">
              Thank you for your order. We're excited to get your items to you.
            </p>
            <p className="text-sm md:text-base text-stone-500">
              A confirmation email has been sent to {order?.customerEmail}
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full"></div>
              </div>
              <p className="text-stone-600 mt-4">Loading order details...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <p className="text-red-600 font-semibold mb-2">Error</p>
              <p className="text-stone-600 mb-6">{error}</p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => router.push("/customer/orders")}
                  className="h-12 bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground font-medium"
                >
                  View All Orders
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  className="h-12 bg-stone-200 hover:bg-stone-300 text-foreground font-medium"
                >
                  Refresh
                </Button>
              </div>
            </div>
          ) : order ? (
            <div className="space-y-6 md:space-y-8">
              {/* Order ID and Status */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="md:col-span-1">
                    <p className="text-xs md:text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                      Order ID
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-foreground font-mono break-all">
                      {order.orderId}
                    </p>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-xs md:text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                      Order Status
                    </p>
                    <p className="text-lg md:text-xl font-semibold">
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm md:text-base capitalize">
                        {order.orderStatus}
                      </span>
                    </p>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-xs md:text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                      Estimated Delivery
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-foreground">5-7 Days</p>
                  </div>
                  <div className="md:col-span-1">
                    <p className="text-xs md:text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                      Order Date
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-6 md:px-8 py-4 md:py-6 border-b border-stone-200 bg-stone-50">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                    <h2 className="text-lg md:text-xl font-semibold text-foreground">Order Items</h2>
                  </div>
                </div>
                <div className="divide-y divide-stone-100">
                  {order.items.map((item, index) => (
                    <div key={index} className="px-6 md:px-8 py-4 md:py-6 hover:bg-stone-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-base md:text-lg mb-2">
                            {item.productName}
                          </p>
                          <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-stone-600">
                            {item.size && <span className="inline-block">Size: <span className="font-medium">{item.size}</span></span>}
                            {item.fabric && <span className="inline-block">Fabric: <span className="font-medium">{item.fabric}</span></span>}
                            {item.productColor && <span className="inline-block">Color: <span className="font-medium">{item.productColor}</span></span>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 text-sm md:text-base">
                          <p className="text-stone-600">
                            Qty: <span className="font-semibold text-foreground">{item.quantity}</span>
                          </p>
                          <p className="text-stone-600">
                            ₹{item.price.toFixed(2)}
                          </p>
                          <p className="font-semibold text-foreground min-w-24 text-right">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="px-6 md:px-8 py-4 md:py-6 bg-stone-50 border-t border-stone-200">
                  <div className="space-y-3 md:space-y-4 max-w-md ml-auto">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-stone-600">Subtotal</span>
                      <span className="font-medium text-foreground">₹{order.subtotal.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="text-green-600">Discount</span>
                        <span className="font-medium text-green-600">-₹{order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-stone-600">Shipping</span>
                      <span className="font-medium text-foreground">{order.shippingCost === 0 ? "Free" : `₹${order.shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t border-stone-200 pt-3 md:pt-4 flex justify-between text-base md:text-lg">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="font-bold text-amber-600 text-lg md:text-xl">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Layout for Address and Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Delivery Address */}
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">Delivery Address</h3>
                  </div>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base text-stone-700 leading-relaxed">
                    <p className="font-semibold text-foreground">{order.customerName}</p>
                    <p>{order.shippingAddress?.fullAddress || "Address not provided"}</p>
                    <p>
                      {[order.shippingAddress?.city, order.shippingAddress?.state, order.shippingAddress?.zipCode]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    <p>{order.shippingAddress?.country}</p>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">Payment Information</h3>
                  </div>
                  <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                    <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                      <span className="text-stone-600">Payment Method</span>
                      <span className="font-semibold text-foreground">{getPaymentMethodDisplay(order.paymentMethod)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                      <span className="text-stone-600">Payment Status</span>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-semibold capitalize">
                        {order.paymentStatus}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Amount Paid</span>
                      <span className="font-bold text-amber-600 text-lg md:text-xl">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">What's Next?</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-sm md:text-base">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-semibold text-sm md:text-base">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Confirmation Sent</p>
                      <p className="text-stone-600 text-xs md:text-sm">Check your email for order confirmation</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-semibold text-sm md:text-base">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Processing Order</p>
                      <p className="text-stone-600 text-xs md:text-sm">We'll process it within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-semibold text-sm md:text-base">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Shipping Soon</p>
                      <p className="text-stone-600 text-xs md:text-sm">You'll get tracking info shortly</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Service Info */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Need Help?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-stone-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-stone-600 uppercase tracking-wide mb-1">Email</p>
                      <p className="text-sm md:text-base font-medium text-foreground">qualprodsllp@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-stone-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-stone-600 uppercase tracking-wide mb-1">Phone</p>
                      <p className="text-sm md:text-base font-medium text-foreground">+91 9071799966</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Button
                  onClick={() => router.push("/customer/orders")}
                  className="flex-1 h-12 md:h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-base md:text-lg rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Track Your Order</span>
                </Button>
                <Button
                  onClick={() => router.push("/#find-your-perfect-mattress")}
                  className="flex-1 h-12 md:h-14 bg-white border-2 border-stone-300 hover:border-amber-500 text-foreground hover:text-amber-600 font-semibold text-base md:text-lg rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Continue Shopping</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
              <p className="text-stone-600 mb-6">Unable to load order details. A confirmation email has been sent to you.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => router.push("/customer/orders")}
                  className="h-12 bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground font-medium"
                >
                  View Your Orders
                </Button>
                <Button
                  onClick={() => router.push("/#find-your-perfect-mattress")}
                  className="h-12 bg-stone-200 hover:bg-stone-300 text-foreground font-medium"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
