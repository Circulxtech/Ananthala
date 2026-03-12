import { Suspense } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { OrderSuccessContent } from "./order-sucess-content"

function LoadingFallback() {
  return (
    <main className="flex-1 py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center py-12">
        <div className="inline-block animate-spin">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-amber-600 rounded-full"></div>
        </div>
        <p className="text-stone-600 mt-4">Loading order details...</p>
      </div>
    </main>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col text-foreground">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}
