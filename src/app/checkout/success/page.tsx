"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto" />
          </div>

          <h1 className="text-2xl md:text-4xl font-serif text-black mb-4 font-cormorant">Order Placed Successfully!</h1>

          <p className="text-gray-700 mb-8 text-base md:text-lg leading-relaxed">
            Thank you for your purchase. We've received your order and will send you a confirmation email shortly.
          </p>

          {/* Order Status Info */}
          <div className="bg-stone-50 rounded-lg p-6 mb-8 border border-amber-100">
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Status:</span>
                <span className="font-semibold text-[#8B5A3C]">Confirmed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold text-[#8B5A3C]">5-7 Business Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tracking:</span>
                <span className="font-semibold text-[#8B5A3C]">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push("/customer/orders")}
              className="flex-1 h-12 bg-[#8B5A3C] hover:bg-[#6D4530] text-white font-medium flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Track Order</span>
            </Button>
            <Button
              onClick={() => router.push("/category/grace")}
              variant="outline"
              className="flex-1 h-12 border-2 border-[#D9CFC7] text-[#8B5A3C] hover:bg-[#F5F1ED] font-medium flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Button>
          </div>

          <button
            onClick={() => router.push("/")}
            className="mt-4 w-full py-2 text-[#8B5A3C] hover:text-[#6D4530] transition-colors text-sm font-medium"
          >
            Back to Home
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
