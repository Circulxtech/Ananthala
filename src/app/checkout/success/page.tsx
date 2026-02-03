"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white flex flex-col text-foreground">
      <Header />
      <main className="flex-1 pt-16 pb-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto" />
          </div>

          <h1 className="text-2xl md:text-4xl font-serif text-foreground mb-4 font-cormorant">
            Order Placed Successfully!
          </h1>

          <p className="text-foreground mb-8 text-base md:text-lg leading-relaxed">
            Thank you for your purchase. We've received your order and will send you a confirmation email shortly.
          </p>

          {/* Order Status Info */}
          <div className="bg-stone-50 rounded-lg p-6 mb-8 border border-amber-100 text-foreground">
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Order Status:</span>
                <span className="font-semibold text-foreground">Confirmed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Estimated Delivery:</span>
                <span className="font-semibold text-foreground">5-7 Business Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Tracking:</span>
                <span className="font-semibold text-foreground">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push("/customer/orders")}
              className="flex-1 h-12 bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground font-medium flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Track Order</span>
            </Button>
            <Button
              onClick={() => router.push("/#find-your-perfect-mattress")}
              className="flex-1 h-12 bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground font-medium flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Button>
          </div>

        
        </div>
      </main>
      <Footer />
    </div>
  )
}
