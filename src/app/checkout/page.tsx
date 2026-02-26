"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { IndianRupee, ShoppingCart, ChevronRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { getAllStates, getCitiesForState } from "@/lib/indian-states-cities"

declare global {
  interface Window {
    Razorpay?: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const [allStates, setAllStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
    paymentMethod: "razorpay",
  })

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      if (typeof window === "undefined") {
        resolve(false)
        return
      }
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  useEffect(() => {
    const ensureAuthenticated = async () => {
      try {
        const response = await fetch("/api/auth/verify")
        const data = await response.json()
        if (!data?.success) {
          router.replace("/login?redirect=/checkout")
          return
        }
      } catch (error) {
        router.replace("/login?redirect=/checkout")
        return
      } finally {
        setIsAuthChecking(false)
      }
    }

    ensureAuthenticated()
  }, [router])

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
    setErrorMessage(null)

    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error("Razorpay SDK failed to load. Please try again.")
      }
      if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        throw new Error("Razorpay key is missing. Please configure NEXT_PUBLIC_RAZORPAY_KEY_ID.")
      }

      const orderResponse = await fetch("/api/payments/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "INR",
          receipt: `order_${Date.now()}`,
          notes: {
            customer: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
          },
        }),
      })

      const orderData = await orderResponse.json()
      if (!orderResponse.ok || !orderData?.order?.id) {
        throw new Error(orderData?.message || "Failed to create payment order.")
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Ananthala",
        description: "Order Payment",
        order_id: orderData.order.id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer: {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  phone: formData.phone,
                },
                shippingAddress: {
                  address: formData.address,
                  city: formData.city,
                  state: formData.state,
                  zipCode: formData.zipCode,
                  country: formData.country,
                },
                items: cartItems.map((item) => ({
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  size: item.size,
                  fabric: item.fabric,
                })),
                subtotal,
                shippingCost: shipping,
                discount: 0,
                totalAmount: total,
                paymentMethod: formData.paymentMethod,
              }),
            })

            const verifyData = await verifyResponse.json()
            if (!verifyResponse.ok || !verifyData?.success) {
              throw new Error(verifyData?.message || "Payment verification failed.")
            }

            clearCart()
            router.push("/checkout/success")
          } catch (error: any) {
            setErrorMessage(error?.message || "Payment verification failed.")
            setIsProcessing(false)
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
        theme: { color: "#EED9C4" },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on("payment.failed", (response: any) => {
        setErrorMessage(response?.error?.description || "Payment failed. Please try again.")
        setIsProcessing(false)
      })
      razorpay.open()
    } catch (error: any) {
      setErrorMessage(error?.message || "Payment failed. Please try again.")
      setIsProcessing(false)
    }
  }

  if (isAuthChecking) {
    return null
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-3xl font-serif text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-foreground mb-8">
              Please add items to your cart before checkout.
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
    <div className="min-h-screen bg-white">
      <Header />
      <div
        className="fixed top-20 left-0 right-0 z-40 bg-white border-b"
        style={{ borderColor: "#D9CFC7" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <nav className="py-2">
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
              <li>
                <Link href="/cart" className="text-foreground hover:opacity-80 transition-opacity">
                  Cart
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-foreground/50" />
              </li>
              <li className="text-foreground">Checkout</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="h-[49px]"></div>
      <main className="pt-6">
        <div className="max-w-7xl mx-auto px-4 py-12">
          

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
                        value="razorpay"
                        checked={formData.paymentMethod === "razorpay"}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-black text-lg">Razorpay (UPI, Card, Netbanking)</span>
                    </label>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                )}

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
                      <div className="relative w-16 h-16 shrink-0 bg-gray-100 overflow-hidden">
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
