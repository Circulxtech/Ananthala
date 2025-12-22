"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { IndianRupee, Trash2, Plus, Minus, ShoppingCart, Tag, Star } from "lucide-react"
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
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-serif text-black mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => router.push("/mattress")}
              className="px-8 py-3 text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#6B563F" }}
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
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-serif text-black mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 pb-6 border-b"
                    style={{ borderColor: "#D9CFC7" }}
                  >
                    <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-black text-xl mb-2">
                        {item.name}
                      </h3>
                      <p className="text-black text-sm mb-4">Size: {item.size}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mb-4">
                        <label className="text-black text-sm">Quantity:</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 border flex items-center justify-center hover:opacity-70 transition-opacity text-black"
                            style={{ borderColor: "#D9CFC7" }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-black w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 border flex items-center justify-center hover:opacity-70 transition-opacity text-black"
                            style={{ borderColor: "#D9CFC7" }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-1 text-black">
                        <IndianRupee className="w-5 h-5" />
                        <span className="text-xl font-medium">
                          {(item.price * item.quantity).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-black transition-colors self-start"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Coupon Code */}
              <div
                className="mt-6 p-6 border"
                style={{ borderColor: "#D9CFC7" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-black" />
                  <h3 className="text-black text-lg">Discount Coupon</h3>
                </div>
                {appliedCoupon ? (
                  <div
                    className="flex items-center justify-between p-4 border"
                    style={{ borderColor: "#D9CFC7", backgroundColor: "#F9F8F6" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-black font-medium">{appliedCoupon}</span>
                      <span className="text-gray-600">Applied!</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-black hover:opacity-70 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-4 py-2 border text-black focus:outline-none"
                        style={{ borderColor: "#D9CFC7" }}
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-6 py-2 text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#6B563F" }}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-red-600 text-sm">{couponError}</p>
                    )}
                    <p className="text-gray-600 text-sm">
                      Try: SAVE10, WELCOME15, or SLEEP20
                    </p>
                  </div>
                )}
              </div>

              {/* Customer Reviews Widget */}
              <div
                className="mt-6 p-6 border"
                style={{ borderColor: "#D9CFC7" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-black" />
                  <h3 className="text-black text-lg">Customer Reviews</h3>
                </div>
                <div className="space-y-4">
                  <div className="pb-4 border-b" style={{ borderColor: "#D9CFC7" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-black">Sarah M.</span>
                    </div>
                    <p className="text-gray-700">
                      "Best mattress I've ever owned! The quality is exceptional
                      and I sleep so much better now."
                    </p>
                  </div>
                  <div className="pb-4 border-b" style={{ borderColor: "#D9CFC7" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-black">James T.</span>
                    </div>
                    <p className="text-gray-700">
                      "Amazing comfort and support. Worth every penny!"
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-500">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-black">Emily R.</span>
                    </div>
                    <p className="text-gray-700">
                      "Great mattress, very comfortable. Delivery was super fast
                      too!"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className="border p-6 sticky top-24"
                style={{ borderColor: "#D9CFC7" }}
              >
                <h2 className="text-2xl font-serif text-black mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-black">Subtotal</span>
                    <span className="text-black font-semibold">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        <span>
                          {subtotal.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-green-700">
                      <span>Discount ({appliedCoupon})</span>
                      <span>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          <span>
                            -{discount.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black">Shipping</span>
                    <span className="text-black">
                      {shipping === 0 ? (
                        "FREE"
                      ) : (
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" />
                          <span>
                            {shipping.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-gray-600 text-sm">
                      Free shipping on orders over ₹5,000
                    </p>
                  )}
                </div>

                <div
                  className="border-t pt-4 mb-6"
                  style={{ borderColor: "#D9CFC7" }}
                >
                  <div className="flex items-center justify-between text-xl">
                    <span className="text-black font-semibold">Total</span>
                    <span className="text-black font-bold">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-5 h-5" />
                        <span>
                          {total.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 text-black hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#EED9C4" }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => router.push("/mattress")}
                  className="w-full py-3 border text-black hover:opacity-70 transition-opacity"
                  style={{ borderColor: "#D9CFC7" }}
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

