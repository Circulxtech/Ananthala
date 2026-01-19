"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { IndianRupee, ShoppingCart, ArrowLeft } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { getAllStates, getCitiesForState } from "@/lib/indian-states-cities"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [allStates, setAllStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    paymentMethod: "card",
  })

  // Load states data from package
  useEffect(() => {
    const loadStates = async () => {
      try {
        const states = await getAllStates()
        setAllStates(states)
      } catch (error) {
        console.error("Error loading states data:", error)
      }
    }
    loadStates()
  }, [])

  // Update cities when state changes
  useEffect(() => {
    const loadCities = async () => {
      if (formData.state) {
        try {
          const cities = await getCitiesForState(formData.state)
          setAvailableCities(cities)
        } catch (error) {
          console.error("Error loading cities data:", error)
          setAvailableCities([])
        }
      } else {
        setAvailableCities([])
      }
    }
    loadCities()
  }, [formData.state])

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = subtotal > 5000 ? 0 : 500
  const total = subtotal + shipping

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
      // Reset city when state changes
      ...(name === "state" && { city: "" }),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-3xl font-serif text-black mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Please add items to your cart before checkout.
            </p>
            <button
              onClick={() => router.push("/category/grace")}
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
          {/* Back Button */}
          <button
            onClick={() => router.push("/cart")}
            className="flex items-center gap-2 mb-6 text-black hover:opacity-70 transition-opacity text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>

          <h1 className="text-xl md:text-2xl font-serif text-black mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div>
                  <h2 className="text-xl md:text-2xl font-serif text-black mb-6">
                    Shipping Information
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-black mb-2 text-lg font-medium">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border text-black text-lg"
                          style={{ borderColor: "#D9CFC7" }}
                        />
                      </div>
                      <div>
                        <label className="block text-black mb-2 text-lg font-medium">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border text-black text-lg"
                          style={{ borderColor: "#D9CFC7" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-black mb-2 text-lg font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border text-black text-lg"
                        style={{ borderColor: "#D9CFC7" }}
                      />
                    </div>

                    <div>
                      <label className="block text-black mb-2 text-lg font-medium">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border text-black text-lg"
                        style={{ borderColor: "#D9CFC7" }}
                      />
                    </div>

                    <div>
                      <label className="block text-black mb-2 text-lg font-medium">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border text-black text-lg"
                        style={{ borderColor: "#D9CFC7" }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-black mb-2 text-lg font-medium">State</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border text-black bg-white text-lg"
                          style={{ borderColor: "#D9CFC7" }}
                        >
                          <option value="">Select State</option>
                          {allStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-black mb-2 text-lg font-medium">City</label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          disabled={!formData.state}
                          className="w-full px-4 py-3 border text-black bg-white disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
                          style={{ borderColor: "#D9CFC7" }}
                        >
                          <option value="">Select City</option>
                          {availableCities.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-black mb-2 text-lg font-medium">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border text-black text-lg"
                          style={{ borderColor: "#D9CFC7" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-black mb-2 text-lg font-medium">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        disabled
                        className="w-full px-4 py-3 border text-black bg-gray-100 cursor-not-allowed text-lg"
                        style={{ borderColor: "#D9CFC7" }}
                      >
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-xl md:text-2xl font-serif text-black mb-6">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-black text-lg">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === "upi"}
                        onChange={handleInputChange}
                        className="w-5 h-5"
                      />
                      <span className="text-black text-lg">UPI</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleInputChange}
                        className="w-5 h-5"
                      />
                      <span className="text-black text-lg">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 text-black hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-medium"
                  style={{ backgroundColor: "#EED9C4" }}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div
                className="border p-6 sticky top-24"
                style={{ borderColor: "#D9CFC7" }}
              >
                <h2 className="text-xl md:text-2xl font-serif text-black mb-6">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-black text-base md:text-lg font-medium line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base">Size: {item.size}</p>
                        <p className="text-gray-600 text-sm md:text-base">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-black text-base md:text-lg">
                          <IndianRupee className="w-4 h-4" />
                          <span>
                            {(item.price * item.quantity).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t pt-4 mb-4"
                  style={{ borderColor: "#D9CFC7" }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-base md:text-lg">
                      <span className="text-black font-medium">Subtotal</span>
                      <span className="text-black">
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
                    <div className="flex items-center justify-between text-base md:text-lg">
                      <span className="text-black font-medium">Shipping</span>
                      <span className="text-black">
                        {shipping === 0 ? (
                          "Free"
                        ) : (
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
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
                  </div>
                </div>

                <div
                  className="border-t pt-4"
                  style={{ borderColor: "#D9CFC7" }}
                >
                  <div className="flex items-center justify-between text-2xl md:text-3xl">
                    <span className="text-black text-xl font-semibold">Total</span>
                    <span className="text-black font-bold text-xl">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-6 h-6" />
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
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

