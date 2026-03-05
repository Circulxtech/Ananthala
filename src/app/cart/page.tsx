"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { IndianRupee, Trash2, Plus, Minus, ShoppingCart, ChevronRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState("")

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const applyCoupon = () => {
    const validCoupons: Record<string, number> = {
      SAVE10: 0.1,
      WELCOME15: 0.15,
      SLEEP20: 0.2,
    }

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon(couponCode.toUpperCase())
      setCouponError("")
    } else {
      setCouponError("Invalid coupon code")
      setAppliedCoupon(null)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError("")
  }

  const discountRate = appliedCoupon
    ? appliedCoupon === "SAVE10"
      ? 0.1
      : appliedCoupon === "WELCOME15"
      ? 0.15
      : 0.2
    : 0
  const discount = subtotal * discountRate
  const shipping = subtotal > 5000 ? 0 : 500
  const total = subtotal - discount + shipping

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="empty-cart-icon-wrap">
              <ShoppingCart className="empty-cart-icon w-12 h-12 text-[#8B5A3C]/50" />
            </div>
            <h1 className="text-3xl font-serif text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => router.push("/#find-your-perfect-mattress")}
              className="px-8 py-3 text-foreground hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#EED9C4" }}
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      <Header />
      <div
        className="fixed top-20 left-0 right-0 z-40 bg-white border-b"
        style={{ borderColor: "#D9CFC7" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <nav className="py-2 ">
            <ol className="flex items-center gap-2 text-base">
              <li>
                <Link href="/" className="text-foreground hover:opacity-80 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-foreground/50" />
              </li>
              <li>
                <Link href="/#find-your-perfect-mattress" className="text-foreground hover:opacity-80 transition-opacity">
                  Products
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-foreground/50" />
              </li>
              <li className="text-foreground">Cart</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="h-[49px]"></div>
      <main className="pt-6">
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <h1 className="text-3xl font-serif text-foreground mt-4 mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item, index) => {
                  const isComplimentaryBedsheet = item.name.toLowerCase().includes("bed sheet (complimentary)")
                  const nextIsComplimentaryBedsheet = cartItems[index + 1]?.name
                    ?.toLowerCase()
                    .includes("bed sheet (complimentary)")

                  const containerClass = [
                    "flex gap-5 p-6 bg-white shadow-sm",
                    isComplimentaryBedsheet ? "-mt-6" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")

                  return (
                    <div
                      key={item.id}
                      className={containerClass}
                    >
                      <div className="relative w-28 h-28 shrink-0 bg-gray-100 overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{item.name}</h3>
                        <div className="inline-block  px-3 py-1 text-base text-foreground">
                          {item.fabric ? `Fabric: ${item.fabric}` : `Size: ${item.size}`}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        
                        <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-foreground hover:opacity-70 transition-opacity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-foreground w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-foreground hover:opacity-70 transition-opacity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                       
                        <div className="text-right">
                        
                          <div className="text-lg font-semibold text-foreground">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-foreground hover:opacity-80 transition-opacity"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-base text-foreground">Items Total Price</span>
                    <span className="text-foreground text-base font-semibold">
                      ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-foreground text-sm">
                      <span>Discount ({appliedCoupon})</span>
                      <span>
                        -₹{discount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-base text-foreground">Delivery Charge</span>
                    <span className="text-foreground">{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString("en-IN")}`}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md text-sm text-foreground focus:outline-none"
                    style={{ borderColor: "#D9CFC7" }}
                  />
                  <button
                    onClick={appliedCoupon ? removeCoupon : applyCoupon}
                    className="px-4 py-2 text-sm text-foreground bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    {appliedCoupon ? "Remove" : "Apply Coupon"}
                  </button>
                </div>
                {couponError && <p className="text-foreground text-sm mb-4">{couponError}</p>}

                <div className="border-t pt-4 mb-6" style={{ borderColor: "#E5E7EB" }}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-base text-foreground">Sub Total</span>
                    <span className="text-foreground text-base font-semibold">
                      ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xl mt-2">
                    <span className="text-foreground font-semibold">Total</span>
                    <span className="text-foreground font-bold">
                      ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 text-foreground hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#EED9C4" }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => router.push("/#find-your-perfect-mattress")}
                  className="w-full py-3 border text-foreground hover:opacity-70 transition-opacity bg-gray-100"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
