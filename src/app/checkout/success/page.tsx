"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckCircle, ShoppingBag } from "lucide-react"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-black mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've received your order and will send
            you a confirmation email shortly.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/mattress")}
              className="px-8 py-3 text-white hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ backgroundColor: "#6B563F" }}
            >
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 border text-black hover:opacity-70 transition-opacity"
              style={{ borderColor: "#D9CFC7" }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

